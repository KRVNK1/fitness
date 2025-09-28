<?php

namespace Database\Seeders\TrainersInfo;

use App\Models\TrainerInfo;
use App\Models\User;
use Illuminate\Database\Seeder;

class TrainersInfoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $trainer1 = User::where('email', 'ivanov@bk.ru')->first();
        $trainer2 = User::where('email', 'petrova@bk.ru')->first();
        $trainer3 = User::where('email', 'korotchuk@bk.ru')->first();

        TrainerInfo::firstOrCreate(
            [
                'user_id' => $trainer1->id,
            ],
            [
                'description' => 'Описание тренера 1',
                'experience_years' => 5,
            ]
        );

        TrainerInfo::firstOrCreate(
            [
                'user_id' => $trainer2->id,
            ],
            [
                'description' => 'Описание тренера 2',
                'experience_years' => 10,
            ]
        );

        TrainerInfo::firstOrCreate(
            [
                'user_id' => $trainer3->id,
            ],
            [
                'description' => 'Описание тренера 3',
                'experience_years' => 15,
            ]
        );
    }
}
