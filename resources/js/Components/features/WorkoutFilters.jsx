import { useState } from "react"

export default function WorkoutFilters({ categories, intensivityLevels, durations, onFilterChange, currentFilters }) {
    const [filters, setFilters] = useState({
        category: currentFilters.category,
        intensity: currentFilters.intensity,
        duration: currentFilters.duration,
    })

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value }
        setFilters(newFilters)
        onFilterChange(newFilters)
    }

    const handleReset = () => {
        const resetFilters = { category: "", intensity: "", duration: "" }
        setFilters(resetFilters)
        onFilterChange(resetFilters)
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <div className="space-y-4 md:space-y-0 md:flex md:items-end md:space-x-6">
                {/* Категория */}
                <div className="flex-1">
                    <label htmlFor="categories" className="block text-sm font-medium text-gray-700 mb-2">
                        Категория
                    </label>
                    <select
                        id="categories"
                        value={filters.category}
                        onChange={(e) => handleFilterChange("category", e.target.value)}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    >
                        <option value="">Все категории</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Интенсивность */}
                <div className="flex-1">
                    <label htmlFor="intensity" className="block text-sm font-medium text-gray-700 mb-2">
                        Интенсивность
                    </label>
                    <select
                        id="intensity"
                        value={filters.intensity}
                        onChange={(e) => handleFilterChange("intensity", e.target.value)}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    >
                        <option value="">Любая</option>
                        {intensivityLevels.map((level) => (
                            <option key={level} value={level}>
                                {level}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Продолжительность */}
                <div className="flex-1">
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                        Продолжительность
                    </label>
                    <select
                        id="duration"
                        value={filters.duration}
                        onChange={(e) => handleFilterChange("duration", e.target.value)}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    >
                        <option value="">Любая</option>
                        {durations.map((duration) => (
                            <option key={duration} value={duration}>
                                {duration} мин
                            </option>
                        ))}
                    </select>
                </div>

                {/* Кнопки */}
                <div className="flex space-x-3">
                    <button
                        type="button"
                        onClick={handleReset}
                        className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors"
                    >
                        Сбросить
                    </button>
                </div>
            </div>
        </div>
    )
}
