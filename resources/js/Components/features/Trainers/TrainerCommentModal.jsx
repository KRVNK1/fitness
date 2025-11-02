"use client"

import { useState } from "react"
import { Button } from "@/Components/ui/Button"
import Modal from "@/Components/ui/Modal"
import { router } from "@inertiajs/react"
import useFormatDate from "@/hooks/global/useFormatDate"

export default function TrainerCommentModal({ show, onClose, request, action }) {
    const [trainerComment, setTrainerComment] = useState("")
    const [processing, setProcessing] = useState(false)

    const formatDate = useFormatDate();

    const texts = {
        reject: {
            title: "Отклонить заявку",
            description: "Укажите причину отклонения заявки. Пользователь увидит ваш комментарий.",
            buttonText: "Отклонить",
        },
        cancel: {
            title: "Отменить тренировку",
            description: "Укажите причину отмены тренировки. Пользователь увидит ваш комментарий.",
            buttonText: "Отменить тренировку",
        },
    }

    const text = texts[action === "reject" ? "reject" : "cancel"]

    const handleSubmit = (e) => {
        e.preventDefault()

        const routePath = action === "reject" ? `/requests/${request.id}/reject` : `/requests/${request.id}/cancel-approved`

        router.post(routePath, { trainer_comment: trainerComment }, {
            onFinish: () => {
                setProcessing(false)
                onClose()
            },
        })
    }

    return (
        <Modal show={show} onClose={onClose} title={text.title}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <p className="text-sm text-gray-600 mb-4">{text.description}</p>

                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <p className="text-sm">
                            <span className="font-medium">Пользователь:</span> {request.user.first_name} {request.user.last_name}
                        </p>
                        <p className="text-sm">
                            <span className="font-medium">Дата:</span>
                            {formatDate(request.requested_date)}
                        </p>
                    </div>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Комментарий
                    </label>
                    <textarea
                        value={trainerComment}
                        onChange={(e) => setTrainerComment(e.target.value)}
                        rows={5}
                        placeholder="Например: Я заболел(а) и не смогу провести тренировку."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                    />
                </div>

                <div className="flex gap-3 pt-4">
                    <button
                        onClick={onClose}
                        disabled={processing}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                        Отмена
                    </button>
                    <Button
                        type="submit"
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                        disabled={processing}
                    >
                        {text.buttonText}
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
