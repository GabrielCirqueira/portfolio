import { motion } from 'framer-motion'
import { Gamepad2, Monitor } from 'lucide-react'
import { memo, useState } from 'react'
import { CardProjeto } from '@/components/responsive/CardProjeto'
import { ProjetoModal } from '@/components/responsive/ProjetoModal'
import { jogos, sistemas } from '@/data/projetos'
import { Badge } from '@/shadcn/components/ui/badge'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, Container, VStack } from '@/shadcn/components/ui/layout'
import { Text, Title } from '@/shadcn/components/ui/typography'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

export const ProjectsSection = memo(() => {
  const [modalAberto, setModalAberto] = useState<string | null>(null)

  const abrirModal = (id: string) => setModalAberto(id)
  const fecharModal = () => setModalAberto(null)

  const projetoAtual = [...sistemas, ...jogos].find((p) => p.id === modalAberto)

  return (
    <Box
      id="projetos"
      className="py-12 sm:py-16 md:py-20 lg:py-32 relative bg-black font-sans overflow-hidden"
    >
      {projetoAtual && (
        <ProjetoModal isOpen={!!modalAberto} onClose={fecharModal} projeto={projetoAtual} />
      )}
      <Box className="absolute inset-0 bg-game-black opacity-50" />
      <Box className="absolute inset-0 bg-[radial-gradient(currentColor_1px,transparent_1px)] bg-[size:20px_20px] text-brand-500/40" />
      <Container size="xl" className="relative z-10 px-4">
        <VStack className="items-center text-center gap-3 sm:gap-4 mb-12 sm:mb-14 md:mb-16 lg:mb-24 px-3 sm:px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
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
          >
            <Title className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight font-heading">
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
              <Text className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold uppercase tracking-wider font-heading text-white">
                Sistemas Web
              </Text>
              <Box className="h-px bg-gradient-to-r from-brand-500/50 to-transparent flex-1 ml-6" />
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10"
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
              <Text className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold uppercase tracking-wider font-heading text-white">
                Jogos Desenvolvidos
              </Text>
              <Box className="h-px bg-gradient-to-r from-brand-500/50 to-transparent flex-1 ml-6" />
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10"
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
