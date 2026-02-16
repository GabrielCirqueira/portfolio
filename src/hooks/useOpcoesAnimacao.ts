import { useEffect, useState } from 'react'

interface OpcoesAnimacao {
  preferirMovimentoReduzido: boolean
  ehMovel: boolean
  deveLimitarAnimacoes: boolean
}

export function useOpcoesAnimacao(): OpcoesAnimacao {
  const [opcoes, setOpcoes] = useState<OpcoesAnimacao>({
    preferirMovimentoReduzido: false,
    ehMovel: false,
    deveLimitarAnimacoes: false,
  })

  useEffect(() => {
    const verificarConfiguracoes = () => {
      const largura = window.innerWidth
      const userAgent = navigator.userAgent.toLowerCase()
      const ehDispositivoMovel =
        /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent) ||
        largura < 768

      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      const preferirMovimentoReduzido = mediaQuery.matches

      setOpcoes({
        preferirMovimentoReduzido,
        ehMovel: ehDispositivoMovel,
        deveLimitarAnimacoes: ehDispositivoMovel || preferirMovimentoReduzido,
      })
    }

    verificarConfiguracoes()

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = () => verificarConfiguracoes()

    mediaQuery.addEventListener('change', handleChange)
    window.addEventListener('resize', verificarConfiguracoes)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
      window.removeEventListener('resize', verificarConfiguracoes)
    }
  }, [])

  return opcoes
}
