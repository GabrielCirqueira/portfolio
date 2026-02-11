import { motion } from 'framer-motion'
import { Calendar, Gamepad2, Info, Monitor } from 'lucide-react'
import { memo, useState } from 'react'
import { ProjetoModal } from '@/components/modal/ProjetoModal'
import { jogos, sistemas } from '@/data/projetos'
import { Badge } from '@/shadcn/components/ui/badge'
import { Button } from '@/shadcn/components/ui/button'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, Container, HStack, VStack } from '@/shadcn/components/ui/layout'
import { Text, Title } from '@/shadcn/components/ui/typography'
import type { Projeto } from '@/types/projeto'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
}

function formatarPeriodo(dataInicio: string, dataFim?: string): string {
  if (!dataFim) {
    return `${dataInicio} à Presente`
  }
  return `${dataInicio} à ${dataFim}`
}

interface CardProjetoProps {
  projeto: Projeto
  onAbrirModal: (id: string) => void
}

const CardProjeto = memo(({ projeto, onAbrirModal }: CardProjetoProps) => (
  <motion.div
    variants={itemVariants}
    className="h-full"
    style={{ willChange: 'transform, opacity' }}
  >
    <Box
      className="
        card-project bg-zinc-950 border
        border-zinc-800 rounded-xl overflow-hidden
        group flex flex-col h-full relative
      "
    >
      <Box className="block relative aspect-video w-full overflow-hidden border-b border-zinc-800">
        <Box
          className="
            absolute inset-0 bg-brand-900/20 z-10
            opacity-0 group-hover:opacity-100
            transition-opacity duration-500
            pointer-events-none mix-blend-color
          "
        />
        <img
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
          p-6 md:p-8 flex-grow justify-between gap-6
          relative overflow-hidden bg-zinc-950
        "
      >
        <Box className="absolute top-0 right-0 w-48 h-48 bg-brand-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <VStack className="gap-3 relative z-10">
          <Title
            className="
              text-xl md:text-2xl font-bold font-heading text-white
              group-hover:text-brand-400
              transition-colors uppercase tracking-wide
            "
          >
            {projeto.titulo}
          </Title>
          <Text className="text-gray-400 text-sm leading-relaxed font-normal">
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
              w-full bg-zinc-900 border border-zinc-700
              hover:border-brand-500 hover:bg-brand-600
              hover:text-black text-white font-bold
              font-mono text-xs uppercase tracking-widest
              h-12 transition-all duration-300 rounded
              relative overflow-hidden group/btn
            "
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Icon icon={Info} className="w-4 h-4" />
              Ver Detalhes
            </span>
          </Button>
        </VStack>
      </VStack>
    </Box>
  </motion.div>
))

export const ProjectsSection = memo(() => {
  const [modalAberto, setModalAberto] = useState<string | null>(null)

  const abrirModal = (id: string) => setModalAberto(id)
  const fecharModal = () => setModalAberto(null)

  const projetoAtual = [...sistemas, ...jogos].find((p) => p.id === modalAberto)

  return (
    <Box id="projetos" className="py-32 relative bg-black font-sans overflow-hidden">
      {projetoAtual && (
        <ProjetoModal isOpen={!!modalAberto} onClose={fecharModal} projeto={projetoAtual} />
      )}
      <Box className="absolute inset-0 bg-game-black opacity-50" />
      <Box className="absolute inset-0 bg-[radial-gradient(currentColor_1px,transparent_1px)] bg-[size:20px_20px] text-brand-500/40" />
      <Container size="xl" className="relative z-10 px-4">
        <VStack className="items-center text-center gap-4 mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ willChange: 'transform, opacity' }}
          >
            <Badge
              variant="outline"
              className="
                border-brand-500/30 text-brand-500
                uppercase tracking-widest text-xs font-mono
                px-4 py-1.5 bg-brand-500/5 backdrop-blur-md
                shadow-[0_0_15px_var(--tw-shadow-color)]
                shadow-brand-500/10
              "
            >
              Portfolio
            </Badge>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ willChange: 'transform, opacity' }}
          >
            <Title className="text-4xl md:text-5xl font-bold uppercase tracking-tight font-heading">
              Projetos <span className="text-gradient">Em Destaque</span>
            </Title>
            <Box className="w-24 h-1 bg-brand-500 mx-auto mt-6 rounded-full opacity-50" />
          </motion.div>
        </VStack>

        <VStack className="gap-32">
          <Box>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-12"
              style={{ willChange: 'transform, opacity' }}
            >
              <Box
                className="
                  p-3 bg-zinc-900/80 border
                  border-brand-500/20 rounded-lg
                  shadow-[0_0_15px_var(--tw-shadow-color)]
                  shadow-brand-500/10
                "
              >
                <Icon icon={Monitor} className="w-6 h-6 text-brand-500" />
              </Box>
              <Text className="text-2xl font-bold uppercase tracking-wider font-heading text-white">
                Sistemas Web
              </Text>
              <Box className="h-px bg-gradient-to-r from-brand-500/50 to-transparent flex-1 ml-6" />
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10"
            >
              {sistemas.map((projeto) => (
                <CardProjeto key={projeto.id} projeto={projeto} onAbrirModal={abrirModal} />
              ))}
            </motion.div>
          </Box>

          <Box>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-12"
              style={{ willChange: 'transform, opacity' }}
            >
              <Box
                className="
                  p-3 bg-zinc-900/80 border
                  border-brand-500/20 rounded-lg
                  shadow-[0_0_15px_var(--tw-shadow-color)]
                  shadow-brand-500/10
                "
              >
                <Icon icon={Gamepad2} className="w-6 h-6 text-brand-500" />
              </Box>
              <Text className="text-2xl font-bold uppercase tracking-wider font-heading text-white">
                Jogos Desenvolvidos
              </Text>
              <Box className="h-px bg-gradient-to-r from-brand-500/50 to-transparent flex-1 ml-6" />
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10"
            >
              {jogos.map((projeto) => (
                <CardProjeto key={projeto.id} projeto={projeto} onAbrirModal={abrirModal} />
              ))}
            </motion.div>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
})
