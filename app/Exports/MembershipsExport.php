<?php

namespace App\Exports;

use App\Models\Membership;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class MembershipsExport implements FromCollection, WithHeadings, WithMapping, WithStyles, ShouldAutoSize
{
    /**
     * Поля, которые выгружаем
     */
    protected array $columns = [
        'id',
        'user_id',
        'membership_type_id',
        'remaining_days',
        'start_date',
        'end_date',
        'status',
        'created_at',
        'updated_at',
    ];

    protected $filters;

    public function __construct($filters)
    {
        $this->filters = $filters;
    }

    /**
     * Данные
     */
    public function collection(): Collection
    {
        $query = Membership::with(['user', 'membershipType'])
            ->select($this->columns);

        if (!empty($this->filters['search'])) {
            $search = $this->filters['search'];
            $query->whereHas('user', function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if (!empty($this->filters['status'])) {
            $query->where('status', $this->filters['status']);
        }

        if (!empty($this->filters['membership_type_id'])) {
            $query->where('membership_type_id', $this->filters['membership_type_id']);
        }

        return $query->orderBy('id')->get();
    }

    /**
     * Заголовки
     */
    public function headings(): array
    {
        return [
            'ID',
            'Пользователь',
            'Тип абонемента',
            'Осталось дней',
            'Дата начала',
            'Дата окончания',
            'Статус',
            'Создан',
            'Обновлён',
        ];
    }

    /**
     * Преобразование строк перед экспортом
     */
    public function map($membership): array
    {
        return [
            $membership->id,
            $membership->user->first_name . ' ' . $membership->user->last_name,
            $membership->membershipType->name,
            $membership->remaining_days,
            $membership->start_date->format('d.m.Y'),
            $membership->end_date->format('d.m.Y'),
            $this->getStatusText($membership->status),
            $membership->created_at->format('d.m.Y H:i'),
            $membership->updated_at->format('d.m.Y H:i'),
        ];
    }

    /**
     * Стилизация листа (заголовки жирные, выравнивание, отступы)
     */
    public function styles(Worksheet $sheet)
    {
        $sheet->getStyle('A1:I1')->getFont()->setBold(true);
    }

    /**
     * Получение статуса
     */
    private function getStatusText($status)
    {
        return match ($status) {
            'active' => 'Активный',
            'expired' => 'Истекший',
            'canceled' => 'Отмененный',
        };
    }
}
