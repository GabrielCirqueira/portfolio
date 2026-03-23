import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Info, Sparkles } from 'lucide-react'
import { memo } from 'react'
import { ImagemOtimizada } from '@/components/ui/ImagemOtimizada'
import { useAnimation } from '@/contexts'
import { Badge } from '@/shadcn/components/ui/badge'
import { Button } from '@/shadcn/components/ui/button'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, HStack, VStack } from '@/shadcn/components/ui/layout'
import { Text, Title } from '@/shadcn/components/ui/typography'
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

export const Desktop = memo(({ projeto, onAbrirModal, isFeatured }: CardProjetoProps) => {
  const { usarAnimacoes, ehDispositivoLento, duration } = useAnimation()

  const itemVariants = usarAnimacoes
    ? {
        hidden: { opacity: 0, y: ehDispositivoLento ? 10 : 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration, ease: 'easeOut' as const },
        },
      }
    : { hidden: { opacity: 1 }, visible: { opacity: 1 } }

  if (isFeatured) {
    return (
      <motion.div variants={itemVariants} className="w-full mb-16 lg:mb-24">
        <Box
          className="
            relative group rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden 
            bg-zinc-950 border border-zinc-800
            min-h-[450px] lg:min-h-[550px] flex flex-col lg:flex-row
            shadow-2xl shadow-brand-500/5
            hover:border-brand-500/30 transition-all duration-500
          "
          data-cursor-text="Explorar"
        >
          <Box className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(var(--color-brand-500-rgb),0.05),transparent_70%)] pointer-events-none" />

          <Box className="relative lg:w-[60%] h-64 lg:h-auto overflow-hidden group/img">
            <ImagemOtimizada
              src={projeto.imagem}
              alt={projeto.titulo}
              className="
                object-cover w-full h-full transform
                group-hover/img:scale-105 transition-transform
                duration-[1.5s] ease-out opacity-80 group-hover:opacity-100
              "
            />
            <Box className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent via-transparent to-zinc-950 z-10" />

            <Box className="absolute top-6 left-6 z-20">
              <Badge className="bg-brand-500/90 backdrop-blur-md text-black font-black uppercase tracking-widest px-4 py-2 flex items-center gap-2 shadow-lg rounded-lg border border-white/20">
                <Sparkles className="w-4 h-4" />
                Destaque
              </Badge>
            </Box>
          </Box>

          <VStack className="lg:w-[40%] p-8 lg:p-12 justify-center items-start gap-8 lg:gap-10 relative z-20">
            <VStack className="gap-5 items-start w-full">
              <VStack className="gap-2 w-full">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Title
                    as="h3"
                    className="text-4xl lg:text-5xl xl:text-6xl font-black font-heading text-white uppercase tracking-tighter leading-none"
                  >
                    {projeto.titulo}
                  </Title>
                </motion.div>
                <Box className="h-1 w-12 bg-brand-500 rounded-full" />
              </VStack>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Text className="text-zinc-400 text-sm lg:text-base leading-relaxed font-medium">
                  {projeto.descricao}
                </Text>
              </motion.div>
            </VStack>

            <VStack className="gap-8 w-full">
              <VStack className="gap-3">
                <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">
                  Tecnologias
                </Text>
                <HStack className="flex-wrap gap-2">
                  {projeto.tecnologias.map((tech) => (
                    <Badge
                      key={tech}
                      className="
                        bg-zinc-900/50 text-brand-300 border
                        border-brand-500/20 px-3 py-1
                        text-[10px] font-mono uppercase rounded-md
                        hover:border-brand-500/40 transition-colors
                      "
                    >
                      {tech}
                    </Badge>
                  ))}
                </HStack>
              </VStack>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full"
              >
                <Button
                  onClick={() => onAbrirModal(projeto.id)}
                  className="
                    w-full py-7 border border-brand-500/40
                    bg-brand-500/10 text-brand-400 font-black
                    uppercase tracking-widest hover:bg-brand-500 hover:text-black
                    transition-all duration-300 rounded-xl text-xs
                    shadow-md hover:shadow-brand-glow-lg
                    flex items-center justify-center gap-3 group/btn
                  "
                >
                  Ver Case Completo
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </motion.div>
            </VStack>
          </VStack>
        </Box>
      </motion.div>
    )
  }

  return (
    <motion.div variants={itemVariants} className="h-full">
      <Box
        className="
          card-project bg-zinc-950 border
          border-zinc-800 rounded-xl overflow-hidden
          group flex flex-col h-full relative
          hover:border-brand-500/40 transition-all duration-300
          hover:shadow-lg hover:shadow-brand-500/20
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
            group-hover:scale-105 transition-transform
            duration-500 ease-in-out
            opacity-90 group-hover:opacity-100
          "
          />
          <HStack className="absolute bottom-3 right-3 items-center gap-2 text-xs text-white font-mono bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-zinc-700/50 shadow-lg">
            <Icon icon={Calendar} className="w-3.5 h-3.5 text-brand-400" />
            <Text className="text-zinc-100 font-medium">
              {projeto.periodoExibicao ?? formatarPeriodo(projeto.dataInicio, projeto.dataFim)}
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
              as="h3"
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
          </VStack>
        </VStack>
      </Box>
    </motion.div>
  )
})
