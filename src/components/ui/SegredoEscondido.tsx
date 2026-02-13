import { AnimatePresence, motion } from 'framer-motion'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { Box } from '@/shadcn/components/ui/layout'
import { Text } from '@/shadcn/components/ui/typography'

const CODIGO_SECRETO = ['c', 'i', 'r', 'q', 'u', 'e', 'i', 'r', 'a']

const caracteresMatrix =
  'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモ0123456789ABCDEF'

const ChuvaMatrix = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const tamanhoFonte = 14
    const colunas = Math.floor(canvas.width / tamanhoFonte)
    const gotas: number[] = new Array(colunas).fill(1)

    const desenhar = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#a855f7'
      ctx.font = `${tamanhoFonte}px monospace`

      for (let i = 0; i < gotas.length; i++) {
        const caractere = caracteresMatrix[Math.floor(Math.random() * caracteresMatrix.length)]
        ctx.fillText(caractere, i * tamanhoFonte, gotas[i] * tamanhoFonte)

        if (gotas[i] * tamanhoFonte > canvas.height && Math.random() > 0.975) {
          gotas[i] = 0
        }
        gotas[i]++
      }
    }

    const intervalo = setInterval(desenhar, 35)
    return () => clearInterval(intervalo)
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
})

export const SegredoEscondido = memo(() => {
  const [ativado, setAtivado] = useState(false)
  const entradaRef = useRef<string[]>([])
  const tempoRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const aoTeclar = useCallback((e: KeyboardEvent) => {
    entradaRef.current.push(e.key)

    if (entradaRef.current.length > CODIGO_SECRETO.length) {
      entradaRef.current.shift()
    }

    const corresponde = entradaRef.current.every((tecla, i) => tecla === CODIGO_SECRETO[i])
    if (corresponde && entradaRef.current.length === CODIGO_SECRETO.length) {
      setAtivado(true)
      entradaRef.current = []
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', aoTeclar)
    return () => window.removeEventListener('keydown', aoTeclar)
  }, [aoTeclar])

  useEffect(() => {
    if (ativado) {
      tempoRef.current = setTimeout(() => setAtivado(false), 10000)
      return () => {
        if (tempoRef.current) clearTimeout(tempoRef.current)
      }
    }
  }, [ativado])

  return (
    <AnimatePresence>
      {ativado && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] pointer-events-none"
        >
          <ChuvaMatrix />

          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Box className="text-center p-8 bg-black/80 backdrop-blur-xl rounded-2xl border border-brand-500/50 shadow-[0_0_60px_var(--tw-shadow-color)] shadow-brand-500/20">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 0.5, repeat: 3 }}
                className="text-5xl sm:text-6xl mb-4"
              >
                🎮
              </motion.div>
              <Text className="text-brand-500 font-mono text-lg sm:text-xl font-bold tracking-wider">
                KONAMI CODE ATIVADO!
              </Text>
              <Text className="text-zinc-400 font-mono text-xs mt-2">
                Você encontrou o segredo 🕹️
              </Text>
            </Box>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
})
