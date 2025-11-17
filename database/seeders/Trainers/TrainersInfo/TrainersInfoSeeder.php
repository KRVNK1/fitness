<?php

namespace Database\Seeders\Trainers\TrainersInfo;

use App\Models\TrainerInfo;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class TrainersInfoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $trainer1 = User::where('email', 'ivanov@bk.ru')->first();
        $trainer2 = User::where('email', 'petrova@bk.ru')->first();
        $trainer3 = User::where('email', 'kuznetsov@bk.ru')->first();
        $trainer4 = User::where('email', 'sidorov.sergey@bk.ru')->first();
        $trainer5 = User::where('email', 'dmitriev.fitness@bk.ru')->first();
        $trainer6 = User::where('email', 'volkov.coach@bk.ru')->first();
        $trainer7 = User::where('email', 'smirnova.olga@bk.ru')->first();
        $trainer8 = User::where('email', 'kuznetsova.ekaterina@bk.ru')->first();
        $trainer9 = User::where('email', 'fedorova.trainer@bk.ru')->first();

        /**
         * Иванов Иван
         */
        TrainerInfo::firstOrCreate(
            [
                'user_id'          => $trainer1->id,
            ],
            [
                'description'      => 'Универсальный тренер с фокусом на комплексном развитии тела. Помогает клиентам построить сильное и рельефное тело через силовые тренировки, развить выносливость с помощью кардио и улучшить общую функциональность. Интегрирует практики Mind & Body для снятия стресса и повышения ментальной концентрации во время тренировок.',
                'experience_years' => 5,
                'photo'            => 'Workout/Trainers/Ivanov.png'
            ]
        );

        /**
         * Петрова Анна
         */
        TrainerInfo::firstOrCreate(
            [
                'user_id'          => $trainer2->id,
            ],
            [
                'description'      => 'Специалист по гармоничному развитию тела и духа. Создает программы, сочетающие в себе грацию танцевальных движений, силу и гибкость из йоги, а также уникальные возможности водных программ. Ее тренировки направлены на развитие пластики, снятие напряжения и общее оздоровление организма.',
                'experience_years' => 10,
                'photo'            => 'Workout/Trainers/Petrova.png'
            ]
        );

        /**
         * Кузнецов Александр
         */
        TrainerInfo::firstOrCreate(
            [
                'user_id'          => $trainer3->id,
            ],
            [
                'description'      => 'Эксперт в области высокоинтенсивных и силовых тренировок. Его цель — помочь вам достичь пиковой физической формы. Специализируется на построении программ, которые значительно повышают выносливость, взрывную силу и функциональные возможности тела для повседневных задач и спортивных достижений.',
                'experience_years' => 15,
                'photo'            => 'Workout/Trainers/Kuznetsov.png'
            ]
        );

        /**
         * Сидоров Сергей
         */
        TrainerInfo::firstOrCreate(
            [
                'user_id'          => $trainer4->id,
            ],
            [
                'description'      => 'Тренер, который превращает тренировку в искусство движения. Объединяет динамику танцев, глубокую растяжку и осознанность йоги, а также функциональные упражнения. Его занятия — это заряд энергии, улучшение координации, гибкости и отличный способ выразить себя через движение.',
                'experience_years' => 7,
                'photo'            => 'Workout/Trainers/Sidorov.png'
            ]
        );

        /**
         * Дмитриев Дмитрий
         */
        TrainerInfo::firstOrCreate(
            [
                'user_id'          => $trainer5->id,
            ],
            [
                'description'      => 'Мастер функционального и реабилитационного тренинга. Делает акцент на качестве движений, укреплении мышечного корсета и развитии выносливости. Использует разнообразные форматы, включая аква-аэробику, чтобы сделать тренировки безопасными для суставов и эффективными для людей с разным уровнем подготовки.',
                'experience_years' => 12,
                'photo'            => 'Workout/Trainers/Dmitriev.png'
            ]
        );

        /**
         * Волков Алексей
         */
        TrainerInfo::firstOrCreate(
            [
                'user_id'          => $trainer6->id,
            ],
            [
                'description'      => 'Приверженец комплексного подхода к фитнесу. Убежден, что настоящее преображение начинается с баланса между силой, выносливостью и гибкостью. Сочетает мощные силовые и кардио-нагрузки с глубокой работой над мобильностью суставов.',
                'experience_years' => 8,
                'photo'            => 'Workout/Trainers/Volkov.png'
            ]
        );

        /**
         * Смирнова Ольга
         */
        TrainerInfo::firstOrCreate(
            [
                'user_id'          => $trainer7->id,
            ],
            [
                'description'      => 'Эксперт по мягким, но эффективным практикам для тела и разума. Специализируется на йоге и аква-программах, которые идеально подходят для восстановления, снижения веса и улучшения гибкости. Ее тренировки помогают обрести внутреннее спокойствие, укрепить глубокие мышцы и улучшить осанку.',
                'experience_years' => 6,
                'photo'            => 'Workout/Trainers/Smirnova.png'
            ]
        );

        /**
         * Кузнецова Екатерина
         */
        TrainerInfo::firstOrCreate(
            [
                'user_id'          => $trainer8->id,
            ],
            [
                'description'      => 'Тренер-универсал с огромным опытом работы во всех направлениях фитнеса. Обладает уникальной способностью подобрать ключ к любому клиенту, независимо от его целей и уровня подготовки. От создания спортивного тела до освоения сложных танцевальных связок — Екатерина поможет вам достичь желаемого результата с максимальной эффективностью.',
                'experience_years' => 9,
                'photo'            => 'Workout/Trainers/Kuznetsova.png'
            ]
        );

        /**
         * Федорова Мария
         */
        TrainerInfo::firstOrCreate(
            [
                'user_id'          => $trainer9->id,
            ],
            [
                'description'      => 'Ведущий мастер-тренер с огромным опытом работы во всех фитнес-направлениях. Имеет глубокое понимание биомеханики и физиологии, что позволяет ей создавать по-настоящему персонализированные и безопасные программы. Мария вдохновляет на изменения, помогая клиентам не только преобразить тело, но и полюбить процесс тренировок, находя направление по душе.',
                'experience_years' => 11,
                'photo'            => 'Workout/Trainers/Fedorova.png'
            ]
        );
    }
}
