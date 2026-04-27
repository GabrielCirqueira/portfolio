import { motion } from 'framer-motion'
import { ArrowRight, Code2, Eye, Github, Rocket } from 'lucide-react'
import { memo, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { useAnimation } from '@/contexts'
import { sistemas } from '@/data/projetos'
import { Button } from '@/shadcn/components/ui/button'
import { Box, Container, Grid, HStack, VStack } from '@/shadcn/components/ui/layout'
import { Span, Text, Title } from '@/shadcn/components/ui/typography'

export const ProjectsSection = memo(() => {
  const { fadeUp, reducedMotion } = useAnimation()

  const projetoDestaque = useMemo(
    () => sistemas.find((s) => s.id === 'unytools') || sistemas[0],
    []
  )

  const projetosGrid = useMemo(() => {
    const ids = ['spacenow', 'boi-na-conta', 'organizabus', 'monitoramento']
    return ids.map((id) => sistemas.find((s) => s.id === id)).filter(Boolean) as typeof sistemas
  }, [])

  return (
    <Box as="section" id="projetos" className="py-24 bg-black overflow-hidden">
      <Container size="xl" className="px-6">
        <SectionHeader
          number="04"
          title="Projetos"
          subtitle="Uma vitrine técnica dos meus sistemas e jogos mais complexos, focando em arquitetura robusta e performance."
        />

        <VStack className="mt-16 gap-12">
          <motion.div
            variants={reducedMotion ? {} : fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="group relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-500/20 to-purple-500/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
            <Box className="relative bg-zinc-900/40 border border-zinc-800/50 rounded-2xl p-6 sm:p-10 hover:border-brand-500/40 transition-all duration-500">
              <Grid className="grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <VStack className="gap-6">
                  <HStack className="gap-3">
                    <Box className="px-3 py-1 bg-brand-500/10 border border-brand-500/20 rounded-full">
                      <Text className="text-[10px] font-black uppercase tracking-widest text-brand-400">
                        Destaque Principal
                      </Text>
                    </Box>
                    <Box className="px-3 py-1 bg-zinc-800/50 rounded-full">
                      <Text className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                        Sistema Fullstack
                      </Text>
                    </Box>
                  </HStack>

                  <VStack className="gap-4">
                    <Title
                      as="h3"
                      className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white font-heading"
                    >
                      {projetoDestaque.titulo}
                    </Title>
                    <Text className="text-zinc-400 text-sm sm:text-lg leading-relaxed">
                      {projetoDestaque.descricao}
                    </Text>
                  </VStack>

                  <div className="flex flex-wrap gap-2">
                    {projetoDestaque.tecnologias.slice(0, 6).map((tech) => (
                      <Span
                        key={tech}
                        className="px-3 py-1 bg-zinc-800/30 text-zinc-500 text-[10px] uppercase font-bold rounded-lg border border-zinc-800/50"
                      >
                        {tech}
                      </Span>
                    ))}
                    <Span className="px-3 py-1 bg-zinc-800/30 text-zinc-600 text-[10px] uppercase font-bold rounded-lg">
                      +{projetoDestaque.tecnologias.length - 6}
                    </Span>
                  </div>

                  <HStack className="gap-4 pt-4">
                    <Button
                      asChild
                      className="bg-brand-500 text-black hover:bg-brand-400 font-bold uppercase tracking-widest text-xs px-8"
                    >
                      <a href={projetoDestaque.link} target="_blank" rel="noreferrer">
                        <Rocket className="w-4 h-4 mr-2" /> Acessar {projetoDestaque.titulo}
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      asChild
                      className="border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 font-bold uppercase tracking-widest text-xs"
                    >
                      <Link to={`/projetos/${projetoDestaque.id}`}>Detalhes Técnicos</Link>
                    </Button>
                  </HStack>
                </VStack>

                <Link
                  to={`/projetos/${projetoDestaque.id}`}
                  className="relative aspect-video rounded-xl overflow-hidden border border-zinc-800/50 group-hover:border-brand-500/30 transition-colors block"
                >
                  <img
                    src={projetoDestaque.imagem}
                    alt={projetoDestaque.titulo}
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                  />
                  <Box className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Eye className="text-white w-10 h-10 scale-0 group-hover:scale-100 transition-transform duration-500" />
                  </Box>
                </Link>
              </Grid>
            </Box>
          </motion.div>

          <Grid className="grid-cols-1 md:grid-cols-2 gap-8">
            {projetosGrid.map((proj, i) => (
              <motion.div
                key={proj.id}
                variants={reducedMotion ? {} : fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col bg-zinc-900/30 border border-zinc-800/50 rounded-3xl overflow-hidden hover:border-brand-500/30 transition-all duration-500"
              >
                <Link
                  to={`/projetos/${proj.id}`}
                  className="aspect-video relative overflow-hidden block"
                >
                  <img
                    src={proj.imagem}
                    alt={proj.titulo}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <Box className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                  <Box className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
                    <span className="px-6 py-2 bg-brand-500 text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                      Ver Projeto
                    </span>
                  </Box>
                </Link>

                <VStack className="p-8 gap-6 flex-1">
                  <VStack className="gap-3">
                    <Title
                      as="h4"
                      className="text-xl font-black text-white uppercase tracking-tighter group-hover:text-brand-400 transition-colors"
                    >
                      {proj.titulo}
                    </Title>
                    <Text className="text-zinc-400 text-sm line-clamp-2 leading-relaxed font-medium">
                      {proj.descricao}
                    </Text>
                  </VStack>

                  <div className="flex flex-wrap gap-x-4 gap-y-2 mt-auto">
                    {proj.tecnologias.slice(0, 3).map((tech) => (
                      <Span
                        key={tech}
                        className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest"
                      >
                        {tech}
                      </Span>
                    ))}
                    <Link
                      to={`/projetos/${proj.id}`}
                      className="text-brand-500 hover:text-brand-400 transition-all flex items-center gap-2 ml-auto group/link"
                    >
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </VStack>
              </motion.div>
            ))}
          </Grid>
        </VStack>

        <VStack className="mt-20 items-center gap-8">
          <Button
            asChild
            variant="outline"
            className="h-14 px-10 border-brand-500/20 text-brand-400 hover:bg-brand-500/5 rounded-full group transition-all duration-500 hover:border-brand-500/60 hover:shadow-[0_0_30px_rgba(32,197,110,0.1)]"
          >
            <Link to="/projetos" className="flex items-center gap-3">
              <span className="text-xs font-black uppercase tracking-[0.3em]">
                Explorar Portfólio Completo
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
            </Link>
          </Button>

          <HStack className="gap-8">
            <a
              href="https://github.com/GabrielCirqueira"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-zinc-600 hover:text-white transition-colors group"
            >
              <Github className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Open Source</span>
            </a>
            <Box className="w-px h-4 bg-zinc-800" />
            <HStack className="gap-2 text-zinc-600">
              <Code2 className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                {sistemas.length} Projetos Ativos
              </span>
            </HStack>
          </HStack>
        </VStack>
      </Container>
    </Box>
  )
})

ProjectsSection.displayName = 'ProjectsSection'
