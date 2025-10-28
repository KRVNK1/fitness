<?php

namespace App\Http\Controllers\UserApplication;

use App\Enums\UserApplication\UserApplicationEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\UserApplication\UserApplicationRequest;
use App\Models\UserApplication;
use App\Service\Booking\BookingService;
use App\Service\User\UserApplicationService;
use App\Service\User\UserDashboardService;
use Illuminate\Support\Facades\Auth;
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
     * Получить все заявки для тренера (в личном кабинете тренера)
     */
    public function trainerRequests()
    {
        $trainerId = Auth::id();

        $requests = UserApplication::where('trainer_id', $trainerId)
            ->with(['user'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Trainer/Requests', [
            'requests' => $requests,
        ]);
    }

    /**
     * Принять заявку (только для тренера)
     */
    public function approve($id)
    {
        $trainerId = Auth::id();

        $request = UserApplication::where('id', $id)
            ->where('trainer_id', $trainerId)
            ->where('status', UserApplicationEnum::PENDING)
            ->firstOrFail();

        $request->update(['status' => UserApplicationEnum::APPROVED]);

        return back()->with('success', 'Заявка принята!');
    }

    /**
     * Отклонить заявку (только для тренера)
     */
    public function reject($id)
    {
        $trainerId = Auth::id();

        $request = UserApplication::where('id', $id)
            ->where('trainer_id', $trainerId)
            ->where('status', UserApplicationEnum::PENDING)
            ->firstOrFail();

        $request->update(['status' => UserApplicationEnum::REJECTED]);

        return back()->with('success', 'Заявка отклонена.');
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
