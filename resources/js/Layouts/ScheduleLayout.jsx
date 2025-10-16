import WorkoutsSchedule from "@/Components/features/Trainers/WorkoutSchedule/WorkoutSchedule"
import Footer from "@/Components/layout/Footer"
import Header from "@/Components/layout/Header"
import DaySelector from "@/Components/ui/DaySelector"
import useDays from "@/hooks/global/useDays"
import { Link } from "@inertiajs/react"
import { useEffect, useState } from "react"

export default function ScheduleLayout({ auth, navText, backLink, headerComponent, schedules, entity }) {
    const [selectedDate, setSelectedDate] = useState(Object.keys(schedules)[0] || null)
    const [selectedSchedule, setSelectedSchedule] = useState(selectedDate ? schedules[selectedDate]?.[0] : null)
    const days = useDays(schedules)

    const selectedDayWorkouts = selectedDate ? schedules[selectedDate] : []

    useEffect(() => {
        if (selectedDayWorkouts.length > 0 && !selectedSchedule) {
            setSelectedSchedule(selectedDayWorkouts[0])
        } else if (selectedDayWorkouts.length === 0) {
            setSelectedSchedule(null)
        }
    }, [selectedDate, selectedDayWorkouts])

    const format = (time) =>
        new Date(time).toLocaleTimeString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit"
        })

    console.log(selectedSchedule)

    // useEffect(() => {
    //     new Promise((resolve) => setTimeout(resolve, 3000)).then(() => {
    //         setSelectedSchedule(prev => ({...prev, booked_slots: prev.booked_slots + 1}))
    //         console.log(selectedSchedule)
    //     })
    // }, [])

    return (
        <div className="bg-gray-100">
            <Header user={auth.user} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Навигация назад */}
                <div className="mb-6">
                    <Link href={backLink} className="inline-flex items-center text-purple-600 hover:text-purple-700">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                        {navText}
                    </Link>
                </div>

                {/* Шапка */}
                <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
                    {headerComponent(entity)}
                </div>

                {/* Расписание */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex justify-between">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Расписание занятий</h2>
                    </div>

                    <DaySelector days={days} selectedDate={selectedDate} onSelect={setSelectedDate} />

                    {selectedDayWorkouts.length > 0 ? (
                        <WorkoutsSchedule
                            selectedDayWorkouts={selectedDayWorkouts}
                            selectedWorkout={selectedSchedule}
                            setSelectedWorkout={setSelectedSchedule}
                            format={format}
                        />
                    ) : (
                        <div className="text-center text-gray-500 mt-4">
                            В выбранный день занятий нет
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    )
}
