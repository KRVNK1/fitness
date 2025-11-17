import { router } from "@inertiajs/react"

export default function UserTable({ users, onEdit }) {

    const handleDelete = (userId) => {
        if (window.confirm("Вы уверены, что хотите удалить этого пользователя?")) {
            router.delete(route("admin.users.destroy", userId))
        }
    }

    const getRole = (role) => {
        const roles = {
            client: "Пользователь",
            trainer: "Тренер",
            admin: "Администратор",
        }
        const roleData = roles[role]
        return (
            <span className={'text-sm font-medium'}>
                {roleData}
            </span>
        )
    }

    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full">
                <thead className="bg-gray-50 border-b">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">ID</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Имя</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Фамилия</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Телефон</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Роль</th>
                        <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Действия</th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {users.data && users.data.length > 0 ? (
                        users.data.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 text-sm text-gray-900">#{user.id}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{user.first_name}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{user.last_name}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{user.phone}</td>
                                <td className="px-6 py-4 text-sm">{getRole(user.role)}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => onEdit(user)}
                                            className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition"
                                        >
                                            Редактировать
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user.id)}
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
                            <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                                Пользователи не найдены
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
