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
        $trainer4 = User::where('email', 'sidorov.sergey@bk.ru')->first();
        $trainer5 = User::where('email', 'dmitriev.fitness@bk.ru')->first();
        $trainer6 = User::where('email', 'volkov.coach@bk.ru')->first();
        $trainer7 = User::where('email', 'smirnova.olga@bk.ru')->first();
        $trainer8 = User::where('email', 'kuznetsova.ekaterina@bk.ru')->first();
        $trainer9 = User::where('email', 'fedorova.trainer@bk.ru')->first();

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

        TrainerInfo::firstOrCreate(
            [
                'user_id' => $trainer4->id,
            ],
            [
                'description' => 'Описание тренера 4',
                'experience_years' => 7,
            ]
        );

        TrainerInfo::firstOrCreate(
            [
                'user_id' => $trainer5->id,
            ],
            [
                'description' => 'Описание тренера 5',
                'experience_years' => 12,
            ]
        );

        TrainerInfo::firstOrCreate(
            [
                'user_id' => $trainer6->id,
            ],
            [
                'description' => 'Описание тренера 6',
                'experience_years' => 8,
            ]
        );

        TrainerInfo::firstOrCreate(
            [
                'user_id' => $trainer7->id,
            ],
            [
                'description' => 'Описание тренера 7',
                'experience_years' => 6,
            ]
        );

        TrainerInfo::firstOrCreate(
            [
                'user_id' => $trainer8->id,
            ],
            [
                'description' => 'Описание тренера 8',
                'experience_years' => 9,
            ]
        );

        TrainerInfo::firstOrCreate(
            [
                'user_id' => $trainer9->id,
            ],
            [
                'description' => 'Описание тренера 9',
                'experience_years' => 11,
            ]
        );
    }
}
