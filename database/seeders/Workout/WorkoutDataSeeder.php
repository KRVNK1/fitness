<?php

namespace Database\Seeders\Workout;

use Database\Seeders\Workout\WorkoutCategory\WorkoutCategorySeeder;
use Database\Seeders\Workout\WorkoutSchedule\WorkoutScheduleSeeder;
use Database\Seeders\Workout\WorkoutType\WorkoutTypeSeeder;
use Illuminate\Database\Seeder;

class WorkoutDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call([
            WorkoutCategorySeeder::class,
            WorkoutTypeSeeder::class,
            WorkoutScheduleSeeder::class
        ]);
    }
}
