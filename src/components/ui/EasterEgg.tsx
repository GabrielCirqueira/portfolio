import { AnimatePresence, motion } from 'framer-motion'
import { memo, useCallback, useEffect, useRef, useState } from 'react'

const KONAMI_CODE = ['c', 'i', 'r', 'q', 'u', 'e', 'i', 'r', 'a']

const matrixChars =
  'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモ0123456789ABCDEF'

const MatrixRain = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = new Array(columns).fill(1)

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#a855f7'
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const char = matrixChars[Math.floor(Math.random() * matrixChars.length)]
        ctx.fillText(char, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 35)
    return () => clearInterval(interval)
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
})

export const EasterEgg = memo(() => {
  const [triggered, setTriggered] = useState(false)
  const inputRef = useRef<string[]>([])
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    inputRef.current.push(e.key)

    if (inputRef.current.length > KONAMI_CODE.length) {
      inputRef.current.shift()
    }

    const match = inputRef.current.every((key, i) => key === KONAMI_CODE[i])
    if (match && inputRef.current.length === KONAMI_CODE.length) {
      setTriggered(true)
      inputRef.current = []
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    if (triggered) {
      timeoutRef.current = setTimeout(() => setTriggered(false), 10000)
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
      }
    }
  }, [triggered])

  return (
    <AnimatePresence>
      {triggered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] pointer-events-none"
        >
          <MatrixRain />

          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center p-8 bg-black/80 backdrop-blur-xl rounded-2xl border border-brand-500/50 shadow-[0_0_60px_var(--tw-shadow-color)] shadow-brand-500/20">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 0.5, repeat: 3 }}
                className="text-5xl sm:text-6xl mb-4"
              >
                🎮
              </motion.div>
              <p className="text-brand-500 font-mono text-lg sm:text-xl font-bold tracking-wider">
                KONAMI CODE ATIVADO!
              </p>
              <p className="text-zinc-400 font-mono text-xs mt-2">Você encontrou o segredo 🕹️</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
})
