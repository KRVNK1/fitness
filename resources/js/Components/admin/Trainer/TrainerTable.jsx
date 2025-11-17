export default function TrainerTable({ trainers }) {

    const redirectToSpecializations = (id) => {
        window.location.href = `/admin/trainer-specializations/${id}`
    }

    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full">
                <thead className="bg-gray-50 border-b">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">ID</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Имя</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Фото</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Опыт (лет)</th>
                        <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Действия</th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {trainers.data && trainers.data.length > 0 ? (
                        trainers.data.map((trainer) => (
                            <tr key={trainer.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 text-sm text-gray-900">#{trainer?.id}</td>
                                <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                                    {trainer?.user.first_name} {trainer?.user.last_name}
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    {trainer?.photo ? (
                                        <img
                                            src={`/storage/${trainer.photo}`}
                                            alt="Фото тренера"
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-gray-400">Нет фото</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">{trainer?.experience_years}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => redirectToSpecializations(trainer.id)}
                                            className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition"
                                        >
                                            Перейти к специализации
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                Тренеры не найдены
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
