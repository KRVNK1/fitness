import { Head, useForm, router } from "@inertiajs/react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/profile/Card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/profile/Tabs"
import { Button } from "@/Components/ui/Button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import Header from "@/Components/layout/Header"
import Footer from "@/Components/layout/Footer"
import { Badge } from "@/Components/ui/badge"

export default function Dashboard({ auth, user, stats, recentBookings, workoutHistory }) {
    const [activeTab, setActiveTab] = useState("overview")

    // Форма для обновления профиля
    const profileForm = useForm({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone: user.phone || "",
    })

    // Форма для смены пароля
    const passwordForm = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    })

    const handleProfileUpdate = (e) => {
        e.preventDefault()
        profileForm.put(route("profile.update"), {
            onSuccess: () => {

            },
        })
    }

    const handlePasswordUpdate = (e) => {
        e.preventDefault()
        passwordForm.put(route("password.update"), {
            onSuccess: () => {
                passwordForm.reset()
            },
        })
    }

    const handleLogout = () => {
        router.post(route("logout"))
    }

    const formatDate = (dateString) => {
        if (!dateString) return "Не указано"
        const date = new Date(dateString)
        return date.toLocaleDateString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    let membershipDurationDays

    if (stats.userMembership && stats.userMembership.start_date && stats.userMembership.end_date) {
        const startMembership = new Date(stats.userMembership.start_date)
        const endMembership = new Date(stats.userMembership.end_date)
        membershipDurationDays = (endMembership - startMembership) / (1000 * 60 * 60 * 24)
    }

    const getStatusBadge = (status) => {
        const variants = {
            confirmed: "default",
            pending: "secondary",
            cancelled: "destructive",
            completed: "outline",
        }

        const labels = {
            confirmed: "Подтверждено",
            pending: "Ожидание",
            cancelled: "Отменено",
            completed: "Завершено",
        }

        return <Badge variant={variants[status] || "secondary"}>{labels[status] || status}</Badge>
    }

    return (
        <>
            <Header user={auth.user} />
            <Head title="Личный кабинет" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Приветствие */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Привет, {user.first_name || "Пользователь"}!</h1>
                        <p className="mt-2 text-gray-600">Добро пожаловать в личный кабинет</p>
                    </div>

                    {/* Табы */}
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
                            <TabsTrigger value="overview">Обзор</TabsTrigger>
                            <TabsTrigger value="history">История</TabsTrigger>
                            <TabsTrigger value="profile">Личные данные</TabsTrigger>
                            <TabsTrigger value="security">Безопасность</TabsTrigger>
                        </TabsList>

                        {/* Вкладка: Обзор */}
                        <TabsContent value="overview" className="space-y-6">
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
                                            {membershipDurationDays ? `${membershipDurationDays} дней` : "0"}
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
                                        <CardTitle className="flex items-center gap-2">
                                            Последние тренировки
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {recentBookings.length > 0 ? (
                                            recentBookings.map((booking) => (
                                                <div
                                                    key={booking.id}
                                                    className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0"
                                                >
                                                    <div className="space-y-1">
                                                        <p className="font-medium">{booking.workout_name}</p>
                                                        <div className="flex flex-wrap gap-2 text-sm ">
                                                            <span className="flex items-center gap-1">
                                                                {booking.duration} мин
                                                            </span>
                                                            <span className="flex items-center gap-1">

                                                            </span>
                                                        </div>
                                                        <p className="text-sm">{formatDate(booking.start_time)}</p>
                                                    </div>
                                                    {getStatusBadge(booking.status)}
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-sm">У вас пока нет тренировок</p>
                                        )}
                                        <Button variant="outline" className="bg-transparent" onClick={() => setActiveTab("history")}>
                                            Все тренировки
                                        </Button>
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
                                        <div className="flex gap-2">
                                            <Button variant="default" className="" onClick={() => setActiveTab("profile")}>
                                                Редактировать
                                            </Button>
                                            <Button variant="destructive" className="bg-red-600 hover:bg-red-700" onClick={handleLogout}>
                                                Выйти
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        {/* Вкладка: История тренировок */}
                        <TabsContent value="history">
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
                                                        <div className="flex flex-wrap gap-3 text-sm ">
                                                            <span className="flex items-center gap-1">
                                                                {booking.duration} мин
                                                            </span>
                                                            <span className="flex items-center gap-1">
                                                                {booking.type === "individual"}
                                                                {booking.type === "individual" ? "Индивидуальная" : "Групповая"}
                                                            </span>
                                                            <span className="flex items-center gap-1">
                                                                Тренер: {booking.trainer_name}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm">{formatDate(booking.start_time)}</p>
                                                    </div>
                                                    {getStatusBadge(booking.status)}
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-center  py-8">У вас пока нет тренировок</p>
                                        )}
                                    </div>

                                    {/* Пагинация */}
                                    {workoutHistory.links && workoutHistory.links.length > 3 && (
                                        <div className="mt-6 flex justify-center gap-2">
                                            {workoutHistory.links.map((link, index) => (
                                                <Button
                                                    key={index}
                                                    variant={link.active ? "default" : "outline"}
                                                    size="sm"
                                                    disabled={!link.url}
                                                    onClick={() => link.url && router.visit(link.url)}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Вкладка: Личные данные */}
                        <TabsContent value="profile">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        Редактирование профиля
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="first_name">Имя</Label>
                                                <Input
                                                    id="first_name"
                                                    value={profileForm.data.first_name}
                                                    onChange={(e) => profileForm.setData("first_name", e.target.value)}
                                                    required
                                                />
                                                {profileForm.errors.first_name && (
                                                    <p className="text-sm text-destructive">{profileForm.errors.first_name}</p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="last_name">Фамилия</Label>
                                                <Input
                                                    id="last_name"
                                                    value={profileForm.data.last_name}
                                                    onChange={(e) => profileForm.setData("last_name", e.target.value)}
                                                    required
                                                />
                                                {profileForm.errors.last_name && (
                                                    <p className="text-sm text-destructive">{profileForm.errors.last_name}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={profileForm.data.email}
                                                onChange={(e) => profileForm.setData("email", e.target.value)}
                                                required
                                            />
                                            {profileForm.errors.email && (
                                                <p className="text-sm text-destructive">{profileForm.errors.email}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Телефон</Label>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                value={profileForm.data.phone}
                                                onChange={(e) => profileForm.setData("phone", e.target.value)}
                                            />
                                            {profileForm.errors.phone && (
                                                <p className="text-sm text-destructive">{profileForm.errors.phone}</p>
                                            )}
                                        </div>

                                        <Button type="submit" disabled={profileForm.processing}>
                                            Сохранить изменения
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Вкладка: Безопасность */}
                        <TabsContent value="security" className="space-y-6">
                            {/* Смена пароля */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        Смена пароля
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handlePasswordUpdate} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="current_password">Текущий пароль</Label>
                                            <Input
                                                id="current_password"
                                                type="password"
                                                value={passwordForm.data.current_password}
                                                onChange={(e) => passwordForm.setData("current_password", e.target.value)}
                                                required
                                            />
                                            {passwordForm.errors.current_password && (
                                                <p className="text-sm text-destructive">{passwordForm.errors.current_password}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="password">Новый пароль</Label>
                                            <Input
                                                id="password"
                                                type="password"
                                                value={passwordForm.data.password}
                                                onChange={(e) => passwordForm.setData("password", e.target.value)}
                                                required
                                            />
                                            {passwordForm.errors.password && (
                                                <p className="text-sm text-destructive">{passwordForm.errors.password}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="password_confirmation">Подтвердите пароль</Label>
                                            <Input
                                                id="password_confirmation"
                                                type="password"
                                                value={passwordForm.data.password_confirmation}
                                                onChange={(e) => passwordForm.setData("password_confirmation", e.target.value)}
                                                required
                                            />
                                            {passwordForm.errors.password_confirmation && (
                                                <p className="text-sm text-destructive">{passwordForm.errors.password_confirmation}</p>
                                            )}
                                        </div>

                                        <Button type="submit" disabled={passwordForm.processing}>
                                            {passwordForm.processing ? "Сохранение..." : "Сменить пароль"}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>

                            {/* Выход из аккаунта */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        Выход из аккаунта
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="mb-4 text-sm ">
                                        Нажмите кнопку ниже, чтобы выйти из своего аккаунта.
                                    </p>
                                    <Button variant="destructive" className="bg-red-600 hover:bg-red-700" onClick={handleLogout}>
                                        Выйти
                                    </Button>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            <Footer />
        </>
    )
}
