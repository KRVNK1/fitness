import useFormatDate from "@/hooks/global/useFormatDate"
import { router } from "@inertiajs/react"

export default function BookingTable({ bookings }) {
    const handleDelete = (bookingId) => {
        if (window.confirm("Вы уверены, что хотите удалить это бронирование?")) {
            router.delete(`/admin/bookings/${bookingId}`)
        }
    }

    const getStatusBadge = (status) => {
        const statusMap = {
            booked: "Забронировано",
            attended: "Посетил",
            missed: "Пропустил",
        }
        const statusData = statusMap[status]
        return (
            <span className={`text-xs font-semibold rounded-full`}>
                {statusData}
            </span>
        )
    }

    const formatDate = useFormatDate();

    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full">
                <thead className="bg-gray-50 border-b">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">ID</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Пользователь</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Тренировка</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Тренер</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Абонемент</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Статус</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Дата создания</th>
                        <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Действия</th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {bookings.data && bookings.data.length > 0 ? (
                        bookings.data.map((booking) => (
                            <tr key={booking.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 text-sm text-gray-900">#{booking.id}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    {booking.user?.first_name} {booking.user?.last_name}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {console.log(booking)}
                                    {booking?.workout_schedule?.workout_type?.name || 'N/A'}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {booking.workout_schedule?.trainer?.first_name} {booking.workout_schedule?.trainer?.last_name}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {booking.membership?.id ? `#${booking.membership.id}` : 'N/A'}
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    {getStatusBadge(booking.status)}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {formatDate(booking.created_at)}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => handleDelete(booking.id)}
                                        className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition"
                                    >
                                        Удалить
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                                Бронирования не найдены
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
