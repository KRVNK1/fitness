<?php

namespace Database\Seeders\Users;

use App\Enums\User\UserEnum;
use App\Models\User;
use Illuminate\Database\Seeder;

class TrainerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::firstOrCreate(
            [
                'email'      => 'ivanov@bk.ru',
            ],
            [
                'first_name' => 'Иван',
                'last_name'  => 'Иванов',
                'password'   => '123123123',
                'role'       => UserEnum::TRAINER,
            ]
        );

        User::firstOrCreate(
            [
                'email'      => 'petrova@bk.ru',
            ],
            [
                'first_name' => 'Анна',
                'last_name'  => 'Петрова',
                'password'   => '123123123',
                'role'       => UserEnum::TRAINER,
            ]
        );

        User::firstOrCreate(
            [
                'email'      => 'korotchuk@bk.ru',
            ],
            [
                'first_name' => 'Александр',
                'last_name'  => 'Коротчук',
                'password'   => '123123123',
                'role'       => UserEnum::TRAINER,
            ]
        );
    }
}
