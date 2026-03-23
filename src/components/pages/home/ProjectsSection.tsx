import { motion } from 'framer-motion'
import { ArrowRight, Code2, Gamepad2, Layers, Sparkles } from 'lucide-react'
import { memo, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CardProjeto } from '@/components/responsive/CardProjeto'
import { ProjetoModal } from '@/components/responsive/ProjetoModal'
import { useAnimation } from '@/contexts'
import { jogos, sistemas } from '@/data/projetos'
import { Badge } from '@/shadcn/components/ui/badge'
import { Button } from '@/shadcn/components/ui/button'
import { Box, Container, HStack, VStack } from '@/shadcn/components/ui/layout'
import { Text, Title } from '@/shadcn/components/ui/typography'

const PROJETOS_DESTAQUE = ['spacenow', 'monitoramento', 'estoque-pdv', 'organizabus']

export const ProjectsSection = memo(() => {
  const [modalAberto, setModalAberto] = useState<string | null>(null)
  const { usarAnimacoes, viewport, duration, getDelay, ehDispositivoLento } = useAnimation()

  const abrirModal = (id: string) => setModalAberto(id)
  const fecharModal = () => setModalAberto(null)

  const projetosDestaque = useMemo(
    () => sistemas.filter((p) => PROJETOS_DESTAQUE.includes(p.id)),
    []
  )
  const projetoAtual = useMemo(
    () => [...sistemas, ...jogos].find((p) => p.id === modalAberto),
    [modalAberto]
  )
  const totalProjetos = sistemas.length + jogos.length

  const containerVariants = useMemo(
    () =>
      usarAnimacoes
        ? {
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: ehDispositivoLento ? 0.05 : 0.1,
              },
            },
          }
        : { hidden: { opacity: 1 }, visible: { opacity: 1 } },
    [usarAnimacoes, ehDispositivoLento]
  )

  return (
    <Box
      as="section"
      id="projetos"
      className="py-16 sm:py-20 md:py-24 lg:py-32 relative bg-black font-sans overflow-hidden"
    >
      <ProjetoModal isOpen={!!modalAberto} onClose={fecharModal} projeto={projetoAtual} />
      <Box className="absolute inset-0 bg-game-black opacity-50" />
      <Box className="absolute inset-0 bg-[radial-gradient(currentColor_1px,transparent_1px)] bg-[size:20px_20px] text-brand-500/40" />
      <Container size="xl" className="relative z-10 px-4 sm:px-6">
        <VStack className="items-center text-center gap-3 sm:gap-4 mb-12 sm:mb-16 md:mb-20 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, scale: ehDispositivoLento ? 0.9 : 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewport}
            transition={{ duration }}
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
            initial={{ opacity: 0, y: ehDispositivoLento ? 10 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration, delay: getDelay(0.1) }}
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
          viewport={viewport}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 max-w-6xl mx-auto"
        >
          {projetosDestaque.map((projeto) => (
            <CardProjeto key={projeto.id} projeto={projeto} onAbrirModal={abrirModal} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: ehDispositivoLento ? 10 : 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration, delay: getDelay(0.2) }}
          className="mt-20 sm:mt-24 md:mt-32"
        >
          <VStack className="items-center gap-0 mb-10">
            <Box className="w-px h-12 sm:h-16 bg-gradient-to-b from-transparent via-brand-500/50 to-brand-500" />
            <motion.div
              className="w-8 h-8 rounded-full border border-brand-500/60 bg-brand-500/10 flex items-center justify-center"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            </motion.div>
          </VStack>

          <Box className="relative max-w-3xl mx-auto">
            <motion.div
              className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-brand-500/30 via-brand-400/10 to-brand-500/30 blur-xl"
              animate={{ opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
            />

            <Box className="relative rounded-3xl border border-brand-500/30 bg-zinc-950 overflow-hidden">
              <Box className="absolute inset-0 bg-[radial-gradient(currentColor_1px,transparent_1px)] bg-[size:18px_18px] text-brand-500/[0.04] pointer-events-none" />

              <motion.div
                className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-brand-400 to-transparent"
                animate={{ opacity: [0.3, 1, 0.3], scaleX: [0.6, 1, 0.6] }}
                transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
              />

              <Box className="px-6 py-10 sm:px-12 sm:py-20">
                <Box className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                  <Box className="grid grid-cols-3 lg:flex lg:flex-col gap-3 lg:gap-5 w-full lg:w-auto flex-shrink-0">
                    {[
                      {
                        valor: sistemas.length,
                        label: 'Sistemas Web',
                        icon: Code2,
                        cor: 'text-brand-400',
                        bg: 'bg-brand-500/10 border-brand-500/20',
                      },
                      {
                        valor: jogos.length,
                        label: 'Games',
                        icon: Gamepad2,
                        cor: 'text-purple-400',
                        bg: 'bg-purple-500/10 border-purple-500/20',
                      },
                      {
                        valor: totalProjetos,
                        label: 'Total',
                        icon: Layers,
                        cor: 'text-white',
                        bg: 'bg-white/5 border-white/10',
                      },
                    ].map(({ valor, label, icon: StatIcon, cor, bg }) => (
                      <VStack
                        key={label}
                        className={`items-center gap-1.5 px-3 py-3 lg:px-4 rounded-xl border ${bg}`}
                      >
                        <StatIcon className={`w-4 h-4 flex-shrink-0 ${cor}`} />
                        <span
                          className={`text-2xl lg:text-3xl font-black font-heading tabular-nums leading-none ${cor}`}
                        >
                          {valor}
                        </span>
                        <Text className="text-[9px] lg:text-[10px] text-zinc-500 uppercase tracking-widest font-bold text-center leading-tight">
                          {label}
                        </Text>
                      </VStack>
                    ))}
                  </Box>

                  <Box className="hidden lg:block w-px self-stretch bg-zinc-800/60 flex-shrink-0" />
                  <Box className="lg:hidden w-full h-px bg-zinc-800/60" />

                  <VStack className="items-center lg:items-start gap-5 text-center lg:text-left flex-1">
                    <VStack className="gap-2">
                      <Title
                        as="h3"
                        className="text-2xl sm:text-3xl font-black font-heading text-white uppercase tracking-tight leading-tight"
                      >
                        Muito mais <span className="text-brand-400">te espera</span> aqui
                      </Title>
                      <Text className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-sm">
                        Estes são só os destaques. Veja cada projeto com stack completa, capturas e
                        links.
                      </Text>
                    </VStack>

                    <Link to="/projetos" className="w-full lg:w-auto">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      >
                        <Button
                          size="lg"
                          className="
                            w-full lg:w-auto
                            bg-brand-500 hover:bg-brand-400 active:bg-brand-600
                            text-black font-black
                            px-8 py-8 text-base sm:text-lg uppercase tracking-widest
                            rounded-xl
                            shadow-brand-glow-lg hover:shadow-brand-glow-xl
                            transition-shadow duration-300
                            group relative overflow-hidden
                          "
                        >
                          <Box className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600" />
                          <HStack className="items-center justify-center gap-3 relative z-10">
                            <Layers className="w-5 h-5 flex-shrink-0" />
                            <span>Ver Todos os Projetos</span>
                            <ArrowRight className="w-5 h-5 flex-shrink-0 group-hover:translate-x-2 transition-transform duration-200" />
                          </HStack>
                        </Button>
                      </motion.div>
                    </Link>

                    <HStack className="gap-1.5 items-center">
                      <Box className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
                      <Text className="text-[11px] text-zinc-600 uppercase tracking-widest font-bold">
                        Acesso gratuito · sem cadastro
                      </Text>
                    </HStack>
                  </VStack>
                </Box>
              </Box>

              <motion.div
                className="absolute bottom-0 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-brand-500/60 to-transparent"
                animate={{ opacity: [0.2, 0.8, 0.2] }}
                transition={{
                  duration: 2.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'easeInOut',
                  delay: 1.25,
                }}
              />
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  )
})
