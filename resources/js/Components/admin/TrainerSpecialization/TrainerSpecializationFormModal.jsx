import { useState, useEffect } from "react"
import { router } from "@inertiajs/react"
import Modal from "@/Components/ui/Modal"

export default function TrainerSpecializationFormModal({ show, onClose, title, trainer, availableCategories }) {
    const [categoryId, setCategoryId] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        router.post(route("admin.trainer-specializations.store", trainer.id), {
            workout_category_id: categoryId
        },
            {
                onSuccess: () => {
                    setCategoryId("")
                    onClose()
                },
            }
        )
    }

    return (
        <Modal show={show} onClose={onClose} title={title} maxWidth="md">
            <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Категория тренировок
                    </label>

                    <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                        <option value="">Выберите категорию</option>

                        {availableCategories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex gap-3 justify-end pt-4 border-t">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                    >
                        Отмена
                    </button>

                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        Добавить
                    </button>
                </div>
            </form>
        </Modal>
    )
}
