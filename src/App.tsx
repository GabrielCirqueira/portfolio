import { ThemeProvider } from '@app/contexts'
import { MainLayout } from '@app/layouts'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'

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
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
