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
                'name' => 'Силовые',
                'slug' => 'strength-training',
            ],
            [
                'name' => 'Кардио',
                'slug' => 'cardio-training',
            ],
            [
                'name' => 'Йога и растяжка',
                'slug' => 'yoga-stretching',
            ],
            [
                'name' => 'Функциональные',
                'slug' => 'functional-training',
            ],
            [
                'name' => 'Танцевальные',
                'slug' => 'dance-classes',
            ],
            [
                'name' => 'Разум и тело',
                'slug' => 'mind-body',
            ],
            [
                'name' => 'Водные',
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
