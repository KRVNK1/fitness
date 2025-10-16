import IntensityDots from "@/Components/ui/IntensityDots";

export default function WorkoutInfo({ workout }) {
    return (
        <>
            {/* Информация о тренировке */}
            <div className="flex items-start justify-between mb-6">
                <div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 mb-3">
                        {workout.workout_category.name}
                    </span>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{workout.name}</h1>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-bold text-purple-600">{workout.duration_minutes} мин.</div>
                    <span className="text-sm text-gray-500">Интенсивность:</span>
                    {workout.intensivity_level && (
                        <div className="flex space-x-1 justify-end">
                            <IntensityDots level={workout.intensivity_level} />
                        </div>
                    )}
                </div>
            </div>

            <div className="max-w-none">
                <p className="text-gray-700 leading-relaxed">{workout.description}</p>
            </div>
        </>
    )
}