<?php

namespace App\Http\Controllers;

use App\Service\User\UserDashboardService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    protected UserDashboardService $dashboardService;
    
    public function __construct(UserDashboardService $dashboardService)
    {
        $this->dashboardService = $dashboardService;
    }
    
    /**
     * Отображение дашборда пользователя
     */
    public function index(Request $request): Response
    {
        $user = $request->user();
        
        $stats = $this->dashboardService->getUserStats($user);
        
        $recentBookings = $this->dashboardService->getRecentBookings($user, 3);
        
        $workoutHistory = $this->dashboardService->getWorkoutHistory($user, 10);
        
        return Inertia::render('Dashboard', [
            'user' => [
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'email' => $user->email,
                'phone' => $user->phone,
            ],
            'stats' => $stats,
            'recentBookings' => $recentBookings,
            'workoutHistory' => $workoutHistory,
        ]);
    }
}
