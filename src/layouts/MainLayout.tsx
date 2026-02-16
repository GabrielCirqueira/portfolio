import { Box } from '@shadcn/layout'
import { cn } from '@shadcn/lib/utils'
import * as React from 'react'
import { Outlet } from 'react-router-dom'
import { ModalBoasVindas } from '@/components/modal/ModalBoasVindas'

export interface MainLayoutProps {
  className?: string
}

export const MainLayout = React.forwardRef<HTMLDivElement, MainLayoutProps>(
  ({ className }, ref) => {
    return (
      <Box ref={ref} className={cn('min-h-screen', 'flex flex-col', 'antialiased', className)}>
        <Box className="flex-1 flex flex-col">
          <ModalBoasVindas />
          <Outlet />
        </Box>
      </Box>
    )
  }
)

MainLayout.displayName = 'MainLayout'
