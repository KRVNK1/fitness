<?php

namespace App\Service\Booking;

use App\Enums\Booking\BookingStatusEnum;
use App\Enums\Membership\MembershipStatusEnum;
use App\Enums\UserApplication\UserApplicationEnum;
use App\Models\Booking;
use App\Models\Membership;
use App\Models\UserApplication;
use App\Models\WorkoutSchedule;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Auth;

class BookingService
{
    /**
     * Получить абонемент пользователя
     */
    public function getMembership($userId)
    {
        return Membership::where('user_id', $userId)
            ->where('status', MembershipStatusEnum::ACTIVE)
            ->where('end_date', '>=', now())
            ->first();
    }

    /**
     * Создать бронирование на тренировку
     */
    public function createBooking($userId, $workoutScheduleId): array
    {
        try {
            $schedule = WorkoutSchedule::findOrFail($workoutScheduleId);

            // Проверка на свообдные места
            if ($schedule->booked_slots >= $schedule->available_slots) {
                return [
                    'success' => false,
                    'message' => 'К сожалению, все места заняты.'
                ];
            }

            // Проверка записи пользователя
            $existingBooking = Booking::where('user_id', $userId)
                ->where('workout_schedule_id', $workoutScheduleId)
                ->whereIn('status', [BookingStatusEnum::BOOKED, BookingStatusEnum::ATTENDED])
                ->first();

            if ($existingBooking) {
                return [
                    'success' => false,
                    'message' => 'Вы уже записаны на данную тренировку.'
                ];
            }

            $membership = $this->getMembership($userId);

            if (!$membership) {
                return [
                    'success' => false,
                    'message' => 'У вас нет активного абонемента. Пожалуйста, приобретите абонемент.'
                ];
            }

            Booking::create([
                'user_id'             => $userId,
                'workout_schedule_id' => $workoutScheduleId,
                'membership_id'       => $membership->id,
                'status'              => BookingStatusEnum::BOOKED
            ]);

            $schedule->increment('booked_slots');

            return [
                'success' => true,
                'message' => 'Вы успешно записались на тренировку!'
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => $e->getMessage()
            ];
        }
    }

    /**
     * Отменить бронирование
     */
    public function cancelBooking($userId, $bookingId)
    {
        try {
            $booking = Booking::where('id', $bookingId)
                ->where('user_id', $userId)
                ->firstOrFail();

            // Проверяем, можно ли отменить бронирование
            if ($booking->status !== BookingStatusEnum::BOOKED) {
                return [
                    'success' => false,
                    'message' => 'Это бронирование нельзя отменить'
                ];
            }

            $schedule = $booking->workoutSchedule;
            if ($schedule->start_time <= now()) {
                return [
                    'success' => false,
                    'message' => 'Нельзя отменить бронирование после начала тренировки'
                ];
            }

            $booking->update(['status' => BookingStatusEnum::CANCELED]);

            $schedule->decrement('booked_slots');

            return [
                'success' => true,
                'message' => 'Бронирование успешно отменено'
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Произошла ошибка при отмене бронирования'
            ];
        }
    }

    /**
     * Запись на индивидуальную тренировку
     */
    public function storeIndWorkout($trainerId, $requestedDate, $comment = null)
    {
        $userId = Auth::id();
        $membership = $this->getMembership($userId);

        if (!$membership) {
            return [
                'success' => false,
                'message' => 'У вас нет активного абонемента. Пожалуйста, приобретите абонемент.'
            ];
        }

        // Проверка на пересечение времени с существующими бронированиями
        if ($this->hasTimeConflict($userId, $requestedDate)) {
            return [
                'success' => false,
                'message' => 'У вас уже есть тренировка в это время. Пожалуйста, выберите другое время.'
            ];
        }

        $existingRequest = UserApplication::where('user_id', $userId)
            ->where('trainer_id', $trainerId)
            ->where('status', UserApplicationEnum::PENDING)
            ->first();

        if ($existingRequest) {
            return [
                'success' => false,
                'message' => 'У вас уже есть активная заявка к этому тренеру.'
            ];
        }

        if ($requestedDate < now()) {
            return [
                'success' => false,
                'message' => 'Дата тренировки не может быть в прошлом.'
            ];
        }

        if ($trainerId === $userId) {
            return [
                'success' => false,
                'message' => 'Вы не можете записаться на свою тренировку.'
            ];
        }

        $UserApplication = UserApplication::create([
            'user_id'        => $userId,
            'trainer_id'     => $trainerId,
            'requested_date' => $requestedDate,
            'status'         => UserApplicationEnum::PENDING,
            'comment'        => $comment
        ]);

        return [
            'success'         => true,
            'message'         => 'Заявка успешно отправлена! Тренер рассмотрит её в ближайшее время.',
            'UserApplication' => $UserApplication
        ];
    }

    /**
     * Получить все бронирования пользователя
     */
    public function getUserBookings(int $userId)
    {
        $query = Booking::where('user_id', $userId)
            ->with(['workoutSchedule.workoutType', 'workoutSchedule.trainer', 'membership'])
            ->orderBy('created_at', 'desc');

        return $query->get();
    }

    /**
     * Проверяет, есть ли у пользователя тренировка в указанное время
     */
    private function hasTimeConflict($userId, $requestedDate)
    {
        $trainingDuration = 60; // длительность индивидуальной тренировки в минутах
        $requestedStart = Carbon::parse($requestedDate);
        $requestedEnd = $requestedStart->copy()->addMinutes($trainingDuration);

        // Ищем бронирования, которые пересекаются с запрашиваемым временем
        $conflictingBookings = Booking::where('user_id', $userId)
            ->whereIn('status', [BookingStatusEnum::BOOKED, BookingStatusEnum::ATTENDED])
            ->whereHas('workoutSchedule', function ($query) use ($requestedStart, $requestedEnd) {
                $query->where(function ($q) use ($requestedStart, $requestedEnd) {
                    // Проверяем пересечение интервалов
                    $q->where(function ($innerQ) use ($requestedStart, $requestedEnd) {
                        $innerQ->where('start_time', '<', $requestedEnd)
                            ->where('end_time', '>', $requestedStart);
                    });
                });
            })
            ->exists();

        return $conflictingBookings;
    }
}
