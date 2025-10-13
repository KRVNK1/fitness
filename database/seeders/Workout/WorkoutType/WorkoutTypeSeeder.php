<?php

namespace Database\Seeders\Workout\WorkoutType;

use App\Models\WorkoutCategory;
use App\Models\WorkoutType;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class WorkoutTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Силовые тренировки
        $strengthCategory = WorkoutCategory::where('slug', 'strength-training')->first();

        WorkoutType::firstOrCreate(
            [
                'slug'                => 'lab'
            ],
            [
                'name'                => 'L.A.B.',
                'description'         => 'Силовая тренировка улучшает форму, силу и выносливость мышц ног и ягодиц, а также улучшает кардиовыносливость и способствует снижению веса. На усмотрение тренера, в процессе тренировки может быть задействован различный спортивный инвентарь.',
                'duration_minutes'    => 45,
                'intensivity_level'   => 2,
                'photo'               => Storage::url('Workout/WorkoutTypePhotos/LAB.webp'),
                'workout_category_id' => $strengthCategory->id
            ]
        );

        WorkoutType::firstOrCreate(
            [
                'slug'                => 'make-body'
            ],
            [
                'name'                => 'MAKE BODY',
                'description'         => 'Универсальная тренировка для укрепления всех основных групп мышц. Повышает общую силу, выносливость и способствует снижению веса. На усмотрение тренера, в процессе тренировки может быть задействован различный спортивный инвентарь.',
                'duration_minutes'    => 45,
                'intensivity_level'   => 3,
                'photo'               => Storage::url('Workout/WorkoutTypePhotos/Make-Body.webp'),
                'workout_category_id' => $strengthCategory->id
            ]
        );

        WorkoutType::firstOrCreate(
            [
                'slug'                => '30-min-fullbody'
            ],
            [
                'name'                => '30 min Fullbody',
                'description'         => 'Групповая тренировка с использованием зоны «30 min Fullbody». Зона Fullbody включает в себя 10 тренажеров на все группы мышц. Она подойдет как для новичков в фитнесе, так и для тех, кто хочет проработать все тело за одну тренировку.',
                'duration_minutes'    => 30,
                'intensivity_level'   => 2,
                'photo'               => Storage::url('Workout/WorkoutTypePhotos/30min-Fullbody.webp'),
                'workout_category_id' => $strengthCategory->id
            ]
        );

        WorkoutType::firstOrCreate(
            [
                'slug'                => 'strong-torso'
            ],
            [
                'name'                => 'STRONG TORSO',
                'description'         => 'Тренировка с акцентом на развитие и укрепление мышц верхней части тела: спины, груди, плеч, рук. Комплекс силовых и функциональных упражнений способствует формированию красивого рельефа плеч, рук, спины, улучшению осанки, увеличению силы и выносливости мышц верхней части тела.',
                'duration_minutes'    => 45,
                'intensivity_level'   => 2,
                'photo'               => Storage::url('Workout/WorkoutTypePhotos/Strong-Torso.webp'),
                'workout_category_id' => $strengthCategory->id
            ]
        );

        // Кардио тренировки
        $cardioCategory = WorkoutCategory::where('slug', 'cardio-training')->first();

        WorkoutType::firstOrCreate(
            [
                'slug'                => 'hiit'
            ],
            [
                'name'                => 'HIIT',
                'description'         => 'Высокоинтенсивная функциональная кардио-тренировка - отличный способ улучшить силовую выносливость и задействовать все основные группы мышц. Данный вид тренировки поднимет вас на новый фитнес уровень! На усмотрение тренера в процессе тренировки может быть задействован различный инвентарь и тренажеры.',
                'duration_minutes'    => 30,
                'intensivity_level'   => 3,
                'photo'               => Storage::url('Workout/WorkoutTypePhotos/HIIT.webp'),
                'workout_category_id' => $cardioCategory->id
            ]
        );

        WorkoutType::firstOrCreate(
            [
                'slug'                => 'bodycombat'
            ],
            [
                'name'                => 'BODYCOMBAT',
                'description'         => 'Кардио-тренировка, основанная на элементах боевых искусств, которая поможет вам развить силу, выносливость и координацию движений, а также улучшить общее физическое состояние. Программа включает в себя упражнения на различные группы мышц, позволяющие проработать все тело и получить навыки боевых техник.',
                'duration_minutes'    => 45,
                'intensivity_level'   => 3,
                'photo'               => Storage::url('Workout/WorkoutTypePhotos/BodyCombat.webp'),
                'workout_category_id' => $cardioCategory->id
            ]
        );

        WorkoutType::firstOrCreate(
            [
                'slug'                => 'trekking'
            ],
            [
                'name'                => 'Trekking',
                'description'         => 'Групповая фитнес-программа на беговых дорожках, которая включает чередование бега и ходьбы. Такой подход создает ощущение тренировки на пересечённой местности. Треккинг - это отличная кардиотренировка, которая улучшает выносливость и развивает координацию. Отлично подходит для тех, кто хочет похудеть и улучшить фигуру. Подходит для всех уровней подготовки.',
                'duration_minutes'    => 60,
                'intensivity_level'   => 3,
                'photo'               => Storage::url('Workout/WorkoutTypePhotos/Trekking.webp'),
                'workout_category_id' => $cardioCategory->id
            ]
        );

        // Йога и растяжка
        $yogaCategory = WorkoutCategory::where('slug', 'yoga-stretching')->first();

        WorkoutType::firstOrCreate(
            [
                'slug'                => 'yoga'
            ],
            [
                'name'                => 'YOGA',
                'description'         => 'Класс, состоящий из комплекса разнообразных упражнений и асан, направленных на улучшение гибкости и подвижности вашего тела, нормализацию работы внутренних органов, укрепление всех групп мышц, гармонизацию внутреннего состояния. Рекомендовано для всех уровней подготовленности. В зависимости от выбранной тренером программы в процессе занятий может использоваться следующий инвентарь находящийся в зале: коврики, блоки для йоги и ремни для йоги.',
                'duration_minutes'    => 90,
                'intensivity_level'   => 1,
                'photo'               => Storage::url('Workout/WorkoutTypePhotos/Yoga.webp'),
                'workout_category_id' => $yogaCategory->id
            ]
        );

        WorkoutType::firstOrCreate(
            [
                'slug'                => 'inside-flow-yoga'
            ],
            [
                'name'                => 'Inside Flow Yoga',
                'description'         => 'Это уникальный микс из самых мощных "антидепрессантов" современности, включая: йогу, хорошую музыку и танец. Флоу продумываются детально с учетом всех принципов построения тренировочной последовательности. Это полноценная функциональная тренировка. Асаны йоги глубоко и мощно работают с телом, музыка с настроением и эмоциональным фоном, хореография с умом и осознанностью. Залы групповых программ оборудованы всем необходимым для занятия инвентарем.',
                'duration_minutes'    => 90,
                'intensivity_level'   => 2,
                'photo'               => Storage::url('Workout/WorkoutTypePhotos/Inside-Flow-Yoga.webp'),
                'workout_category_id' => $yogaCategory->id
            ]
        );

        WorkoutType::firstOrCreate(
            [
                'slug'                => 'stretching'
            ],
            [
                'name'                => 'STRETCHING',
                'description'         => 'Программа для комплексного снятия напряжения и усталости мышц, улучшения гибкости и подвижности суставов. Лучший способ расслабиться! В зависимости от выбранной тренером программы тренировки в процессе занятий может использоваться следующий инвентарь: коврики, блоки для йоги и ремни для йоги.',
                'duration_minutes'    => 45,
                'intensivity_level'   => 1,
                'photo'               => Storage::url('Workout/WorkoutTypePhotos/Stretching.webp'),
                'workout_category_id' => $yogaCategory->id
            ]
        );

        // Функциональный тренинг
        $functionalCategory = WorkoutCategory::where('slug', 'functional-training')->first();

        WorkoutType::firstOrCreate(
            [
                'slug'                => 'bodystep'
            ],
            [
                'name'                => 'BODYSTEP',
                'description'         => 'Кардио-атлетическая тренировка, проводимая на специальной степ-платформе. В процессе занятий выполняются силовые упражнения, дополненные элементами степ-аэробики. Благодаря этому, на протяжении всей тренировки активно прорабатываются мышцы ног и ягодицы, а также отдельное внимание уделяется мышцам брюшного пресса. Для повышения эффективности тренировок могут использоваться специальные тренировочные диски.',
                'duration_minutes'    => 45,
                'intensivity_level'   => 3,
                'photo'               => Storage::url('Workout/WorkoutTypePhotos/BodyStep.webp'),
                'workout_category_id' => $functionalCategory->id
            ]
        );

        WorkoutType::firstOrCreate(
            [
                'slug'                => 'bodyattack'
            ],
            [
                'name'                => 'BODYATTACK',
                'description'         => 'Комплексная тренировочная программа включающая в себя беговые и прыжковые элементы, упражнения на силу и гибкость, а также элементы аэробики. Музыкальное сопровождение создает позитивную атмосферу и мотивацию для выполнения упражнений. Программа подходит как новичкам, только начинающим свой путь в спорте, так и опытным спортсменам, желающим разнообразить свои тренировки.',
                'duration_minutes'    => 50,
                'intensivity_level'   => 3,
                'photo'               => Storage::url('Workout/WorkoutTypePhotos/BodyAttack.webp'),
                'workout_category_id' => $functionalCategory->id
            ]
        );

        WorkoutType::firstOrCreate(
            [
                'slug'                => 'trx'
            ],
            [
                'name'                => 'TRX',
                'description'         => 'Функциональная тренировка, которая развивает физическую силу, координацию и гибкость. Занятия с использованием петель TRX улучшают тонус и рельеф мышц, повышают подвижность суставов и укрепляют связки. Один из самых органичных типов тренировок, позволяющий сочетать статичную нагрузку и динамичные упражнения.',
                'duration_minutes'    => 55,
                'intensivity_level'   => 2,
                'photo'               => Storage::url('Workout/WorkoutTypePhotos/TRX.webp'),
                'workout_category_id' => $functionalCategory->id
            ]
        );

        WorkoutType::firstOrCreate(
            [
                'slug'                => 'athletic'
            ],
            [
                'name'                => 'ATHLETIC',
                'description'         => 'Высокоэффективная интервальная тренировка помогает одновременно повышать показатели силы, гибкости, выносливости и скорости, а также прорабатывать все группы мышц и избавляться от лишних килограммов в кратчайшие сроки! Тренеры программы - высококвалифицированные специалисты с опытом работы в области функциональных тренировок: crossfit, bootcamp, teambeats, skillathletics. На их усмотрение в процессе тренировки может быть задействован различный инвентарь и тренажеры. Подходит всем: от подготовленных спортсменов до тех, у кого нет значительного опыта тренировок.',
                'duration_minutes'    => 55,
                'intensivity_level'   => 3,
                'photo'               => Storage::url('Workout/WorkoutTypePhotos/Athletic.webp'),
                'workout_category_id' => $functionalCategory->id
            ]
        );

        // Танцевальные направления
        $danceCategory = WorkoutCategory::where('slug', 'dance-classes')->first();

        WorkoutType::firstOrCreate(
            [
                'slug'                => 'zumba'
            ],
            [
                'name'                => 'Zumba',
                'description'         => 'Танцевальная фитнес-программа, популярная во всем мире и основанная на латиноамериканских и других ритмах. Зумба является одним из видов высокоинтенсивных тренировок. Она повышает пульс до аэробной зоны и увеличивает расход калорий. Подходит для людей любого уровня подготовленности.',
                'duration_minutes'    => 55,
                'intensivity_level'   => 2,
                'photo'               => Storage::url('Workout/WorkoutTypePhotos/Zumba.webp'),
                'workout_category_id' => $danceCategory->id
            ]
        );

        WorkoutType::firstOrCreate(
            [
                'slug'                => 'lady-style'
            ],
            [
                'name'                => 'Lady Style',
                'description'         => 'Стиль танца, который включает в себя самые пластичные, утонченные и женственные движения из различных танцевальных направлений. Уроки Lady Style помогают женщинам проявить свою индивидуальность и почувствовать себя привлекательными, изящными и загадочными. Танцевальный урок обеспечивает значительную физическую нагрузку, которая активирует все группы мышц. Подходит для женщин любого возраста.',
                'duration_minutes'    => 45,
                'intensivity_level'   => 2,
                'photo'               => Storage::url('Workout/WorkoutTypePhotos/LadyStyle.webp'),
                'workout_category_id' => $danceCategory->id
            ]
        );

        WorkoutType::firstOrCreate(
            [
                'slug'                => 'bodyjam'
            ],
            [
                'name'                => 'BODYJAM',
                'description'         => 'Интенсивная танцевальная тренировка, включающая в себя самые модные танцевальные стили и свежие музыкальные хиты. Эта программа улучшает кардио-выносливость, координацию движений и общее физическое состояние, а также развивает силу и выносливость основных групп мышц. Зажигательная музыка и хорошее настроение гарантированы!',
                'duration_minutes'    => 45,
                'intensivity_level'   => 2,
                'photo'               => Storage::url('Workout/WorkoutTypePhotos/BodyJam.webp'),
                'workout_category_id' => $danceCategory->id
            ]
        );

        // Mind & Body (Боевые искусства и восстановление)
        $mindBodyCategory = WorkoutCategory::where('slug', 'mind-body')->first();

        WorkoutType::firstOrCreate(
            [
                'slug'                => 'antigravity'
            ],
            [
                'name'                => 'ANTIGRAVITY',
                'description'         => 'Фитнес-программа, которая объединяет в себе практики йоги, пилатес, упражнения ballet barre и элементы акробатической гимнастики. В отличие от классических направлений она использует подвесное оборудование (шёлковые гамаки), поэтому её часто называют йогой или фитнесом в гамаке. Использование таких приспособлений позволяет выполнять различные асаны, недоступные в обычной йоге, а также облегчать или, наоборот, усложнять обычные асаны.',
                'duration_minutes'    => 55,
                'intensivity_level'   => 2,
                'photo'               => Storage::url('Workout/WorkoutTypePhotos/AntiGravity.webp'),
                'workout_category_id' => $mindBodyCategory->id
            ]
        );

        WorkoutType::firstOrCreate(
            [
                'slug'                => 'mfr'
            ],
            [
                'name'                => 'МФР',
                'description'         => 'Миофасциальный релиз - это особый метод мануальной терапии, при котором воздействие осуществляется одновременно на мышцы и соединительную ткань при помощи специального ролла или мяча. Расслабление миофасциальной структуры достигается за счет того, что одни мышцы сдавливаются, а другие – растягиваются.',
                'duration_minutes'    => 55,
                'intensivity_level'   => 1,
                'photo'               => Storage::url('Workout/WorkoutTypePhotos/MFR.webp'),
                'workout_category_id' => $mindBodyCategory->id
            ]
        );

        WorkoutType::firstOrCreate(
            [
                'slug'                => 'spinefitter'
            ],
            [
                'name'                => 'SpineFitter',
                'description'         => 'Тренировка, направленная на расслабление и снятие напряжения мышц, улучшение подвижности позвоночника и суставов, укрепление глубоких мышц для лучшей поддержки вашего тела. Проходит с использованием специального оборудования SPINEFITTER.',
                'duration_minutes'    => 55,
                'intensivity_level'   => 1,
                'photo'               => Storage::url('Workout/WorkoutTypePhotos/SpineFitter.webp'),
                'workout_category_id' => $mindBodyCategory->id
            ]
        );

        WorkoutType::firstOrCreate(
            [
                'slug'                => 'irk-balance'
            ],
            [
                'name'                => 'IRK Balance',
                'description'         => 'Тренировочная программа, основанная на элементами йоги, пилатеса и стретчинга. Данный класс поможет вам укрепить мышечный корсет, развить гибкость, увеличить мобильность тела, снять излишнее напряжение, а также достигнуть внутренней гармонии. Эта программа подходит для любого уровня физической подготовки и прекрасно дополнит ваш тренировочный план.',
                'duration_minutes'    => 45,
                'intensivity_level'   => 1,
                'photo'               => Storage::url('Workout/WorkoutTypePhotos/IRK-Balance.webp'),
                'workout_category_id' => $mindBodyCategory->id
            ]
        );

        // Водные программы
        $aquaCategory = WorkoutCategory::where('slug', 'aqua-programs')->first();

        WorkoutType::firstOrCreate(
            [
                'slug'                => 'aqua-circuit'
            ],
            [
                'name'                => 'AQUA CIRCUIT',
                'description'         => 'Круговая групповая тренировка — это уникальная программа, где в основной части чередуются аэробные и силовые упражнения! Используя специальное оборудование, вы сможете эффективно прокачать все группы мышц, улучшая физическую форму и выносливость. Присоединяйтесь к занятиям и преобразите свое тело с каждым подходом!',
                'duration_minutes'    => 55,
                'intensivity_level'   => 1,
                'photo'               => Storage::url('Workout/WorkoutTypePhotos/AquaCircuit.jpg'),
                'workout_category_id' => $aquaCategory->id
            ]
        );

        WorkoutType::firstOrCreate(
            [
                'slug'                => 'aqua-jogger'
            ],
            [
                'name'                => 'AQUA JOGGER',
                'description'         => 'Групповая программа со специальным оборудованием — это ваш шанс привести в тонус мышцы ног и ягодиц! Занятие эффективно развивает силовую выносливость, помогая достичь желаемых результатов. Присоединяйтесь и почувствуйте, как ваше тело становится сильнее и стройнее!',
                'duration_minutes'    => 45,
                'intensivity_level'   => 2,
                'photo'               => Storage::url('Workout/WorkoutTypePhotos/AquaJogger.webp'),
                'workout_category_id' => $aquaCategory->id
            ]
        );

        WorkoutType::firstOrCreate(
            [
                'slug'                => 'aqua-beginners'
            ],
            [
                'name'                => 'AQUA BEGINNERS',
                'description'         => 'Освоение водной среды: Учитесь основным движениям, соединённым в простые хореографические комбинации. Нагрузка низкой интенсивности подходит для любого уровня подготовленности. Идеально для новичков и тех, кто хочет улучшить технику выполнения базовых упражнений!',
                'duration_minutes'    => 50,
                'intensivity_level'   => 1,
                'photo'               => Storage::url('Workout/WorkoutTypePhotos/AquaBeginners.jpg'),
                'workout_category_id' => $aquaCategory->id
            ]
        );
    }
}
