import { motion } from 'framer-motion'
import { Calendar, Info } from 'lucide-react'
import { memo } from 'react'
import Tilt from 'react-parallax-tilt'
import { ImagemOtimizada } from '@/components/ui/ImagemOtimizada'
import { Badge } from '@/shadcn/components/ui/badge'
import { Button } from '@/shadcn/components/ui/button'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, HStack, VStack } from '@/shadcn/components/ui/layout'
import { Text, Title } from '@/shadcn/components/ui/typography'
import type { Projeto } from '@/types/projeto'

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
}

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

export const Desktop = memo(({ projeto, onAbrirModal }: CardProjetoProps) => (
  <motion.div variants={itemVariants} className="h-full">
    <Tilt
      tiltMaxAngleX={4}
      tiltMaxAngleY={4}
      glareEnable
      glareMaxOpacity={0.08}
      glareColor="#a855f7"
      glarePosition="all"
      glareBorderRadius="12px"
      scale={1.005}
      transitionSpeed={400}
      className="h-full"
    >
      <Box
        className="
          card-project bg-zinc-950 border
          border-zinc-800 rounded-xl overflow-hidden
          group flex flex-col h-full relative
        "
        data-cursor-text="Ver"
      >
        <Box className="block relative aspect-video w-full overflow-hidden border-b border-zinc-800">
          <Box
            className="
            absolute inset-0 bg-brand-900/10 z-10
            opacity-0 group-hover:opacity-100
            transition-opacity duration-500
            pointer-events-none mix-blend-color
          "
          />
          <ImagemOtimizada
            src={projeto.imagem}
            alt={projeto.titulo}
            className="
            object-cover w-full h-full transform
            group-hover:scale-110 transition-transform
            duration-700 ease-in-out
            opacity-90 group-hover:opacity-100
          "
          />
          <HStack className="absolute bottom-3 right-3 items-center gap-2 text-xs text-white font-mono bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-zinc-700/50 shadow-lg">
            <Icon icon={Calendar} className="w-3.5 h-3.5 text-brand-400" />
            <Text className="text-zinc-100 font-medium">
              {formatarPeriodo(projeto.dataInicio, projeto.dataFim)}
            </Text>
          </HStack>
        </Box>

        <VStack
          className="
          p-5 md:p-6 lg:p-8 flex-grow justify-between gap-5 md:gap-6
          relative overflow-hidden bg-zinc-950
        "
        >
          <Box className="absolute top-0 right-0 w-48 h-48 bg-brand-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <VStack className="gap-3 relative z-10">
            <Title
              className="
              text-lg md:text-xl lg:text-2xl font-bold font-heading text-white
              group-hover:text-brand-400
              transition-colors uppercase tracking-wide
            "
            >
              {projeto.titulo}
            </Title>
            <Text className="text-gray-400 text-xs md:text-sm leading-relaxed font-normal">
              {projeto.descricao}
            </Text>
          </VStack>

          <VStack className="gap-3 relative z-10 w-full">
            <HStack className="flex-wrap gap-2">
              {projeto.tecnologias.slice(0, 4).map((tech) => (
                <Badge
                  key={tech}
                  className="
                  bg-zinc-900 text-brand-300 border
                  border-brand-500/20 px-3 py-1
                  text-[10px] font-mono uppercase
                  tracking-wider rounded transition-colors
                  group-hover:border-brand-500/40
                "
                >
                  {tech}
                </Badge>
              ))}
              {projeto.tecnologias.length > 4 && (
                <Badge
                  className="
                  bg-zinc-900 text-zinc-400 border
                  border-zinc-700 px-3 py-1
                  text-[10px] font-mono uppercase
                  tracking-wider rounded
                "
                >
                  +{projeto.tecnologias.length - 4}
                </Badge>
              )}
            </HStack>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
              <Button
                onClick={() => onAbrirModal(projeto.id)}
                className="
                w-full px-5 md:px-6 py-5 md:py-6 border border-brand-500/30
                bg-brand-500/5 text-brand-400 font-bold
                uppercase tracking-widest hover:bg-brand-500
                hover:text-black hover:border-brand-500
                transition-all duration-300 rounded text-[11px] md:text-xs
                shadow-[0_0_15px_var(--tw-shadow-color)]
                shadow-brand-500/10
                hover:shadow-[0_0_25px_var(--tw-shadow-color)]
                hover:shadow-brand-500/40
                flex items-center justify-center gap-2
              "
              >
                <Icon icon={Info} className="w-4 h-4" />
                Ver Detalhes
              </Button>
            </motion.div>
          </VStack>
        </VStack>
      </Box>
    </Tilt>
  </motion.div>
))
