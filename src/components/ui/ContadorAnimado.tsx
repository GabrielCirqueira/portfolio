import { animate, useInView } from 'framer-motion'
import { memo, useEffect, useRef, useState } from 'react'
import { Span } from '@/shadcn/components/ui/typography'

interface ContadorAnimadoProps {
  de?: number
  ate: number
  duracao?: number
  sufixo?: string
  prefixo?: string
  className?: string
}

export const ContadorAnimado = memo(
  ({
    de = 0,
    ate,
    duracao = 2,
    sufixo = '',
    prefixo = '',
    className = '',
  }: ContadorAnimadoProps) => {
    const ref = useRef<HTMLSpanElement>(null)
    const estaVisivel = useInView(ref, { once: true, margin: '-50px' })
    const [valorExibido, setValorExibido] = useState(de)

    useEffect(() => {
      if (!estaVisivel) return
      const controles = animate(de, ate, {
        duration: duracao,
        ease: 'easeOut',
        onUpdate: (ultimo) => setValorExibido(Math.round(ultimo)),
      })
      return controles.stop
    }, [estaVisivel, de, ate, duracao])

    return (
      <Span ref={ref} className={className}>
        {prefixo}
        {valorExibido}
        {sufixo}
      </Span>
    )
  }
)
