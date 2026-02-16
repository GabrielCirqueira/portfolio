import { EasterEgg } from '@app/components/ui/EasterEgg'
import { ThemeProvider } from '@app/contexts'
import { EasterEggProvider } from '@app/contexts/EasterEggContext'
import { MainLayout, RootLayout } from '@app/layouts'
import { useEffect } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<RootLayout />}>
        <Route element={<MainLayout />}>
          <Route index lazy={() => import('@app/pages/Home/Home')} />
          <Route path="*" lazy={() => import('@app/pages/NotFound/NotFound')} />
        </Route>
      </Route>
    </Route>
  )
)

export default function App() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        import('logrocket').then((LogRocket) => {
          LogRocket.default.init('8cvlis/portifolio')
        })
      })
    } else {
      setTimeout(() => {
        import('logrocket').then((LogRocket) => {
          LogRocket.default.init('8cvlis/portifolio')
        })
      }, 3000)
    }
  }, [])

  return (
    <ThemeProvider>
      <EasterEggProvider>
        <EasterEgg />
        <RouterProvider router={router} />
      </EasterEggProvider>
    </ThemeProvider>
  )
}
