import { AnimatePresence, motion, useDragControls } from 'framer-motion'
import { Calendar, ChevronLeft, ChevronRight, Code2, ExternalLink, Sparkles, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { ImagemOtimizada } from '@/components/ui/ImagemOtimizada'
import { Badge } from '@/shadcn/components/ui/badge'
import { Button } from '@/shadcn/components/ui/button'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, HStack, VStack } from '@/shadcn/components/ui/layout'
import { Link } from '@/shadcn/components/ui/link'
import { Title } from '@/shadcn/components/ui/typography'
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

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (imagemAtual < projeto.imagens.length - 1) setImagemAtual((prev) => prev + 1)
  }

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (imagemAtual > 0) setImagemAtual((prev) => prev - 1)
  }

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
            className="fixed inset-0 z-[100] bg-black/80"
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
            className="fixed bottom-0 left-0 right-0 z-[101] flex flex-col bg-zinc-950 rounded-t-[32px] border-t border-zinc-800 shadow-[0_-10px_40px_rgba(0,0,0,0.8)]"
            style={{
              height: '90vh',
              willChange: 'transform',
            }}
          >
            <div
              className="w-full pt-4 pb-2 flex justify-center flex-shrink-0 touch-none cursor-grab active:cursor-grabbing bg-zinc-950 rounded-t-[32px]"
              onPointerDown={(e) => dragControls.start(e)}
            >
              <div className="w-12 h-1.5 bg-zinc-800 rounded-full" />
            </div>

            <div className="px-6 pb-4 flex items-center justify-between flex-shrink-0 border-b border-zinc-900 bg-zinc-950">
              <VStack className="gap-1 flex-1 min-w-0 mr-4">
                <HStack className="items-center gap-2">
                  <Badge
                    variant="outline"
                    className=" bg-brand-500/10 text-brand-400 border-brand-500/20 px-2 py-0.5 text-[10px] h-auto rounded-full"
                  >
                    {projeto.tipo === 'jogo' ? 'Game' : 'System'}
                  </Badge>
                  <span className="text-[10px] text-zinc-500 font-mono">
                    {new Date(projeto.dataInicio).getFullYear()}
                  </span>
                </HStack>
                <Title as="h2" className="text-xl font-bold font-heading text-white truncate">
                  {projeto.titulo}
                </Title>
              </VStack>

              <Button
                variant="outline"
                size="icon"
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-zinc-900 border-zinc-800 text-zinc-400 active:bg-zinc-800 active:text-white transition-colors"
                aria-label="Fechar"
              >
                <Icon icon={X} className="w-4 h-4" />
              </Button>
            </div>

            <div
              ref={contentRef}
              className="flex-1 overflow-y-auto overscroll-contain bg-zinc-950 px-6 pb-safe"
            >
              <VStack className="py-6 gap-8">
                <Box className="relative w-full aspect-video bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-lg">
                  <div
                    className="w-full h-full relative cursor-pointer"
                    onClick={() => setImagemExpandida(true)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setImagemExpandida(true)
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label="Expandir imagem"
                  >
                    <ImagemOtimizada
                      src={projeto.imagens[imagemAtual]}
                      alt={`${projeto.titulo} - ${imagemAtual + 1}`}
                      className="w-full h-full object-contain"
                      objectFit="contain"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                  </div>

                  {projeto.imagens.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        onClick={prevImage}
                        disabled={imagemAtual === 0}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 border border-white/10 p-0 text-white disabled:opacity-30 backdrop-blur-sm"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={nextImage}
                        disabled={imagemAtual === projeto.imagens.length - 1}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 border border-white/10 p-0 text-white disabled:opacity-30 backdrop-blur-sm"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </>
                  )}

                  {projeto.imagens.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/5 z-10">
                      {projeto.imagens.map((_, i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === imagemAtual ? 'bg-brand-500 w-3' : 'bg-white/40'}`}
                        />
                      ))}
                    </div>
                  )}
                </Box>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-zinc-900/50 rounded-xl p-3 border border-zinc-800">
                    <div className="flex items-center gap-2 mb-1 text-zinc-400 text-xs uppercase tracking-wider font-semibold">
                      <Calendar className="w-3.5 h-3.5" />
                      Periodo
                    </div>
                    <div className="text-sm text-zinc-200 font-mono">
                      {formatarPeriodo(projeto.dataInicio, projeto.dataFim)}
                    </div>
                  </div>
                  <div className="bg-zinc-900/50 rounded-xl p-3 border border-zinc-800">
                    <div className="flex items-center gap-2 mb-1 text-zinc-400 text-xs uppercase tracking-wider font-semibold">
                      <Sparkles className="w-3.5 h-3.5" />
                      Status
                    </div>
                    <div className="text-sm text-zinc-200 font-mono">
                      {projeto.dataFim ? 'Concluído' : 'Em Desenvolvimento'}
                    </div>
                  </div>
                </div>

                <VStack className="gap-3">
                  <HStack className="items-center gap-2">
                    <Code2 className="w-4 h-4 text-brand-500" />
                    <Title
                      as="h3"
                      className="text-sm font-bold uppercase tracking-wider text-white"
                    >
                      Sobre o Projeto
                    </Title>
                  </HStack>
                  <div className="space-y-3 text-zinc-400 text-sm leading-relaxed">
                    {projeto.descricaoCompleta.map((paragrafo, idx) => (
                      <p key={idx}>{paragrafo}</p>
                    ))}
                  </div>
                </VStack>

                <VStack className="gap-3">
                  <Title
                    as="h3"
                    className="text-sm font-bold uppercase tracking-wider text-white pl-1 border-l-2 border-brand-500"
                  >
                    Tecnologias
                  </Title>
                  <div className="flex flex-wrap gap-2">
                    {projeto.tecnologias.map((tech) => (
                      <Badge
                        key={tech}
                        className="bg-zinc-900 text-zinc-300 hover:text-brand-400 border-zinc-800 px-3 py-1.5 text-xs font-mono uppercase rounded-lg transition-colors"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </VStack>

                {projeto.link && (
                  <div className="pt-2 sticky bottom-4 z-10 w-full">
                    <Link href={projeto.link} external className="no-underline w-full block">
                      <Button className="w-full py-6 bg-brand-500 hover:bg-brand-600 text-black font-bold uppercase tracking-widest text-sm rounded-xl shadow-lg shadow-brand-500/20 active:scale-[0.98] transition-all">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {projeto.tipo === 'jogo' ? 'Jogar Agora' : 'Acessar Projeto'}
                      </Button>
                    </Link>
                  </div>
                )}

                <div className="h-6" />
              </VStack>
            </div>
          </motion.div>

          <AnimatePresence>
            {imagemExpandida && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center p-4"
                onClick={() => setImagemExpandida(false)}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    setImagemExpandida(false)
                  }}
                  className="absolute top-4 right-4 z-20 w-10 h-10 bg-zinc-900/80 rounded-full text-white"
                >
                  <X className="w-5 h-5" />
                </Button>

                <img
                  src={projeto.imagens[imagemAtual]}
                  alt="Zoom"
                  className="max-w-full max-h-full object-contain"
                />
                <div className="absolute bottom-8 bg-zinc-900/80 px-4 py-2 rounded-full text-xs font-mono text-zinc-400">
                  Aperte para fechar
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  )
}
