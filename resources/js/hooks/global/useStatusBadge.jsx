export default function useStatusBadge() {
    return (status) => {
        const badges = {
            pending: { text: "В ожидании", class: "bg-yellow-100 text-yellow-800" },
            approved: { text: "Принята", class: "bg-green-100 text-green-800" },
            rejected: { text: "Отклонена", class: "bg-red-100 text-red-800" },
            canceled: { text: "Отменена тренером", class: "bg-gray-100 text-gray-800" },
        }

        const badge = badges[status] || { text: status, class: "bg-gray-100 text-gray-800" }

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.class}`}>
                {badge.text}
            </span>
        )
    }
}
