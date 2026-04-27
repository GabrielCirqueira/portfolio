import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, Calendar, ExternalLink, Layers, Sparkles, X } from 'lucide-react'
import { memo, Suspense, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { JSONLD } from '@/components/ui/JSONLD'
import { useAnimation } from '@/contexts'
import { jogos, sistemas } from '@/data/projetos'
import { useSEO } from '@/hooks/useSEO'
import { AppContainer, Footer, Header } from '@/layouts'
import { Badge } from '@/shadcn/components/ui/badge'
import { Button } from '@/shadcn/components/ui/button'
import { Box, Container, HStack, VStack } from '@/shadcn/components/ui/layout'
import { Text, Title } from '@/shadcn/components/ui/typography'
import { cn } from '@/shadcn/lib/utils'
import { lazyWithRetry } from '@/utils/importRetry'

const Mascote = lazyWithRetry(() =>
  import('@/components/ui/Mascote').then((module) => ({ default: module.Mascote }))
)
const WhatsAppButton = lazyWithRetry(() =>
  import('@/components/ui/WhatsAppButton').then((module) => ({
    default: module.WhatsAppButton,
  }))
)

export const Component = memo(() => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { fadeUp, reducedMotion, fadeIn } = useAnimation()
  const [imagemSelecionada, setImagemSelecionada] = useState(0)
  const [imagemExpandida, setImagemExpandida] = useState<string | null>(null)

  const projeto = useMemo(() => {
    const todos = [...sistemas, ...jogos]
    return todos.find((p) => p.id === id)
  }, [id])

  useSEO({
    title: projeto ? `${projeto.titulo} | Gabriel Cirqueira` : 'Projeto não encontrado',
    description: projeto?.descricao || 'Detalhes do projeto desenvolvido por Gabriel Cirqueira.',
    ogImage: projeto ? `https://cirqueira.com${projeto.imagens[0]}` : undefined,
    ogTitle: projeto?.titulo,
    ogDescription: projeto?.descricao,
    canonical: `https://cirqueira.com/projetos/${id}`,
  })

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setImagemExpandida(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    setImagemSelecionada(0)
  }, [])

  if (!projeto) {
    return (
      <AppContainer className="min-h-screen bg-black flex items-center justify-center">
        <VStack className="text-center gap-6">
          <Title className="text-white">Projeto não encontrado</Title>
          <Button onClick={() => navigate('/projetos')}>Voltar para Projetos</Button>
        </VStack>
      </AppContainer>
    )
  }

  const formatarData = (data: string) => {
    if (!data) return ''
    const [ano, mes, dia] = data.split('-')
    return `${dia}/${mes}/${ano}`
  }

  return (
    <AppContainer
      paddingX="0"
      paddingY="0"
      className="min-h-screen bg-black w-full overflow-x-hidden"
    >
      <JSONLD
        data={{
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: projeto.titulo,
          description: projeto.descricao,
          image: projeto.imagem,
          author: {
            '@type': 'Person',
            name: 'Gabriel Cirqueira',
          },
        }}
      />
      <Suspense fallback={null}>
        <Mascote />
        <WhatsAppButton />
      </Suspense>
      <Header />

      <main className="relative">
        <Box className="fixed inset-0 pointer-events-none z-0">
          <Box className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/5 blur-[120px] rounded-full" />
          <Box className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full" />
        </Box>

        <Box className="relative pt-32 pb-16 sm:pt-40 sm:pb-24">
          <Container size="xl" className="px-6">
            <motion.div
              variants={reducedMotion ? {} : fadeIn}
              initial="hidden"
              animate="visible"
              className="mb-12"
            >
              <Button
                variant="ghost"
                onClick={() => navigate('/projetos')}
                className="group text-zinc-500 hover:text-brand-400 p-0 gap-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all"
              >
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Voltar para a Galeria
              </Button>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
              <div className="lg:col-span-8">
                <motion.div
                  variants={reducedMotion ? {} : fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6"
                >
                  <HStack className="gap-3">
                    <Badge className="bg-brand-500/10 text-brand-400 border-brand-500/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest">
                      {projeto.tipo === 'jogo' ? 'Game Dev' : 'Software Architecture'}
                    </Badge>
                    <Box className="w-1 h-1 rounded-full bg-zinc-800" />
                    <HStack className="gap-2 text-zinc-500">
                      <Calendar size={12} />
                      <Text className="text-[10px] font-black uppercase tracking-widest">
                        {projeto.periodoExibicao ||
                          projeto.anoExibicao ||
                          projeto.dataInicio.split('-')[0]}
                      </Text>
                    </HStack>
                  </HStack>

                  <Title
                    as="h1"
                    className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter font-heading leading-[0.85] text-white"
                  >
                    {projeto.titulo}
                  </Title>

                  <Text className="text-zinc-400 text-lg sm:text-xl max-w-3xl leading-relaxed font-medium">
                    {projeto.descricao}
                  </Text>
                </motion.div>
              </div>

              <div className="lg:col-span-4 lg:pb-4">
                <motion.div
                  variants={reducedMotion ? {} : fadeUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.2 }}
                >
                  {projeto.link && (
                    <a
                      href={projeto.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block w-full sm:w-auto"
                    >
                      <Button className="w-full h-16 bg-brand-500 hover:bg-brand-400 text-black font-black uppercase tracking-widest gap-3 shadow-xl shadow-brand-500/20 group">
                        Acessar Projeto
                        <ExternalLink
                          size={18}
                          className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                        />
                      </Button>
                    </a>
                  )}
                </motion.div>
              </div>
            </div>
          </Container>
        </Box>

        <Box className="pb-32">
          <Container size="xl" className="px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-7 space-y-8">
                <motion.div
                  variants={reducedMotion ? {} : fadeIn}
                  initial="hidden"
                  animate="visible"
                  className="relative aspect-video rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900 group shadow-2xl cursor-zoom-in"
                  onClick={() => setImagemExpandida(projeto.imagens[imagemSelecionada])}
                >
                  <img
                    src={projeto.imagens[imagemSelecionada]}
                    alt={projeto.titulo}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

                  <Box className="absolute top-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Badge className="bg-brand-500 text-black font-black uppercase tracking-widest text-[10px]">
                      Clique para ampliar
                    </Badge>
                  </Box>

                  <Box className="absolute bottom-6 right-6">
                    <Badge className="bg-black/60 backdrop-blur-md border-white/10 text-white font-mono text-[10px]">
                      {imagemSelecionada + 1} / {projeto.imagens.length}
                    </Badge>
                  </Box>
                </motion.div>

                {projeto.imagens.length > 1 && (
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
                    {projeto.imagens.map((img, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setImagemSelecionada(idx)}
                        className={cn(
                          'relative aspect-video rounded-xl overflow-hidden border-2 transition-all duration-300',
                          imagemSelecionada === idx
                            ? 'border-brand-500 scale-105 shadow-lg shadow-brand-500/20'
                            : 'border-zinc-800 opacity-40 hover:opacity-100 hover:border-zinc-600'
                        )}
                      >
                        <img
                          src={img}
                          alt={`Thumb ${idx}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="lg:col-span-5 space-y-12">
                <VStack className="items-start gap-6">
                  <HStack className="gap-3">
                    <Box className="p-2 bg-brand-500/10 rounded-lg">
                      <Layers size={16} className="text-brand-400" />
                    </Box>
                    <Text className="text-[10px] text-zinc-500 uppercase font-black tracking-[0.3em]">
                      Stack Técnica
                    </Text>
                  </HStack>
                  <div className="flex flex-wrap gap-2">
                    {projeto.tecnologias.map((tech) => (
                      <Badge
                        key={tech}
                        className="bg-zinc-900/50 hover:bg-brand-500 hover:text-black border-zinc-800 px-4 py-2 text-[10px] font-black uppercase tracking-wider transition-all duration-300"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </VStack>

                <VStack className="items-start gap-6">
                  <HStack className="gap-3">
                    <Box className="p-2 bg-brand-500/10 rounded-lg">
                      <Sparkles size={16} className="text-brand-400" />
                    </Box>
                    <Text className="text-[10px] text-zinc-500 uppercase font-black tracking-[0.3em]">
                      Apresentação
                    </Text>
                  </HStack>
                  <div className="space-y-6">
                    {projeto.descricaoCompleta.map((p, idx) => (
                      <Text key={idx} className="text-zinc-400 text-lg leading-relaxed font-medium">
                        {p}
                      </Text>
                    ))}
                  </div>
                </VStack>

                <div className="pt-8 border-t border-zinc-900">
                  <HStack className="justify-between items-center">
                    <VStack className="items-start gap-1">
                      <Text className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">
                        Início do Desenvolvimento
                      </Text>
                      <Text className="text-white font-mono">
                        {formatarData(projeto.dataInicio)}
                      </Text>
                    </VStack>
                  </HStack>
                </div>
              </div>
            </div>
          </Container>
        </Box>
      </main>

      <Footer />

      <AnimatePresence>
        {imagemExpandida && (
          <Box
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-10 cursor-zoom-out"
            onClick={() => setImagemExpandida(null)}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative z-10 w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={imagemExpandida}
                alt="Fullscreen"
                className="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
              />

              <Button
                type="button"
                variant="ghost"
                onClick={() => setImagemExpandida(null)}
                className="absolute top-0 -right-2 sm:-top-10 sm:-right-10 text-white hover:text-brand-400 p-2"
              >
                <X size={32} />
              </Button>
            </motion.div>
          </Box>
        )}
      </AnimatePresence>
    </AppContainer>
  )
})

Component.displayName = 'ProjetoDetalhesPage'
export default Component
