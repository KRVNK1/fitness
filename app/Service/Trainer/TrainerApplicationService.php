<?php

namespace App\Service\Trainer;

use App\Enums\UserApplication\UserApplicationEnum;
use App\Models\UserApplication;

class TrainerApplicationService
{
    /**
     * Получить заявку
     */
    private function getApplication(int $id, int $trainerId, string $status)
    {
        return UserApplication::where('id', $id)
            ->where('trainer_id', $trainerId)
            ->where('status', $status)
            ->firstOrFail();
    }

    /**
     * Получить все заявки тренера
     */
    public function getTrainerRequests(int $trainerId)
    {
        return UserApplication::where('trainer_id', $trainerId)
            ->with(['user'])
            ->orderByDesc('created_at')
            ->get();
    }

    /**
     * Принять заявку
     */
    public function approveApplication(int $id, int $trainerId)
    {
        $request = $this->getApplication($id, $trainerId, UserApplicationEnum::PENDING);

        $request->update(['status' => UserApplicationEnum::APPROVED]);
    }

    /**
     * Отклонить заявку
     */
    public function rejectApplication(int $id, int $trainerId, string $trainerComment)
    {
        $application = $this->getApplication($id, $trainerId, UserApplicationEnum::PENDING);

        $application->update([
            'status'          => UserApplicationEnum::REJECTED,
            'trainer_comment' => $trainerComment
        ]);
    }

    public function cancelApplication(int $id, int $trainerId, string $trainerComment)
    {
        $application = $this->getApplication($id, $trainerId, UserApplicationEnum::PENDING);

        $application->update([
            'status'          => UserApplicationEnum::CANCELED,
            'trainer_comment' => $trainerComment,
        ]);
    }
}
