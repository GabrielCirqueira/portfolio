import { EasterEgg } from '@app/components/ui/EasterEgg'
import { ThemeProvider } from '@app/contexts'
import { EasterEggProvider } from '@app/contexts/EasterEggContext'
import { MainLayout, RootLayout } from '@app/layouts'
import LogRocket from 'logrocket'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'

LogRocket.init('8cvlis/portifolio')

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
  return (
    <ThemeProvider>
      <EasterEggProvider>
        <EasterEgg />
        <RouterProvider router={router} />
      </EasterEggProvider>
    </ThemeProvider>
  )
}
