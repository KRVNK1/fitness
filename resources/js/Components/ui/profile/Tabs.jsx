import { createContext, useContext, useState } from "react"

const TabsContext = createContext()

export function Tabs({ value, onValueChange, className = "", children, ...props }) {
    const [internalValue, setInternalValue] = useState(value)

    const currentValue = value !== undefined ? value : internalValue
    const handleValueChange = onValueChange || setInternalValue

    return (
        <TabsContext.Provider value={{ value: currentValue, onValueChange: handleValueChange }}>
            <div className={className} {...props}>
                {children}
            </div>
        </TabsContext.Provider>
    )
}

export function TabsList({ className = "", children, ...props }) {
    return (
        <div
            className={`inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground ${className}`}
            {...props}
        >
            {children}
        </div>
    )
}

export function TabsTrigger({ value, className = "", children, ...props }) {
    const context = useContext(TabsContext)
    const isActive = context.value === value

    return (
        <button
            type="button"
            className={`inline-flex items-center justify-center px-3 py-2 text-sm lg:text-base font-medium disabled:pointer-events-none ${isActive ? "border-b-2" : "hover:border-b-2"} ${className}`}
            onClick={() => context.onValueChange(value)}
            {...props}
        >
            {children}
        </button>
    )
}

export function TabsContent({ value, className = "", children, ...props }) {
    const context = useContext(TabsContext)

    if (context.value !== value) {
        return null
    }

    return (
        <div
            className={`mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}
            {...props}
        >
            {children}
        </div>
    )
}
