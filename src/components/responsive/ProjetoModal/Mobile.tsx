import { AnimatePresence, motion } from 'framer-motion'
import { Calendar, ChevronLeft, ChevronRight, Code2, ExternalLink, Sparkles, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Badge } from '@/shadcn/components/ui/badge'
import { Button } from '@/shadcn/components/ui/button'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, Center, Flex, HStack, VStack } from '@/shadcn/components/ui/layout'
import { Link } from '@/shadcn/components/ui/link'
import { Span, Text, Title } from '@/shadcn/components/ui/typography'
import type { Projeto } from '@/types/projeto'

interface ProjetoModalProps {
  isOpen: boolean
  onClose: () => void
  projeto: Projeto
}

function formatarData(data: string): string {
  const [ano, mes, dia] = data.split('-')
  return `${dia}/${mes}/${ano}`
}

function formatarPeriodo(dataInicio: string, dataFim?: string): string {
  if (!dataFim) return `${formatarData(dataInicio)} à Presente`
  return `${formatarData(dataInicio)} à ${formatarData(dataFim)}`
}

export function Mobile({ isOpen, onClose, projeto }: ProjetoModalProps) {
  const [imagemAtual, setImagemAtual] = useState(0)
  const [imagemExpandida, setImagemExpandida] = useState(false)

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // biome-ignore lint/correctness/useExhaustiveDependencies: Reset ao trocar projeto
  useEffect(() => {
    setImagemAtual(0)
  }, [projeto.id])

  if (!isOpen) return null

  const nextImage = () => {
    if (imagemAtual < projeto.imagens.length - 1) setImagemAtual((prev) => prev + 1)
  }

  const prevImage = () => {
    if (imagemAtual > 0) setImagemAtual((prev) => prev - 1)
  }

  const handleImageSwipe = (
    _: unknown,
    info: { offset: { x: number }; velocity: { x: number } }
  ) => {
    if (info.offset.x < -40 || info.velocity.x < -300) nextImage()
    if (info.offset.x > 40 || info.velocity.x > 300) prevImage()
  }

  const handleSheetDrag = (
    _: unknown,
    info: { offset: { y: number }; velocity: { y: number } }
  ) => {
    if (info.offset.y > 120 || info.velocity.y > 400) onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-[2px]"
            onClick={onClose}
          />

          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 350 }}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.15}
            onDragEnd={handleSheetDrag}
            className="fixed bottom-0 left-0 right-0 z-[101] bg-zinc-950 rounded-t-3xl flex flex-col border-t border-zinc-700/50 shadow-[0_-8px_40px_rgba(0,0,0,0.6)]"
            style={{ maxHeight: '80vh', touchAction: 'none' }}
          >
            <Center className="pt-3 pb-2 flex-shrink-0 cursor-grab active:cursor-grabbing">
              <Box className="w-10 h-1.5 bg-zinc-600 rounded-full" />
            </Center>

            <HStack className="items-center justify-between px-4 pb-2.5 flex-shrink-0">
              <HStack className="items-center gap-2 flex-1 min-w-0">
                <Box className="p-1 bg-brand-500/10 border border-brand-500/20 rounded-md flex-shrink-0">
                  <Icon icon={Sparkles} className="w-3.5 h-3.5 text-brand-400" />
                </Box>
                <Title className="text-[15px] font-bold uppercase tracking-tight font-heading text-white truncate">
                  {projeto.titulo}
                </Title>
              </HStack>
              <Button
                variant="ghost"
                onClick={onClose}
                className="w-8 h-8 p-0 flex items-center justify-center bg-zinc-900 border border-zinc-700 rounded-full ml-2 flex-shrink-0 active:bg-zinc-800"
              >
                <Icon icon={X} className="w-4 h-4 text-white" />
              </Button>
            </HStack>

            <Box
              className="overflow-y-auto flex-1 overscroll-contain"
              style={{ touchAction: 'pan-y' }}
              onPointerDown={(e) => e.stopPropagation()}
            >
              <Box className="px-4 mb-1">
                <Box className="relative w-full bg-zinc-900/80 rounded-xl overflow-hidden border border-zinc-800/60">
                  <motion.div
                    key={imagemAtual}
                    initial={{ opacity: 0.6 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.15 }}
                    className="w-full aspect-[16/9] flex items-center justify-center p-2 relative"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={handleImageSwipe}
                    onClick={() => setImagemExpandida(true)}
                    style={{ touchAction: 'pan-y' }}
                  >
                    <img
                      src={projeto.imagens[imagemAtual]}
                      alt={`${projeto.titulo} - ${imagemAtual + 1}`}
                      className="max-w-full max-h-full object-contain rounded-lg select-none pointer-events-none"
                      draggable={false}
                    />
                  </motion.div>

                  {projeto.imagens.length > 1 && (
                    <>
                      {imagemAtual > 0 && (
                        <Button
                          variant="ghost"
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 p-0 flex items-center justify-center bg-black/60 rounded-full z-10"
                        >
                          <Icon icon={ChevronLeft} className="w-5 h-5 text-white" />
                        </Button>
                      )}
                      {imagemAtual < projeto.imagens.length - 1 && (
                        <Button
                          variant="ghost"
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 p-0 flex items-center justify-center bg-black/60 rounded-full z-10"
                        >
                          <Icon icon={ChevronRight} className="w-5 h-5 text-white" />
                        </Button>
                      )}
                    </>
                  )}

                  {projeto.imagens.length > 1 && (
                    <HStack className="justify-center gap-1.5 pb-2.5 pt-0.5">
                      {projeto.imagens.map((_, i) => (
                        <Box
                          key={i}
                          onClick={() => setImagemAtual(i)}
                          className={`h-1.5 rounded-full cursor-pointer transition-all duration-200 ${
                            i === imagemAtual ? 'bg-brand-500 w-5' : 'bg-zinc-600 w-1.5'
                          }`}
                        />
                      ))}
                    </HStack>
                  )}

                  <Box className="absolute top-2 right-2 bg-black/70 text-white text-[10px] font-mono px-2 py-0.5 rounded-md">
                    {imagemAtual + 1}/{projeto.imagens.length}
                  </Box>
                </Box>
              </Box>

              <HStack className="px-4 py-3 items-center gap-2 flex-wrap">
                <HStack className="items-center gap-1.5 text-[11px] text-zinc-300 font-mono bg-zinc-900 border border-zinc-800 px-2 py-1 rounded-md">
                  <Icon icon={Calendar} className="w-3 h-3 text-brand-400" />
                  <Span>{formatarPeriodo(projeto.dataInicio, projeto.dataFim)}</Span>
                </HStack>
                <Badge className="bg-brand-500/10 text-brand-300 border border-brand-500/30 px-2 py-0.5 text-[11px] font-mono uppercase rounded-md">
                  {projeto.tipo === 'jogo' ? '🎮 Jogo' : '💻 Sistema'}
                </Badge>
              </HStack>

              <VStack className="px-4 pb-8 gap-3.5">
                <Box>
                  <HStack className="items-center gap-2 mb-2.5">
                    <Icon icon={Code2} className="w-3.5 h-3.5 text-brand-400" />
                    <Span className="text-[13px] font-bold uppercase tracking-wide font-heading text-white">
                      Sobre o Projeto
                    </Span>
                    <Box className="h-px bg-gradient-to-r from-brand-500/40 to-transparent flex-1" />
                  </HStack>
                  <VStack className="gap-2.5 pl-2.5 border-l-2 border-brand-500/20">
                    {projeto.descricaoCompleta.map((paragrafo, index) => (
                      <Text key={index} className="text-zinc-400 text-[15px] leading-[1.6]">
                        {paragrafo}
                      </Text>
                    ))}
                  </VStack>
                </Box>

                <Box>
                  <HStack className="items-center gap-2 mb-2.5">
                    <Box className="w-0.5 h-4 bg-gradient-to-b from-brand-500 to-brand-400 rounded-full" />
                    <Span className="text-[13px] font-bold uppercase tracking-wide font-heading text-white">
                      Tecnologias
                    </Span>
                  </HStack>
                  <Flex className="flex-wrap gap-1.5">
                    {projeto.tecnologias.map((tech) => (
                      <Badge
                        key={tech}
                        className="bg-zinc-900 text-brand-300 border border-brand-500/20 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded-md"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </Flex>
                </Box>

                {projeto.link && (
                  <Link href={projeto.link} external className="no-underline w-full">
                    <Button
                      className="
                        flex items-center justify-center gap-2 w-full py-3
                        bg-brand-500 text-black font-bold uppercase tracking-widest
                        text-xs rounded-xl active:scale-[0.97] transition-transform
                        shadow-lg shadow-brand-500/20 mt-1
                      "
                    >
                      <Icon icon={ExternalLink} className="w-4 h-4" />
                      {projeto.tipo === 'jogo' ? 'Jogar Agora' : 'Acessar Projeto'}
                    </Button>
                  </Link>
                )}
              </VStack>
            </Box>
          </motion.div>

          <AnimatePresence>
            {imagemExpandida && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed inset-0 z-[200] bg-black"
                onClick={() => setImagemExpandida(false)}
              >
                <Center className="w-full h-full relative">
                  <Button
                    variant="ghost"
                    onClick={() => setImagemExpandida(false)}
                    className="absolute top-4 right-4 z-10 w-10 h-10 p-0 flex items-center justify-center bg-zinc-900/80 border border-zinc-700 rounded-full"
                  >
                    <Icon icon={X} className="w-5 h-5 text-white" />
                  </Button>

                  <img
                    src={projeto.imagens[imagemAtual]}
                    alt="Visualização expandida"
                    className="max-w-[95vw] max-h-[90vh] object-contain select-none"
                    draggable={false}
                  />

                  <Box className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs font-mono px-3 py-1 rounded-full">
                    {imagemAtual + 1} / {projeto.imagens.length}
                  </Box>
                </Center>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  )
}
