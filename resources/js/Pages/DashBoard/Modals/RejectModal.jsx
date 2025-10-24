import { Button } from "@/Components/ui/Button"
import CloseIconModal from "@/Components/ui/CloseIconModal"
import { router } from "@inertiajs/react"

export default function RejectModal({ request, show, onClose }) {
    const rejectApplication = () => {
        router.delete(route("requests.cancel", { id: request.id }), {
            preserveScroll: true,
        })
    }

    if (!show) return null

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
                {/* Оверлей */}
                <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />

                {/* Модалка */}
                <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                    <div className="flex justify-between">
                        <h1 className="text-xl font-bold text-gray-900 mb-2">Отмена заявки</h1>
                        <CloseIconModal onClose={onClose} />
                    </div>
                    <p className="mb-2">Вы уверены, что хотите отменить заявку?</p>
                    <Button onClick={rejectApplication}>Отменить заявку</Button>
                </div>
            </div>
        </div>
    )
}
