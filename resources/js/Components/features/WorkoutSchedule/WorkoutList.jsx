export default function WorkoutList({ workouts, selectedWorkout, setSelectedWorkout, format }) {
    return (
        <div className="space-y-3">
            {workouts.map((workout) => (
                <button
                    key={workout.id}
                    onClick={() => setSelectedWorkout(workout)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${selectedWorkout?.id === workout.id
                        ? "border-purple-600 bg-purple-50"
                        : "border-gray-200 hover:border-purple-300 bg-white"
                        }`}
                >
                    <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold te xt-gray-900">{workout.workout_type.name}</h3>
                        <span className="text-sm font-medium text-purple-600">
                            {format(workout.start_time)}
                        </span>
                    </div>

                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            {workout.workout_type.duration_minutes} мин
                        </span>

                        <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                />
                            </svg>
                            {workout.booked_slots}/{workout.available_slots}
                        </span>
                    </div>
                </button>
            ))}
        </div>
    )
}