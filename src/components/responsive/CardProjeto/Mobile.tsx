import { motion } from 'framer-motion'
import { Calendar, ChevronRight, Sparkles } from 'lucide-react'
import { memo } from 'react'
import { ImagemOtimizada } from '@/components/ui/ImagemOtimizada'
import { useAnimacaoOtimizada } from '@/hooks/useAnimacaoOtimizada'
import { Badge } from '@/shadcn/components/ui/badge'
import { Button } from '@/shadcn/components/ui/button'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, Flex, HStack, VStack } from '@/shadcn/components/ui/layout'
import { Span, Text, Title } from '@/shadcn/components/ui/typography'
import type { Projeto } from '@/types/projeto'

function formatarData(data: string): string {
  const [ano, mes, dia] = data.split('-')
  return `${dia}/${mes}/${ano}`
}

function formatarPeriodo(dataInicio: string, dataFim?: string): string {
  if (!dataFim) return `${formatarData(dataInicio)} à Presente`
  return `${formatarData(dataInicio)} à ${formatarData(dataFim)}`
}

interface CardProjetoProps {
  projeto: Projeto
  onAbrirModal: (id: string) => void
  isFeatured?: boolean
}

export const Mobile = memo(({ projeto, onAbrirModal, isFeatured }: CardProjetoProps) => {
  const { ehDispositivoLento } = useAnimacaoOtimizada()

  if (isFeatured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="w-full mb-10"
      >
        <Box
          onClick={() => onAbrirModal(projeto.id)}
          className="
            relative w-full bg-zinc-950 rounded-[1.5rem] 
            border border-brand-500/30 overflow-hidden
            flex flex-col shadow-xl shadow-brand-500/10
          "
        >
          <Box className="relative w-full aspect-video overflow-hidden">
            <ImagemOtimizada
              src={projeto.imagem}
              alt={projeto.titulo}
              className="object-cover w-full h-full opacity-90"
            />
            <Box className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

            <Box className="absolute top-4 left-4 z-20">
              <Badge className="bg-brand-500 text-black font-black uppercase tracking-widest px-3 py-1 rounded-md text-[10px] shadow-lg flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                Destaque
              </Badge>
            </Box>
          </Box>

          <VStack className="p-6 gap-4 w-full">
            <VStack className="gap-1.5">
              <Title
                as="h3"
                className="text-2xl font-black font-heading text-white uppercase tracking-tight"
              >
                {projeto.titulo}
              </Title>
              <Box className="h-0.5 w-8 bg-brand-500 rounded-full" />
            </VStack>

            <Text className="text-zinc-400 text-sm leading-relaxed line-clamp-3">
              {projeto.descricao}
            </Text>

            <Flex className="flex-wrap gap-2 mt-2">
              {projeto.tecnologias.map((tech) => (
                <Badge
                  key={tech}
                  className="bg-zinc-900 text-brand-300 border border-brand-500/20 px-2 py-1 text-[10px] font-mono uppercase rounded-md"
                >
                  {tech}
                </Badge>
              ))}
            </Flex>

            <Button className="w-full py-6 bg-brand-500/10 border border-brand-500/40 text-brand-400 font-bold uppercase tracking-widest text-xs rounded-xl mt-4 flex items-center justify-center gap-2">
              Ver Detalhes
              <ChevronRight className="w-4 h-4" />
            </Button>
          </VStack>
        </Box>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '0px', amount: 0.2 }}
      transition={{ duration: ehDispositivoLento ? 0.15 : 0.25 }}
      className="w-full"
      style={{ willChange: 'opacity' }}
    >
      <Box
        onClick={() => onAbrirModal(projeto.id)}
        className="
        w-full bg-zinc-950/80 backdrop-blur-sm border border-zinc-800 rounded-2xl
        overflow-hidden flex flex-col cursor-pointer
        active:border-brand-500/50 active:bg-zinc-900/70
        transition-all duration-200 shadow-lg
        active:scale-[0.98]
      "
      >
        <Box className="relative w-full aspect-video overflow-hidden">
          <ImagemOtimizada
            src={projeto.imagem}
            alt={projeto.titulo}
            className="object-cover w-full h-full transition-transform duration-300"
          />
          <Box className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <HStack className="absolute bottom-3 right-3 items-center gap-1.5 text-xs text-white font-mono bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-lg">
            <Icon icon={Calendar} className="w-3 h-3 text-brand-400" />
            <Span className="text-[10px]">
              {projeto.periodoExibicao ?? formatarPeriodo(projeto.dataInicio, projeto.dataFim)}
            </Span>
          </HStack>

          <Badge className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm text-xs font-semibold uppercase px-3 py-1.5 rounded-lg text-brand-300 border border-brand-500/20 shadow-lg">
            {projeto.tipo === 'jogo' ? '🎮 Jogo' : '💻 Sistema'}
          </Badge>
        </Box>

        <VStack className="p-4 gap-3 w-full">
          <HStack className="items-start justify-between gap-3 w-full">
            <Title
              as="h3"
              className="text-sm font-bold font-heading text-white uppercase tracking-wide leading-tight flex-1"
            >
              {projeto.titulo}
            </Title>
            <Icon icon={ChevronRight} className="w-5 h-5 text-zinc-600 flex-shrink-0 mt-0.5" />
          </HStack>

          <Text className="text-zinc-400 text-xs leading-relaxed line-clamp-2">
            {projeto.descricao}
          </Text>

          <Flex className="flex-wrap gap-1.5">
            {projeto.tecnologias.slice(0, 3).map((tech) => (
              <Badge
                key={tech}
                className="bg-zinc-900 text-brand-300 border border-brand-500/20 px-2 py-1 text-[10px] font-mono uppercase rounded-md"
              >
                {tech}
              </Badge>
            ))}
            {projeto.tecnologias.length > 3 && (
              <Span className="text-zinc-500 text-[10px] font-mono px-2 py-1">
                +{projeto.tecnologias.length - 3}
              </Span>
            )}
          </Flex>

          <HStack className="items-center justify-center gap-2 w-full py-3 border border-brand-500/30 bg-brand-500/10 rounded-xl mt-1 active:bg-brand-500/15 transition-colors duration-150">
            <Span className="text-brand-400 font-bold uppercase tracking-wider text-xs">
              Ver Detalhes
            </Span>
          </HStack>
        </VStack>
      </Box>
    </motion.div>
  )
})
