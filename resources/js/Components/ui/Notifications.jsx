import { router } from "@inertiajs/react"
import { useEffect, useState } from "react"

export default function Notifications() {
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        const handleSuccess = (event) => {
            const flash = event.detail.page.props.flash

            console.log(event)

            if (flash?.success) {
                addNotification(flash.success, "success")
            } else if (flash?.error) {
                addNotification(flash.error, "error")
            } else if (flash?.notification) {
                addNotification(flash.notification, "info")
            }
        }

        // Слушаем событие успешной навигации Inertia
        router.on("success", handleSuccess)

        // Очистка при размонтировании
        return () => {
            router.off("success", handleSuccess)
        }
    }, [])


    function addNotification(message, type = "info") {
        const id = Date.now()
        setNotifications((prev) => [...prev, { id, message, type }])

        setTimeout(() => {
            removeNotification(id)
        }, 5000)
    }

    function removeNotification(id) {
        setNotifications((prev) => prev.filter((n) => n.id !== id))
    }

    const colors = {
        success: "bg-green-500 text-white",
        error: "bg-red-500 text-white",
    }

    const icons = {
        success: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>,
        error: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-alert"><circle cx="12" cy="12" r="10"></circle><line x1="12" x2="12" y1="8" y2="12"></line><line x1="12" x2="12.01" y1="16" y2="16"></line></svg>,
    }

    console.log(notifications)

    return (
        <div className="fixed top-20 right-4 z-50 flex flex-col gap-2">
            {notifications.map((notification) => (
                <div
                    key={notification.id}
                    className={`px-4 py-4 gap-2 rounded-lg shadow-lg transition-all duration-300 cursor-pointer flex ${colors[notification.type]}`}
                    onClick={() => removeNotification(notification.id)}
                >
                    {icons[notification.type]}
                    {notification.message}
                </div>
            ))}
        </div>
    )
}
