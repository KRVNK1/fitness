<?php

namespace App\Service\User;

use App\Enums\UserApplication\UserApplicationEnum;
use App\Models\UserApplication;
use Illuminate\Support\Facades\Auth;

class UserApplicationService
{
    /**
     * Отменить заявку
     */
    public function cancel(int $applicationId): array
    {
        $userId = Auth::id();

        $request = UserApplication::where('id', $applicationId)
            ->where('user_id', $userId)
            ->where('status', UserApplicationEnum::PENDING)
            ->firstOrFail();

        $request->delete();

        return [
            'success' => true,
            'message' => 'Заявка отменена'
        ];
    }
}
