<?php

namespace Database\Seeders\Users;

use App\Models\User;
use Illuminate\Database\Seeder;
use App\Enums\User\UserEnum;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Админ
        User::firstOrCreate(
            [
                'email'      => 'admin@bk.ru',
            ],
            [
                'first_name' => 'Admin',
                'last_name'  => 'Admin',
                'password'   => '123123123',
                'role'       => UserEnum::ADMIN,
            ]
        );

        // Пользователь
        User::firstOrCreate(
            [
                'email'      => 'user@bk.ru',
            ],
            [
                'first_name' => 'User',
                'last_name'  => 'User',
                'password'   => '123123123',
                'role'       => UserEnum::CLIENT,
            ]
        );
    }
}
