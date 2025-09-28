<?php

namespace Database\Seeders;

use Database\Seeders\MembershipTypes\MembershipSeeder;
use Database\Seeders\TrainersInfo\TrainersInfoSeeder;
use Database\Seeders\Users\TrainerSeeder;
use Database\Seeders\Users\UserSeeder;
use Database\Seeders\Workout\WorkoutDataSeeder;
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
            MembershipSeeder::class,
            UserSeeder::class,
            TrainerSeeder::class,
            TrainersInfoSeeder::class,
            WorkoutDataSeeder::class,
        ]);
    }
}
