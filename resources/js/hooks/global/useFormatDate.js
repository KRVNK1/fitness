export default function useFormatDate() {
    return (dateString) => {
        return new Date(dateString).toLocaleDateString("ru-RU", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
        })
    }
}
