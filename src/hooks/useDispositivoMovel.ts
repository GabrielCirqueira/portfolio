import { useEffect, useState } from 'react'
import { debounce, isMobileDevice } from '@/utils/performance'

export function useDispositivoMovel(): boolean {
  const [ehMovel, setEhMovel] = useState(() => isMobileDevice())

  useEffect(() => {
    const verificarDispositivo = debounce(() => {
      setEhMovel(isMobileDevice())
    }, 200)

    verificarDispositivo()
    window.addEventListener('resize', verificarDispositivo, { passive: true })

    return () => window.removeEventListener('resize', verificarDispositivo)
  }, [])

  return ehMovel
}
