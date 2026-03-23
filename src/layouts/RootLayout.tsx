import { ClarityProvider } from '@app/contexts/ClarityContext'
import { Outlet } from 'react-router-dom'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'

export function RootLayout() {
  return (
    <ErrorBoundary>
      <ClarityProvider>
        <Outlet />
      </ClarityProvider>
    </ErrorBoundary>
  )
}
