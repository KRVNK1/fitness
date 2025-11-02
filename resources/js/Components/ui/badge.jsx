export function Badge({ variant = "default", className = "", children, ...props }) {
    const variants = {
        default: "bg-blue-500 text-white",
        secondary: "bg-gray-200 text-gray-800",
        destructive: "bg-red-500 text-white",
        outline: "bg-green-600 text-white",
    }

    return (
        <div
            className={`w-28 lg:w-32 inline-flex justify-center items-center bg-green rounded-full border px-2.5 py-0.5 text-xs lg:text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </div>
    )
}
