import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/profile/Card"
import { Link } from "@inertiajs/react"

export default function GroupWorkouts({ workouts }) {
    const groupWorkoutsByDate = (workoutsList) => {
        const grouped = {}
        workoutsList.forEach((workout) => {
            const date = new Date(workout.start_time).toLocaleDateString("ru-RU")
            if (!grouped[date]) {
                grouped[date] = []
            }
            grouped[date].push(workout)
        })
        return grouped
    }

    const groupedWorkouts = groupWorkoutsByDate(workouts)
    const dates = Object.keys(groupedWorkouts).sort()

    return (
        <Card className="bg-white">
            <CardHeader>
                <CardTitle>Мои групповые тренировки</CardTitle>
                <p className="text-sm text-gray-500 mt-2">Выберите тренировку для отметки присутствия участников</p>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {!workouts || workouts.length === 0 ? (
                        <div className="bg-gray-50 rounded-lg p-8 text-center">
                            <p className="text-gray-500">У вас пока нет запланированных групповых тренировок</p>
                        </div>
                    ) : (
                        <>
                            {dates.map((date) => (
                                <div key={date} className="border rounded-lg overflow-hidden">
                                    <div className="bg-blue-50 px-6 py-4 border-b">
                                        <h3 className="font-semibold text-gray-900">{date}</h3>
                                    </div>
                                    <div className="space-y-3 p-6">
                                        {groupedWorkouts[date].map((workout) => (
                                            <div
                                                key={workout.id}
                                                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border hover:bg-gray-100 transition"
                                            >
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-gray-900">
                                                        {workout.workout_type.name || "Тренировка"}
                                                    </h4>
                                                    <p className="text-sm text-gray-600">{workout.workout_type.workout_category.name}</p>
                                                    <p className="text-sm text-gray-500">
                                                        {`${new Date(workout.start_time).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit", })}
                                                        -
                                                        ${new Date(workout.end_time).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit", })}`}
                                                    </p>
                                                    <p className="text-xs text-gray-400 mt-1">
                                                        Мест: {workout.booked_slots}/{workout.available_slots}
                                                    </p>
                                                </div>

                                                <div className="flex gap-2">
                                                    <Link
                                                        href={`/attendance/workout/${workout.id}`}
                                                        className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition"
                                                    >
                                                        Отметить
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
