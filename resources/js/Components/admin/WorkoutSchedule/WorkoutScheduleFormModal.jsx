import { useForm } from "@inertiajs/react"
import { useEffect } from "react"
import Modal from "@/Components/ui/Modal"

export default function WorkoutScheduleFormModal({ show, onClose, workoutSchedule, trainers = [], workoutTypes, title }) {
    const { data, setData, post, put, reset, errors, clearErrors } = useForm({
        trainer_id: "",
        workout_type_id: "",
        start_time: "",
        end_time: "",
        available_slots: "",
        status: "scheduled",
    })

    useEffect(() => {
        if (workoutSchedule) {
            setData({
                trainer_id: workoutSchedule.trainer_id,
                workout_type_id: workoutSchedule.workout_type_id,
                start_time: workoutSchedule.start_time,
                end_time: workoutSchedule.end_time,
                available_slots: workoutSchedule.available_slots,
                status: workoutSchedule.status,
            })
        } else {
            reset()
        }
        clearErrors()
    }, [workoutSchedule, show])

    const handleSubmit = (e) => {
        e.preventDefault()

        if (workoutSchedule) {
            put(route("admin.workout-schedules.update", workoutSchedule.id), {
                onSuccess: () => {
                    reset()
                    onClose()
                },
            })
        } else {
            post(route("admin.workout-schedules.store"), {
                onSuccess: () => {
                    reset()
                    onClose()
                },
            })
        }
    }

    return (
        <Modal show={show} onClose={onClose} title={title} maxWidth="lg">
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Тренер */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Тренер</label>
                    <select
                        value={data.trainer_id}
                        onChange={(e) => setData("trainer_id", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Выберите тренера</option>
                        {trainers.map((trainer) => (
                            <option key={trainer.id} value={trainer.id}>
                                {trainer.first_name} {trainer.last_name}
                            </option>
                        ))}
                    </select>
                    {errors.trainer_id && <p className="mt-1 text-sm text-red-600">{errors.trainer_id}</p>}
                </div>

                {/* Тип тренировки */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Тип тренировки</label>
                    <select
                        value={data.workout_type_id}
                        onChange={(e) => setData("workout_type_id", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Выберите тип тренировки</option>
                        {workoutTypes.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.name} ({type.workout_category.name}) - {type.duration_minutes} мин
                            </option>
                        ))}
                    </select>
                    {errors.workout_type_id && <p className="mt-1 text-sm text-red-600">{errors.workout_type_id}</p>}
                </div>

                {/* Время начала */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Время начала</label>
                    <input
                        type="datetime-local"
                        value={data.start_time}
                        onChange={(e) => {
                            const value = e.target.value

                            const date = new Date(value)
                            const hours = date.getHours()
                            const minutes = date.getMinutes()

                            // Ограничение по диапазону времени
                            const totalMinutes = hours * 60 + minutes
                            const min = 8 * 60 + 30    // 08:30
                            const max = 20 * 60        // 20:00

                            if (totalMinutes < min || totalMinutes > max) return

                            setData("start_time", value)
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    {errors.start_time && <p className="mt-1 text-sm text-red-600">{errors.start_time}</p>}
                </div>

                {/* Время окончания */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Время окончания</label>
                    <input
                        type="datetime-local"
                        value={data.end_time}
                        onChange={(e) => {
                            const value = e.target.value

                            const date = new Date(value)
                            const hours = date.getHours()
                            const minutes = date.getMinutes()

                            // Ограничение по диапазону времени
                            const totalMinutes = hours * 60 + minutes
                            const min = 8 * 60 + 30    // 08:30
                            const max = 21 * 60 + 30   // 20:00

                            if (totalMinutes < min || totalMinutes > max) return

                            setData("end_time", value)
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    {errors.end_time && <p className="mt-1 text-sm text-red-600">{errors.end_time}</p>}
                </div>

                {/* Количество свободных мест */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Количество свободных мест</label>
                    <input
                        type="number"
                        value={data.available_slots}
                        onChange={(e) => setData("available_slots", e.target.value)}
                        placeholder="10"
                        min="1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    {errors.available_slots && <p className="mt-1 text-sm text-red-600">{errors.available_slots}</p>}
                </div>

                {/* Статус */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Статус</label>
                    <select
                        value={data.status}
                        onChange={(e) => setData("status", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                        <option value="scheduled">В расписании</option>
                        <option value="completed">Завершена</option>
                        <option value="cancelled">Отменена</option>
                    </select>
                    {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
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
                        {workoutSchedule ? "Обновить" : "Создать"}
                    </button>
                </div>
            </form>
        </Modal>
    )
}
