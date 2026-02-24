import { EasterEgg } from '@app/components/ui/EasterEgg'
import { ThemeProvider } from '@app/contexts'
import { EasterEggProvider } from '@app/contexts/EasterEggContext'
import { WelcomeProvider } from '@app/contexts/WelcomeContext'
import { MainLayout, RootLayout } from '@app/layouts'
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
          <Route path="projetos" lazy={() => import('@app/pages/Projetos/Projetos')} />
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
        <WelcomeProvider>
          <EasterEgg />
          <RouterProvider router={router} />
        </WelcomeProvider>
      </EasterEggProvider>
    </ThemeProvider>
  )
}
