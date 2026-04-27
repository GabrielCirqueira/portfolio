import { motion } from 'framer-motion'
import { ArrowLeft, Gamepad2, Layers, Monitor, TrendingUp } from 'lucide-react'
import { memo, Suspense, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CardProjeto } from '@/components/responsive/CardProjeto'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { useAnimation } from '@/contexts'
import { jogos, sistemas } from '@/data/projetos'
import { useSEO } from '@/hooks/useSEO'
import { AppContainer, Footer, Header } from '@/layouts'
import { Button } from '@/shadcn/components/ui/button'
import { Box, Container, HStack, VStack } from '@/shadcn/components/ui/layout'
import { Text } from '@/shadcn/components/ui/typography'
import { lazyWithRetry } from '@/utils/importRetry'

const Mascote = lazyWithRetry(() =>
  import('@/components/ui/Mascote').then((module) => ({ default: module.Mascote }))
)
const WhatsAppButton = lazyWithRetry(() =>
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
      staggerChildren: 0.1,
    },
  },
}

export const Component = memo(() => {
  const [filtroAtivo, setFiltroAtivo] = useState<FiltroTipo>('todos')
  const navigate = useNavigate()
  const { fadeUp, reducedMotion, fadeIn } = useAnimation()

  useSEO({
    title: 'Projetos | Gabriel Cirqueira',
    description: 'Repositório completo de projetos desenvolvidos por Gabriel Cirqueira.',
    canonical: 'https://cirqueira.com/projetos',
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const todosProjetos = useMemo(() => [...sistemas, ...jogos], [])

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
      paddingY="0"
      className="min-h-screen bg-black w-full overflow-x-hidden"
    >
      <Suspense fallback={null}>
        <Mascote />
        <WhatsAppButton />
      </Suspense>
      <Header />

      <main className="relative pt-32 pb-32">
        <Box className="fixed inset-0 pointer-events-none">
          <Box className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(27,200,69,0.05),transparent_50%)]" />
          <Box className="absolute bottom-0 left-0 right-0 h-[50vh] bg-[gradient-to-t(from_black,to_transparent)]" />
        </Box>

        <Container size="xl" className="relative z-10 px-6">
          <motion.div
            variants={reducedMotion ? {} : fadeIn}
            initial="hidden"
            animate="visible"
            className="mb-10"
          >
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="group text-zinc-500 hover:text-brand-400 hover:bg-transparent p-0 gap-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Início <span className="text-zinc-800">/</span> Projetos
            </Button>
          </motion.div>

          <SectionHeader
            number="04"
            title="Repositório"
            subtitle="Uma visão detalhada de toda a minha produção técnica, organizada cronologicamente e categorizada por tipo de solução."
          />

          <motion.div
            variants={reducedMotion ? {} : fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6 border-b border-zinc-900 pb-12"
          >
            <VStack className="items-start gap-1">
              <Text className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">
                Total
              </Text>
              <HStack className="gap-2">
                <Layers size={14} className="text-brand-500" />
                <Text className="text-white text-xl font-black font-heading">
                  {todosProjetos.length}
                </Text>
              </HStack>
            </VStack>

            <VStack className="items-start gap-1">
              <Text className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">
                Sistemas
              </Text>
              <HStack className="gap-2">
                <Monitor size={14} className="text-brand-500" />
                <Text className="text-white text-xl font-black font-heading">
                  {sistemas.length}
                </Text>
              </HStack>
            </VStack>

            <VStack className="items-start gap-1">
              <Text className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">
                Jogos
              </Text>
              <HStack className="gap-2">
                <Gamepad2 size={14} className="text-brand-500" />
                <Text className="text-white text-xl font-black font-heading">{jogos.length}</Text>
              </HStack>
            </VStack>
          </motion.div>

          <motion.div
            variants={reducedMotion ? {} : fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="mt-12 mb-20"
          >
            <HStack className="gap-2 bg-zinc-900/30 p-1.5 rounded-2xl border border-zinc-800/50 w-fit">
              {(['todos', 'sistemas', 'jogos'] as FiltroTipo[]).map((tipo) => (
                <button
                  type="button"
                  key={tipo}
                  onClick={() => setFiltroAtivo(tipo)}
                  className={`
                    px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.15em] rounded-xl transition-all duration-500
                    ${
                      filtroAtivo === tipo
                        ? 'bg-brand-500 text-black shadow-lg shadow-brand-500/20'
                        : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'
                    }
                  `}
                >
                  {tipo}
                </button>
              ))}
            </HStack>
          </motion.div>

          <VStack className="gap-24 sm:gap-32">
            {projetosPorAno.map(([ano, projetos], _anoIndex) => (
              <motion.div
                key={ano}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8 }}
                className="w-full group/year"
              >
                <HStack className="items-end gap-6 mb-12">
                  <div className="relative">
                    <Text className="font-chakra text-6xl sm:text-8xl font-black text-zinc-900/50 leading-none tracking-tighter group-hover/year:text-brand-500/10 transition-colors duration-700">
                      {ano}
                    </Text>
                    <Box className="absolute bottom-2 left-0 w-full h-1 bg-brand-500/20 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-brand-500"
                        initial={{ x: '-100%' }}
                        whileInView={{ x: '0%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </Box>
                  </div>
                  <Text className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.4em] mb-2 hidden sm:block">
                    {projetos.length} {projetos.length === 1 ? 'PROJETO' : 'PROJETOS'}
                  </Text>
                </HStack>

                <motion.div
                  variants={reducedMotion ? {} : containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {projetos.map((projeto) => (
                    <motion.div
                      key={projeto.id}
                      variants={
                        reducedMotion
                          ? {}
                          : {
                              hidden: { opacity: 0, y: 20 },
                              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                            }
                      }
                    >
                      <CardProjeto projeto={projeto} />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </VStack>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-40 border-t border-zinc-900 pt-20 text-center"
          >
            <TrendingUp className="w-8 h-8 text-brand-500 mx-auto mb-8 opacity-50" />
            <Text className="max-w-2xl mx-auto text-zinc-500 text-base md:text-lg leading-relaxed font-medium italic">
              "A verdadeira evolução de um desenvolvedor não está no volume de código escrito, mas
              na clareza dos problemas resolvidos."
            </Text>
            <HStack className="justify-center gap-4 mt-12">
              <Box className="w-2 h-2 rounded-full bg-brand-500/20" />
              <Box className="w-2 h-2 rounded-full bg-brand-500/40" />
              <Box className="w-2 h-2 rounded-full bg-brand-500/20" />
            </HStack>
          </motion.div>
        </Container>
      </main>

      <Footer />
    </AppContainer>
  )
})

Component.displayName = 'ProjetosPage'
export default Component
