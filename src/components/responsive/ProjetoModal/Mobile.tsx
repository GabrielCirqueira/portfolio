import { AnimatePresence, motion } from 'framer-motion'
import { Calendar, Code2, ExternalLink, X } from 'lucide-react'
import { useEffect } from 'react'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
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
  if (!dataFim) {
    return `${formatarData(dataInicio)} à Presente`
  }
  return `${formatarData(dataInicio)} à ${formatarData(dataFim)}`
}

export function ProjetoModalMobile({ isOpen, onClose, projeto }: ProjetoModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/90"
            onClick={onClose}
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 top-16 z-[101] bg-zinc-950 rounded-t-3xl flex flex-col overflow-hidden"
          >
            {/* Fixed Header */}
            <Box className="sticky top-0 bg-zinc-950 border-b border-zinc-800 p-4 z-20 flex-shrink-0">
              <VStack className="gap-3">
                <HStack className="justify-between items-start">
                  <VStack className="gap-1 flex-1 min-w-0">
                    <Title className="text-lg font-bold uppercase tracking-tight font-heading text-white leading-tight">
                      {projeto.titulo}
                    </Title>
                    <HStack className="items-center gap-2 text-xs text-zinc-400">
                      <Icon icon={Calendar} className="w-3 h-3 text-brand-400" />
                      <Text className="font-mono">
                        {formatarPeriodo(projeto.dataInicio, projeto.dataFim)}
                      </Text>
                    </HStack>
                  </VStack>

                  <Button
                    onClick={onClose}
                    className="bg-zinc-900 border border-zinc-700 hover:border-brand-500 hover:bg-brand-500 hover:text-black text-white transition-all duration-200 rounded-lg w-10 h-10 p-0 flex items-center justify-center flex-shrink-0  mobile-touch-feedback"
                  >
                    <Icon icon={X} className="w-5 h-5" />
                  </Button>
                </HStack>

                <Badge className="bg-brand-500/10 text-brand-300 border border-brand-500/30 px-2.5 py-1 text-xs font-mono uppercase tracking-wider rounded-lg w-fit">
                  {projeto.tipo === 'jogo' ? '🎮 Jogo' : '💻 Sistema'}
                </Badge>
              </VStack>
            </Box>

            {/* Scrollable Content */}
            <Box className="overflow-y-auto flex-1 overscroll-contain">
              <VStack className="p-4 gap-5 pb-safe">
                {/* Image Carousel */}
                <Box className="w-full">
                  <Swiper
                    modules={[Pagination]}
                    pagination={{ clickable: true }}
                    spaceBetween={16}
                    slidesPerView={1}
                    className="rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900"
                    style={{
                      ['--swiper-pagination-color' as string]: '#22d3ee',
                      ['--swiper-pagination-bullet-inactive-color' as string]: '#52525b',
                    }}
                  >
                    {projeto.imagens.map((imagem, index) => (
                      <SwiperSlide key={index}>
                        <Box className="w-full aspect-video flex items-center justify-center bg-zinc-900 p-4">
                          <img
                            src={imagem}
                            alt={`${projeto.titulo} - ${index + 1}`}
                            className="max-w-full max-h-full object-contain rounded"
                          />
                        </Box>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </Box>

                {/* Sobre o Projeto */}
                <VStack className="gap-3">
                  <HStack className="items-center gap-2">
                    <Box className="p-1.5 bg-brand-500/10 border border-brand-500/20 rounded-lg">
                      <Icon icon={Code2} className="w-4 h-4 text-brand-400" />
                    </Box>
                    <Title className="text-sm font-bold uppercase tracking-wide font-heading text-white">
                      Sobre o Projeto
                    </Title>
                  </HStack>

                  <VStack className="gap-2 pl-3 border-l-2 border-brand-500/30">
                    {projeto.descricaoCompleta.map((paragrafo, index) => (
                      <Text key={index} className="text-gray-300 text-sm leading-relaxed">
                        {paragrafo}
                      </Text>
                    ))}
                  </VStack>
                </VStack>

                {/* Tecnologias */}
                <VStack className="gap-3">
                  <HStack className="items-center gap-2">
                    <Box className="w-0.5 h-4 bg-gradient-to-b from-brand-500 to-brand-400 rounded-full" />
                    <Title className="text-sm font-bold uppercase tracking-wide font-heading text-white">
                      Tecnologias
                    </Title>
                  </HStack>

                  <HStack className="flex-wrap gap-2">
                    {projeto.tecnologias.map((tech) => (
                      <Badge
                        key={tech}
                        className="bg-zinc-900 text-brand-300 border border-brand-500/20 px-2.5 py-1 text-xs font-mono uppercase tracking-wider rounded-lg"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </HStack>
                </VStack>

                {/* Link do Projeto */}
                {projeto.link && (
                  <motion.a
                    href={projeto.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileTap={{ scale: 0.98 }}
                    className="
                      w-full px-5 py-4 border border-brand-500
                      bg-brand-500/10 text-brand-400 font-bold
                      uppercase tracking-widest active:bg-brand-500
                      active:text-black
                      transition-all duration-200 rounded-lg text-sm
                      shadow-[0_0_15px_var(--tw-shadow-color)]
                      shadow-brand-500/20
                      flex items-center justify-center gap-2
                      mobile-touch-feedback
                    "
                  >
                    <Icon icon={ExternalLink} className="w-4 h-4" />
                    {projeto.tipo === 'jogo' ? 'Jogar Agora' : 'Acessar Projeto'}
                  </motion.a>
                )}
              </VStack>
            </Box>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
