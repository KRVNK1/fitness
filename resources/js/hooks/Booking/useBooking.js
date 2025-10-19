import { useState } from "react"
import { router } from "@inertiajs/react"

export default function useBooking(scheduleId) {
    const [isBooking, setIsBooking] = useState(false)

    const handleBooking = () => {
        setIsBooking(true);
        router.post(route("bookings.store"),
            {
                workout_schedule_id: scheduleId
            },
            {
                onSuccess: () => {
                    setIsBooking(false)
                },
                onError: () => {
                    setIsBooking(false)
                },
                preserveScroll: true,
            })
    }

    return { isBooking, handleBooking }
}
