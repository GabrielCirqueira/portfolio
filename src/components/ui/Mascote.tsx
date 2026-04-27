import { type SectionId, useVisibleSection } from '@app/hooks/useVisibleSection'
import { AnimatePresence, motion } from 'framer-motion'
import { memo, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { MascoteVisual } from '@/components/ui/MascoteVisual'
import { useWelcome } from '@/contexts/WelcomeContext'
import { isMobileDevice } from '@/utils/performance'

const mascoteMessages: Record<SectionId, string> = {
  inicio: '👋 Bem-vindo ao meu portfólio!',
  sobre: '🤓 Conheça mais sobre mim',
  habilidades: '💪 Minhas tecnologias',
  projetos: '🚀 Veja meus projetos',
  formacao: '🎓 Minha jornada acadêmica',
  contato: '📬 Vamos conversar?',
}

const projetosPageMessages = [
  '🛠️ Explorando meus projetos!',
  '💡 Cada projeto tem uma história',
  '🔍 Filtre por tipo acima!',
  '📅 Organizados por ano',
  '🎮 Tem até jogos aqui!',
  '💻 Sistemas web completos',
  '🚀 +15 projetos para ver!',
]

export const Mascote = memo(() => {
  const currentSection = useVisibleSection()
  const location = useLocation()
  const isProjetosPage = location.pathname === '/projetos'
  const { isWelcomeModalOpen } = useWelcome()
  const [showMessage, setShowMessage] = useState(false)
  const [projetosMessage, setProjetosMessage] = useState(projetosPageMessages[0])
  const isHoveringRef = useRef(false)
  const projetosMessageIndexRef = useRef(0)
  const isMobile = isMobileDevice()

  const message = isProjetosPage ? projetosMessage : mascoteMessages[currentSection]

  // biome-ignore lint/correctness/useExhaustiveDependencies: x
  useEffect(() => {
    setShowMessage(true)
    const timer = setTimeout(() => {
      if (!isHoveringRef.current) {
        setShowMessage(false)
      }
    }, 3000)
    return () => clearTimeout(timer)
  }, [currentSection, isProjetosPage])

  useEffect(() => {
    if (!isProjetosPage || isMobile) return

    const interval = setInterval(() => {
      projetosMessageIndexRef.current =
        (projetosMessageIndexRef.current + 1) % projetosPageMessages.length
      setProjetosMessage(projetosPageMessages[projetosMessageIndexRef.current])
      setShowMessage(true)
      setTimeout(() => {
        if (!isHoveringRef.current) {
          setShowMessage(false)
        }
      }, 4000)
    }, 15000)

    return () => clearInterval(interval)
  }, [isProjetosPage, isMobile])

  if (isWelcomeModalOpen) return null

  return (
    <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-50 flex flex-col items-start gap-2">
      <AnimatePresence mode="wait">
        {showMessage && (
          <motion.div
            key={isProjetosPage ? projetosMessage : currentSection}
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
            className="relative mb-1"
          >
            <div className="relative bg-gradient-to-br from-zinc-900 to-zinc-950 border-brand-500/40 border-2 px-3 py-2 md:px-4 md:py-2 rounded-xl shadow-md backdrop-blur-sm">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-b from-brand-500/20 to-transparent rounded-t-xl" />
              <p className="relative text-brand-500 text-xs md:text-sm font-semibold whitespace-nowrap tracking-wide">
                {message}
              </p>
            </div>
            <div className="absolute -bottom-1.5 left-4 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[8px] border-t-brand-500/40" />
            <div className="absolute -bottom-1 left-4 ml-0.5 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[7px] border-t-zinc-950" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
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
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          layoutId="mascote-hero"
          className="relative w-12 h-14 md:w-14 md:h-16 cursor-pointer group"
          aria-label="Assistente virtual"
        >
          <MascoteVisual isActive={false} />
        </motion.button>
      </div>
    </div>
  )
})

Mascote.displayName = 'Mascote'
