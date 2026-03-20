import type React from 'react'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

interface OpcoesAnimacao {
  usarAnimacoes: boolean
  usarAnimacoesReduzidas: boolean
  ehDispositivoLento: boolean
  usarEfeitosPesados: boolean
}

interface AnimationContextType extends OpcoesAnimacao {
  viewport: {
    once: boolean
    margin: string
    amount: number
  }
  duration: number
  getDelay: (baseDelay?: number) => number
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined)

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [opcoes, setOpcoes] = useState<OpcoesAnimacao>({
    usarAnimacoes: true,
    usarAnimacoesReduzidas: false,
    ehDispositivoLento: false,
    usarEfeitosPesados: true,
  })

  useEffect(() => {
    const verificarDispositivo = () => {
      const prefereMovimentoReduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      const userAgent = navigator.userAgent.toLowerCase()
      const ehMobile =
        /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent) ||
        window.innerWidth < 768

      const cores = navigator.hardwareConcurrency || 4
      const memoria = (navigator as any).deviceMemory || 4

      const ehBaixaPerformance = memoria < 4 || cores < 4
      const ehLento = (ehMobile && ehBaixaPerformance) || prefereMovimentoReduzido

      const usarEfeitosPesados = !ehMobile && !ehBaixaPerformance

      setOpcoes({
        usarAnimacoes: !prefereMovimentoReduzido,
        usarAnimacoesReduzidas: prefereMovimentoReduzido || (ehMobile && ehBaixaPerformance),
        ehDispositivoLento: ehLento,
        usarEfeitosPesados: usarEfeitosPesados,
      })
    }

    verificarDispositivo()

    let timeoutId: number
    const debouncedCheck = () => {
      clearTimeout(timeoutId)
      timeoutId = window.setTimeout(verificarDispositivo, 150)
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    mediaQuery.addEventListener('change', verificarDispositivo)
    window.addEventListener('resize', debouncedCheck)

    return () => {
      clearTimeout(timeoutId)
      mediaQuery.removeEventListener('change', verificarDispositivo)
      window.removeEventListener('resize', debouncedCheck)
    }
  }, [])

  const value = useMemo<AnimationContextType>(
    () => ({
      ...opcoes,
      viewport: {
        once: true,
        margin: opcoes.ehDispositivoLento ? '-20px' : '-50px',
        amount: opcoes.ehDispositivoLento ? 0.1 : 0.3,
      },
      duration: opcoes.ehDispositivoLento ? 0.2 : opcoes.usarAnimacoesReduzidas ? 0.3 : 0.5,
      getDelay: (baseDelay: number = 0) => (opcoes.ehDispositivoLento ? 0 : baseDelay),
    }),
    [opcoes]
  )

  return <AnimationContext.Provider value={value}>{children}</AnimationContext.Provider>
}

export function useAnimation() {
  const context = useContext(AnimationContext)
  if (!context) {
    throw new Error('useAnimation must be used within AnimationProvider')
  }
  return context
}
