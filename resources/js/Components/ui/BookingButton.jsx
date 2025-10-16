export default function BookingButton({ availableSlots, bookedSlots, onBook, fullWidth = false }) {
    const hasSlots = availableSlots - bookedSlots > 0;

    const baseClasses = `px-4 py-2 rounded-md font-medium transition-colors ${fullWidth ? 'w-full' : ''}`

    if (!hasSlots) {
        return (
            <button disabled className={`${baseClasses} bg-gray-300 text-gray-500 cursor-not-allowed`}>
                Нет мест
            </button>
        );
    }

    return (
        <button
            onClick={onBook}
            className={`${baseClasses} bg-purple-600 hover:bg-purple-700 text-white`}
        >
            Записаться
        </button>
    );
}
