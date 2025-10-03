<?php

namespace Database\Seeders\Workout\WorkoutCategory;

use App\Models\WorkoutCategory;
use Illuminate\Database\Seeder;

class WorkoutCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Силовые тренировки',
                'slug' => 'strength-training',
            ],
            [
                'name' => 'Кардио тренировки',
                'slug' => 'cardio-training',
            ],
            [
                'name' => 'Йога и растяжка',
                'slug' => 'yoga-stretching',
            ],
            [
                'name' => 'Функциональный тренинг',
                'slug' => 'functional-training',
            ],
            [
                'name' => 'Танцевальные направления',
                'slug' => 'dance-classes',
            ],
            [
                'name' => 'Разум и тело',
                'slug' => 'mind-body',
            ],
            [
                'name' => 'Водные программы',
                'slug' => 'aqua-programs',
            ],
        ];

        foreach ($categories as $category) {
            WorkoutCategory::firstOrCreate(
                ['slug' => $category['slug']],
                $category
            );
        }
    }
}
