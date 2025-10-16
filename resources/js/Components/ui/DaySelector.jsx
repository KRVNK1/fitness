export default function DaySelector({ days, selectedDate, onSelect }) {
    return (
        <div className="mb-6 overflow-x-auto">
            <div className="flex gap-2 pb-2">
                {days.map((day) => (
                    <button
                        key={day.date}
                        onClick={() => onSelect(day.date)}
                        disabled={!day.hasWorkouts}
                        className={`flex-shrink-0 flex flex-col items-center justify-center w-16 h-20 rounded-lg border-2 transition-all ${selectedDate === day.date
                                ? "border-purple-600 bg-purple-50"
                                : day.hasWorkouts
                                    ? "border-gray-200 hover:border-purple-300 bg-white"
                                    : "border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed"
                            }`}
                    >
                        <span className={`text-xs font-medium ${selectedDate === day.date ? "text-purple-600" : "text-gray-600"}`}>
                            {day.dayName}
                        </span>
                        <span className={`text-lg font-bold ${selectedDate === day.date ? "text-purple-600" : "text-gray-900"}`}>
                            {day.dayNumber}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    )
}
