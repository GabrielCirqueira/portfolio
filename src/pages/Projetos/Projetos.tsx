import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Calendar,
  Code2,
  Filter,
  Gamepad2,
  Layers,
  Monitor,
  Sparkles,
  TrendingUp,
} from 'lucide-react'
import { lazy, memo, Suspense, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CardProjeto } from '@/components/responsive/CardProjeto'
import { ProjetoModal } from '@/components/responsive/ProjetoModal'
import { jogos, sistemas } from '@/data/projetos'
import { AppContainer, Footer, Header } from '@/layouts'
import { Badge } from '@/shadcn/components/ui/badge'
import { Button } from '@/shadcn/components/ui/button'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, Container, Grid, HStack, VStack } from '@/shadcn/components/ui/layout'
import { Span, Text, Title } from '@/shadcn/components/ui/typography'

const Mascote = lazy(() =>
  import('@/components/ui/Mascote').then((module) => ({ default: module.Mascote }))
)
const WhatsAppButton = lazy(() =>
  import('@/components/ui/WhatsAppButton').then((module) => ({
    default: module.WhatsAppButton,
  }))
)

type FiltroTipo = 'todos' | 'sistemas' | 'jogos'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

const estatisticas = [
  {
    icone: Layers,
    valor: sistemas.length + jogos.length,
    rotulo: 'Projetos',
    cor: 'text-brand-400',
  },
  {
    icone: Monitor,
    valor: sistemas.length,
    rotulo: 'Sistemas Web',
    cor: 'text-blue-400',
  },
  {
    icone: Gamepad2,
    valor: jogos.length,
    rotulo: 'Jogos',
    cor: 'text-purple-400',
  },
  {
    icone: Code2,
    valor: [...new Set([...sistemas, ...jogos].flatMap((p) => p.tecnologias))].length,
    rotulo: 'Tecnologias',
    cor: 'text-emerald-400',
  },
]

const filtros: { tipo: FiltroTipo; label: string; icone: typeof Layers }[] = [
  { tipo: 'todos', label: 'Todos', icone: Layers },
  { tipo: 'sistemas', label: 'Sistemas', icone: Monitor },
  { tipo: 'jogos', label: 'Jogos', icone: Gamepad2 },
]

