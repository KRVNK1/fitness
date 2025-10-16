export function Input({ className = "", ...props }) {
    return (
        <input
            className={`className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#7f36dd] focus:border-[#7f36dd] transition-colors ${className}`}
            {...props}
        />
    )
}
