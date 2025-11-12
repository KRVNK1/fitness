<?php

namespace Tests\Feature;

use App\Enums\User\UserEnum;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class ProfileUpdateTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Тест успешного обновления личных данных пользователя
     */
    public function test_user_can_update_profile_information()
    {
        $user = User::create([
            'first_name' => 'Иван',
            'last_name' => 'Иванов',
            'email' => 'ivan@example.com',
            'phone' => '79991234567',
            'password' => '123123123',
            'role' => UserEnum::CLIENT,
        ]);

        $response = $this->actingAs($user)->put('/profile', [
            'first_name' => 'Петр',
            'last_name'  => 'Петров',
            'email'      => 'petr@example.com',
            'phone'      => '79997654321',
        ]);

        $response->assertSessionHasNoErrors();
        $response->assertRedirect();

        $user->refresh();

        $this->assertSame('Петр', $user->first_name);
        $this->assertSame('Петров', $user->last_name);
        $this->assertSame('petr@example.com', $user->email);
        $this->assertSame('79997654321', $user->phone);
    }

    /**
     * Тест успешного обновления пароля пользователя
     */
    public function test_user_can_update_password()
    {
        $user = User::create([
            'first_name' => 'Иван',
            'last_name' => 'Иванов',
            'email' => 'ivan@example.com',
            'phone' => '79991234567',
            'password' => '123123123',
            'role' => UserEnum::CLIENT,
        ]);

        $response = $this->actingAs($user)->put('/profile/password', [
            'current_password'      => '123123123',
            'password'              => '12345678',
            'password_confirmation' => '12345678',
        ]);

        $response->assertSessionHasNoErrors();
        $response->assertRedirect();

        $user->refresh();

        $this->assertTrue(Hash::check('12345678', $user->password));
    }
}
