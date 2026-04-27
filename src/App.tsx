import { PreloadCriticalResources } from '@app/components/ui/PreloadCriticalResources'
import { AnimationProvider, ThemeProvider } from '@app/contexts'
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
            path="projetos/:id"
            lazy={() => importWithRetry(() => import('@app/pages/ProjetoDetalhes/ProjetoDetalhes'))}
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
        <WelcomeProvider>
          <PreloadCriticalResources />
          <RouterProvider router={router} />
        </WelcomeProvider>
      </AnimationProvider>
    </ThemeProvider>
  )
}
