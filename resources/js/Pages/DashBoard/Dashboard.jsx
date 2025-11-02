import { Head } from "@inertiajs/react"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/profile/Tabs"
import Header from "@/Components/layout/Header"
import Footer from "@/Components/layout/Footer"
import { Badge } from "@/Components/ui/badge"
import OverviewTab from "./Tabs/Global/OverviewTab"
import HistoryTab from "./Tabs/Global/HistoryTab"
import ProfileTab from "./Tabs/Global/ProfileTab"
import SecurityTab from "./Tabs/Global/SecurityTab"

export default function Dashboard({ auth, user, stats, recentBookings, workoutHistory, requests }) {
    const [activeTab, setActiveTab] = useState("overview")

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

    const getStatusBadge = (status) => {
        const variants = {
            booked: "default",
            missed: "secondary",
            canceled: "destructive",
            attended: "outline",
        }

        const labels = {
            booked: "Забронировано",
            missed: "Отсутствовал",
            canceled: "Отменено",
            attended: "Присутствовал",
        }

        return <Badge variant={variants[status] || "secondary"}>{labels[status] || status}</Badge>
    }

    console.log(user)

    return (
        <>
            <Header user={auth.user} />
            <Head title="Личный кабинет" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    {/* Приветствие */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Привет, {user.first_name}!</h1>
                        <p className="mt-2 text-gray-600">Добро пожаловать в личный кабинет</p>
                    </div>

                    {/* Табы */}
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                        <TabsList className="lg:inline-grid lg:grid-cols-5 lg:w-auto">
                            <TabsTrigger value="overview">Обзор</TabsTrigger>
                            <TabsTrigger value="history">История</TabsTrigger>
                            <TabsTrigger value="profile">Личные данные</TabsTrigger>
                            <TabsTrigger value="security">Безопасность</TabsTrigger>
                        </TabsList>

                        {/* Вкладка: Обзор */}
                        <TabsContent value="overview" className="space-y-6">
                            <OverviewTab
                                recentBookings={recentBookings}
                                stats={stats}
                                user={user}
                                formatDate={formatDate}
                                getStatusBadge={getStatusBadge}
                                setActiveTab={setActiveTab}
                            />
                        </TabsContent>

                        {/* Вкладка: История тренировок */}
                        <TabsContent value="history">
                            <HistoryTab
                                workoutHistory={workoutHistory}
                                formatDate={formatDate}
                                getStatusBadge={getStatusBadge}
                            />
                        </TabsContent>
                        
                        {/* Вкладка: Личные данные */}
                        <TabsContent value="profile">
                            <ProfileTab user={user} />
                        </TabsContent>

                        {/* Вкладка: Безопасность */}
                        <TabsContent value="security" className="space-y-6">
                            <SecurityTab />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            <Footer />
        </>
    )
}
