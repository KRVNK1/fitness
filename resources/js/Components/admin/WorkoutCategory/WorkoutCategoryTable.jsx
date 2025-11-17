import { router } from "@inertiajs/react"

export default function WorkoutCategoryTable({ categories, onEdit }) {

    const handleDelete = (id) => {
        if (window.confirm("Вы уверены, что хотите удалить эту категорию?")) {
            router.delete(route("admin.workout-categories.destroy", id))
        }
    }

    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full">
                <thead className="bg-gray-50 border-b">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">ID</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Название</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Слаг</th>
                        <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Действия</th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {categories.data && categories.data.length > 0 ? (
                        categories.data.map((category) => (
                            <tr key={category.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 text-sm text-gray-900">#{category.id}</td>
                                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{category.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{category.slug}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => onEdit(category)}
                                            className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition"
                                        >
                                            Редактировать
                                        </button>
                                        <button
                                            onClick={() => handleDelete(category.id)}
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
                            <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                                Категории не найдены
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
