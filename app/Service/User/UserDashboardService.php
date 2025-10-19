<?php

namespace App\Service\User;

use App\Enums\UserApplication\UserApplicationEnum;
use App\Http\Resources\Booking\BookingResource;
use App\Models\User;
use App\Models\UserApplication;
use Illuminate\Support\Facades\Auth;

class UserDashboardService
{
    /**
     * Получить статистику пользователя для дашборда
     */
    public function getUserStats(User $user): array
    {
        $bookings = $user->bookings()->with(['workoutSchedule.workoutCategory'])->get();

        // Подсчет индивидуальных тренировок
        $individualWorkouts = UserApplication::where('user_id', $user->id)
            ->where('status', UserApplicationEnum::APPROVED)
            ->count();

        // Подсчет групповых тренировок (где available_slots > 1)
        $groupWorkouts = $bookings->filter(function ($booking) {
            return $booking->workoutSchedule && $booking->workoutSchedule->available_slots > 1;
        })->count();

        $totalWorkouts = $bookings->count() + $individualWorkouts;

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
        return BookingResource::collection(
            $user->bookings()
                ->with([
                    'workoutSchedule.workoutCategory',
                    'workoutSchedule.trainer'
                ])
                ->orderBy('created_at', 'desc')
                ->limit($limit)
                ->get()
        );
    }

    /**
     * Полная история тренировок пользователя с пагинацией
     */
    public function getWorkoutHistory(User $user, int $perPage = 7)
    {
        return $user->bookings()
            ->with(['workoutSchedule.workoutType', 'workoutSchedule.trainer'])
            ->latest()
            ->paginate($perPage)
            ->through(fn($booking) => new BookingResource($booking));
    }

    /**
     * Получить заявки пользователя
     */
    public function userRequests()
    {
        $userId = Auth::id();

        return UserApplication::where('user_id', $userId)
            ->with(['trainer'])
            ->orderBy('created_at', 'desc')
            ->get();
    }
}
