import { Link } from "@inertiajs/react"
import IntensityDots from "@/Components/ui/IntensityDots"

export default function WorkoutCard({ workout }) {

    function redirectToWorkout() {
        window.location.href = `/workouts/schedule/${workout.id}`
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="cursor-pointer shadow-md" onClick={redirectToWorkout}>
                <div className="relative">
                    {workout.photo ? (
                        <div className="w-full h-60">
                            <img
                                src={workout.photo}
                                alt={workout.name}
                                className="w-full h-60 object-cover rounded-t-lg"
                            />
                        </div>
                    ) : (
                        <div className="w-full h-60 flex items-center justify-center flex-col bg-gray-200">
                            <svg viewBox="0 0 53 53" className="w-10 h-10" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" fill="currentColor" clipRule="evenodd" d="M6.62569 21.5924C6.625 21.6295 6.625 21.6734 6.625 21.7611V38.1666C6.625 40.9951 6.625 42.4093 7.50368 43.288C8.38236 44.1666 9.79657 44.1666 12.625 44.1666H40.375C43.2034 44.1666 44.6176 44.1666 45.4963 43.288C46.375 42.4093 46.375 40.9951 46.375 38.1666V21.7611C46.375 21.6734 46.375 21.6295 46.3743 21.5924C46.3344 19.4414 44.6002 17.7072 42.4492 17.6673C42.4121 17.6666 42.3682 17.6666 42.2805 17.6666C42.2242 17.6666 42.196 17.6666 42.1698 17.6663C40.6925 17.647 39.3461 16.8149 38.6681 15.5021C38.6561 15.4789 38.6435 15.4537 38.6183 15.4033L36.4389 11.0445C35.901 9.96863 35.632 9.43071 35.1487 9.13201C34.6654 8.83331 34.064 8.83331 32.8612 8.83331H20.1388C18.936 8.83331 18.3346 8.83331 17.8513 9.13201C17.368 9.43071 17.099 9.96862 16.5611 11.0444L16.5611 11.0445L14.3817 15.4033C14.3565 15.4537 14.3439 15.4789 14.3319 15.5021C13.6539 16.8149 12.3075 17.647 10.8302 17.6663C10.804 17.6666 10.7758 17.6666 10.7195 17.6666C10.6318 17.6666 10.5879 17.6666 10.5508 17.6673C8.39977 17.7072 6.66559 19.4414 6.62569 21.5924ZM33.3333 28.7083C33.3333 32.4823 30.2739 35.5416 26.5 35.5416C22.7261 35.5416 19.6667 32.4823 19.6667 28.7083C19.6667 24.9344 22.7261 21.875 26.5 21.875C30.2739 21.875 33.3333 24.9344 33.3333 28.7083ZM35.3333 28.7083C35.3333 33.5868 31.3785 37.5416 26.5 37.5416C21.6215 37.5416 17.6667 33.5868 17.6667 28.7083C17.6667 23.8298 21.6215 19.875 26.5 19.875C31.3785 19.875 35.3333 23.8298 35.3333 28.7083Z"></path>
                            </svg>
                            Фото еще нет
                        </div>
                    )}


                    <div className="flex items-center justify-between absolute bottom-2 left-2 gap-2">
                        {/* Категория и продолжительность */}
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white text-purple-800">
                            {workout.workout_category.name}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-white text-purple-800">
                            {workout.duration_minutes} мин.
                        </span>

                        {/* Интенсивность */}
                        {workout.intensivity_level && (
                            <div className="flex space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-purple-800">
                                <IntensityDots level={workout.intensivity_level} />
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-4">
                    {/* Название */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{workout.name}</h3>

                    {/* Описание */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{workout.description}</p>

                    {/* Кнопка */}
                    <Link
                        className="inline-flex items-center justify-center w-full px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 transition-colors"
                        href={`/workouts/schedule/${workout.id}`}
                    >
                        Подробнее
                    </Link>
                </div>

            </div>
        </div>
    )
}
