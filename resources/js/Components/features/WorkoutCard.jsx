import { Link } from "@inertiajs/react"
import IntensityDots from "@/Components/ui/IntensityDots"

export default function WorkoutCard({ workout }) {

    return (
        <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="p-6">
                <img 
                    src={workout.photo} 
                    alt={workout.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                />
                {/* Категория и продолжительность */}
                <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {workout.workout_category.name}
                    </span>
                    <span className="text-sm text-gray-500">{workout.duration_minutes} мин</span>
                </div>

                {/* Название */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{workout.name}</h3>

                {/* Описание */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{workout.description}</p>

                {/* Интенсивность */}
                {workout.intensivity_level && (
                    <div className="flex items-center mb-4">
                        <span className="text-sm text-gray-500 mr-2">Интенсивность:</span>
                        <div className="flex space-x-1">
                            <IntensityDots level={workout.intensivity_level} />
                        </div>
                    </div>
                )}

                {/* Кнопка */}
                <Link
                    className="inline-flex items-center justify-center w-full px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 transition-colors"
                    href={`/workouts/${workout.id}`}
                >

                    Подробнее
                </Link>
            </div>
        </div>
    )
}
