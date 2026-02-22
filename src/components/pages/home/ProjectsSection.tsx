import { motion } from 'framer-motion'
import { ArrowRight, Layers } from 'lucide-react'
import { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CardProjeto } from '@/components/responsive/CardProjeto'
import { ProjetoModal } from '@/components/responsive/ProjetoModal'
import { jogos, sistemas } from '@/data/projetos'
import { Badge } from '@/shadcn/components/ui/badge'
import { Button } from '@/shadcn/components/ui/button'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, Container, HStack, VStack } from '@/shadcn/components/ui/layout'
import { Text, Title } from '@/shadcn/components/ui/typography'

const PROJETOS_DESTAQUE = ['spacenow', 'monitoramento', 'estoque-pdv', 'organizabus']

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

export const ProjectsSection = memo(() => {
  const [modalAberto, setModalAberto] = useState<string | null>(null)

  const abrirModal = (id: string) => setModalAberto(id)
  const fecharModal = () => setModalAberto(null)

  const projetosDestaque = sistemas.filter((p) => PROJETOS_DESTAQUE.includes(p.id))
  const projetoAtual = [...sistemas, ...jogos].find((p) => p.id === modalAberto)
  const totalProjetos = sistemas.length + jogos.length

  return (
    <Box
      as="section"
      id="projetos"
      className="py-16 sm:py-20 md:py-24 lg:py-32 relative bg-black font-sans overflow-hidden"
    >
      {projetoAtual && (
        <ProjetoModal isOpen={!!modalAberto} onClose={fecharModal} projeto={projetoAtual} />
      )}
      <Box className="absolute inset-0 bg-game-black opacity-50" />
      <Box className="absolute inset-0 bg-[radial-gradient(currentColor_1px,transparent_1px)] bg-[size:20px_20px] text-brand-500/40" />
      <Container size="xl" className="relative z-10 px-4 sm:px-6">
        <VStack className="items-center text-center gap-3 sm:gap-4 mb-12 sm:mb-16 md:mb-20 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="outline"
              className="
                border-brand-500/40 text-brand-400
                uppercase tracking-wider text-xs font-semibold
                px-5 py-2 bg-brand-500/10 backdrop-blur-md
                shadow-lg shadow-brand-500/10 rounded-full
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
            className="space-y-4"
          >
            <Title
              as="h2"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight font-heading"
            >
              Projetos <span className="text-gradient">Em Destaque</span>
            </Title>
            <Box className="w-20 sm:w-24 h-1 bg-brand-500 mx-auto rounded-full opacity-60" />
            <Text className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-4 leading-relaxed">
              Uma seleção dos meus principais projetos. Explore mais de {totalProjetos} trabalhos na
              página completa.
            </Text>
          </motion.div>
        </VStack>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 max-w-6xl mx-auto"
        >
          {projetosDestaque.map((projeto) => (
            <CardProjeto key={projeto.id} projeto={projeto} onAbrirModal={abrirModal} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 sm:mt-20 md:mt-24"
        >
          <VStack className="items-center gap-6 text-center">
            <Box className="max-w-md mx-auto px-4">
              <Text className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                Estes são apenas alguns dos meus principais projetos. Já desenvolvi mais de{' '}
                <span className="text-brand-400 font-semibold">{totalProjetos} projetos</span>{' '}
                incluindo sistemas web e jogos.
              </Text>
            </Box>

            <Link to="/projetos">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="
                    bg-brand-500 hover:bg-brand-600 text-black font-bold
                    px-8 py-6 text-base uppercase tracking-wider
                    rounded-xl shadow-lg shadow-brand-500/30
                    hover:shadow-brand-500/50 hover:shadow-xl
                    transition-all duration-300
                    group relative overflow-hidden
                  "
                >
                  <Box className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <HStack className="items-center gap-3 relative z-10">
                    <Icon icon={Layers} className="w-5 h-5" />
                    <span>Explorar Todos os Projetos</span>
                    <Icon
                      icon={ArrowRight}
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    />
                  </HStack>
                </Button>
              </motion.div>
            </Link>
          </VStack>
        </motion.div>
      </Container>
    </Box>
  )
})
