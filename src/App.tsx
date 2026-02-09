import { ThemeProvider } from '@app/contexts'
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
          <Route path="*" lazy={() => import('@app/pages/NotFound/NotFound')} />
        </Route>
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
