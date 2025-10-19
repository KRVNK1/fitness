<?php

namespace App\Http\Controllers;

use App\Service\User\UserDashboardService;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
    public function index(Request $request)
    {
        $user = $request->user();
        
        return Inertia::render('DashBoard/Dashboard', [
            'user'           => $user,
            'stats'          => $this->dashboardService->getUserStats($user),
            'recentBookings' => $this->dashboardService->getRecentBookings($user, 3),
            'workoutHistory' => $this->dashboardService->getWorkoutHistory($user, 7),
            'requests'       => $this->dashboardService->userRequests()
        ]);
    }
}
