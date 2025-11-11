import { Button } from "@/Components/ui/Button"
import Modal from "@/Components/ui/Modal"
import { router } from "@inertiajs/react"

export default function RejectModal({ request, show, onClose }) {
    const rejectApplication = () => {
        router.delete(route("requests.cancel", { id: request.id }), {
            preserveScroll: true,
        })
    }

    return (
        <Modal show={show} onClose={onClose} title="Отмена заявки">
            <p className="mb-4 text-gray-700">Вы уверены, что хотите отменить заявку?</p>
            <div className="flex gap-3">
                <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                    Закрыть
                </button>
                <Button onClick={rejectApplication} className="flex-1 bg-purple-600 hover:bg-purple-700">
                    Отменить заявку
                </Button>
            </div>
        </Modal>
    )
}
