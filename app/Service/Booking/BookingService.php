<?php

namespace App\Service\Booking;

use App\Enums\Booking\BookingStatusEnum;
use App\Enums\Payment\UserRequestEnum;
use App\Models\Booking;
use App\Models\Membership;
use App\Models\User;
use App\Models\UserRequest;
use App\Models\WorkoutSchedule;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BookingService
{
    /**
     * Создать бронирование на тренировку
     */
    public function createBooking($userId, $workoutScheduleId)
    {
        try {
            $schedule = WorkoutSchedule::findOrFail($workoutScheduleId);

            // Проверка на свообдные места
            if ($schedule->booked_slots >= $schedule->available_slots) {
                return [
                    'success' => false,
                    'message' => 'К сожалению, все места заняты'
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
                    'message' => 'Вы уже записаны на эту тренировку'
                ];
            }

            $membership = Membership::where('user_id', $userId)
                ->where('status', 'active')
                ->where('end_date', '>=', now())
                ->first();

            if (!$membership) {
                return [
                    'success' => false,
                    'message' => 'У вас нет активного абонемента. Пожалуйста, приобретите абонемент.'
                ];
            }

            $booking = Booking::create([
                'user_id' => $userId,
                'workout_schedule_id' => $workoutScheduleId,
                'membership_id' => $membership->id,
                'status' => BookingStatusEnum::BOOKED
            ]);

            $schedule->increment('booked_slots');

            return [
                'success' => true,
                'message' => 'Вы успешно записались на тренировку!',
                'booking' => $booking->load(['workoutSchedule.workoutCategory', 'workoutSchedule.trainer'])
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Произошла ошибка при записи на тренировку' . $e
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

    public function storeIndWorkout(User $trainerid, Request $request)
    {
        $userId = Auth::id();
        $requestedDate = $request->input('requested_date');
        $comment = $request->input('comment');

        $membership = Membership::where('user_id', $userId)
            ->where('status', 'active')
            ->where('end_date', '>=', now())
            ->first();

        if (!$membership) {
            return [
                'success' => false,
                'message' => 'У вас нет активного абонемента. Пожалуйста, приобретите абонемент.'
            ];
        }

        $userRequest = UserRequest::create([
            'user_id'        => $userId,
            'trainer_id'     => $trainerid,
            'requested_date' => $requestedDate,
            'status'         => UserRequestEnum::PENDING,
            'comment'        => $comment
        ]);

        return [
            'success'     => true,
            'message'     => 'Вы успешно создали заявку!',
            'userRequest' => $userRequest
        ];
    }

    /**
     * Получить все бронирования пользователя
     */
    public function getUserBookings(int $userId, ?string $status = null)
    {
        $query = Booking::where('user_id', $userId)
            ->with(['workoutSchedule.workoutType', 'workoutSchedule.trainer', 'membership'])
            ->orderBy('created_at', 'desc');

        if ($status) {
            $query->where('status', $status);
        }

        return $query->get();
    }
}
