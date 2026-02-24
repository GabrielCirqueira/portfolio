import { useAnimacaoOtimizada } from './useAnimacaoOtimizada'

export function useOpcoesAnimacaoOtimizada() {
  const { usarAnimacoes, usarAnimacoesReduzidas, ehDispositivoLento } = useAnimacaoOtimizada()

  return {
    usarAnimacoes,
    usarAnimacoesReduzidas,
    ehDispositivoLento,

    viewport: {
      once: true,
      margin: ehDispositivoLento ? '-20px' : '-50px',
      amount: ehDispositivoLento ? 0.1 : 0.3,
    },

    duration: ehDispositivoLento ? 0.2 : usarAnimacoesReduzidas ? 0.3 : 0.5,

    delay: (baseDelay: number = 0) => (ehDispositivoLento ? 0 : baseDelay),
  }
}
