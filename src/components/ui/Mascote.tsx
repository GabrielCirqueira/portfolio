import { useEasterEgg } from '@app/contexts/EasterEggContext'
import { type SectionId, useVisibleSection } from '@app/hooks/useVisibleSection'
import { AnimatePresence, motion } from 'framer-motion'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { MascoteVisual } from '@/components/ui/MascoteVisual'
import { useWelcome } from '@/contexts/WelcomeContext'

const mascoteMessages: Record<SectionId, string> = {
  inicio: '👋 Bem-vindo ao meu portfólio!',
  sobre: '🤓 Conheça mais sobre mim',
  habilidades: '💪 Minhas tecnologias',
  projetos: '🚀 Veja meus projetos',
  formacao: '🎓 Minha jornada acadêmica',
  contato: '📬 Vamos conversar?',
}

const crazyMessages = [
  '🤪 MODO MALUCO ATIVADO!',
  '⚡ SISTEMA HACKEADO!',
  '🔥 CAOS TOTAL!',
  '💥 ERRO ERRO ERRO!',
  '🌀 GIRANDO SEM PARAR!',
  '👾 INFECTED!',
  '🚨 ALERTA VERMELHO!',
  '💣 EXPLOSÃO IMINENTE!',
]

const LONG_PRESS_DURATION = 2000

export const Mascote = memo(() => {
  const currentSection = useVisibleSection()
  const { isActive, activate } = useEasterEgg()
  const { isWelcomeModalOpen } = useWelcome()
  const [showMessage, setShowMessage] = useState(false)
  const [crazyMessage, setCrazyMessage] = useState(crazyMessages[0])
  const [hintMessage, setHintMessage] = useState<string | null>(null)
  const [longPressProgress, setLongPressProgress] = useState(0)
  const isHoveringRef = useRef(false)
  const crazyIndexRef = useRef(0)
  const longPressStartRef = useRef<number>(0)
  const longPressIntervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined)

  const cancelLongPress = useCallback(() => {
    if (longPressIntervalRef.current) clearInterval(longPressIntervalRef.current)
    setLongPressProgress(0)
  }, [])

  const startLongPress = useCallback(() => {
    if (isActive) return
    longPressStartRef.current = Date.now()
    setLongPressProgress(0)
    longPressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - longPressStartRef.current
      const progress = Math.min(elapsed / LONG_PRESS_DURATION, 1)
      setLongPressProgress(progress)
      if (progress >= 1) {
        clearInterval(longPressIntervalRef.current)
        setLongPressProgress(0)
        activate()
      }
    }, 16)
  }, [isActive, activate])

  const message = isActive ? crazyMessage : hintMessage || mascoteMessages[currentSection]

  // biome-ignore lint/correctness/useExhaustiveDependencies: x
  useEffect(() => {
    if (!isActive) {
      setHintMessage(null)
      setShowMessage(true)
      const timer = setTimeout(() => {
        if (!isHoveringRef.current) {
          setShowMessage(false)
        }
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isActive, currentSection])

  useEffect(() => {
    if (isActive) return

    const interval = setInterval(() => {
      if (Math.random() > 0.7 && !isHoveringRef.current && !showMessage) {
        const isMobile = window.matchMedia('(pointer: coarse)').matches
        const hints = [
          'Psst... já encontrou o segredo? 🕵️‍♂️',
          isMobile
            ? 'Segure em mim por 2 segundos... 🤫'
            : "Tente digitar 'cirqueira' no teclado... 👀",
          'Tem um easter egg escondido por aqui... 🥚',
          isMobile ? 'Tente me segurar... 👆' : 'Gosta de Matrix? 😎',
          'O sistema tem segredos...',
        ]
        const randomHint = hints[Math.floor(Math.random() * hints.length)]

        setHintMessage(randomHint)
        setShowMessage(true)

        setTimeout(() => {
          setHintMessage(null)
          if (!isHoveringRef.current) {
            setShowMessage(false)
          }
        }, 5000)
      }
    }, 15000)

    return () => clearInterval(interval)
  }, [isActive, showMessage])

  useEffect(() => {
    if (isActive) {
      setHintMessage(null)
      setShowMessage(true)
      const interval = setInterval(() => {
        crazyIndexRef.current = (crazyIndexRef.current + 1) % crazyMessages.length
        setCrazyMessage(crazyMessages[crazyIndexRef.current])
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isActive])

  if (isWelcomeModalOpen) return null

  return (
    <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-50 flex flex-col items-start gap-2">
      <AnimatePresence mode="wait">
        {showMessage && (
          <motion.div
            key={isActive ? crazyMessage : currentSection}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25,
            }}
            className={`relative mb-1`}
          >
            <div
              className={`relative bg-gradient-to-br ${isActive ? 'from-purple-900 to-red-950 border-purple-500' : 'from-zinc-900 to-zinc-950 border-brand-500/40'} border-2 px-3 py-2 md:px-4 md:py-2 rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.2)] backdrop-blur-sm`}
            >
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-b ${isActive ? 'from-purple-500/40' : 'from-brand-500/20'} to-transparent rounded-t-xl`}
              />

              <p
                className={`relative ${isActive ? 'text-purple-400' : 'text-brand-500'} text-xs md:text-sm font-semibold whitespace-nowrap tracking-wide`}
              >
                {message}
              </p>
            </div>
            <div
              className={`absolute -bottom-1.5 left-4 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[8px] ${isActive ? 'border-t-purple-500' : 'border-t-brand-500/40'}`}
            />
            <div
              className={`absolute -bottom-1 left-4 ml-0.5 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[7px] ${isActive ? 'border-t-red-950' : 'border-t-zinc-950'}`}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        {longPressProgress > 0 && (
          <svg
            aria-hidden="true"
            className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)] -rotate-90 pointer-events-none z-20"
            viewBox="0 0 64 72"
            fill="none"
          >
            <rect
              x="1.5"
              y="1.5"
              width="62"
              height="69"
              rx="12"
              ry="12"
              stroke="#22c55e"
              strokeWidth="3"
              strokeDasharray={`${(61 + 69) * 2}`}
              strokeDashoffset={`${(61 + 69) * 2 * (1 - longPressProgress)}`}
              strokeLinecap="round"
              style={{ filter: 'drop-shadow(0 0 6px rgba(34,197,94,1))' }}
            />
          </svg>
        )}

        <motion.button
          type="button"
          onHoverStart={() => {
            isHoveringRef.current = true
            setShowMessage(true)
          }}
          onHoverEnd={() => {
            isHoveringRef.current = false
            setShowMessage(false)
            cancelLongPress()
          }}
          onPointerDown={startLongPress}
          onPointerUp={cancelLongPress}
          onPointerLeave={cancelLongPress}
          onTouchStart={() => setShowMessage(true)}
          onTouchEnd={() => setTimeout(() => setShowMessage(false), 2000)}
          whileHover={{ scale: isActive ? 1.2 : 1.05 }}
          whileTap={{ scale: 0.95 }}
          layoutId="mascote-hero"
          animate={
            isActive
              ? {
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }
              : {}
          }
          transition={
            isActive
              ? {
                  rotate: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: 'linear' },
                  scale: { duration: 1, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' },
                }
              : {}
          }
          className="relative w-12 h-14 md:w-14 md:h-16 cursor-pointer group"
          aria-label="Assistente virtual"
        >
          <MascoteVisual isActive={isActive} />
        </motion.button>
      </div>
    </div>
  )
})

Mascote.displayName = 'Mascote'
