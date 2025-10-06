import { format } from "date-fns"
import { useForm } from "@inertiajs/react"
import { useState } from "react"

export default function WorkoutScheduleItem({ schedule }) {
    const [isBooking, setIsBooking] = useState(false)

    const { post } = useForm({
        workout_schedule_id: schedule.id,
    })

    const handleBooking = () => {
        setIsBooking(true)
        post(route("bookings.store"), {
            onFinish: () => setIsBooking(false),
        })
    }

    return (
        <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 mb-4">
            <div className="flex-1">
                <div className="flex items-center space-x-4">
                    <div>
                        <div className="font-semibold text-gray-900">
                            {format(new Date(schedule.start_time), 'dd.MM.yyyy')}
                        </div>
                        <div className="text-sm text-gray-500">
                            {format(new Date(schedule.start_time), 'HH:mm')} - {format(new Date(schedule.end_time), 'HH:mm')}
                        </div>
                    </div>
                    <div className="border-l pl-4">
                        <div className="font-medium text-gray-900">
                            {schedule.trainer.first_name} {schedule.trainer.last_name}
                        </div>
                        <div className="text-sm text-gray-500">
                            Тренер
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <div className="text-right">
                    <div className="text-sm text-gray-500">Свободно мест</div>
                    <div className={`font-semibold ${schedule.available_slots - schedule.booked_slots > 0 ? "text-green-600" : "text-red-600"}`} >
                        {schedule.available_slots - schedule.booked_slots} из {schedule.available_slots}
                    </div>
                </div>
                {schedule.available_slots - schedule.booked_slots > 0 ? (
                    <button
                        onClick={handleBooking}
                        className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors disabled:bg-purple-400 disabled:cursor-not-allowed"
                    >
                        Записаться
                    </button>
                ) : (
                    <button disabled className="bg-gray-300 text-gray-500 px-4 py-2 rounded-md cursor-not-allowed">
                        Нет мест
                    </button>
                )}
            </div>
        </div>
    )
}