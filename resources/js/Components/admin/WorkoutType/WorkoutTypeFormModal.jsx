import { router, useForm } from "@inertiajs/react"
import { useEffect } from "react"
import Modal from "@/Components/ui/Modal"

export default function WorkoutTypeFormModal({ show, onClose, workoutType, categories, title }) {
    const { data, setData, post, put, reset, errors, clearErrors } = useForm({
        workout_category_id: "",
        name: "",
        slug: "",
        description: "",
        duration_minutes: "",
        intensivity_level: "",
        photo: null,
    })

    useEffect(() => {
        if (workoutType) {
            setData({
                workout_category_id: workoutType.workout_category_id,
                name: workoutType.name,
                slug: workoutType.slug,
                description: workoutType.description,
                duration_minutes: workoutType.duration_minutes,
                intensivity_level: workoutType.intensivity_level,
            })
        } else {
            reset()
        }
        clearErrors()
    }, [workoutType, show])

    const handleSubmit = (e) => {
        e.preventDefault()

        if (workoutType) {
            post(route("admin.workout-types.update", workoutType.id), {
                onSuccess: () => {
                    reset()
                    onClose()
                },
            })
        } else {
            post(route("admin.workout-types.store"), {
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
                {/* Категория */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Категория</label>
                    <select
                        value={data.workout_category_id}
                        onChange={(e) => setData("workout_category_id", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                        <option value="">Выберите категорию</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    {errors.workout_category_id && <p className="mt-1 text-sm text-red-600">{errors.workout_category_id}</p>}
                </div>

                {/* Название */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Название</label>
                    <input
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        placeholder="Например: LAB"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
                        placeholder="LAB"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    {errors.slug && <p className="mt-1 text-sm text-red-600">{errors.slug}</p>}
                </div>

                {/* Описание */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Описание</label>
                    <textarea
                        name="description"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        placeholder="Введите описание тренировки"
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    ></textarea>
                    {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                </div>

                {/* Продолжительность */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Продолжительность (минут)</label>
                    <select
                        value={data.duration_minutes}
                        onChange={(e) => setData("duration_minutes", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                        <option value="">Выберите продолжительность тренировки</option>
                        <option value="30">30 минут</option>
                        <option value="45">45 минут</option>
                        <option value="50">50 минут</option>
                        <option value="55">55 минут</option>
                        <option value="60">60 минут</option>
                        <option value="90">90 минут</option>
                    </select>
                    {errors.duration_minutes && <p className="mt-1 text-sm text-red-600">{errors.duration_minutes}</p>}
                </div>

                {/* Уровень интенсивности */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Уровень интенсивности</label>
                    <select
                        value={data.intensivity_level}
                        onChange={(e) => setData("intensivity_level", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                        <option value="">Выберите уровень</option>
                        <option value="1">1 - Низкая</option>
                        <option value="2">2 - Средняя</option>
                        <option value="3">3 - Высокая</option>
                    </select>
                    {errors.intensivity_level && <p className="mt-1 text-sm text-red-600">{errors.intensivity_level}</p>}
                </div>

                {/* Фото */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Фото тренировки</label>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            console.log("Выбрали файл:", e.target.files[0])
                            setData("photo", e.target.files[0])
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    {errors.photo && <p className="mt-1 text-sm text-red-600">{errors.photo}</p>}

                    {/* Предпросмотр при редактировании */}
                    {workoutType?.photo && (
                        <img
                            src={`/storage/${workoutType.photo}`}
                            alt="Фото"
                            className="mt-2 w-32 h-auto rounded-md border"
                        />
                    )}
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
                        {workoutType ? "Обновить" : "Создать"}
                    </button>
                </div>
            </form>
        </Modal>
    )
}
