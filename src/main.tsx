import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found')
}

window.addEventListener('vite:preloadError', (event) => {
  console.error('[Vite] Erro ao pré-carregar chunk:', event)
  window.location.reload()
})

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)
