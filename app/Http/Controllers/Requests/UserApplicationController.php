<?php

namespace App\Http\Controllers\Requests;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserApplication\UserApplicationRequest;
use App\Service\Booking\BookingService;
use App\Service\User\UserApplicationService;
use App\Service\User\UserDashboardService;
use Inertia\Inertia;

class UserApplicationController extends Controller
{
    private BookingService $bookingService;
    private UserApplicationService $userApplicationService;
    private UserDashboardService $userDashboardService;

    public function __construct(BookingService $bookingService, UserApplicationService $userApplicationService, UserDashboardService $userDashboardService)
    {
        $this->bookingService = $bookingService;
        $this->userApplicationService = $userApplicationService;
        $this->userDashboardService = $userDashboardService;
    }

    public function userApplications()
    {
        return Inertia::render('DashBoard/MyApplications', [
            'requests'       => $this->userDashboardService->userRequests()
        ]);
    }

    /**
     * Создать заявку на тренировку с тренером
     */
    public function store(UserApplicationRequest $request)
    {
        $result = $this->bookingService->storeIndWorkout(
            $request['trainer_id'],
            $request['requested_date'],
            $request['comment'] ?? null
        );

        if (!$result['success']) {
            return back()->with('error', $result['message']);
        }

        return back()->with('success', $result['message']);
    }

    /**
     * Отменить заявку (для пользователя)
     */
    public function cancel($id)
    {
        $result = $this->userApplicationService->cancel($id);

        if ($result['success']) {
            return redirect()->back()->with('success', $result['message']);
        }

        return redirect()->back()->with('error', $result['message']);
    }
}
