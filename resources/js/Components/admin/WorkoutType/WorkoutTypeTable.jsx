import { router } from "@inertiajs/react"

export default function WorkoutTypeTable({ workoutTypes, onEdit }) {
    const handleDelete = (id) => {
        if (window.confirm("Вы уверены, что хотите удалить эту тренировку?")) {
            router.delete(route("admin.workout-types.destroy", id))
        }
    }

    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full">
                <thead className="bg-gray-50 border-b">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">ID</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Название</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Категория</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Длительность</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Интенсивность</th>
                        <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Действия</th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {workoutTypes.data && workoutTypes.data.length > 0 ? (
                        workoutTypes.data.map((type) => (
                            <tr key={type.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 text-sm text-gray-900">#{type.id}</td>
                                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{type.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{type.workout_category?.name || "-"}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{type.duration_minutes} мин</td>
                                <td className="px-6 py-4 text-sm">
                                    <span className={`text-xs font-bold ${type.intensivity_level === 1 ? "text-green-500" : type.intensivity_level === 2 ? "text-yellow-500" : "text-red-500"}`}>
                                        {type.intensivity_level === 1 ? "Низкая" : type.intensivity_level === 2 ? "Средняя" : "Высокая"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => onEdit(type)}
                                            className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition"
                                        >
                                            Редактировать
                                        </button>
                                        <button
                                            onClick={() => handleDelete(type.id)}
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
                                Типы тренировок не найдены
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
