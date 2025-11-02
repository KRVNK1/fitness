<?php

namespace App\Http\Controllers\Requests;

use App\Http\Controllers\Controller;
use App\Service\Trainer\TrainerApplicationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TrainerApplicationController extends Controller
{
    private TrainerApplicationService $trainerApplicationService;

    public function __construct(TrainerApplicationService $trainerApplicationService)
    {
        $this->trainerApplicationService = $trainerApplicationService;
    }
    /**
     * Заявки для тренера (в тренерской)
     */
    public function trainerRequests()
    {
        return Inertia::render('DashBoard/TrainerTable', [
            'requests' => $this->trainerApplicationService->getTrainerRequests(Auth::id()),
        ]);
    }

    /**
     * Принять заявку (только для тренера)
     */
    public function approve($id)
    {
        $this->trainerApplicationService->approveApplication($id, Auth::id());

        return back()->with('success', 'Заявка принята!');
    }

    /**
     * Отклонить заявку (только для тренера)
     */
    public function reject($id, Request $request)
    {
        $this->trainerApplicationService->rejectApplication($id, Auth::id(), $request->input('trainer_comment'));
       
        return back()->with('success', 'Заявка отклонена.');
    }

    /**
     * Отменить принятую заявку (только для тренера)
     */
    public function cancelApproved($id, Request $request)
    {
        $this->trainerApplicationService->cancelApplication($id, Auth::id(), $request->input('trainer_comment'));

        return back()->with('success', 'Тренировка отменена.');
    }

}
