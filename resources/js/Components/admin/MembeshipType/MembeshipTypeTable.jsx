import { router } from "@inertiajs/react"

export default function MembershipTypeTable({ membershipTypes, onEdit }) {
    const handleDelete = (id) => {
        if (window.confirm("Вы уверены, что хотите удалить этот тип абонемента?")) {
            router.delete(route("admin.membership-types.destroy", id))
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
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Описание</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Цена</th>
                        <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Действия</th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {membershipTypes.data && membershipTypes.data.length > 0 ? (
                        membershipTypes.data.map((type) => (
                            <tr key={type.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 text-sm text-gray-900">#{type.id}</td>
                                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{type.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{type.slug}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {type.description ? type.description.substring(0, 50) + "..." : "-"}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{type.price}</td>
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
                                Типы абонементов не найдены
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
