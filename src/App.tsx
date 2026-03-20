import { EasterEgg } from '@app/components/ui/EasterEgg'
import { PreloadCriticalResources } from '@app/components/ui/PreloadCriticalResources'
import { AnimationProvider, ThemeProvider } from '@app/contexts'
import { EasterEggProvider } from '@app/contexts/EasterEggContext'
import { WelcomeProvider } from '@app/contexts/WelcomeContext'
import { MainLayout, RootLayout } from '@app/layouts'
import { importWithRetry } from '@app/utils/importRetry'
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
          <Route index lazy={() => importWithRetry(() => import('@app/pages/Home/Home'))} />
          <Route
            path="projetos"
            lazy={() => importWithRetry(() => import('@app/pages/Projetos/Projetos'))}
          />
          <Route
            path="*"
            lazy={() => importWithRetry(() => import('@app/pages/NotFound/NotFound'))}
          />
        </Route>
      </Route>
    </Route>
  )
)

export default function App() {
  return (
    <ThemeProvider>
      <AnimationProvider>
        <EasterEggProvider>
          <WelcomeProvider>
            <PreloadCriticalResources />
            <EasterEgg />
            <RouterProvider router={router} />
          </WelcomeProvider>
        </EasterEggProvider>
      </AnimationProvider>
    </ThemeProvider>
  )
}
