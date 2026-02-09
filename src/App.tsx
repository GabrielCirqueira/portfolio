import { ThemeProvider } from '@app/contexts'
import { ClarityProvider } from '@app/contexts/ClarityContext'
import { MainLayout } from '@app/layouts'
import Clarity from '@microsoft/clarity'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'

const clarityProjectId = 'SEU_PROJECT_ID_AQUI'

Clarity.init(clarityProjectId)

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<MainLayout />}>
        <Route index lazy={() => import('@app/pages/Home/Home')} />
        <Route path="*" lazy={() => import('@app/pages/NotFound/NotFound')} />
      </Route>
    </Route>
  )
)

export default function App() {
  return (
    <ClarityProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ClarityProvider>
  )
}
