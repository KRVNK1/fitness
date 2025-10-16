export default function useDays(schedules) {
    const today = new Date()
    const result = []

    for (let i = 0; i < 14; i++) {
        const date = new Date(today)
        date.setDate(today.getDate() + i)
        const dateStr = date.toISOString().split("T")[0]
        result.push({
            date: dateStr,
            dayName: date.toLocaleDateString("ru-RU", { weekday: "short" }),
            dayNumber: date.getDate(),
            hasWorkouts: schedules[dateStr]?.length > 0,
        })
    }

    return result
}
