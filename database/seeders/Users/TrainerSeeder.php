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
                'email'      => 'kuznetsov@bk.ru',
            ],
            [
                'first_name' => 'Александр',
                'last_name'  => 'Кузнецов',
                'password'   => '123123123',
                'role'       => UserEnum::TRAINER,
            ]
        );

        User::firstOrCreate(
            [
                'email'      => 'sidorov.sergey@bk.ru',
            ],
            [
                'first_name' => 'Сергей',
                'last_name'  => 'Сидоров',
                'password'   => '123123123',
                'role'       => UserEnum::TRAINER,
            ]
        );

        User::firstOrCreate(
            [
                'email'      => 'dmitriev.fitness@bk.ru',
            ],
            [
                'first_name' => 'Дмитрий',
                'last_name'  => 'Дмитриев',
                'password'   => '123123123',
                'role'       => UserEnum::TRAINER,
            ]
        );

        User::firstOrCreate(
            [
                'email'      => 'volkov.coach@bk.ru',
            ],
            [
                'first_name' => 'Алексей',
                'last_name'  => 'Волков',
                'password'   => '123123123',
                'role'       => UserEnum::TRAINER,
            ]
        );

        User::firstOrCreate(
            [
                'email'      => 'smirnova.olga@bk.ru',
            ],
            [
                'first_name' => 'Ольга',
                'last_name'  => 'Смирнова',
                'password'   => '123123123',
                'role'       => UserEnum::TRAINER,
            ]
        );

        User::firstOrCreate(
            [
                'email'      => 'kuznetsova.ekaterina@bk.ru',
            ],
            [
                'first_name' => 'Екатерина',
                'last_name'  => 'Кузнецова',
                'password'   => '123123123',
                'role'       => UserEnum::TRAINER,
            ]
        );

        User::firstOrCreate(
            [
                'email'      => 'fedorova.trainer@bk.ru',
            ],
            [
                'first_name' => 'Мария',
                'last_name'  => 'Федорова',
                'password'   => '123123123',
                'role'       => UserEnum::TRAINER,
            ]
        );
    }
}
