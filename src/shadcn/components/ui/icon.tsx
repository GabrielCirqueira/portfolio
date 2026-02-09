import { cn } from '@shadcn/lib/utils'
import type { LucideIcon } from 'lucide-react'
import * as React from 'react'

export interface IconProps extends React.SVGAttributes<SVGElement> {
  icon: LucideIcon

  size?: number

  className?: string

  strokeWidth?: number
}

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ icon: LucideIconComponent, size = 24, className, strokeWidth = 2, ...props }, ref) => {
    return (
      <LucideIconComponent
        ref={ref}
        size={size}
        strokeWidth={strokeWidth}
        className={cn('inline-block text-gray-700 dark:text-gray-300 ', className)}
        {...props}
      />
    )
  }
)

Icon.displayName = 'Icon'
