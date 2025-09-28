<?php

namespace Database\Seeders\Workout\WorkoutType;

use App\Models\WorkoutCategory;
use App\Models\WorkoutType;
use Illuminate\Database\Seeder;

class WorkoutTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $workoutTypes = [
            // Силовые тренировки
            'strength-training' => [
                [
                    'name' => 'Базовая силовая',
                    'slug' => 'basic-strength',
                    'description' => 'Основные упражнения со свободными весами для развития силы',
                    'duration_minutes' => 60,
                    'intensivity_level' => 2,
                ],
                [
                    'name' => 'Пауэрлифтинг',
                    'slug' => 'powerlifting',
                    'description' => 'Тренировка трех базовых движений: присед, жим, тяга',
                    'duration_minutes' => 90,
                    'intensivity_level' => 3,
                ],
                [
                    'name' => 'Бодибилдинг',
                    'slug' => 'bodybuilding',
                    'description' => 'Тренировка для набора мышечной массы и рельефа',
                    'duration_minutes' => 75,
                    'intensivity_level' => 2,
                ],
            ],
            // Кардио тренировки
            'cardio-training' => [
                [
                    'name' => 'HIIT',
                    'slug' => 'hiit',
                    'description' => 'Высокоинтенсивная интервальная тренировка',
                    'duration_minutes' => 30,
                    'intensivity_level' => 3,
                ],
                [
                    'name' => 'Кардио микс',
                    'slug' => 'cardio-mix',
                    'description' => 'Комбинированная кардио тренировка на разном оборудовании',
                    'duration_minutes' => 45,
                    'intensivity_level' => 4,
                ],
                [
                    'name' => 'Степ-аэробика',
                    'slug' => 'step-aerobics',
                    'description' => 'Ритмичная тренировка с использованием степ-платформы',
                    'duration_minutes' => 50,
                    'intensivity_level' => 2,
                ],
            ],
            // Групповые программы
            'group-programs' => [
                [
                    'name' => 'Body Pump',
                    'slug' => 'body-pump',
                    'description' => 'Силовая тренировка с мини-штангой под музыку',
                    'duration_minutes' => 55,
                    'intensivity_level' => 5,
                ],
                [
                    'name' => 'TRX',
                    'slug' => 'trx',
                    'description' => 'Функциональная тренировка с петлями TRX',
                    'duration_minutes' => 45,
                    'intensivity_level' => 4,
                ],
                [
                    'name' => 'Crossfit',
                    'slug' => 'crossfit',
                    'description' => 'Высокоинтенсивная функциональная тренировка',
                    'duration_minutes' => 60,
                    'intensivity_level' => 3,
                ],
            ],
            // Йога и растяжка
            'yoga-stretching' => [
                [
                    'name' => 'Хатха йога',
                    'slug' => 'hatha-yoga',
                    'description' => 'Классическая йога с акцентом на асаны и дыхание',
                    'duration_minutes' => 75,
                    'intensivity_level' => 1,
                ],
                [
                    'name' => 'Виньяса йога',
                    'slug' => 'vinyasa-yoga',
                    'description' => 'Динамическая йога с плавными переходами',
                    'duration_minutes' => 60,
                    'intensivity_level' => 2,
                ],
                [
                    'name' => 'Стретчинг',
                    'slug' => 'stretching',
                    'description' => 'Тренировка на развитие гибкости и растяжку мышц',
                    'duration_minutes' => 45,
                    'intensivity_level' => 1,
                ],
            ],
            // Функциональный тренинг
            'functional-training' => [
                [
                    'name' => 'Функциональная тренировка',
                    'slug' => 'functional-workout',
                    'description' => 'Тренировка движений, применимых в повседневной жизни',
                    'duration_minutes' => 50,
                    'intensivity_level' => 2,
                ],
                [
                    'name' => 'Кор тренинг',
                    'slug' => 'core-training',
                    'description' => 'Укрепление мышц кора и стабилизаторов',
                    'duration_minutes' => 40,
                    'intensivity_level' => 3,
                ],
            ],
            // Танцевальные направления
            'dance-classes' => [
                [
                    'name' => 'Зумба',
                    'slug' => 'zumba',
                    'description' => 'Танцевальная фитнес-программа под латиноамериканскую музыку',
                    'duration_minutes' => 55,
                    'intensivity_level' => 2,
                ],
                [
                    'name' => 'Танцевальная аэробика',
                    'slug' => 'dance-aerobics',
                    'description' => 'Аэробная тренировка в танцевальном стиле',
                    'duration_minutes' => 50,
                    'intensivity_level' => 2,
                ],
            ],
            // Боевые искусства
            'martial-arts' => [
                [
                    'name' => 'Бокс',
                    'slug' => 'boxing',
                    'description' => 'Тренировка техники бокса и физической подготовки',
                    'duration_minutes' => 60,
                    'intensivity_level' => 3,
                ],
                [
                    'name' => 'Кикбоксинг',
                    'slug' => 'kickboxing',
                    'description' => 'Комбинация техник бокса и ударов ногами',
                    'duration_minutes' => 55,
                    'intensivity_level' => 4,
                ],
            ],
            // Водные программы
            'aqua-programs' => [
                [
                    'name' => 'Аквааэробика',
                    'slug' => 'aqua-aerobics',
                    'description' => 'Аэробная тренировка в воде',
                    'duration_minutes' => 45,
                    'intensivity_level' => 1,
                ],
                [
                    'name' => 'Плавание',
                    'slug' => 'swimming',
                    'description' => 'Тренировка техники плавания и выносливости',
                    'duration_minutes' => 60,
                    'intensivity_level' => 2,
                ],
            ],
        ];

        foreach ($workoutTypes as $categorySlug => $types) {
            $category = WorkoutCategory::where('slug', $categorySlug)->first();

            foreach ($types as $type) {
                WorkoutType::firstOrCreate(
                    [
                        'slug' => $type['slug'],
                        'workout_category_id' => $category->id
                    ],
                    array_merge($type, ['workout_category_id' => $category->id])
                );
            }
        }
    }
}
