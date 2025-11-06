import Footer from "@/Components/layout/Footer"
import Header from "@/Components/layout/Header"
import { Head, Link, router } from "@inertiajs/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/profile/Card"
import { Button } from "@/Components/ui/Button"
import { useState } from "react"
import useFormatDate from "@/hooks/global/useFormatDate"

export default function AttendanceTracker({ auth, workout }) {
    const [attendees, setAttendees] = useState(workout.attendees || [])
    const [saving, setSaving] = useState({})
    const [allSaved, setAllSaved] = useState(true)

    const formatDate = useFormatDate()

    const handleAttendanceChange = (bookingId, status) => {
        setAttendees(attendees.map((attendee) => (attendee.booking_id === bookingId ? { ...attendee, status } : attendee)))
        setAllSaved(false)
    }

    const saveAll = () => {
        setSaving({ all: true })

        // Сохраняем все изменения
        const updates = attendees.map((attendee) => ({
            booking_id: attendee.booking_id,
            status: attendee.status,
        }))

        // Отправляем каждое обновление
        updates.forEach((update, index) => {
            console.log(index)
            setTimeout(() => {
                router.post("/attendance/update", update, {
                    onFinish: () => {
                        if (index === updates.length - 1) {
                            setSaving({ all: false })
                            setAllSaved(true)
                        }
                    },
                })
            }, index * 100)
        })
    }


    return (
        <div className="bg-gray-100 min-h-screen">
            <Header user={auth.user} />
            <Head title="Отметка присутствия" />

            <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">

                <div className="mb-6">
                    <Link href='/requests/trainer' className="inline-flex items-center text-purple-600 hover:text-purple-700">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                        Назад к расписанию
                    </Link>
                </div>

                <Card className="bg-white mb-6">
                    <CardHeader>
                        <CardTitle>Отметка присутствия на тренировке</CardTitle>
                        <p className="text-sm text-gray-500 mt-2">
                            {workout.category} - {workout.workout_type}
                        </p>
                        <p className="text-sm text-gray-500">
                            {`${formatDate(workout.start_time)} с
                            ${new Date(workout.end_time).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}`}
                        </p>
                    </CardHeader>
                </Card>

                <Card className="bg-white">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Участники ({attendees.length})</CardTitle>
                            {!allSaved && (
                                <Button onClick={saveAll} disabled={saving.all} className="bg-blue-500 hover:bg-blue-600 text-white">
                                    Сохранить все
                                </Button>
                            )}
                        </div>
                    </CardHeader>

                    <CardContent>
                        {attendees.length === 0 ? (
                            <div className="bg-gray-50 rounded-lg p-8 text-center">
                                <p className="text-gray-500">На эту тренировку никто не записался</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {attendees.map((attendee) => (
                                    <div
                                        key={attendee.booking_id}
                                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border hover:bg-gray-100 transition"
                                    >
                                        <div className="flex-1">
                                            {console.log(attendee)}
                                            <h4 className="font-medium text-gray-900">
                                                {attendee.first_name} {attendee.last_name}
                                            </h4>
                                            <p className="text-sm text-gray-500">{attendee.email}</p>
                                            {attendee.phone && <p className="text-sm text-gray-500">{attendee.phone}</p>}
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className="flex gap-6">
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name={`attendance-${attendee.booking_id}`}
                                                        value="attended"
                                                        checked={attendee.status === "attended"}
                                                        onChange={() => handleAttendanceChange(attendee.booking_id, "attended")}
                                                        className="w-4 h-4 cursor-pointer"
                                                    />
                                                    <span className="text-sm font-medium text-green-700">Был</span>
                                                </label>

                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name={`attendance-${attendee.booking_id}`}
                                                        value="missed"
                                                        checked={attendee.status === "missed"}
                                                        onChange={() => handleAttendanceChange(attendee.booking_id, "missed")}
                                                        className="w-4 h-4 cursor-pointer"
                                                    />
                                                    <span className="text-sm font-medium text-red-700">Не был</span>
                                                </label>

                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name={`attendance-${attendee.booking_id}`}
                                                        value="booked"
                                                        checked={attendee.status === "booked"}
                                                        onChange={() => handleAttendanceChange(attendee.booking_id, "booked")}
                                                        className="w-4 h-4 cursor-pointer"
                                                    />
                                                    <span className="text-sm font-medium text-gray-700">Не отмечен</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </main>

            <Footer />
        </div>
    )
}
