export default function Title({ className = "", children, subtitle, ...props }) {
    return (
        <div className="mb-8">
            <h1 className={`text-3xl font-bold text-gray-900 mb-2 ${className}`} {...props}>
                {children}
            </h1>

            {subtitle && (
                <p className="text-gray-600">
                    {subtitle}
                </p>
            )}
        </div>
    )
}