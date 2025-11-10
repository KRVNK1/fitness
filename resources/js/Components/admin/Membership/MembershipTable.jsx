import { router } from "@inertiajs/react"

export default function MembershipTable({ memberships, onEdit }) {
    const handleDelete = (membershipId) => {
        if (window.confirm("Вы уверены, что хотите удалить этот абонемент?")) {
            router.delete(`/admin/memberships/${membershipId}`)
        }
    }

    const getStatusBadge = (status) => {
        const statuses = {
            active: { text: "text-green-800", label: "Активный" },
            expired: { text: "text-red-800", label: "Истекший" },
            canceled: { text: "text-gray-800", label: "Отмененный" },
        }
        const statusData = statuses[status] || statuses.active
        return (
            <span className={`${statusData.bg} ${statusData.text} px-3 py-1 rounded-full text-sm font-medium`}>
                {statusData.label}
            </span>
        )
    }

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("ru-RU", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        })
    }

    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full">
                <thead className="bg-gray-50 border-b">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">ID</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Пользователь</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Тип абонемента</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Дата начала</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Дата окончания</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Оставшиеся дни</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Статус</th>
                        <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Действия</th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {memberships.data && memberships.data.length > 0 ? (
                        memberships.data.map((membership) => (
                            <tr key={membership.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 text-sm text-gray-900">#{membership.id}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    {membership.user ? (
                                        <div>
                                            <div className="font-medium">
                                                #{membership.user.id} {membership.user.first_name} {membership.user.last_name}
                                            </div>
                                            <div className="text-gray-500 text-xs">{membership.user.email}</div>
                                        </div>
                                    ) : (
                                        <span className="text-gray-400">Пользователь не найден</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    {membership.membership_type ? membership.membership_type.name : "—"}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">{formatDate(membership.start_date)}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{formatDate(membership.end_date)}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    <span className="font-semibold">{membership.remaining_days}</span> дн.
                                </td>
                                <td className="px-6 py-4 text-sm">{getStatusBadge(membership.status)}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => onEdit(membership)}
                                            className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition"
                                        >
                                            Редактировать
                                        </button>
                                        <button
                                            onClick={() => handleDelete(membership.id)}
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
                            <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                                Абонементы не найдены
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
