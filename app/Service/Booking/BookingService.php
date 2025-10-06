<?php

namespace App\Service\Booking;

use App\Enums\Booking\BookingStatusEnum;
use App\Models\Booking;
use App\Models\Membership;
use App\Models\WorkoutSchedule;
use Exception;

class BookingService
{
    /**
     * Создать бронирование на тренировку
     */
    public function createBooking($userId, $workoutScheduleId)
    {
        try {
            // Проверяем расписание тренировки
            $schedule = WorkoutSchedule::findOrFail($workoutScheduleId);

            // Проверяем наличие свободных мест
            if ($schedule->booked_slots >= $schedule->available_slots) {
                return [
                    'success' => false,
                    'message' => 'К сожалению, все места заняты'
                ];
            }

            // Проверяем, не записан ли пользователь уже на эту тренировку
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

            // Получаем активный абонемент пользователя
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

            // Создаем бронирование
            $booking = Booking::create([
                'user_id' => $userId,
                'workout_schedule_id' => $workoutScheduleId,
                'membership_id' => $membership->id,
                'status' => BookingStatusEnum::BOOKED
            ]);

            // Увеличиваем количество забронированных мест
            $schedule->increment('booked_slots');

            return [
                'success' => true,
                'message' => 'Вы успешно записались на тренировку!',
                'booking' => $booking->load(['workoutSchedule.workoutCategory', 'workoutSchedule.trainer'])
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Произошла ошибка при записи на тренировку'
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

            // Проверяем, не началась ли уже тренировка
            $schedule = $booking->workoutSchedule;
            if ($schedule->start_time <= now()) {
                return [
                    'success' => false,
                    'message' => 'Нельзя отменить бронирование после начала тренировки'
                ];
            }

            // Обновляем статус бронирования
            $booking->update(['status' => BookingStatusEnum::CANCELED]);

            // Уменьшаем количество забронированных мест
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
