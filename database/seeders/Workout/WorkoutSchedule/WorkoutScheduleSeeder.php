<?php

namespace Database\Seeders\Workout\WorkoutSchedule;

use App\Models\User;
use App\Models\WorkoutSchedule;
use App\Models\WorkoutType;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class WorkoutScheduleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $trainers = User::where('role', 'trainer')->get();
        $workoutTypes = WorkoutType::all();

        if ($trainers->isEmpty() || $workoutTypes->isEmpty()) {
            return;
        }

        // Создаем расписание на следующие 2 недели
        $startDate = Carbon::now()->startOfWeek();
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
            // Пропускаем воскресенье
            if ($currentDate->dayOfWeek !== Carbon::SUNDAY) {
                foreach ($timeSlots as $timeSlot) {
                    // Создаем тренировки
                    $workoutType = $workoutTypes->random();
                    $trainer = $trainers->random();

                    $startTime = $currentDate->copy()->setTimeFromTimeString($timeSlot);
                    $endTime = $startTime->copy()->addMinutes($workoutType->duration_minutes);

                    $conflictExists = WorkoutSchedule::where('trainer_id', $trainer->id)
                        ->where(function ($q) use ($startTime, $endTime) {
                            $q->where('start_time', '<', $endTime)
                                ->where('end_time', '>', $startTime);
                        })
                        ->exists();

                    if (!$conflictExists) {
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
                }
            }
            $currentDate->addDay();
        }

        $this->command->info("Created {$createdCount} workout schedules");
    }
}
