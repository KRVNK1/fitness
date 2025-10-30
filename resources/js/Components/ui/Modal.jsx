import { useEffect, useState } from "react"
import CloseIconModal from "@/Components/ui/CloseIconModal"

export default function Modal({ show, onClose, title, children, maxWidth = "md", showCloseButton = true }) {
    const [isVisible, setIsVisible] = useState(false)
    const [shouldRender, setShouldRender] = useState(false)

    useEffect(() => {
        if (show) {
            setShouldRender(true)
            setTimeout(() => setIsVisible(true), 10)
        } else {
            setIsVisible(false)
            setTimeout(() => setShouldRender(false), 300)
        }
    }, [show])

    if (!shouldRender) return null

    const maxWidthClasses = {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        "2xl": "max-w-2xl",
    }

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
                {/* Оверлей с плавным появлением */}
                <div className={`fixed inset-0 bg-black transition-opacity duration-300 
                    ${isVisible ? "bg-opacity-50" : "bg-opacity-0"}`}
                    onClick={onClose}
                />

                {/* Модальное окно с плавным появлением и масштабированием */}
                <div className={`relative bg-white rounded-lg shadow-xl ${maxWidthClasses[maxWidth]} w-full p-6 transition-all duration-300 
                    ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>

                    {/* Заголовок с кнопкой закрытия */}
                    <div className="flex items-center justify-between mb-4">
                        {title && <h3 className="text-xl font-semibold text-gray-900">{title}</h3>}
                        {showCloseButton && <CloseIconModal onClose={onClose} />}
                    </div>

                    {/* Контент модалки */}
                    {children}
                </div>
            </div>
        </div>
    )
}
