import { useEasterEgg } from '@app/contexts/EasterEggContext'
import { type SectionId, useVisibleSection } from '@app/hooks/useVisibleSection'
import { AnimatePresence, motion } from 'framer-motion'
import { memo, useCallback, useEffect, useRef, useState } from 'react'

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
          <motion.div
            className={`absolute inset-0 ${isActive ? 'bg-purple-500/40' : 'bg-brand-500/20'} rounded-xl blur-lg`}
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
          />

          <svg
            viewBox="0 0 48 58"
            className="relative w-full h-full overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <motion.line
              x1="24"
              y1="2"
              x2="24"
              y2="9"
              stroke={isActive ? '#a855f7' : 'rgba(34,197,94,0.5)'}
              strokeWidth="1.5"
              strokeLinecap="round"
              animate={
                isActive
                  ? { y1: [-2, 2, -2], y2: [-2, 2, -2] }
                  : { y1: [-0.5, 0.5, -0.5], y2: [-0.5, 0.5, -0.5] }
              }
              transition={
                isActive
                  ? { duration: 0.4, repeat: Number.POSITIVE_INFINITY }
                  : { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }
              }
            />
            <motion.circle
              cx="24"
              cy="2"
              r="2.5"
              fill={isActive ? '#a855f7' : '#22c55e'}
              animate={
                isActive
                  ? {
                      fill: ['#a855f7', '#ef4444', '#f59e0b', '#22c55e', '#3b82f6', '#a855f7'],
                      r: [2.5, 3.2, 2.5],
                    }
                  : { r: [2.5, 3, 2.5] }
              }
              style={{
                filter: isActive
                  ? 'drop-shadow(0 0 5px #a855f7)'
                  : 'drop-shadow(0 0 4px rgba(34,197,94,0.8))',
              }}
              transition={
                isActive
                  ? { duration: 1, repeat: Number.POSITIVE_INFINITY }
                  : { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }
              }
            />

            <rect
              x="8"
              y="8"
              width="32"
              height="20"
              rx="5"
              fill={isActive ? '#2d1b4e' : '#18181b'}
              stroke={isActive ? '#a855f7' : 'rgba(34,197,94,0.6)'}
              strokeWidth="1.5"
            />
            <rect x="10" y="9.5" width="28" height="5" rx="3" fill="white" fillOpacity="0.07" />

            <motion.rect
              x="12"
              y="13"
              width="8"
              height="9"
              rx="2"
              fill={isActive ? '#a855f7' : '#22c55e'}
              style={{
                filter: isActive
                  ? 'drop-shadow(0 0 4px #a855f7)'
                  : 'drop-shadow(0 0 3px rgba(34,197,94,0.7))',
              }}
              animate={
                isActive
                  ? {
                      scaleY: [1, 0.07, 1, 1, 0.07, 1],
                      fill: ['#a855f7', '#ef4444', '#f59e0b', '#22c55e', '#a855f7'],
                    }
                  : { scaleY: [1, 0.07, 1] }
              }
              transition={
                isActive
                  ? { duration: 0.8, repeat: Number.POSITIVE_INFINITY }
                  : { duration: 3, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2.5 }
              }
            />
            <motion.rect
              x="28"
              y="13"
              width="8"
              height="9"
              rx="2"
              fill={isActive ? '#a855f7' : '#22c55e'}
              style={{
                filter: isActive
                  ? 'drop-shadow(0 0 4px #a855f7)'
                  : 'drop-shadow(0 0 3px rgba(34,197,94,0.7))',
              }}
              animate={
                isActive
                  ? {
                      scaleY: [1, 0.07, 1, 1, 0.07, 1],
                      fill: ['#a855f7', '#ef4444', '#f59e0b', '#22c55e', '#a855f7'],
                    }
                  : { scaleY: [1, 0.07, 1] }
              }
              transition={
                isActive
                  ? { duration: 0.8, repeat: Number.POSITIVE_INFINITY, delay: 0.15 }
                  : { duration: 3, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2.5, delay: 0.15 }
              }
            />

            <rect
              x="20"
              y="28"
              width="8"
              height="4"
              fill={isActive ? 'rgba(168,85,247,0.4)' : 'rgba(34,197,94,0.25)'}
            />

            <rect
              x="3"
              y="32"
              width="42"
              height="24"
              rx="6"
              fill={isActive ? '#1e0a3c' : '#18181b'}
              stroke={isActive ? '#a855f7' : 'rgba(34,197,94,0.5)'}
              strokeWidth="1.5"
            />
            <rect x="5" y="33.5" width="38" height="5" rx="4" fill="white" fillOpacity="0.05" />

            <motion.rect
              x="0"
              y="35"
              width="3"
              height="13"
              rx="1.5"
              fill={isActive ? '#2d1b4e' : '#27272a'}
              stroke={isActive ? 'rgba(168,85,247,0.5)' : 'rgba(34,197,94,0.3)'}
              strokeWidth="1"
              animate={isActive ? { rotate: [0, -15, 15, -15, 0] } : {}}
              style={{ transformOrigin: '1.5px 35px' }}
              transition={isActive ? { duration: 0.5, repeat: Number.POSITIVE_INFINITY } : {}}
            />
            <motion.rect
              x="45"
              y="35"
              width="3"
              height="13"
              rx="1.5"
              fill={isActive ? '#2d1b4e' : '#27272a'}
              stroke={isActive ? 'rgba(168,85,247,0.5)' : 'rgba(34,197,94,0.3)'}
              strokeWidth="1"
              animate={isActive ? { rotate: [0, 15, -15, 15, 0] } : {}}
              style={{ transformOrigin: '46.5px 35px' }}
              transition={isActive ? { duration: 0.5, repeat: Number.POSITIVE_INFINITY } : {}}
            />

            <rect
              x="10"
              y="39"
              width="28"
              height="12"
              rx="3"
              fill={isActive ? 'rgba(168,85,247,0.12)' : 'rgba(34,197,94,0.08)'}
              stroke={isActive ? 'rgba(168,85,247,0.25)' : 'rgba(34,197,94,0.2)'}
              strokeWidth="1"
            />
            <motion.rect
              x="14"
              y="43"
              width="20"
              height="3.5"
              rx="1.75"
              fill={isActive ? '#a855f7' : 'rgba(34,197,94,0.8)'}
              style={{
                filter: isActive
                  ? 'drop-shadow(0 0 3px #a855f7)'
                  : 'drop-shadow(0 0 2px rgba(34,197,94,0.5))',
              }}
              animate={
                isActive
                  ? {
                      opacity: [1, 0.2, 1],
                      scaleX: [1, 0.4, 1.4, 1],
                      fill: ['#a855f7', '#ef4444', '#f59e0b', '#22c55e', '#a855f7'],
                    }
                  : { opacity: [0.6, 1, 0.6] }
              }
              transition={
                isActive
                  ? { duration: 0.5, repeat: Number.POSITIVE_INFINITY }
                  : { duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }
              }
            />
          </svg>

          <motion.div
            className={`absolute -top-1 -right-1 w-2.5 h-2.5 md:w-3 md:h-3 ${isActive ? 'bg-purple-500' : 'bg-brand-500'} rounded-full border-2 border-black ${isActive ? 'shadow-[0_0_12px_rgba(168,85,247,0.9)]' : 'shadow-[0_0_8px_rgba(34,197,94,0.8)]'}`}
            animate={
              isActive
                ? {
                    scale: [1, 1.8, 1],
                    rotate: [0, 180, 360],
                    backgroundColor: [
                      '#a855f7',
                      '#ef4444',
                      '#f59e0b',
                      '#22c55e',
                      '#3b82f6',
                      '#a855f7',
                    ],
                    boxShadow: [
                      '0 0 12px rgba(168,85,247,0.9)',
                      '0 0 20px rgba(239,68,68,0.9)',
                      '0 0 20px rgba(245,158,11,0.9)',
                      '0 0 20px rgba(34,197,94,0.9)',
                      '0 0 20px rgba(59,130,246,0.9)',
                      '0 0 12px rgba(168,85,247,0.9)',
                    ],
                  }
                : {
                    scale: [1, 1.3, 1],
                    boxShadow: [
                      '0 0 8px rgba(34,197,94,0.8)',
                      '0 0 16px rgba(34,197,94,1)',
                      '0 0 8px rgba(34,197,94,0.8)',
                    ],
                  }
            }
            transition={
              isActive
                ? {
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                  }
                : {
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'easeInOut',
                  }
            }
          />
        </motion.button>
      </div>
    </div>
  )
})

Mascote.displayName = 'Mascote'
