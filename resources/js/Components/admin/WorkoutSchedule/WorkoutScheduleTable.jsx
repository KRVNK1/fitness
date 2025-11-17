import useFormatDate from "@/hooks/global/useFormatDate"
import { router } from "@inertiajs/react"

export default function WorkoutScheduleTable({ workoutSchedules, onEdit }) {

    const handleDelete = (id) => {
        if (window.confirm("Вы уверены, что хотите удалить эту тренировку в расписании?")) {
            router.delete(route("admin.workout-schedules.destroy", id))
        }
    }

    const formatDate = useFormatDate();

    const getStatusBadge = (status) => {
        const statuses = {
            scheduled: "В расписании",
            completed: "Завершена",
            cancelled: "Отменена",
        }
        const statusData = statuses[status]
        return (
            <span className={'text-sm font-medium'}>
                {statusData}
            </span>
        )
    }

    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full">
                <thead className="bg-gray-50 border-b">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">ID</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Тренировка</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Тренер</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Свободно мест</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Занято мест</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Статус</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Дата начала тренировки</th>
                        <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Действия</th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {workoutSchedules.data && workoutSchedules.data.length > 0 ? (
                        workoutSchedules.data.map((schedule) => (
                            <tr key={schedule.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 text-sm text-gray-900">#{schedule.id}</td>
                                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{schedule.workout_type.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{`${schedule.trainer.first_name} ${schedule.trainer.last_name}`}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{schedule.available_slots}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{schedule.booked_slots}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{getStatusBadge(schedule.status)}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{formatDate(schedule.start_time)}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => onEdit(schedule)}
                                            className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition"
                                        >
                                            Редактировать
                                        </button>
                                        <button
                                            onClick={() => handleDelete(schedule.id)}
                                            className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition"
                                        >
                                            Удалить
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                                Категории не найдены
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
