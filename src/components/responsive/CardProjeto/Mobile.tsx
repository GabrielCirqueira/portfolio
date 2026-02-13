import { motion } from 'framer-motion'
import { Calendar, ChevronRight } from 'lucide-react'
import { memo } from 'react'
import { Badge } from '@/shadcn/components/ui/badge'
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
}

export const Mobile = memo(({ projeto, onAbrirModal }: CardProjetoProps) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3 }}
    className="w-full"
  >
    <Box
      onClick={() => onAbrirModal(projeto.id)}
      className="
        w-full bg-zinc-950 border border-zinc-800 rounded-xl
        overflow-hidden flex flex-col cursor-pointer
        active:border-brand-500/40 active:bg-zinc-900/50
        transition-all duration-150 hover:border-zinc-700
      "
    >
      <Box className="relative w-full aspect-[2/1] overflow-hidden">
        <img
          src={projeto.imagem}
          alt={projeto.titulo}
          className="object-cover w-full h-full"
          loading="lazy"
        />
        <Box className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <HStack className="absolute bottom-2 right-2 items-center gap-1 text-[10px] text-white font-mono bg-black/70 px-2 py-0.5 rounded-md">
          <Icon icon={Calendar} className="w-2.5 h-2.5 text-brand-400" />
          <Span>{formatarPeriodo(projeto.dataInicio, projeto.dataFim)}</Span>
        </HStack>

        <Badge className="absolute top-2 left-2 bg-black/70 text-[10px] font-mono uppercase px-2 py-0.5 rounded-md text-brand-300">
          {projeto.tipo === 'jogo' ? '🎮 Jogo' : '💻 Sistema'}
        </Badge>
      </Box>

      <VStack className="p-3 gap-2 w-full">
        <HStack className="items-start justify-between gap-2 w-full">
          <Title className="text-[13px] font-bold font-heading text-white uppercase tracking-wide leading-snug flex-1">
            {projeto.titulo}
          </Title>
          <Icon icon={ChevronRight} className="w-4 h-4 text-zinc-500 flex-shrink-0 mt-0.5" />
        </HStack>

        <Text className="text-zinc-400 text-[11px] leading-relaxed line-clamp-2">
          {projeto.descricao}
        </Text>

        <Flex className="flex-wrap gap-1">
          {projeto.tecnologias.slice(0, 3).map((tech) => (
            <Badge
              key={tech}
              className="bg-zinc-900 text-brand-300 border border-brand-500/15 px-1.5 py-[1px] text-[9px] font-mono uppercase rounded"
            >
              {tech}
            </Badge>
          ))}
          {projeto.tecnologias.length > 3 && (
            <Span className="text-zinc-500 text-[9px] font-mono px-1 py-[1px]">
              +{projeto.tecnologias.length - 3}
            </Span>
          )}
        </Flex>

        <HStack className="items-center justify-center gap-1.5 w-full py-2 border border-brand-500/20 bg-brand-500/5 rounded-lg mt-0.5">
          <Span className="text-brand-400 font-bold uppercase tracking-widest text-[10px]">
            Ver Detalhes
          </Span>
        </HStack>
      </VStack>
    </Box>
  </motion.div>
))
