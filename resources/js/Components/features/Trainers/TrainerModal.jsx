import { Button } from "@/Components/ui/Button"
import { Input } from "@/Components/ui/Input"
import Modal from "@/Components/ui/Modal"
import { useForm } from "@inertiajs/react"

export default function TrainerModal({ trainer, show, onClose }) {
    const { data, setData, post, errors, reset } = useForm({
        trainer_id: trainer.id,
        requested_date: "",
        comment: "",
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        post(route("requests.store"), {
            onSuccess: () => {
                reset()
                onClose()
            },
        })
    }

    return (
        <Modal show={show} onClose={onClose} title="Записаться к тренеру">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Тренер</label>
                    <input
                        type="text"
                        value={`${trainer.first_name} ${trainer.last_name}`}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Предпочитаемая дата <span className="text-red-500">*</span>
                    </label>
                    <Input
                        type="datetime-local"
                        value={data.requested_date}
                        onChange={(e) => setData("requested_date", e.target.value)}
                        min={new Date().toISOString().slice(0, 16)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                    />
                    {errors.requested_date && <p className="mt-1 text-sm text-red-600">{errors.requested_date}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Комментарий</label>
                    <textarea
                        value={data.comment}
                        onChange={(e) => setData("comment", e.target.value)}
                        rows={4}
                        placeholder="Опишите ваши цели, пожелания или вопросы..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.comment && <p className="mt-1 text-sm text-red-600">{errors.comment}</p>}
                </div>

                {errors.trainer_id && <p className="text-sm text-red-600">{errors.trainer_id}</p>}

                <div className="flex gap-3 pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Отмена
                    </button>
                    <Button type="submit" className="flex-1">
                        Отправить заявку
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
