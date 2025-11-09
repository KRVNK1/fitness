<?php

namespace Database\Seeders;

use Database\Seeders\Memberships\MembershipSeeder;
use Database\Seeders\Memberships\MembershipTypeSeeder;
use Database\Seeders\Trainers\TrainerDataSeeder;
use Database\Seeders\Users\TrainerSeeder;
use Database\Seeders\Users\UserSeeder;
use Database\Seeders\Workout\WorkoutDataSeeder;
use Database\Seeders\Workout\WorkoutSchedule\WorkoutScheduleSeeder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call([
            MembershipTypeSeeder::class,
            UserSeeder::class,
            TrainerSeeder::class,
            MembershipSeeder::class,
            WorkoutDataSeeder::class,
            TrainerDataSeeder::class,
            WorkoutScheduleSeeder::class
        ]);
    }
}
