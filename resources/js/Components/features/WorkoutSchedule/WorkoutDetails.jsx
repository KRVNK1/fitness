import { Link } from "@inertiajs/react"
import IntensityDots from "@/Components/ui/IntensityDots"
import BookingButton from "@/Components/ui/BookingButton"
import useBooking from "@/hooks/Booking/useBooking"

export default function WorkoutDetails({ workout, format }) {
    const { isBooking, handleBooking } = useBooking(workout?.id)

    return (
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <div className="mb-4">
                <img
                    className="object-cover rounded-xl"
                    src={workout.workout_type.photo}
                    alt={workout.workout_type.name}
                />
            </div>

            <div className="flex max-md:flex-col gap-3 md:justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                    {workout.workout_type.name}
                </h3>

                <div className="flex gap-4">
                    <div className="flex items-center space-x-1 px-2.5 rounded-full text-xs font-medium bg-white text-purple-800 border">
                        {workout.workout_type.workout_category?.name}
                    </div>

                    <div className="flex items-center space-x-1 px-2.5 rounded-full text-xs font-medium bg-white text-purple-800 border">
                        <IntensityDots level={workout.workout_type.intensivity_level} />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Описание</p>
                    <p className="text-gray-900">{workout.workout_type.description}</p>
                </div>

                <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Время</p>
                    <p className="text-gray-900">
                        {`${format(workout.start_time)} - ${format(workout.end_time)}`}
                    </p>
                </div>

                <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Продолжительность</p>
                    <p className="text-gray-900">
                        {workout.workout_type.duration_minutes} минут
                    </p>
                </div>

                {workout.trainer && (
                    <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Тренер</p>
                        <p className="text-gray-700 text-sm leading-relaxed flex items-center gap-2">
                            <img className="w-8 h-8 rounded-xl mr-2" src={workout.trainer.trainer_info.photo} alt="" />
                            {workout.trainer.first_name} {workout.trainer.last_name}
                        </p>
                    </div>
                )}

                <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Участники</p>
                    <p className={`font-semibold ${workout.available_slots - workout.booked_slots > 0 ? "text-green-600" : "text-red-600"}`}>
                        Свободно: {`${workout.available_slots - workout.booked_slots} из ${workout.available_slots}`}
                    </p>
                </div>

                <div className="flex gap-4 mt-4 overflow-x-auto">
                    <BookingButton
                        availableSlots={workout.available_slots}
                        bookedSlots={workout.booked_slots}
                        onBook={handleBooking}
                        fullWidth
                    />

                    <Link
                        href={`/workouts/schedule/${workout.workout_type.id}`}
                        className="border bg-white hover:bg-gray-100 text-purple-700 px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                        Подробнее
                    </Link>
                </div>
            </div>
        </div>
    )
}