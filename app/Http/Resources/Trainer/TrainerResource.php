<?php

namespace App\Http\Resources\Trainer;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TrainerResource extends JsonResource
{
    public function toArray(Request $request)
    {
        return [
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'email' => $this->email,
            'phone' => $this->phone,
            'role' => $this->role,
            'trainer_info' => [
                'description' => $this->trainerInfo->description,
                'photo' => $this->trainerInfo->photo,
                'experience_years' => $this->trainerInfo->experience_years,
                'specializations' => $this->trainerInfo->specializations
                    ->pluck('name')
            ],
        ];
    }
}
