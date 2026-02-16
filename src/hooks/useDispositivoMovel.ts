import { useEffect, useState } from 'react'

export function useDispositivoMovel(): boolean {
  const [ehMovel, setEhMovel] = useState(false)

  useEffect(() => {
    const verificarDispositivo = () => {
      const largura = window.innerWidth
      const userAgent = navigator.userAgent.toLowerCase()
      const ehDispositivoMovel =
        /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)

      setEhMovel(largura < 768 || ehDispositivoMovel)
    }

    verificarDispositivo()
    window.addEventListener('resize', verificarDispositivo)

    return () => window.removeEventListener('resize', verificarDispositivo)
  }, [])

  return ehMovel
}
