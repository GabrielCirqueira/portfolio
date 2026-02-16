import { useEasterEgg } from '@app/contexts/EasterEggContext'
import { type SectionId, useVisibleSection } from '@app/hooks/useVisibleSection'
import { AnimatePresence, motion } from 'framer-motion'
import { memo, useEffect, useRef, useState } from 'react'

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

export const Mascote = memo(() => {
  const currentSection = useVisibleSection()
  const { isActive } = useEasterEgg()
  const [showMessage, setShowMessage] = useState(false)
  const [crazyMessage, setCrazyMessage] = useState(crazyMessages[0])
  const isHoveringRef = useRef(false)
  const crazyIndexRef = useRef(0)

  const message = isActive ? crazyMessage : mascoteMessages[currentSection]

  // biome-ignore lint/correctness/useExhaustiveDependencies: Precisamos atualizar quando a seção muda
  useEffect(() => {
    if (!isActive) {
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
    if (isActive) {
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
      {/* Balão de diálogo */}
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
              {/* Brilho superior */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-b ${isActive ? 'from-purple-500/40' : 'from-brand-500/20'} to-transparent rounded-t-xl`}
              />

              <p
                className={`relative ${isActive ? 'text-purple-400' : 'text-brand-500'} text-xs md:text-sm font-semibold whitespace-nowrap tracking-wide`}
              >
                {message}
              </p>
            </div>
            {/* Triângulo do balão apontando para baixo */}
            <div
              className={`absolute -bottom-1.5 left-4 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[8px] ${isActive ? 'border-t-purple-500' : 'border-t-brand-500/40'}`}
            />
            <div
              className={`absolute -bottom-1 left-4 ml-0.5 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[7px] ${isActive ? 'border-t-red-950' : 'border-t-zinc-950'}`}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Robô Mascote */}
      <motion.button
        type="button"
        onHoverStart={() => {
          isHoveringRef.current = true
          setShowMessage(true)
        }}
        onHoverEnd={() => {
          isHoveringRef.current = false
          setShowMessage(false)
        }}
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
        {/* Glow effect de fundo */}
        <motion.div
          className={`absolute inset-0 ${isActive ? 'bg-purple-500/40' : 'bg-brand-500/20'} rounded-xl blur-lg`}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        />

        {/* Corpo do robô */}
        <div className="relative w-full h-full flex flex-col items-center justify-center gap-0.5">
          {/* Antena */}
          <motion.div
            className="absolute -top-1 left-1/2 -translate-x-1/2 flex flex-col items-center"
            animate={
              isActive
                ? {
                    y: [-5, 5, -5],
                    rotate: [0, 180, 360],
                  }
                : {
                    y: [-1, 1, -1],
                  }
            }
            transition={
              isActive
                ? {
                    duration: 0.5,
                    repeat: Number.POSITIVE_INFINITY,
                  }
                : {
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'easeInOut',
                  }
            }
          >
            <div
              className={`w-0.5 h-2 md:h-2.5 bg-gradient-to-t ${isActive ? 'from-purple-500 to-red-500' : 'from-brand-500 to-brand-500/40'}`}
            />
            <motion.div
              className={`w-1.5 h-1.5 md:w-2 md:h-2 ${isActive ? 'bg-purple-500' : 'bg-brand-500'} rounded-full ${isActive ? 'shadow-[0_0_12px_rgba(168,85,247,0.9)]' : 'shadow-[0_0_8px_rgba(34,197,94,0.6)]'}`}
              animate={
                isActive
                  ? {
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
                        '0 0 16px rgba(239,68,68,0.9)',
                        '0 0 16px rgba(245,158,11,0.9)',
                        '0 0 16px rgba(34,197,94,0.9)',
                        '0 0 16px rgba(59,130,246,0.9)',
                        '0 0 12px rgba(168,85,247,0.9)',
                      ],
                    }
                  : {
                      boxShadow: [
                        '0 0 8px rgba(34,197,94,0.6)',
                        '0 0 16px rgba(34,197,94,0.9)',
                        '0 0 8px rgba(34,197,94,0.6)',
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
          </motion.div>

          {/* Cabeça */}
          <div
            className={`relative bg-gradient-to-br ${isActive ? 'from-purple-800 to-red-900 border-purple-500' : 'from-zinc-800 to-zinc-900 border-brand-500/50'} border-2 rounded-lg w-8 h-6 md:w-9 md:h-7 flex items-center justify-center shadow-lg overflow-hidden`}
          >
            {/* Brilho interno */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${isActive ? 'from-purple-500/40' : 'from-brand-500/20'} via-transparent to-transparent`}
            />
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-b from-white/10 to-transparent rounded-t-lg" />

            {/* Visor/Olhos */}
            <div className="relative flex gap-1.5 md:gap-2 items-center">
              <motion.div
                className={`w-1.5 h-2 md:w-2 md:h-2.5 ${isActive ? 'bg-purple-500' : 'bg-brand-500'} rounded-sm ${isActive ? 'shadow-[0_0_8px_rgba(168,85,247,0.9)]' : 'shadow-[0_0_6px_rgba(34,197,94,0.8)]'}`}
                animate={
                  isActive
                    ? {
                        scaleY: [1, 0.1, 1, 1, 0.1, 1],
                        scaleX: [1, 1.5, 1, 1, 1.5, 1],
                        rotate: [0, 45, -45, 0],
                        backgroundColor: ['#a855f7', '#ef4444', '#f59e0b', '#22c55e', '#a855f7'],
                      }
                    : {
                        scaleY: [1, 0.2, 1],
                      }
                }
                transition={
                  isActive
                    ? {
                        duration: 0.8,
                        repeat: Number.POSITIVE_INFINITY,
                      }
                    : {
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: 2,
                        ease: 'easeInOut',
                      }
                }
              />
              <motion.div
                className={`w-1.5 h-2 md:w-2 md:h-2.5 ${isActive ? 'bg-purple-500' : 'bg-brand-500'} rounded-sm ${isActive ? 'shadow-[0_0_8px_rgba(168,85,247,0.9)]' : 'shadow-[0_0_6px_rgba(34,197,94,0.8)]'}`}
                animate={
                  isActive
                    ? {
                        scaleY: [1, 0.1, 1, 1, 0.1, 1],
                        scaleX: [1, 1.5, 1, 1, 1.5, 1],
                        rotate: [0, -45, 45, 0],
                        backgroundColor: ['#a855f7', '#ef4444', '#f59e0b', '#22c55e', '#a855f7'],
                      }
                    : {
                        scaleY: [1, 0.2, 1],
                      }
                }
                transition={
                  isActive
                    ? {
                        duration: 0.8,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: 0.2,
                      }
                    : {
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: 2,
                        ease: 'easeInOut',
                      }
                }
              />
            </div>

            {/* Detalhes laterais */}
            <div
              className={`absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-1 ${isActive ? 'bg-purple-500/60' : 'bg-brand-500/40'}`}
            />
            <div
              className={`absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-1 ${isActive ? 'bg-purple-500/60' : 'bg-brand-500/40'}`}
            />
          </div>

          {/* Corpo/Torso */}
          <div
            className={`relative bg-gradient-to-br ${isActive ? 'from-purple-800 to-red-900 border-purple-500/60' : 'from-zinc-800 to-zinc-900 border-brand-500/40'} border-2 rounded-md w-7 h-5 md:w-8 md:h-6 flex items-center justify-center shadow-md overflow-hidden`}
          >
            {/* Gradiente interno */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${isActive ? 'from-purple-500/20' : 'from-brand-500/10'} via-transparent to-transparent`}
            />

            {/* Display central */}
            <motion.div
              className={`w-3 h-0.5 md:w-4 md:h-0.5 ${isActive ? 'bg-purple-500' : 'bg-brand-500/70'} rounded-full`}
              animate={
                isActive
                  ? {
                      opacity: [1, 0, 1],
                      scaleX: [1, 0.5, 1, 1.5, 1],
                      backgroundColor: ['#a855f7', '#ef4444', '#f59e0b', '#22c55e', '#a855f7'],
                    }
                  : {
                      opacity: [0.5, 1, 0.5],
                    }
              }
              transition={
                isActive
                  ? {
                      duration: 0.5,
                      repeat: Number.POSITIVE_INFINITY,
                    }
                  : {
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: 'easeInOut',
                    }
              }
            />

            {/* Braços */}
            <motion.div
              className={`absolute -left-1 top-0.5 w-1 h-3 md:h-3.5 ${isActive ? 'bg-purple-800 border-purple-500/50' : 'bg-zinc-800 border-brand-500/30'} border rounded-full`}
              animate={
                isActive
                  ? {
                      rotate: [0, -45, 45, -45, 0],
                      y: [0, -2, 2, 0],
                    }
                  : {}
              }
              transition={
                isActive
                  ? {
                      duration: 0.6,
                      repeat: Number.POSITIVE_INFINITY,
                    }
                  : {}
              }
            />
            <motion.div
              className={`absolute -right-1 top-0.5 w-1 h-3 md:h-3.5 ${isActive ? 'bg-purple-800 border-purple-500/50' : 'bg-zinc-800 border-brand-500/30'} border rounded-full`}
              animate={
                isActive
                  ? {
                      rotate: [0, 45, -45, 45, 0],
                      y: [0, 2, -2, 0],
                    }
                  : {}
              }
              transition={
                isActive
                  ? {
                      duration: 0.6,
                      repeat: Number.POSITIVE_INFINITY,
                    }
                  : {}
              }
            />
          </div>

          {/* Efeito de hover */}
          <motion.div
            className="absolute inset-0 border-2 border-brand-500/0 rounded-xl"
            whileHover={{
              borderColor: 'rgba(34, 197, 94, 0.4)',
            }}
            transition={{ duration: 0.2 }}
          />
        </div>

        {/* Indicador de seção ativa com animação */}
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
  )
})

Mascote.displayName = 'Mascote'