export const Component = memo(() => {
  const [modalAberto, setModalAberto] = useState<string | null>(null)
  const [filtroAtivo, setFiltroAtivo] = useState<FiltroTipo>('todos')
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const voltarParaProjetos = () => {
    navigate('/#projetos')
  }

  const abrirModal = (id: string) => setModalAberto(id)
  const fecharModal = () => setModalAberto(null)

  const todosProjetos = useMemo(() => [...sistemas, ...jogos], [])
  const projetoAtual = todosProjetos.find((p) => p.id === modalAberto)

  const projetosFiltrados = useMemo(() => {
    let projetos = todosProjetos

    if (filtroAtivo === 'sistemas') {
      projetos = sistemas
    } else if (filtroAtivo === 'jogos') {
      projetos = jogos
    }

    return [...projetos].sort((a, b) => {
      const dataA = new Date(a.dataInicio).getTime()
      const dataB = new Date(b.dataInicio).getTime()
      return dataB - dataA
    })
  }, [filtroAtivo, todosProjetos])

  const projetosPorAno = useMemo(() => {
    const grupos: Record<string, typeof projetosFiltrados> = {}

    for (const projeto of projetosFiltrados) {
      const ano = projeto.anoExibicao || projeto.dataInicio.split('-')[0]
      if (!grupos[ano]) {
        grupos[ano] = []
      }
      grupos[ano].push(projeto)
    }

    return Object.entries(grupos).sort(([a], [b]) => Number(b) - Number(a))
  }, [projetosFiltrados])

  return (
    <AppContainer
      paddingX="0"
      className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black w-full overflow-x-hidden"
    >
      <Suspense fallback={null}>
        <Mascote />
        <WhatsAppButton />
      </Suspense>
      <Header />

      {projetoAtual && (
        <ProjetoModal isOpen={!!modalAberto} onClose={fecharModal} projeto={projetoAtual} />
      )}

      <main>
        <Box className="relative pt-20 pb-10 sm:pt-32 sm:pb-20 overflow-hidden">
          <Box className="absolute inset-0 bg-gradient-to-b from-brand-500/5 via-transparent to-transparent" />
          <Box className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-500/10 via-transparent to-transparent" />
          <Box className="absolute inset-0 bg-[radial-gradient(currentColor_1px,transparent_1px)] bg-[size:24px_24px] text-brand-500/20 opacity-50" />

          <Container size="xl" className="relative z-10 px-5 sm:px-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 sm:mb-8"
            >
              <Button
                variant="ghost"
                onClick={voltarParaProjetos}
                className="text-zinc-400 hover:text-white hover:bg-zinc-800/50 gap-2 text-sm"
              >
                <Icon icon={ArrowLeft} className="w-4 h-4" />
                <span className="hidden sm:inline">Voltar para Home</span>
                <span className="sm:hidden">Voltar</span>
              </Button>
            </motion.div>

            <VStack className="items-center text-center gap-4 sm:gap-6 mb-8 sm:mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Badge
                  variant="outline"
                  className="
                    border-brand-500/40 text-brand-400
                    uppercase tracking-wider text-xs font-semibold
                    px-5 py-2 bg-brand-500/10 backdrop-blur-md
                    shadow-lg shadow-brand-500/10 rounded-full
                    flex items-center gap-2
                  "
                >
                  <Icon icon={Sparkles} className="w-3.5 h-3.5" />
                  Portfólio Completo
                </Badge>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Title
                  as="h1"
                  className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight font-heading"
                >
                  Todos os <Span className="text-gradient">Projetos</Span>
                </Title>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-2xl px-2"
              >
                <Text className="text-zinc-400 text-xs sm:text-base md:text-lg leading-relaxed">
                  Uma jornada através dos projetos que desenvolvi ao longo dos anos.
                </Text>
              </motion.div>
            </VStack>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Grid className="grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 max-w-3xl mx-auto px-1">
                {estatisticas.map((stat, index) => (
                  <motion.div
                    key={stat.rotulo}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="
                      bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50
                      rounded-lg sm:rounded-2xl p-2.5 sm:p-5 text-center
                      hover:border-zinc-700/50 transition-colors
                    "
                  >
                    <Icon
                      icon={stat.icone}
                      className={`w-4 h-4 sm:w-6 sm:h-6 mx-auto mb-1 sm:mb-2 ${stat.cor}`}
                    />
                    <Text className="text-lg sm:text-3xl font-bold text-white font-heading">
                      {stat.valor}
                    </Text>
                    <Text className="text-[8px] sm:text-xs text-zinc-500 uppercase tracking-wider font-semibold whitespace-nowrap">
                      {stat.rotulo}
                    </Text>
                  </motion.div>
                ))}
              </Grid>
            </motion.div>
          </Container>
        </Box>

        <Box className="py-8 sm:py-16 relative">
          {/* Background Effects */}
          <Box className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950" />
          <Box className="absolute inset-0 bg-[radial-gradient(currentColor_1px,transparent_1px)] bg-[size:20px_20px] text-brand-500/10" />
          <Box className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />
          <Box className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

          <Container size="xl" className="relative z-10 px-5 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-8 sm:mb-14"
            >
              <HStack className="items-center gap-3 mb-4 sm:mb-6">
                <Icon icon={Filter} className="w-4 h-4 text-zinc-500" />
                <Text className="text-sm text-zinc-500 uppercase tracking-wider font-semibold">
                  Filtrar por tipo
                </Text>
              </HStack>

              <HStack className="flex-wrap gap-2 sm:gap-3">
                {filtros.map((filtro) => (
                  <Button
                    key={filtro.tipo}
                    variant={filtroAtivo === filtro.tipo ? 'default' : 'outline'}
                    onClick={() => setFiltroAtivo(filtro.tipo)}
                    className={`
                      gap-1.5 sm:gap-2 rounded-full px-3 sm:px-5 py-1.5 sm:py-2 transition-all text-xs sm:text-sm
                      ${
                        filtroAtivo === filtro.tipo
                          ? 'bg-brand-500 text-black hover:bg-brand-600 shadow-lg shadow-brand-500/30'
                          : 'border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-white bg-transparent'
                      }
                    `}
                  >
                    <Icon icon={filtro.icone} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    {filtro.label}
                    <Badge
                      className={`
                        ml-0.5 sm:ml-1 px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] rounded-full
                        ${
                          filtroAtivo === filtro.tipo
                            ? 'bg-black/20 text-black'
                            : 'bg-zinc-800 text-zinc-400'
                        }
                      `}
                    >
                      {filtro.tipo === 'todos'
                        ? todosProjetos.length
                        : filtro.tipo === 'sistemas'
                          ? sistemas.length
                          : jogos.length}
                    </Badge>
                  </Button>
                ))}
              </HStack>
            </motion.div>

            <VStack className="gap-10 sm:gap-16">
              {projetosPorAno.map(([ano, projetos], anoIndex) => (
                <motion.div
                  key={ano}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: anoIndex * 0.1 }}
                  className="w-full"
                >
                  <HStack className="items-center gap-2 sm:gap-4 mb-6 sm:mb-8 flex-wrap">
                    <HStack className="items-center gap-2 sm:gap-3 bg-zinc-900/80 border border-zinc-800 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 shadow-lg">
                      <Icon icon={Calendar} className="w-4 h-4 sm:w-5 sm:h-5 text-brand-400" />
                      <Text className="text-lg sm:text-2xl font-bold text-white font-heading">
                        {ano}
                      </Text>
                    </HStack>
                    <Box className="h-px bg-gradient-to-r from-brand-500/50 via-brand-500/20 to-transparent flex-1 hidden sm:block" />
                    <Badge className="bg-zinc-900 text-zinc-400 border border-zinc-800 px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm">
                      {projetos.length} {projetos.length === 1 ? 'projeto' : 'projetos'}
                    </Badge>
                  </HStack>

                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
                  >
                    {projetos.map((projeto) => (
                      <motion.div key={projeto.id} variants={itemVariants}>
                        <CardProjeto projeto={projeto} onAbrirModal={abrirModal} />
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              ))}
            </VStack>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-12 sm:mt-20 text-center"
            >
              <Box className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-brand-500/10 via-brand-500/5 to-transparent border border-brand-500/20 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 backdrop-blur-sm">
                <Icon icon={TrendingUp} className="w-5 h-5 sm:w-6 sm:h-6 text-brand-400" />
                <Text className="text-zinc-300 text-xs sm:text-base">
                  <Span className="text-brand-400 font-semibold">{projetosPorAno.length} anos</Span>{' '}
                  de evolução contínua
                </Text>
              </Box>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 sm:mt-12 text-center max-w-2xl mx-auto px-2"
            >
              <Box className="bg-zinc-900/50 border border-zinc-800 rounded-xl sm:rounded-2xl p-4 sm:p-8 backdrop-blur-sm">
                <Text className="text-zinc-400 text-xs sm:text-base leading-relaxed italic">
                  Estes são apenas os projetos que consegui reunir e documentar. Ao longo da minha
                  jornada como desenvolvedor, criei{' '}
                  <Span className="text-brand-400 font-semibold">muitos outros</Span>, alguns são
                  privados de clientes e outros que acabaram se perdendo no tempo.
                </Text>
              </Box>
            </motion.div>
          </Container>
        </Box>
      </main>

      <Footer />
    </AppContainer>
  )
})
