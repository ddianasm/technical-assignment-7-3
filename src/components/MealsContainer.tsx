import cn from "classnames"
import { forwardRef, HTMLAttributes } from "react"


export const MealsContainer = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ children, className, ...restProps }, ref) => (
        <div ref={ref} {...restProps} className={cn("flex flex-col items-center w-full", className)} >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
                {children}
            </div>
        </div>
    )
)