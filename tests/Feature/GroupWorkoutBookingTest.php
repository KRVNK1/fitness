<?php

namespace Tests\Feature;

use App\Enums\Booking\BookingStatusEnum;
use App\Enums\Membership\MembershipStatusEnum;
use App\Enums\User\UserEnum;
use App\Enums\Workout\Schedule\WorkoutScheduleEnum;
use App\Models\Booking;
use App\Models\Membership;
use App\Models\MembershipType;
use App\Models\User;
use App\Models\WorkoutCategory;
use App\Models\WorkoutSchedule;
use App\Models\WorkoutType;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GroupWorkoutBookingTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Тест успешной записи на групповую тренировку
     */
    public function test_user_can_book_group_workout_with_active_membership()
    {
        // Создаем пользователя
        $user = User::create([
            'first_name' => 'User',
            'last_name'  => 'User',
            'email'      => 'user@bk.ru',
            'password'   => '123123123',
            'role'       => UserEnum::CLIENT,
        ]);

        // Создаем тип абонемента
        $membershipType = MembershipType::create([
            'name'          => 'Light',
            'slug'          => 'light',
            'description'   => 'Базовый доступ в тренажерный зал',
            'price'         => 1990,
            'features'      => [
                ['text' => "Безлимитный доступ в клуб", 'included' => true],
                ['text' => "Вводная тренировка с тренером", 'included' => true],
                ['text' => "Анализ состава тела In-Body", 'included' => true],
                ['text' => "25+ групповых тренировок", 'included' => false],
                ['text' => "Гостевой доступ для друзей", 'included' => false],
                ['text' => "SPA-зона", 'included' => false]
            ],
        ]);

        // Создаем активный абонемент для пользователя
        $membership = Membership::create([
            'user_id'            => $user->id,
            'membership_type_id' => $membershipType->id,
            'status'             => MembershipStatusEnum::ACTIVE,
            'start_date'         => now(),
            'end_date'           => now()->addDays(30),
            'remaining_days'     => 30,
        ]);

        $trainer = User::create([
            'first_name' => 'Trainer',
            'last_name'  => 'Trainer',
            'email'      => 'trainer@bk.ru',
            'password'   => '123123123',
            'role'       => UserEnum::TRAINER,
        ]);

        $workoutCategory = WorkoutCategory::create([
            'name' => 'Силовые',
            'slug' => 'strength-training',
        ]);

        $workoutType = WorkoutType::create([
            'slug'                => 'lab',
            'name'                => 'L.A.B.',
            'description'         => 'Силовая тренировка улучшает форму, силу и выносливость мышц ног и ягодиц, а также улучшает кардиовыносливость и способствует снижению веса. На усмотрение тренера, в процессе тренировки может быть задействован различный спортивный инвентарь.',
            'duration_minutes'    => 45,
            'intensivity_level'   => 2,
            'workout_category_id' => $workoutCategory->id
        ]);

        $workoutSchedule = WorkoutSchedule::create([
            'workout_type_id' => $workoutType->id,
            'trainer_id'      => $trainer->id,
            'start_time'      => now()->addDay(),
            'end_time'        => now()->addDay()->addHour(),
            'available_slots' => 10,
            'booked_slots'    => 0,
            'status'          => WorkoutScheduleEnum::SCHEDULED,
        ]);

        // Пытаемся записаться на тренировку
        $response = $this->actingAs($user)->post('/bookings', [
            'workout_schedule_id' => $workoutSchedule->id,
        ]);

        $response->assertSessionHas('success');
        $response->assertRedirect();

        // Проверяем, что бронирование создано
        $this->assertDatabaseHas('bookings', [
            'user_id' => $user->id,
            'workout_schedule_id' => $workoutSchedule->id,
            'membership_id' => $membership->id,
            'status' => BookingStatusEnum::BOOKED,
        ]);

        // Проверяем, что количество забронированных мест увеличилось
        $workoutSchedule->refresh();
        $this->assertEquals(1, $workoutSchedule->booked_slots);
    }
}
