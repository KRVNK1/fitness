<?php

namespace Database\Seeders\Trainers;

use Database\Seeders\Trainers\TrainersInfo\TrainersInfoSeeder;
use Database\Seeders\Trainers\TrainersInfo\TrainerSpecializationsSeeder;
use Illuminate\Database\Seeder;

class TrainerDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call([
            TrainersInfoSeeder::class,
            TrainerSpecializationsSeeder::class
        ]);
    }
}
