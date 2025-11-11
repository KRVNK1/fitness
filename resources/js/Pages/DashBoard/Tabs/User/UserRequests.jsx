import { Button } from "@/Components/ui/Button"
import { useState } from "react"
import RejectModal from "../../Modals/RejectModal"
import useStatusBadge from "@/hooks/global/useStatusBadge"
import useFormatDate from "@/hooks/global/useFormatDate"

export default function UserRequests({ requests }) {
    const [showModal, setShowModal] = useState(false)

    const formatDate = useFormatDate()
    const getStatusBadge = useStatusBadge();

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
                            <div className="flex flex-col gap-2 lg:flex-row items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-4 mb-2">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            Тренер: {request.trainer.first_name} {request.trainer.last_name}
                                        </h3>
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
                                        {request.trainer_comment && (
                                            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
                                                <p className="font-medium text-red-900 mb-1">Комментарий тренера:</p>
                                                <p className="text-red-800">{request.trainer_comment}</p>
                                            </div>
                                        )}
                                        <p className="text-xs text-gray-400">Создана: {formatDate(request.created_at)}</p>
                                    </div>

                                </div>
                                {!request.trainer_comment && (
                                    <div className="flex justify-end flex-col gap-2 lg:gap-4">
                                        <span>Состояние заявки - {getStatusBadge(request.status)}</span>
                                        <Button onClick={() => setShowModal(true)} className="bg-purple-600 hover:bg-purple-700">
                                            Отменить заявку
                                        </Button>
                                    </div>
                                )}
                            </div>
                            <RejectModal request={request} show={showModal} onClose={() => setShowModal(false)} />
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}
