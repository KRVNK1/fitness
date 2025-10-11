import { useState, useEffect } from "react"
import Footer from "@/Components/layout/Footer"
import Header from "@/Components/layout/Header"
import WorkoutFilters from "@/Components/features/WorkoutFilters"
import WorkoutCard from "@/Components/features/WorkoutCard"
import { Head } from "@inertiajs/react"

export default function Index({ auth, workouts, categories, intensivityLevels, durations }) {
    const [filteredWorkouts, setFilteredWorkouts] = useState(workouts.data || [])
    const [currentFilters, setCurrentFilters] = useState({
        category: "",
        intensity: "",
        duration: "",
    })

    const handleFilterChange = (filters) => {
        setCurrentFilters(filters)

        let filtered = workouts.data

        if (filters.category) {
            filtered = filtered.filter((workout) => workout.workout_category.id == filters.category)
        }

        if (filters.intensity) {
            const levels = filters.intensity
            filtered = filtered.filter((workout) => levels.includes(workout.intensivity_level))
        }

        if (filters.duration) {
            filtered = filtered.filter((workout) => workout.duration_minutes == filters.duration)
        }

        setFilteredWorkouts(filtered)
    }

    useEffect(() => {
        setFilteredWorkouts(workouts.data)
    }, [workouts])

    console.log()

    return (
        <>
            <Head title="IRKFITNESS - Тренировки" />

            <Header user={auth.user} />

            <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Заголовок страницы */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Групповые тренировки</h1>
                    <p className="text-gray-600">Выберите подходящую тренировку и присоединяйтесь к нашему сообществу</p>
                </div>

                {/* Фильтры */}
                <WorkoutFilters
                    categories={categories}
                    intensivityLevels={intensivityLevels}
                    durations={durations}
                    onFilterChange={handleFilterChange}
                    currentFilters={currentFilters}
                />

                {/* Результаты */}
                <div className="mb-6">
                    <p className="text-gray-600">Найдено {filteredWorkouts.length} тренировок</p>
                </div>

                {/* Сетка тренировок */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {filteredWorkouts.length > 0 ? (
                        filteredWorkouts.map((workout) =>
                            <WorkoutCard key={workout.id} workout={workout} />
                        )
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <p className="text-gray-500 text-lg">Тренировки не найдены</p>
                            <p className="text-gray-400 text-sm mt-2">Попробуйте изменить параметры фильтра</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </>
    )
}
