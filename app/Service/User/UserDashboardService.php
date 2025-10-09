<?php

namespace App\Service\User;

use App\Models\User;

class UserDashboardService
{
    /**
     * Получить статистику пользователя для дашборда
     */
    public function getUserStats(User $user): array
    {
        $bookings = $user->bookings()->with(['workoutSchedule.workoutCategory'])->get();
        
        // Подсчет индивидуальных тренировок (где available_slots = 1)
        $individualWorkouts = $bookings->filter(function ($booking) {
            return $booking->workoutSchedule && $booking->workoutSchedule->available_slots == 1;
        })->count();
        
        // Подсчет групповых тренировок (где available_slots > 1)
        $groupWorkouts = $bookings->filter(function ($booking) {
            return $booking->workoutSchedule && $booking->workoutSchedule->available_slots > 1;
        })->count();
        
        $totalWorkouts = $bookings->count();
        
        $userMembership = $user->memberships()->first();

        return [
            'total_workouts' => $totalWorkouts,
            'individual_workouts' => $individualWorkouts,
            'group_workouts' => $groupWorkouts,
            'userMembership' => $userMembership,
        ];
    }
    
    /**
     * Последние бронирования пользователя
     */
    public function getRecentBookings(User $user, int $limit = 3)
    {
        return $user->bookings()
            ->with([
                'workoutSchedule.workoutCategory',
                'workoutSchedule.trainer'
            ])
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get()
            ->map(function ($booking) {
                return [
                    'workout_name' => $booking->workoutSchedule->workoutType->name ?? 'Неизвестно',
                    'trainer_name' => $booking->workoutSchedule->trainer 
                        ? $booking->workoutSchedule->trainer->first_name . ' ' . $booking->workoutSchedule->trainer->last_name
                        : 'Не назначен',
                    'start_time' => $booking->workoutSchedule->start_time ?? null,
                    'end_time' => $booking->workoutSchedule->end_time ?? null,
                    'duration' => $booking->workoutSchedule 
                        ? $booking->workoutSchedule->start_time->diffInMinutes($booking->workoutSchedule->end_time)
                        : 0,
                    'type' => $booking->workoutSchedule && $booking->workoutSchedule->available_slots == 1 
                        ? 'individual' 
                        : 'group',
                    'status' => $booking->status,
                    'created_at' => $booking->created_at,
                ];
            });
    }
    
    /**
     * Полная история тренировок пользователя с пагинацией
     */
    public function getWorkoutHistory(User $user, int $perPage = 10)
    {

        return $user->bookings()
            ->with([
                'workoutSchedule.workoutCategory',
                'workoutSchedule.trainer'
            ])
            ->orderBy('created_at', 'desc')
            ->paginate($perPage)
            ->through(function ($booking) {
                return [
                    'workout_name' => $booking->workoutSchedule->workoutType->name ?? 'Неизвестно',
                    'trainer_name' => $booking->workoutSchedule->trainer 
                        ? $booking->workoutSchedule->trainer->first_name . ' ' . $booking->workoutSchedule->trainer->last_name
                        : 'Не назначен',
                    'start_time' => $booking->workoutSchedule->start_time ?? null,
                    'end_time' => $booking->workoutSchedule->end_time ?? null,
                    'duration' => $booking->workoutSchedule 
                        ? $booking->workoutSchedule->start_time->diffInMinutes($booking->workoutSchedule->end_time)
                        : 0,
                    'type' => $booking->workoutSchedule && $booking->workoutSchedule->available_slots == 1 
                        ? 'individual' 
                        : 'group',
                    'status' => $booking->status,
                    'created_at' => $booking->created_at,
                ];
            });
    }
}
