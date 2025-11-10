import { Link, usePage } from "@inertiajs/react"
import { useState } from "react"

export default function AdminSidebar() {
    const [isOpen, setIsOpen] = useState(true)

    const menuItems = [
        { label: "Пользователи", href: '/admin/users' },
        { label: "Бронирования", href: '/admin/bookings' },
        { label: "Абонементы", href: '/admin/memberships' },
        { label: "Типы абонементов", href: '/admin/membership-types' },
        { label: "Тренеры", href: '/admin/trainers' },
        { label: "Специализация тренеров", href: '/admin/trainer-specializations' },
        { label: "Категории тренировок", href: '/admin/workout-categories' },
        { label: "Типы тренировок", href: '/admin/workout-types' },
        { label: "Расписание тренировок", href: '/admin/workout-schedules' },
    ]

    return (
        <aside className={`${isOpen ? "w-64" : "w-20"} bg-gray-900 text-white transition-all duration-300 flex flex-col`}>
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
                <h1 className={`font-bold ${isOpen ? "text-xl" : "hidden"}`}>Админ</h1>
                <button onClick={() => setIsOpen(!isOpen)} className="text-gray-400 hover:text-white transition">
                    {isOpen ? "✕" : "☰"}
                </button>
            </div>

            <nav className="flex-1 space-y-2 p-4">
                {menuItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={"flex items-center gap-3 px-4 py-3 rounded-lg transition  hover:bg-gray-800 text-gray-300"}
                    >
                        <span className={isOpen ? "block" : "hidden"}>{item.label}</span>
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-800">
                <Link
                    href={route("dashboard")}
                    className="flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-white transition"
                >
                    <span className={isOpen ? "block" : "hidden"}>На главную</span>
                </Link>
            </div>
        </aside>
    )
}
