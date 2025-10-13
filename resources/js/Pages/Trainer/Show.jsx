"use client"

import Header from "@/Components/layout/Header"
import Footer from "@/Components/layout/Footer"
import { Link } from "@inertiajs/react"
import { useState, useEffect } from "react"
import IntensityDots from "@/Components/ui/IntensityDots"

export default function Show({ auth, trainer, schedules }) {
    const [selectedDate, setSelectedDate] = useState(Object.keys(schedules)[0])
    const [selectedWorkout, setSelectedWorkout] = useState(null)

    const days = (() => {
        const result = []
        const today = new Date()
        for (let i = 0; i < 14; i++) {
            const date = new Date(today)
            console.log(date)
            date.setDate(today.getDate() + i)
            const dateStr = date.toISOString().split("T")[0]
            result.push({
                date: dateStr,
                dayName: date.toLocaleDateString("ru-RU", { weekday: "short" }),
                dayNumber: date.getDate(),
                hasWorkouts: schedules[dateStr]?.length > 0,
            })
        }
        return result
    })()

    const selectedDayWorkouts = selectedDate ? schedules[selectedDate] : []

    useEffect(() => {
        if (selectedDayWorkouts.length > 0 && !selectedWorkout) {
            setSelectedWorkout(selectedDayWorkouts[0])
        } else if (selectedDayWorkouts.length === 0) {
            setSelectedWorkout(null)
        }
    }, [selectedDate, selectedDayWorkouts])

    console.log(selectedDayWorkouts)

    return (
        <div className="bg-gray-100">
            <Header user={auth.user} />

            <main className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Навигация назад */}
                <div className="mb-6">
                    <Link href="/trainers" className="inline-flex items-center text-purple-600 hover:text-purple-700">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                        Назад к тренерам
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Фото тренера */}
                        <div className="flex-shrink-0">
                            <div className="relative w-48 h-64 rounded-lg overflow-hidden bg-gradient-to-br from-purple-100 to-purple-200">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <svg className="w-24 h-24 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Информация */}
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                {trainer.first_name} {trainer.last_name}
                            </h1>

                            {trainer.trainer_info?.experience_years && (
                                <p className="text-gray-700 mb-4">
                                    Стаж:{" "}
                                    <span className="font-semibold">
                                        {trainer.trainer_info.experience_years}{" "}
                                        {trainer.trainer_info.experience_years === 1
                                            ? "год"
                                            : trainer.trainer_info.experience_years < 5
                                                ? "года"
                                                : "лет"}
                                    </span>
                                </p>
                            )}

                            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                                Посмотреть расписание
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">О тренере</h2>

                    <div className="prose max-w-none">
                        <p className="text-gray-700 leading-relaxed">
                            {trainer.trainer_info?.description || "Информация о тренере отсутствует"}
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Расписание занятий</h2>

                    {/* Выбор дней */}
                    <div className="mb-6 overflow-x-auto">
                        <div className="flex gap-2 pb-2">
                            {days.map((day) => (
                                <button
                                    key={day.date}
                                    onClick={() => setSelectedDate(day.date)}
                                    disabled={!day.hasWorkouts}
                                    className={`flex-shrink-0 flex flex-col items-center justify-center w-16 h-20 rounded-lg border-2 transition-all ${selectedDate === day.date
                                        ? "border-purple-600 bg-purple-50"
                                        : day.hasWorkouts
                                            ? "border-gray-200 hover:border-purple-300 bg-white"
                                            : "border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed"
                                        }`}
                                >
                                    <span className={`text-xs font-medium ${selectedDate === day.date ? "text-purple-600" : "text-gray-600"}`}>
                                        {day.dayName}
                                    </span>
                                    <span className={`text-lg font-bold ${selectedDate === day.date ? "text-purple-600" : "text-gray-900"}`}>
                                        {day.dayNumber}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Two-column layout: workouts list and details */}
                    {selectedDayWorkouts.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Левая: список тренировок */}
                            <div className="space-y-3">
                                {selectedDayWorkouts.map((workout) => (
                                    <button
                                        key={workout.id}
                                        onClick={() => setSelectedWorkout(workout)}
                                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${selectedWorkout?.id === workout.id
                                            ? "border-purple-600 bg-purple-50"
                                            : "border-gray-200 hover:border-purple-300 bg-white"
                                            }`}
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="font-semibold text-gray-900">{workout.workout_type.name || "Тренировка"}</h3>
                                            <span className="text-sm font-medium text-purple-600">
                                                {new Date(workout.start_time).toLocaleTimeString("ru-RU", {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
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

                            {/* Правая: детали тренировки */}
                            {selectedWorkout && (
                                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                                    <div className="flex justify-between mb-4">
                                        <h3 className="text-xl font-bold text-gray-900">
                                            {selectedWorkout.workout_type.name}
                                        </h3>

                                        <div className="flex gap-4">
                                            <div className="flex items-center space-x-1 px-2.5 rounded-full text-xs font-medium bg-white text-purple-800 border">
                                                {console.log(selectedWorkout)}
                                                {selectedWorkout.workout_type.workout_category.name}
                                            </div>

                                            <div className="flex items-center space-x-1 px-2.5 rounded-full text-xs font-medium bg-white text-purple-800 border">
                                                <IntensityDots level={selectedWorkout.workout_type.intensivity_level} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-sm font-medium text-gray-700 mb-1">Описание</p>
                                            <p className="text-gray-900">{selectedWorkout.workout_type.description}</p>
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium text-gray-700 mb-1">Время</p>
                                            <p className="text-gray-900">
                                                {new Date(selectedWorkout.start_time).toLocaleTimeString("ru-RU", {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                                {" - "}
                                                {new Date(selectedWorkout.end_time).toLocaleTimeString("ru-RU", {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium text-gray-700 mb-1">Продолжительность</p>
                                            <p className="text-gray-900">{selectedWorkout.workout_type.duration_minutes} минут</p>
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium text-gray-700 mb-1">Участники</p>
                                            <p className="text-gray-900">
                                                {selectedWorkout.booked_slots} из {selectedWorkout.available_slots}
                                            </p>
                                        </div>

                                        {selectedWorkout.description && (
                                            <div>
                                                <p className="text-sm font-medium text-gray-700 mb-1">Описание</p>
                                                <p className="text-gray-700 text-sm leading-relaxed">{selectedWorkout.description}</p>
                                            </div>
                                        )}

                                        <div className="flex gap-4">
                                            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors mt-4">
                                                Записаться на тренировку
                                            </button>

                                            <Link href={`/workouts/${selectedWorkout.workout_type.id}`} className="border bg-white hover:bg-gray-100 text-purple-700 px-6 py-3 rounded-lg font-medium transition-colors mt-4">
                                                Подробнее
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-500">На выбранную дату занятий не запланировано</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    )
}
