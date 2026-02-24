import { AnimatePresence, motion, useDragControls } from 'framer-motion'
import {
  Calendar,
  ChevronRight,
  Code2,
  ExternalLink,
  Globe,
  Layers,
  Sparkles,
  X,
} from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Badge } from '@/shadcn/components/ui/badge'
import { Button } from '@/shadcn/components/ui/button'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, HStack, VStack } from '@/shadcn/components/ui/layout'
import { Span, Text, Title } from '@/shadcn/components/ui/typography'
import { cn } from '@/shadcn/lib/utils'
import type { Projeto } from '@/types/projeto'

interface ProjetoModalProps {
  isOpen: boolean
  onClose: () => void
  projeto: Projeto
}

function formatarData(data: string): string {
  if (!data) return ''
  const [ano, mes, dia] = data.split('-')
  return `${dia}/${mes}/${ano}`
}

function formatarPeriodo(dataInicio: string, dataFim?: string): string {
  if (!dataInicio) return ''
  if (!dataFim) return `Início em ${formatarData(dataInicio)}`
  return `${formatarData(dataInicio)} • ${formatarData(dataFim)}`
}

export function Mobile({ isOpen, onClose, projeto }: ProjetoModalProps) {
  const [imagemAtual, setImagemAtual] = useState(0)
  const [imagemExpandida, setImagemExpandida] = useState<string | null>(null)
  const dragControls = useDragControls()
  const contentRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const isDraggingRef = useRef(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setImagemAtual(0)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleSheetDrag = useCallback(
    (_: unknown, info: { offset: { y: number }; velocity: { y: number } }) => {
      if (info.offset.y > 100 || info.velocity.y > 300) {
        onClose()
      }
    },
    [onClose]
  )

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (isDraggingRef.current) return
    touchStartX.current = e.touches[0].clientX
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }, [])

  const handleTouchEnd = useCallback(() => {
    if (isDraggingRef.current) return

    const diff = touchStartX.current - touchEndX.current
    const threshold = 50

    if (Math.abs(diff) > threshold) {
      isDraggingRef.current = true

      if (diff > 0 && imagemAtual < projeto.imagens.length - 1) {
        setImagemAtual((prev) => prev + 1)
      } else if (diff < 0 && imagemAtual > 0) {
        setImagemAtual((prev) => prev - 1)
      }

      setTimeout(() => {
        isDraggingRef.current = false
      }, 200)
    }
  }, [imagemAtual, projeto.imagens.length])

  useEffect(() => {
    if (!isOpen) return

    const preloadNext = imagemAtual < projeto.imagens.length - 1 ? imagemAtual + 1 : null
    const preloadPrev = imagemAtual > 0 ? imagemAtual - 1 : null

    if (preloadNext !== null) {
      const img = new Image()
      img.src = projeto.imagens[preloadNext]
    }
    if (preloadPrev !== null) {
      const img = new Image()
      img.src = projeto.imagens[preloadPrev]
    }
  }, [imagemAtual, isOpen, projeto.imagens])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] bg-black/95"
            onClick={onClose}
          />

          <motion.div
            key="sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 35, stiffness: 300, mass: 0.7 }}
            drag="y"
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={{ top: 0 }}
            dragElastic={0.03}
            onDragEnd={handleSheetDrag}
            className="fixed bottom-0 left-0 right-0 z-[101] flex flex-col bg-zinc-950 rounded-t-[32px] border-t border-zinc-800 overflow-hidden h-[94vh] shadow-xl"
            style={{ touchAction: 'pan-y' }}
          >
            <Box className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-50 z-50" />

            <div
              className="w-full pt-4 pb-2 flex justify-center flex-shrink-0 touch-none cursor-grab active:cursor-grabbing rounded-t-[32px] bg-zinc-950 z-40 border-b border-zinc-900/50"
              onPointerDown={(e) => dragControls.start(e)}
            >
              <div className="w-12 h-1.5 bg-zinc-800/80 rounded-full" />
            </div>

            <div className="relative px-6 py-4 flex items-center justify-between flex-shrink-0 border-b border-zinc-900 bg-zinc-950 z-40">
              <VStack className="gap-1 flex-1 min-w-0">
                <HStack className="items-center gap-2">
                  <Badge
                    variant="outline"
                    className="h-5 px-1.5 bg-brand-500/10 border-brand-500/30 text-[9px] uppercase font-black text-brand-400"
                  >
                    {projeto.tipo === 'jogo' ? '🎮 Game Project' : '💻 Software System'}
                  </Badge>
                  <Icon icon={Sparkles} className="w-3 h-3 text-brand-500 animate-pulse" />
                </HStack>
                <Title
                  as="h2"
                  className="text-xl font-black font-heading text-white leading-none tracking-tight uppercase"
                >
                  {projeto.titulo}
                </Title>
              </VStack>

              <Button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-zinc-900/50 border border-zinc-800 text-zinc-400 active:scale-90 active:bg-brand-500 active:text-black active:border-brand-500 transition-all duration-200"
              >
                <Icon icon={X} className="w-5 h-5" />
              </Button>
            </div>

            <div
              ref={contentRef}
              className="flex-1 overflow-y-auto overscroll-contain px-0 custom-scrollbar bg-black/20"
            >
              <Box className="relative w-full px-6 pt-6 pb-2">
                <div className="relative group aspect-video w-full">
                  <Box className="absolute -inset-1 bg-gradient-to-br from-brand-500/5 via-transparent to-brand-500/5 rounded-2xl opacity-20" />

                  <Box className="relative w-full h-full overflow-hidden rounded-2xl border border-white/5 bg-zinc-900 shadow-xl">
                    <div
                      onTouchStart={handleTouchStart}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                      className="relative w-full h-full flex items-center justify-center cursor-pointer overflow-hidden p-2 touch-pan-y"
                      style={{ touchAction: 'pan-y' }}
                    >
                      <img
                        key={imagemAtual}
                        src={projeto.imagens[imagemAtual]}
                        alt={`${projeto.titulo} - ${imagemAtual + 1}`}
                        className="w-full h-full object-contain rounded-lg relative z-10 cursor-pointer transition-opacity duration-150 ease-out"
                        loading="lazy"
                        decoding="async"
                        onClick={() => setImagemExpandida(projeto.imagens[imagemAtual])}
                      />
                    </div>

                    <Box className="absolute bottom-4 right-4 z-20 px-2.5 py-1 bg-black/80 border border-white/10 rounded-full text-[10px] font-mono font-bold text-white/70 flex items-center gap-1.5">
                      <Box className="w-1 h-1 rounded-full bg-brand-500 animate-pulse" />
                      {imagemAtual + 1} / {projeto.imagens.length}
                    </Box>

                    {projeto.imagens.length > 1 && (
                      <Box className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1">
                        {projeto.imagens.map((_, idx) => (
                          <Box
                            key={idx}
                            className={cn(
                              'h-1 rounded-full transition-all duration-300',
                              imagemAtual === idx ? 'w-4 bg-brand-500' : 'w-1 bg-white/20'
                            )}
                          />
                        ))}
                      </Box>
                    )}
                  </Box>
                </div>

                {projeto.imagens.length > 1 && (
                  <HStack className="gap-3 mt-5 overflow-x-auto pb-4 px-1 no-scrollbar mask-fade-edges">
                    {projeto.imagens.map((imagem, index) => (
                      <button
                        type="button"
                        key={index}
                        onClick={() => setImagemAtual(index)}
                        className={cn(
                          'relative flex-shrink-0 w-20 h-14 rounded-xl overflow-hidden border-2 transition-all duration-200 active:scale-95',
                          imagemAtual === index
                            ? 'border-brand-500 scale-105 shadow-lg shadow-brand-500/20'
                            : 'border-zinc-800 opacity-40 grayscale-[50%]'
                        )}
                      >
                        <img
                          src={imagem}
                          alt={`Thumb ${index + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                        {imagemAtual === index && (
                          <Box className="absolute inset-0 bg-brand-500/10 mix-blend-overlay" />
                        )}
                      </button>
                    ))}
                  </HStack>
                )}
              </Box>

              <VStack className="px-6 pb-12 gap-8 mt-4">
                <HStack className="gap-3 w-full">
                  <Box className="flex-1 p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800/60 text-center">
                    <VStack className="gap-1.5 items-center">
                      <Icon icon={Calendar} className="w-3.5 h-3.5 text-brand-500" />
                      <Text className="text-[9px] text-zinc-500 uppercase font-black tracking-widest leading-none">
                        Período
                      </Text>
                      <Text className="text-[10px] sm:text-[11px] text-zinc-200 font-bold font-mono">
                        {formatarPeriodo(projeto.dataInicio, projeto.dataFim)}
                      </Text>
                    </VStack>
                  </Box>
                  <Box className="flex-1 p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800/60 text-center">
                    <VStack className="gap-1.5 items-center">
                      <Icon icon={Layers} className="w-3.5 h-3.5 text-brand-500" />
                      <Text className="text-[9px] text-zinc-500 uppercase font-black tracking-widest leading-none">
                        Categoria
                      </Text>
                      <Text className="text-[10px] sm:text-[11px] text-zinc-200 font-bold uppercase truncate w-full px-1">
                        {projeto.tipo === 'sistema' ? 'SaaS / Web' : 'Game Project'}
                      </Text>
                    </VStack>
                  </Box>
                </HStack>

                <VStack className="gap-4">
                  <HStack className="items-center gap-3">
                    <Box className="p-2 rounded-lg bg-brand-500/5 border border-brand-500/10 flex items-center justify-center">
                      <Icon icon={Code2} className="w-4 h-4 text-brand-400" />
                    </Box>
                    <Title
                      as="h3"
                      className="text-xs sm:text-sm font-black uppercase tracking-[0.2em] text-white font-heading"
                    >
                      Apresentação
                    </Title>
                    <Box className="h-px bg-zinc-800/30 flex-1" />
                  </HStack>

                  <VStack className="gap-4">
                    {projeto.descricaoCompleta.map((paragrafo, idx) => (
                      <Text
                        key={idx}
                        className="text-[13px] text-zinc-400 leading-relaxed font-medium text-justify"
                      >
                        {paragrafo}
                      </Text>
                    ))}
                  </VStack>
                </VStack>

                <VStack className="gap-4">
                  <HStack className="items-center gap-3">
                    <Box className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                      <Icon icon={Globe} className="w-4 h-4 text-brand-400" />
                    </Box>
                    <Title
                      as="h3"
                      className="text-xs sm:text-sm font-black uppercase tracking-[0.2em] text-white font-heading"
                    >
                      Stack Técnica
                    </Title>
                    <Box className="h-px bg-zinc-800/30 flex-1" />
                  </HStack>

                  <Box className="flex flex-wrap gap-2">
                    {projeto.tecnologias.map((tech) => (
                      <HStack
                        key={tech}
                        className="px-3 py-1.5 bg-zinc-900/60 border border-white/5 rounded-full items-center gap-2"
                      >
                        <Box className="w-1 h-1 rounded-full bg-brand-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                        <Text className="text-[10px] font-mono text-zinc-300 font-bold uppercase tracking-wider">
                          {tech}
                        </Text>
                      </HStack>
                    ))}
                  </Box>
                </VStack>

                {projeto.link && (
                  <a
                    href={projeto.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full mt-4 flex items-center justify-between group no-underline active:scale-[0.98] transition-transform"
                  >
                    <Box className="w-full h-14 bg-brand-500 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-brand-500/20 active:bg-brand-400 transition-colors">
                      <Icon icon={ExternalLink} className="w-5 h-5 text-black" />
                      <Span className="text-black font-black uppercase tracking-widest text-sm">
                        {projeto.tipo === 'jogo' ? 'Jogar Agora' : 'Visitar Website'}
                      </Span>
                      <Icon icon={ChevronRight} className="w-4 h-4 text-black/40" />
                    </Box>
                  </a>
                )}
              </VStack>
            </div>
          </motion.div>
          <AnimatePresence>
            {imagemExpandida && (
              <Box
                className="fixed inset-0 z-[200] flex items-center justify-center p-4 overflow-hidden"
                onClick={() => setImagemExpandida(null)}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.12 }}
                  className="absolute inset-0 bg-black/98"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  className="relative z-[201] w-full max-h-[85vh] flex items-center justify-center"
                  onClick={(e: React.MouseEvent) => e.stopPropagation()}
                >
                  <Button
                    onClick={() => setImagemExpandida(null)}
                    className="absolute -top-16 right-0 bg-zinc-900/90 border border-white/10 text-white rounded-full w-12 h-12 p-0 shadow-xl active:scale-90 transition-transform"
                  >
                    <Icon icon={X} className="w-6 h-6" />
                  </Button>

                  <Box className="relative w-full h-full overflow-hidden rounded-2xl">
                    <img
                      src={imagemExpandida}
                      alt="Full projection"
                      className="w-full h-auto max-h-[80vh] object-contain shadow-2xl"
                      loading="eager"
                      decoding="async"
                    />
                  </Box>

                  <Box className="absolute -bottom-12 left-0 right-0 text-center">
                    <Text className="text-zinc-500 text-[10px] uppercase font-black tracking-[0.3em]">
                      Arraste para fechar ou clique fora
                    </Text>
                  </Box>
                </motion.div>
              </Box>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  )
}
