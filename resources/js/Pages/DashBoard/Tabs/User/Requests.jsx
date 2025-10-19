export default function Requests({ requests }) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("ru-RU", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
        })
    }

    console.log(requests)

    const getStatusBadge = (status) => {
        const badges = {
            pending: { text: "В ожидании", class: "bg-yellow-100 text-yellow-800" },
            approved: { text: "Принята", class: "bg-green-100 text-green-800" },
            rejected: { text: "Отклонена", class: "bg-red-100 text-red-800" },
        }

        const badge = badges[status]
        return <span className={`px-3 py-1 text-sm rounded-full ${badge.class}`}>{badge.text}</span>
    }

    return (
        <>
            {requests.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                    <p className="text-gray-500">У вас пока нет заявок</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {requests.map((request) => (
                        <div key={request.id} className="bg-white rounded-lg border shadow-sm p-6">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-lg font-semibold text-gray-900">Тренер: {request.trainer.first_name} {request.trainer.last_name}</h3>
                                        {getStatusBadge(request.status)}
                                    </div>

                                    <div className="space-y-2 text-sm text-gray-600">
                                        <p>
                                            <span className="font-medium">Предпочитаемая дата:</span> {formatDate(request.requested_date)}
                                        </p>
                                        {request.comment && (
                                            <p>
                                                <span className="font-medium">Ваш комментарий:</span> {request.comment}
                                            </p>
                                        )}
                                        <p className="text-xs text-gray-400">Создана: {formatDate(request.created_at)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}
