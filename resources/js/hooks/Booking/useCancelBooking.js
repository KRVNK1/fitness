import { router } from "@inertiajs/react";
import { useState } from "react";

export default function useCancelBooking () {
    const [isCanceling, setIsCanceling] = useState(false)

    const handleCancelBooking = (bookingId) => {
        setIsCanceling(true)
        router.post(
            route("bookings.cancel", bookingId),
            {},
            {
                onSuccess: () => {
                    setIsCanceling(false)
                },
                onError: () => {
                    setIsCanceling(false)
                },
                preserveScroll: true,
            },
        )
    }

    return { isCanceling, handleCancelBooking }
}