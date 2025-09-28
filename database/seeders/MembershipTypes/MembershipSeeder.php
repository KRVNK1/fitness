<?php

namespace Database\Seeders\MembershipTypes;

use App\Models\MembershipType;
use Illuminate\Database\Seeder;

class MembershipSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $membershipTypes = [
            [
                'name'          => 'Light',
                'slug'          => 'light',
                'description'   => 'Базовый доступ в тренажерный зал',
                'price'         => 1990,
                'is_active'     => true,
                'features'      => [
                    ['text' => "Безлимитный доступ в клуб", 'included' => true],
                    ['text' => "Вводная тренировка с тренером", 'included' => true],
                    ['text' => "Анализ состава тела In-Body", 'included' => true],
                    ['text' => "25+ групповых тренировок", 'included' => false],
                    ['text' => "Гостевой доступ для друзей", 'included' => false],
                    ['text' => "SPA-зона", 'included' => false]
                ],
            ],
            [
                'name'          => 'Smart',
                'slug'          => 'smart',
                'description'   => 'Зал + групповые занятия',
                'price'         => 2400,
                'is_active'     => true,
                'features'      => [
                    ['text' => "Безлимитный доступ в клуб", 'included' => true],
                    ['text' => "Вводная тренировка с тренером", 'included' => true],
                    ['text' => "Анализ состава тела In-Body", 'included' => true],
                    ['text' => "25+ групповых тренировок", 'included' => true],
                    ['text' => "Гостевой доступ для друзей", 'included' => false],
                    ['text' => "SPA-зона", 'included' => false]
                ],
            ],
            [
                'name'          => 'Infinity',
                'slug'          => 'infinity',
                'description'   => 'Полный доступ с персональными тренировками',
                'price'         => 2800,
                'is_active'     => true,
                'features'      => [
                    ['text' => "Безлимитный доступ в клуб", 'included' => true],
                    ['text' => "Вводная тренировка с тренером", 'included' => true],
                    ['text' => "Анализ состава тела In-Body", 'included' => true],
                    ['text' => "25+ групповых тренировок", 'included' => true],
                    ['text' => "Гостевой доступ для друзей", 'included' => true],
                    ['text' => "SPA-зона", 'included' => true]
                ],
            ]
        ];

        foreach ($membershipTypes as $type) {
            MembershipType::firstOrCreate(
                [
                    'slug' => $type['slug'],
                ],
                $type
            );
        }
    }
}
