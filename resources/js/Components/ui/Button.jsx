export function Button({
    variant = "default",
    size = "default",
    className = "",
    children,
    disabled = false,
    ...props
}) {
    
    return (
        <button
            className={`inline-flex items-center justify-center px-4 py-2 text-white text-sm font-medium rounded-md transition-colors ${className}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    )
}
