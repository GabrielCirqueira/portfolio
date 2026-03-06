import { useEffect } from 'react'

const CRITICAL_IMAGES = [
  '/images/sistemas/spacenow/home.webp',
  '/images/sistemas/monitoramento/home.webp',
  '/images/sistemas/estoquePDV/home.webp',
  '/images/sistemas/organizaBus/Login.webp',
]

export function PreloadCriticalResources() {
  useEffect(() => {
    const preloadImages = () => {
      CRITICAL_IMAGES.forEach((src) => {
        const link = document.createElement('link')
        link.rel = 'prefetch'
        link.as = 'image'
        link.href = src
        document.head.appendChild(link)
      })
    }

    if ('requestIdleCallback' in window) {
      requestIdleCallback(preloadImages, { timeout: 2000 })
    } else {
      setTimeout(preloadImages, 1000)
    }
  }, [])

  return null
}
