import { animate, useInView } from 'framer-motion'
import { memo, useEffect, useRef, useState } from 'react'
import { Box } from '@/shadcn/components/ui/layout'
import { Span } from '@/shadcn/components/ui/typography'

interface BarraHabilidadeProps {
  nome: string
  porcentagem: number
  cor?: string
  atraso?: number
}

export const BarraHabilidade = memo(
  ({ nome, porcentagem, cor: _cor = 'brand-500', atraso = 0 }: BarraHabilidadeProps) => {
    const ref = useRef<HTMLDivElement>(null)
    const estaVisivel = useInView(ref, { once: true, margin: '-30px' })
    const [largura, setLargura] = useState(0)
    const [valorExibido, setValorExibido] = useState(0)

    useEffect(() => {
      if (!estaVisivel) return
      const timeout = setTimeout(() => {
        setLargura(porcentagem)
        const controles = animate(0, porcentagem, {
          duration: 1.5,
          ease: 'easeOut',
          onUpdate: (v) => setValorExibido(Math.round(v)),
        })
        return controles.stop
      }, atraso * 1000)
      return () => clearTimeout(timeout)
    }, [estaVisivel, porcentagem, atraso])

    return (
      <Box ref={ref} className="group">
        <Box className="flex justify-between items-center mb-1.5">
          <Span className="text-xs sm:text-sm font-mono font-bold text-zinc-300 uppercase tracking-wider group-hover:text-white transition-colors">
            {nome}
          </Span>
          <Span className="text-[10px] sm:text-xs font-mono font-bold text-brand-400 tabular-nums">
            {valorExibido}%
          </Span>
        </Box>
        <Box className="h-1.5 sm:h-2 bg-zinc-800/60 rounded-full overflow-hidden relative">
          <Box
            className="h-full bg-gradient-to-r from-brand-600 to-brand-400 rounded-full transition-all duration-[1500ms] ease-out relative"
            style={{ width: `${largura}%` }}
          >
            <Box className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite] opacity-0 group-hover:opacity-100 transition-opacity" />
          </Box>
          <Box
            className="absolute top-0 h-full rounded-full shadow-[0_0_10px_var(--tw-shadow-color)] shadow-brand-500/40 transition-all duration-[1500ms] ease-out"
            style={{ width: `${largura}%` }}
          />
        </Box>
      </Box>
    )
  }
)
