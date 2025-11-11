export default function useStatusBadge() {
    return (status) => {
        const badges = {
            pending: { text: "В ожидании", class: "text-yellow-800" },
            approved: { text: "Принята", class: "text-green-800" },
            rejected: { text: "Отклонена", class: "text-red-800" },
            canceled: { text: "Отменена тренером", class: " text-gray-800" },
        }

        const badge = badges[status] || { text: status, class: "text-gray-800" }

        return (
            <span className={`inline-flex items-center rounded-full text-sm font-medium ${badge.class}`}>
                {badge.text}
            </span>
        )
    }
}
