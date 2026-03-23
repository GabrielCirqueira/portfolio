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

  const ULTIMA_RECARGA_KEY = 'v_preload_last_reload'
  const agora = Date.now()
  const ultimaRecarga = localStorage.getItem(ULTIMA_RECARGA_KEY)

  if (ultimaRecarga && agora - Number(ultimaRecarga) < 5000) {
    console.warn('[Vite] Recarga contínua detectada. Abortando reload automático para evitar loop.')
    return
  }

  localStorage.setItem(ULTIMA_RECARGA_KEY, agora.toString())
  window.location.reload()
})

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)
