import type { Transition, Variant } from 'framer-motion'
import { useEffect, useState } from 'react'

interface OpcoesAnimacao {
  usarAnimacoes: boolean
  usarAnimacoesReduzidas: boolean
  ehDispositivoLento: boolean
}

export function useAnimacaoOtimizada(): OpcoesAnimacao {
  const [opcoes, setOpcoes] = useState<OpcoesAnimacao>({
    usarAnimacoes: true,
    usarAnimacoesReduzidas: false,
    ehDispositivoLento: false,
  })

  useEffect(() => {
    const verificarDispositivo = () => {
      const prefereMovimentoReduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      const ehMobile =
        /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
          navigator.userAgent.toLowerCase()
        ) || window.innerWidth < 768

      const cores = navigator.hardwareConcurrency || 2
      const memoria = (navigator as any).deviceMemory
      const ehBaixaPerformance = (memoria && memoria < 4) || cores < 4

      const ehLento = ehMobile && ehBaixaPerformance

      setOpcoes({
        usarAnimacoes: !prefereMovimentoReduzido,
        usarAnimacoesReduzidas: ehMobile || prefereMovimentoReduzido,
        ehDispositivoLento: ehLento,
      })
    }

    verificarDispositivo()

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    mediaQuery.addEventListener('change', verificarDispositivo)
    window.addEventListener('resize', verificarDispositivo)

    return () => {
      mediaQuery.removeEventListener('change', verificarDispositivo)
      window.removeEventListener('resize', verificarDispositivo)
    }
  }, [])

  return opcoes
}

/**
 * Retorna variantes de animação otimizadas para entradsa de elementos
 */
export function variantesEntrada(delay: number = 0): {
  initial: Variant
  animate: Variant
  transition: Transition
} {
  const { usarAnimacoes, usarAnimacoesReduzidas, ehDispositivoLento } = useAnimacaoOtimizada()

  if (!usarAnimacoes) {
    return {
      initial: { opacity: 1 },
      animate: { opacity: 1 },
      transition: { duration: 0 },
    }
  }

  if (ehDispositivoLento) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: {
        duration: 0.2,
        ease: 'easeOut',
        delay: 0,
      },
    }
  }

  if (usarAnimacoesReduzidas) {
    return {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      transition: {
        duration: 0.3,
        ease: 'easeOut',
        delay: Math.min(delay, 0.1),
      },
    }
  }

  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      delay,
    },
  }
}

/**
 * Retorna props otimizadas para animações whileInView
 */
export function propsWhileInView() {
  const { ehDispositivoLento } = useAnimacaoOtimizada()

  return {
    viewport: {
      once: true,
      margin: ehDispositivoLento ? '0px' : '-50px',
      amount: ehDispositivoLento ? 0.1 : 0.3,
    },
    transition: {
      duration: ehDispositivoLento ? 0.2 : 0.3,
      ease: 'easeOut' as const,
    },
  }
}

/**
 * Retorna duração de transiçao otimizada
 */
export function duracaoTransicao(duracaoPadrao: number = 0.3): number {
  const { ehDispositivoLento } = useAnimacaoOtimizada()

  if (ehDispositivoLento) return Math.min(duracaoPadrao * 0.5, 0.2)

  return duracaoPadrao
}
