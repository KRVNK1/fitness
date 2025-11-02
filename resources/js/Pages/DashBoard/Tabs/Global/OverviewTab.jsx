import { Button } from "@/Components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/profile/Card"
import { router } from "@inertiajs/react"

export default function OverviewTab({ stats, recentBookings, user, formatDate, getStatusBadge, setActiveTab }) {

    const handleLogout = () => {
        router.post(route("logout"))
    }

    return (
        <>
            {/* Статистика */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-base font-medium">Всего тренировок</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col place-items-center">
                        <div className="text-2xl font-bold">{stats.total_workouts}</div>
                        <p className="text-sm">Индивидуальных и групповых</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-base font-medium">Индивидуальные</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col place-items-center">
                        <div className="text-2xl font-bold">{stats.individual_workouts}</div>
                        <p className="text-sm">Персональные тренировки</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-base font-medium">Групповые</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col place-items-center">
                        <div className="text-2xl font-bold">{stats.group_workouts}</div>
                        <p className="text-sm">Групповые занятия</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-base font-medium">Время абонемента</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col place-items-center">
                        <div className="text-2xl font-bold">
                            {stats.userMembership?.remaining_days ? `${stats.userMembership?.remaining_days} дней` : '0'}
                        </div>
                        <p className="text-sm">Оставшееся время (в днях)</p>
                    </CardContent>
                </Card>
            </div>

            {/* Последние тренировки и личные данные */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* Последние тренировки */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-center sm:text-left">
                            Последние тренировки
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {recentBookings.length > 0 ? (
                            recentBookings.map((booking) => (
                                <div
                                    key={booking.id}
                                    className="border-b pb-4 last:border-0 last:pb-0"
                                >
                                    <div className="flex flex-col justify-between space-y-1">
                                        <div className="flex sm:justify-between flex-col sm:flex-row">
                                            <p className="font-medium text-center">{booking.workout_name}</p>
                                            {getStatusBadge(booking.status)}
                                        </div>
                                        <div className="flex flex-wrap gap-2 text-sm ">
                                            <span className="flex items-center gap-1">
                                                {booking.duration} мин
                                            </span>
                                        </div>
                                        <p className="text-sm">{formatDate(booking.start_time)}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm">У вас пока нет тренировок</p>
                        )}
                        <div className="flex flex-col sm:flex-row sm:justify-start gap-2">
                            <Button variant="outline" className="bg-purple-600 hover:bg-purple-700" onClick={() => setActiveTab("history")}>
                                Все тренировки
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Личные данные */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            Личные данные
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm font-medium ">Имя:</p>
                                <p className="text-base">
                                    {user.first_name} {user.last_name}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium">Email:</p>
                                <p className="text-base">{user.email}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium">Телефон:</p>
                                <p className="text-base">{user.phone || "Не указан"}</p>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-start gap-2">
                            <Button className="bg-purple-600 hover:bg-purple-700" variant="default" onClick={() => setActiveTab("profile")}>
                                Редактировать
                            </Button>
                            <Button variant="destructive" className="bg-red-600 hover:bg-red-700" onClick={handleLogout}>
                                Выйти
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}