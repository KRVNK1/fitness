<?php

namespace Database\Seeders\Workout\WorkoutSchedule;

use App\Models\User;
use App\Models\WorkoutSchedule;
use App\Models\WorkoutType;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class WorkoutScheduleSeeder extends Seeder
{
    public function run(): void
    {
        $trainers = User::where('role', 'trainer')->get();
        if ($trainers->isEmpty()) return;
        
        // Расписание на 2 недели
        $startDate = Carbon::now();
        $endDate = $startDate->copy()->addWeeks(2);

        $timeSlots = [
            '08:00',
            '09:30',
            '11:00',
            '12:30',
            '14:00',
            '15:30',
            '17:00',
            '18:30',
            '20:00'
        ];

        $currentDate = $startDate->copy();
        $createdCount = 0;

        while ($currentDate->lte($endDate)) {
            foreach ($timeSlots as $timeSlot) {
                $startTime = $currentDate->copy()->setTimeFromTimeString($timeSlot);

                // Выбираем случайного тренера, у которого есть специализации и нет тренировки в этот слот
                $availableTrainers = $trainers->filter(
                    fn($trainer) =>
                    $trainer->trainerInfo->specializations->isNotEmpty() &&
                        !WorkoutSchedule::where('trainer_id', $trainer->id)
                            ->where('start_time', $startTime)
                            ->exists()
                );

                if ($availableTrainers->isEmpty()) continue;

                $trainer = $availableTrainers->random();

                // Выбираем случайный тип тренировки из специализаций тренера
                $trainerWorkoutTypes = WorkoutType::whereIn(
                    'workout_category_id',
                    $trainer->trainerInfo->specializations->pluck('id')
                )->get();

                if ($trainerWorkoutTypes->isEmpty()) continue;

                $workoutType = $trainerWorkoutTypes->random();
                $endTime = $startTime->copy()->addMinutes($workoutType->duration_minutes);

                WorkoutSchedule::create([
                    'workout_type_id' => $workoutType->id,
                    'trainer_id' => $trainer->id,
                    'start_time' => $startTime,
                    'end_time' => $endTime,
                    'available_slots' => rand(8, 20),
                    'booked_slots' => 0,
                    'status' => 'scheduled',
                ]);
                $createdCount++;
            }
            $currentDate->addDay();
        }

        $this->command->info("Created {$createdCount} workout schedules");
    }
}
