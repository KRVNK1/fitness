<?php

namespace Database\Seeders\Trainers\TrainersInfo;

use App\Models\TrainerCategory;
use App\Models\TrainerInfo;
use App\Models\WorkoutCategory;
use Illuminate\Database\Seeder;

class TrainerSpecializationsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $strengthCategory = WorkoutCategory::where('slug', 'strength-training')->first();
        $cardioCategory = WorkoutCategory::where('slug', 'cardio-training')->first();
        $yogaCategory = WorkoutCategory::where('slug', 'yoga-stretching')->first();
        $functionalCategory = WorkoutCategory::where('slug', 'functional-training')->first();
        $danceCategory = WorkoutCategory::where('slug', 'dance-classes')->first();
        $mindBodyCategory = WorkoutCategory::where('slug', 'mind-body')->first();
        $aquaCategory = WorkoutCategory::where('slug', 'aqua-programs')->first();

        $t1 = TrainerInfo::where('user_id', 3)->firstOrFail();
        $t2 = TrainerInfo::where('user_id', 4)->firstOrFail();
        $t3 = TrainerInfo::where('user_id', 5)->firstOrFail();
        $t4 = TrainerInfo::where('user_id', 6)->firstOrFail();
        $t5 = TrainerInfo::where('user_id', 7)->firstOrFail();
        $t6 = TrainerInfo::where('user_id', 8)->firstOrFail();
        $t7 = TrainerInfo::where('user_id', 9)->firstOrFail();
        $t8 = TrainerInfo::where('user_id', 10)->firstOrFail();
        $t9 = TrainerInfo::where('user_id', 11)->firstOrFail();

        /**
         * Иван Иванов — силовые, функционал, кардио, mind & body
         */
        TrainerCategory::firstOrCreate([
            'trainer_info_id'     => $t1->id,
            'workout_category_id' => $strengthCategory->id,
        ]);
        TrainerCategory::firstOrCreate([
            'trainer_info_id'     => $t1->id,
            'workout_category_id' => $cardioCategory->id,
        ]);
        TrainerCategory::firstOrCreate([
            'trainer_info_id'     => $t1->id,
            'workout_category_id' => $functionalCategory->id,
        ]);
        TrainerCategory::firstOrCreate([
            'trainer_info_id'     => $t1->id,
            'workout_category_id' => $mindBodyCategory->id,
        ]);

        /**
         * Анна Петрова — йога, функционал, aqua, mind & body, dance
         */
        TrainerCategory::firstOrCreate([
            'trainer_info_id'     => $t2->id,
            'workout_category_id' => $yogaCategory->id,
        ]);
        TrainerCategory::firstOrCreate([
            'trainer_info_id'     => $t2->id,
            'workout_category_id' => $functionalCategory->id,
        ]);
        TrainerCategory::firstOrCreate([
            'trainer_info_id'     => $t2->id,
            'workout_category_id' => $aquaCategory->id,
        ]);
        TrainerCategory::firstOrCreate([
            'trainer_info_id'     => $t2->id,
            'workout_category_id' => $mindBodyCategory->id,
        ]);
        TrainerCategory::firstOrCreate([
            'trainer_info_id'     => $t2->id,
            'workout_category_id' => $danceCategory->id,
        ]);

        /**
         * Александр Коротчук — кардио, силовые, функционал
         */
        TrainerCategory::firstOrCreate([
            'trainer_info_id'     => $t3->id,
            'workout_category_id' => $cardioCategory->id,
        ]);
        TrainerCategory::firstOrCreate([
            'trainer_info_id'     => $t3->id,
            'workout_category_id' => $strengthCategory->id,
        ]);
        TrainerCategory::firstOrCreate([
            'trainer_info_id'     => $t3->id,
            'workout_category_id' => $functionalCategory->id,
        ]);

        /**
         * Сергей Сидоров — танцы, йога, функционал, mind & body
         */
        TrainerCategory::firstOrCreate([
            'trainer_info_id'     => $t4->id,
            'workout_category_id' => $danceCategory->id,
        ]);
        TrainerCategory::firstOrCreate([
            'trainer_info_id'     => $t4->id,
            'workout_category_id' => $yogaCategory->id,
        ]);
        TrainerCategory::firstOrCreate([
            'trainer_info_id'     => $t4->id,
            'workout_category_id' => $functionalCategory->id,
        ]);
        TrainerCategory::firstOrCreate([
            'trainer_info_id'     => $t4->id,
            'workout_category_id' => $mindBodyCategory->id,
        ]);

        /**
         * Дмитрий Дмитриев — functional, mindBody, cardio, aqua
         */
        TrainerCategory::firstOrCreate([
            'trainer_info_id'     => $t5->id,
            'workout_category_id' => $functionalCategory->id,
        ]);
        TrainerCategory::firstOrCreate([
            'trainer_info_id'     => $t5->id,
            'workout_category_id' => $mindBodyCategory->id,
        ]);
        TrainerCategory::firstOrCreate([
            'trainer_info_id'     => $t5->id,
            'workout_category_id' => $cardioCategory->id,
        ]);
        TrainerCategory::firstOrCreate([
            'trainer_info_id'     => $t5->id,
            'workout_category_id' => $aquaCategory->id,
        ]);

        /**
         * Алексей Волков — силовые, функционал, кардио, йога, mind & body
         */
        TrainerCategory::firstOrCreate([
            'trainer_info_id'     => $t6->id,
            'workout_category_id' => $strengthCategory->id,
        ]);
        TrainerCategory::firstOrCreate([
            'trainer_info_id'     => $t6->id,
            'workout_category_id' => $functionalCategory->id,
        ]);
        TrainerCategory::firstOrCreate([
            'trainer_info_id'     => $t6->id,
            'workout_category_id' => $cardioCategory->id,
        ]);
        TrainerCategory::firstOrCreate([
            'trainer_info_id'     => $t6->id,
            'workout_category_id' => $yogaCategory->id,
        ]);
        TrainerCategory::firstOrCreate([
            'trainer_info_id'     => $t6->id,
            'workout_category_id' => $mindBodyCategory->id,
        ]);

        /**
         * Ольга Смирнова — йога, aqua, mindBody, functional
         */
        TrainerCategory::firstOrCreate([
            'trainer_info_id'     => $t7->id,
            'workout_category_id' => $yogaCategory->id,
        ]);
        TrainerCategory::firstOrCreate([
            'trainer_info_id'     => $t7->id,
            'workout_category_id' => $aquaCategory->id,
        ]);
        TrainerCategory::firstOrCreate([
            'trainer_info_id'     => $t7->id,
            'workout_category_id' => $mindBodyCategory->id,
        ]);
        TrainerCategory::firstOrCreate([
            'trainer_info_id'     => $t7->id,
            'workout_category_id' => $functionalCategory->id,
        ]);

        /**
         * Екатерина Кузнецова — все
         */
        TrainerCategory::firstOrCreate([
            'trainer_info_id'     => $t8->id,
            'workout_category_id' => $strengthCategory->id,
        ]);
        TrainerCategory::firstOrCreate([
            'trainer_info_id'     => $t8->id,
            'workout_category_id' => $cardioCategory->id,
        ]);
        TrainerCategory::firstOrCreate([
            'trainer_info_id'     => $t8->id,
            'workout_category_id' => $yogaCategory->id,
        ]);
        TrainerCategory::firstOrCreate([
            'trainer_info_id'     => $t8->id,
            'workout_category_id' => $functionalCategory->id,
        ]);
        TrainerCategory::firstOrCreate([
            'trainer_info_id'     => $t8->id,
            'workout_category_id' => $aquaCategory->id,
        ]);
        TrainerCategory::firstOrCreate([
            'trainer_info_id'     => $t8->id,
            'workout_category_id' => $mindBodyCategory->id,
        ]);
        TrainerCategory::firstOrCreate([
            'trainer_info_id'     => $t8->id,
            'workout_category_id' => $danceCategory->id,
        ]);

        /**
         * Мария Федоров - все
         */
        TrainerCategory::firstOrCreate([
            'trainer_info_id'     => $t9->id,
            'workout_category_id' => $strengthCategory->id,
        ]);
        TrainerCategory::firstOrCreate([
            'trainer_info_id'     => $t9->id,
            'workout_category_id' => $cardioCategory->id,
        ]);
        TrainerCategory::firstOrCreate([
            'trainer_info_id'     => $t9->id,
            'workout_category_id' => $yogaCategory->id,
        ]);
        TrainerCategory::firstOrCreate([
            'trainer_info_id'     => $t9->id,
            'workout_category_id' => $functionalCategory->id,
        ]);
        TrainerCategory::firstOrCreate([
            'trainer_info_id'     => $t9->id,
            'workout_category_id' => $aquaCategory->id,
        ]);
        TrainerCategory::firstOrCreate([
            'trainer_info_id'     => $t9->id,
            'workout_category_id' => $mindBodyCategory->id,
        ]);
        TrainerCategory::firstOrCreate([
            'trainer_info_id'     => $t9->id,
            'workout_category_id' => $danceCategory->id,
        ]);
    }
}
