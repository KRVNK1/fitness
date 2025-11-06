import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/profile/Card"
import { Button } from "@/Components/ui/Button"
import { useState } from "react"
import useFormatDate from "@/hooks/global/useFormatDate"
import useStatusBadge from "@/hooks/global/useStatusBadge"
import { router } from "@inertiajs/react"

export default function Requests({ requests, setSelectedRequest, setModalAction, setShowModal }) {
    const [processing, setProcessing] = useState()

    const handleApprove = (id) => {
        if (confirm("Вы уверены, что хотите принять эту заявку?")) {
            router.post(
                `/requests/${id}/approve`,
                {},
                {
                    onFinish: () => setProcessing(false),
                },
            )
        }
    }

    const handleCancelOrReject = (request) => {
        setSelectedRequest(request)
        if (request.status === "pending") {
            setModalAction("reject")
        } else {
            setModalAction("cancel")
        }
        setShowModal(true)
    }


    const formatDate = useFormatDate()
    const getStatusBadge = useStatusBadge()

    return (
        <div className="min-h-[50vh]">
            <Card className="bg-white">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">Заявки на индивидуальные тренировки</CardTitle>
                    <p className="text-sm text-gray-500 mt-2">
                        Управляйте заявками от пользователей на индивидуальные тренировки
                    </p>
                </CardHeader>
                <CardContent>
                    {requests.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                            <p className="text-gray-500">У вас пока нет заявок</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {requests.map((request) => (
                                <div key={request.id} className="bg-white rounded-lg border shadow-sm p-6">
                                    <div className="flex items-start lg:justify-between flex-col sm:flex-row gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    {request.user.first_name} {request.user.last_name}
                                                </h3>
                                                {getStatusBadge(request.status)}
                                            </div>

                                            <div className="space-y-2 text-sm text-gray-600">
                                                <p>
                                                    <span className="font-medium">Предпочитаемая дата: </span>
                                                    {formatDate(request.requested_date)}
                                                </p>
                                                {request.comment && (
                                                    <p>
                                                        <span className="font-medium">Комментарий:</span> {request.comment}
                                                    </p>
                                                )}
                                                <p className="text-xs text-gray-400">Создана: {formatDate(request.created_at)}</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2 min-w-[140px]">
                                            {request.status === "pending" && (
                                                <>
                                                    <Button
                                                        onClick={() => handleApprove(request.id)}
                                                        className="bg-green-500 hover:bg-green-600 text-white"
                                                    >
                                                        Принять
                                                    </Button>
                                                    <Button
                                                        onClick={() => handleCancelOrReject(request)}
                                                        className=" bg-red-500 hover:bg-red-600"
                                                    >
                                                        Отклонить
                                                    </Button>
                                                </>
                                            )}

                                            {request.status === "approved" && (
                                                <Button
                                                    className="bg-red-500 hover:bg-red-600"
                                                    onClick={() => handleCancelOrReject(request)}
                                                >
                                                    Отменить тренировку
                                                </Button>
                                            )}

                                            {(request.status === "rejected" || request.status === "canceled") && (
                                                <span className="text-sm text-gray-500 text-center py-2">
                                                    {request.status === "rejected" ? "Отклонена" : "Отменена"}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
