<?php

namespace App\Exports;

use App\Models\User;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class UsersExport implements FromCollection, WithHeadings, WithMapping, WithStyles, ShouldAutoSize
{
    /**
     * Поля, которые выгружаем
     */
    protected array $columns = [
        'id',
        'first_name',
        'last_name',
        'email',
        'phone',
        'role',
        'created_at',
        'updated_at',
    ];

    /**
     * Данные
     */
    public function collection(): Collection
    {
        return User::select($this->columns)->get();
    }

    /**
     * Заголовки
     */
    public function headings(): array
    {
        return [
            'ID',
            'Имя',
            'Фамилия',
            'Email',
            'Номер телефона',
            'Роль',
            'Создан',
            'Обновлён',
        ];
    }

    /**
     * Преобразование строк перед экспортом
     */
    public function map($user): array
    {
        return [
            $user->id,
            $user->first_name,
            $user->last_name,
            $user->email,
            $user->phone,
            $user->role,
            $user->created_at->format('d.m.Y H:i'),
            $user->updated_at->format('d.m.Y H:i'),
        ];
    }

    /**
     * Стилизация листа (заголовки жирные, выравнивание, отступы)
     */
    public function styles(Worksheet $sheet)
    {
        $sheet->getStyle('A1:H1')->getFont()->setBold(true);
    }
}
