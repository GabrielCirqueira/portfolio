import { ClarityProvider } from '@app/contexts/ClarityContext'
import { Outlet } from 'react-router-dom'

export function RootLayout() {
  return (
    <ClarityProvider>
      <Outlet />
    </ClarityProvider>
  )
}
