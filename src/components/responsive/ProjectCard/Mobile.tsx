import { motion } from 'framer-motion'
import { Calendar, Info } from 'lucide-react'
import { memo } from 'react'
import { Badge } from '@/shadcn/components/ui/badge'
import { Button } from '@/shadcn/components/ui/button'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, HStack, VStack } from '@/shadcn/components/ui/layout'
import { Text, Title } from '@/shadcn/components/ui/typography'
import type { Projeto } from '@/types/projeto'

interface CardProjetoProps {
  projeto: Projeto
  onAbrirModal: (id: string) => void
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
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

export const ProjectCardMobile = memo(({ projeto, onAbrirModal }: CardProjetoProps) => (
  <motion.div variants={itemVariants} className="h-full">
    <Box
      className="
        bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden
        flex flex-col h-full relative shadow-sm
      "
    >
      <Box className="block relative aspect-video w-full overflow-hidden border-b border-zinc-800">
        <img
          src={projeto.imagem}
          alt={projeto.titulo}
          loading="lazy"
          className="object-cover w-full h-full opacity-90"
        />
        <HStack className="absolute bottom-2 right-2 items-center gap-1.5 text-[10px] text-white font-mono bg-black/90 px-2 py-1 rounded border border-zinc-800 shadow">
          <Icon icon={Calendar} className="w-3 h-3 text-brand-400" />
          <Text className="text-zinc-100 font-medium leading-none">
            {formatarPeriodo(projeto.dataInicio, projeto.dataFim)}
          </Text>
        </HStack>
      </Box>

      <VStack className="p-4 flex-grow justify-between gap-4 relative bg-zinc-950">
        <VStack className="gap-2">
          <Title className="text-base font-bold font-heading text-white uppercase tracking-wide leading-tight">
            {projeto.titulo}
          </Title>
          <Text className="text-gray-400 text-xs leading-relaxed font-normal line-clamp-3">
            {projeto.descricao}
          </Text>
        </VStack>

        <VStack className="gap-3 w-full">
          <HStack className="flex-wrap gap-1.5">
            {projeto.tecnologias.slice(0, 3).map((tech) => (
              <Badge
                key={tech}
                className="
                  bg-zinc-900/50 text-brand-300 border
                  border-brand-500/20 px-2 py-0.5
                  text-[9px] font-mono uppercase
                  tracking-wider rounded
                "
              >
                {tech}
              </Badge>
            ))}
            {projeto.tecnologias.length > 3 && (
              <Badge
                className="
                  bg-zinc-900/50 text-zinc-500 border
                  border-zinc-800 px-2 py-0.5
                  text-[9px] font-mono uppercase
                  tracking-wider rounded
                "
              >
                +{projeto.tecnologias.length - 3}
              </Badge>
            )}
          </HStack>

          <Button
            onClick={() => onAbrirModal(projeto.id)}
            className="
              w-full h-10 border border-brand-500/30
              bg-brand-500/10 text-brand-400 font-bold
              uppercase tracking-widest active:bg-brand-500
              active:text-black active:border-brand-500
              transition-colors duration-100 rounded-lg text-[10px]
              flex items-center justify-center gap-2
              mobile-touch-feedback
            "
          >
            <Icon icon={Info} className="w-3.5 h-3.5" />
            Ver Detalhes
          </Button>
        </VStack>
      </VStack>
    </Box>
  </motion.div>
))
