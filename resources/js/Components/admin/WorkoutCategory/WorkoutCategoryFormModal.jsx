import { useForm } from "@inertiajs/react"
import { useEffect } from "react"
import Modal from "@/Components/ui/Modal"

export default function WorkoutCategoryFormModal({ show, onClose, category, title }) {
    const { data, setData, post, put, reset, errors, clearErrors } = useForm({
        name: "",
        slug: "",
    })

    useEffect(() => {
        if (category) {
            setData({
                name: category.name,
                slug: category.slug,
            })
        } else {
            reset()
        }
        clearErrors()
    }, [category, show])

    const handleSubmit = (e) => {
        e.preventDefault()

        if (category) {
            put(route("admin.workout-categories.update", category.id), {
                onSuccess: () => {
                    reset()
                    onClose()
                },
            })
        } else {
            post(route("admin.workout-categories.store"), {
                onSuccess: () => {
                    reset()
                    onClose()
                },
            })
        }
    }

    return (
        <Modal show={show} onClose={onClose} title={title} maxWidth="md">
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Название */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Название</label>
                    <input
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        placeholder="Например: Кардио"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                {/* Слаг */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Слаг</label>
                    <input
                        type="text"
                        name="slug"
                        value={data.slug}
                        onChange={(e) => setData("slug", e.target.value)}
                        placeholder="cardio"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.slug && <p className="mt-1 text-sm text-red-600">{errors.slug}</p>}
                </div>

                {/* Кнопки */}
                <div className="flex gap-3 justify-end pt-4">
                    <button
                        type="button"
                        onClick={() => {
                            reset()
                            onClose()
                        }}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                    >
                        Отмена
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {category ? "Обновить" : "Создать"}
                    </button>
                </div>
            </form>
        </Modal>
    )
}
