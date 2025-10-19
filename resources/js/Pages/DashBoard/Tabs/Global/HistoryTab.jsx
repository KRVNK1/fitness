import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/profile/Card"
import { Button } from "@/Components/ui/Button"
import { router } from "@inertiajs/react"

export default function HistoryTab({ workoutHistory, formatDate, getStatusBadge,  }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    История тренировок
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {workoutHistory.data.length > 0 ? (
                        workoutHistory.data.map((booking) => (
                            <div
                                key={booking.id}
                                className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0"
                            >
                                <div className="space-y-2">
                                    <p className="font-medium text-lg">{booking.workout_name}</p>
                                    <div className="flex flex-wrap gap-3 text-sm">
                                        <span>{booking.duration} мин</span>
                                        <span>{booking.type === "individual" ? "Индивидуальная" : "Групповая"}</span>
                                        <span>Тренер: {booking.trainer_name}</span>
                                    </div>
                                    <p className="text-sm">{formatDate(booking.start_time)}</p>
                                </div>
                                {getStatusBadge(booking.status)}
                            </div>
                        ))
                    ) : (
                        <p className="text-center py-8">У вас пока нет тренировок</p>
                    )}
                </div>

                {workoutHistory.links && workoutHistory.links.length > 3 && (
                    <div className="mt-6 flex justify-center gap-2">
                        {workoutHistory.links.map((link, index) => (
                            <Button
                                key={index}
                                disabled={!link.url}
                                onClick={() => link.url && router.visit(link.url)}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
