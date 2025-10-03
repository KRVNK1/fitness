import Header from "@/Components/layout/Header";
import Footer from "@/Components/layout/Footer";
import WorkoutScheduleItem from "@/Components/features/WorkoutScheduleItem";
import { Link } from "@inertiajs/react";
import IntensityDots from "@/Components/ui/IntensityDots";

export default function Show({ auth, workout, schedules }) {
    return (
        <>
            <Header user={auth.user} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Навигация назад */}
                <div className="mb-6">
                    <Link href="/workouts" className="inline-flex items-center text-purple-600 hover:text-purple-700">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                        Назад к тренировкам
                    </Link>
                </div>

                {/* Информация о тренировке */}
                <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
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

                    <div className="prose max-w-none">
                        <p className="text-gray-700 leading-relaxed">{workout.description}</p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto mb-8">
                    {schedules.length > 0 ? (
                        <div className="bg-white rounded-lg shadow-sm border p-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Ближайшие занятия</h2>
                            {schedules.map((schedule) => (
                                <WorkoutScheduleItem key={schedule.id} schedule={schedule} />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
                            <p className="text-gray-500">В ближайшее время занятий не запланировано</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </>
    )
}
