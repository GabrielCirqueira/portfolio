import { AnimatePresence, motion, useDragControls } from 'framer-motion'
import { Calendar, Code2, ExternalLink, Sparkles, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Badge } from '@/shadcn/components/ui/badge'
import { Button } from '@/shadcn/components/ui/button'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, HStack, VStack } from '@/shadcn/components/ui/layout'
import { Text, Title } from '@/shadcn/components/ui/typography'
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
  const [imagemExpandida, setImagemExpandida] = useState<string | null>(null)
  const dragControls = useDragControls()
  const contentRef = useRef<HTMLDivElement>(null)

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

  if (!isOpen) return null

  const handleSheetDrag = (
    _: unknown,
    info: { offset: { y: number }; velocity: { y: number } }
  ) => {
    if (info.offset.y > 100 || info.velocity.y > 300) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            key="sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 280, mass: 0.8 }}
            drag="y"
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={{ top: 0 }}
            dragElastic={0.05}
            onDragEnd={handleSheetDrag}
            className="fixed bottom-0 left-0 right-0 z-[101] flex flex-col bg-zinc-950 rounded-t-[28px] border-t border-zinc-800 shadow-[0_-10px_60px_rgba(0,0,0,0.9)] overflow-hidden"
            style={{ height: '92vh', willChange: 'transform' }}
          >
            <Box className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/60 to-transparent z-10 pointer-events-none" />

            <div
              className="w-full pt-4 pb-3 flex justify-center flex-shrink-0 touch-none cursor-grab active:cursor-grabbing rounded-t-[28px]"
              onPointerDown={(e) => dragControls.start(e)}
            >
              <div className="w-10 h-1 bg-zinc-700 rounded-full" />
            </div>

            <div className="relative px-5 pb-4 flex items-start justify-between flex-shrink-0 border-b border-zinc-800 bg-gradient-to-br from-zinc-900/80 to-zinc-950/80">
              <Box className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-500/5 via-transparent to-transparent pointer-events-none" />

              <VStack className="gap-2 flex-1 min-w-0 mr-3 relative z-10">
                <HStack className="items-center gap-2 flex-wrap">
                  <Box className="p-1.5 bg-brand-500/10 border border-brand-500/20 rounded-lg flex-shrink-0">
                    <Icon icon={Sparkles} className="w-3.5 h-3.5 text-brand-400" />
                  </Box>
                  <Title
                    as="h2"
                    className="text-lg font-bold font-heading text-white leading-tight tracking-tight"
                  >
                    {projeto.titulo}
                  </Title>
                </HStack>

                <HStack className="items-center gap-2 flex-wrap">
                  <HStack className="items-center gap-1.5 text-xs text-zinc-300 font-mono bg-zinc-900/80 border border-zinc-800 px-2.5 py-1 rounded-lg">
                    <Icon icon={Calendar} className="w-3 h-3 text-brand-400" />
                    <Text className="text-zinc-300 font-medium text-[11px]">
                      {formatarPeriodo(projeto.dataInicio, projeto.dataFim)}
                    </Text>
                  </HStack>
                  <Badge className="bg-brand-500/10 text-brand-300 border border-brand-500/30 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded-lg h-auto">
                    {projeto.tipo === 'jogo' ? '🎮 Jogo' : '💻 Sistema'}
                  </Badge>
                </HStack>
              </VStack>

              <Button
                onClick={onClose}
                className="relative z-10 w-9 h-9 min-w-9 rounded-lg bg-zinc-900 border border-zinc-700 hover:border-brand-500 hover:bg-brand-600 hover:text-black text-white transition-all duration-300 p-0 flex items-center justify-center flex-shrink-0 mt-0.5"
                aria-label="Fechar"
              >
                <Icon icon={X} className="w-4 h-4" />
              </Button>
            </div>

            <div
              ref={contentRef}
              className="flex-1 overflow-y-auto overscroll-contain px-5 pb-6 custom-scrollbar"
            >
              <VStack className="py-5 gap-5">
                <Box className="relative w-full">
                  <Box className="relative w-full overflow-hidden rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 shadow-lg group">
                    <Box className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none z-[1]" />
                    <Box className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-500/60 via-brand-400/40 to-transparent z-[2]" />

                    <button
                      type="button"
                      className="relative w-full min-h-[200px] flex items-center justify-center p-3 cursor-pointer"
                      onClick={() => setImagemExpandida(projeto.imagens[imagemAtual])}
                      aria-label="Expandir imagem"
                    >
                      <img
                        src={projeto.imagens[imagemAtual]}
                        alt={`${projeto.titulo} - ${imagemAtual + 1}`}
                        className="max-w-full max-h-[200px] object-contain rounded relative z-[2]"
                      />
                    </button>
                  </Box>

                  {projeto.imagens.length > 1 && (
                    <HStack className="gap-2 mt-3 overflow-x-auto pb-1 custom-scrollbar">
                      {projeto.imagens.map((imagem, index) => (
                        <button
                          type="button"
                          key={index}
                          onClick={() => setImagemAtual(index)}
                          className={`relative flex-shrink-0 w-14 h-10 rounded-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer bg-zinc-900 flex items-center justify-center ${
                            imagemAtual === index
                              ? 'border-brand-500 shadow-md shadow-brand-500/30'
                              : 'border-zinc-700 hover:border-zinc-600 opacity-50 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={imagem}
                            alt={`Miniatura ${index + 1}`}
                            className="max-w-full max-h-full object-contain p-0.5"
                          />
                          {imagemAtual === index && (
                            <Box className="absolute inset-0 bg-brand-500/10 pointer-events-none" />
                          )}
                        </button>
                      ))}
                    </HStack>
                  )}
                </Box>

                <VStack className="gap-3">
                  <HStack className="items-center gap-2">
                    <Box className="p-1.5 bg-brand-500/10 border border-brand-500/20 rounded-lg">
                      <Icon icon={Code2} className="w-3.5 h-3.5 text-brand-400" />
                    </Box>
                    <Title
                      as="h3"
                      className="text-sm font-bold uppercase tracking-wide font-heading text-white"
                    >
                      Sobre o Projeto
                    </Title>
                    <Box className="h-px bg-gradient-to-r from-brand-500/50 to-transparent flex-1" />
                  </HStack>

                  <VStack className="gap-2.5 relative pl-3">
                    <Box className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-500/50 via-brand-500/20 to-transparent rounded-full" />
                    {projeto.descricaoCompleta.map((paragrafo, idx) => (
                      <Text key={idx} className="text-zinc-400 text-sm leading-relaxed">
                        {paragrafo}
                      </Text>
                    ))}
                  </VStack>
                </VStack>

                <VStack className="gap-3">
                  <HStack className="items-center gap-2">
                    <Box className="w-0.5 h-4 bg-gradient-to-b from-brand-500 to-brand-400 rounded-full" />
                    <Title
                      as="h3"
                      className="text-sm font-bold uppercase tracking-wide font-heading text-white"
                    >
                      Tecnologias Utilizadas
                    </Title>
                  </HStack>
                  <HStack className="flex-wrap gap-2">
                    {projeto.tecnologias.map((tech) => (
                      <Badge
                        key={tech}
                        className="bg-zinc-900 text-brand-300 border border-brand-500/20 px-2.5 py-1 text-xs font-mono uppercase tracking-wider rounded-lg transition-all duration-300 hover:border-brand-500/50 hover:bg-zinc-800"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </HStack>
                </VStack>

                {projeto.link && (
                  <motion.a
                    href={projeto.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileTap={{ scale: 0.97 }}
                    className="w-full px-5 py-3 border border-brand-500/30 bg-brand-500/5 text-brand-400 font-bold uppercase tracking-widest hover:bg-brand-500 hover:text-black hover:border-brand-500 transition-all duration-300 rounded text-sm shadow-[0_0_15px_var(--tw-shadow-color)] shadow-brand-500/10 hover:shadow-[0_0_25px_var(--tw-shadow-color)] hover:shadow-brand-500/40 flex items-center justify-center gap-2"
                  >
                    <Icon icon={ExternalLink} className="w-4 h-4" />
                    {projeto.tipo === 'jogo' ? 'Jogar Agora' : 'Acessar Projeto'}
                  </motion.a>
                )}
              </VStack>
            </div>
          </motion.div>

          <AnimatePresence>
            {imagemExpandida && (
              <Box
                className="fixed inset-0 z-[200] flex items-center justify-center p-4"
                onClick={() => setImagemExpandida(null)}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 bg-black/98 backdrop-blur-lg"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="relative max-w-[95vw] max-h-[95vh] flex items-center justify-center"
                  onClick={(e: React.MouseEvent) => e.stopPropagation()}
                >
                  <Button
                    onClick={() => setImagemExpandida(null)}
                    className="absolute top-2 right-2 z-10 bg-black/80 border border-zinc-700 hover:border-brand-500 hover:bg-brand-600 hover:text-black text-white transition-all duration-300 rounded-lg w-10 h-10 p-0 flex items-center justify-center backdrop-blur-md shadow-lg"
                  >
                    <Icon icon={X} className="w-5 h-5" />
                  </Button>
                  <img
                    src={imagemExpandida}
                    alt="Visualização expandida"
                    className="max-w-full max-h-[95vh] object-contain rounded-lg shadow-2xl border border-zinc-800"
                  />
                </motion.div>
              </Box>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  )
}
