import { motion } from 'framer-motion'
import { ExternalLink, Gamepad2, Monitor } from 'lucide-react'
import { Badge } from '@/shadcn/components/ui/badge'
import { Button } from '@/shadcn/components/ui/button'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, Container, Grid, HStack, VStack } from '@/shadcn/components/ui/layout'
import { Text, Title } from '@/shadcn/components/ui/typography'

export function ProjectsSection() {
  const sistemas = [
    {
      title: 'Sistema de Monitoramento Escolar',
      description: 'Sistema completo para monitoramento e gestão de atividades escolares',
      image: 'https://monitoramento.escolansl.com/public/assents/img/sistema/painel.png',
      link: 'https://monitoramento.escolansl.com/sistema',
      technologies: ['PHP', 'MySQL', 'JavaScript', 'CSS'],
    },
    {
      title: 'Sistema de Eletivas e Tutorias',
      description: 'Plataforma para gerenciamento de eletivas e tutorias escolares',
      image: 'https://et.escolansl.com/public/assets/images/sistema/painel.png',
      link: 'https://et.escolansl.com/sistema',
      technologies: ['PHP', 'MySQL', 'JavaScript', 'CSS'],
    },
  ]

  const jogos = [
    {
      title: 'Biome Quest',
      description:
        'Jogo educativo onde um robô percorre diferentes biomas resolvendo problemas ambientais.',
      image: '/images/biome-quest.png',
      link: 'https://gd.games/oldgabriel/biome-quest',
      technologies: ['JavaScript', 'GDevelop', 'Game Design'],
    },
    {
      title: 'Pixel World',
      description: 'Jogo com temática inspirada em One Piece. Colete chaves e enfrente chefões.',
      image: '/images/pixel-world.png',
      link: 'https://gd.games/oldgabriel/pixel-world',
      technologies: ['JavaScript', 'GDevelop', 'Pixel Art'],
    },
  ]

  return (
    <Box id="projetos" className="py-24 relative bg-black font-sans">
      <Box className="absolute inset-0 bg-dotted-pattern opacity-50 pointer-events-none" />

      <Container size="xl" className="relative z-10 px-4">
        <VStack className="items-center text-center gap-4 mb-20">
          <Badge
            variant="outline"
            className="border-brand-500/50 text-brand-500 uppercase tracking-widest text-xs font-mono px-3 py-1 bg-brand-500/5"
          >
            Portfolio
          </Badge>
          <Title className="text-4xl md:text-5xl font-bold uppercase tracking-tight font-heading">
            Projetos <span className="text-brand-500">Em Destaque</span>
          </Title>
        </VStack>

        <VStack className="gap-12 mb-24">
          <Box className="flex items-center gap-3">
            <Box className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg">
              <Icon icon={Monitor} className="w-5 h-5 text-brand-500" />
            </Box>
            <Text className="text-xl font-bold uppercase tracking-wider font-heading text-white">
              Sistemas Web
            </Text>
            <Box className="h-px bg-zinc-800 flex-1 ml-4" />
          </Box>

          <Grid className="grid-cols-1 lg:grid-cols-2 gap-10">
            {sistemas.map((projeto) => (
              <motion.div
                key={projeto.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Box className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden hover:border-brand-500/30 transition-all duration-300 group flex flex-col h-full">
                  <a
                    href={projeto.link}
                    target="_blank"
                    className="block relative aspect-video w-full overflow-hidden border-b border-zinc-800 bg-zinc-900"
                  >
                    <img
                      src={projeto.image}
                      alt={projeto.title}
                      className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                  </a>

                  <VStack className="p-6 flex-grow justify-between gap-6">
                    <VStack className="gap-3">
                      <Title className="text-xl font-bold font-heading text-brand-500 uppercase tracking-wide">
                        {projeto.title}
                      </Title>
                      <Text className="text-gray-400 text-sm leading-relaxed font-normal">
                        {projeto.description}
                      </Text>
                    </VStack>

                    <VStack className="gap-6 pt-2">
                      <HStack className="flex-wrap gap-2">
                        {projeto.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            className="bg-zinc-900/50 text-brand-500 border border-brand-500/20 px-2 py-1 text-[10px] font-mono uppercase tracking-wider rounded-sm"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </HStack>

                      <a href={projeto.link} target="_blank" className="block w-full">
                        <Button className="w-full bg-brand-500 hover:bg-brand-600 text-black font-extrabold font-mono text-xs uppercase tracking-widest h-11 transition-all rounded-md">
                          <Icon icon={ExternalLink} className="w-4 h-4 mr-2" />
                          Visualizar Projeto
                        </Button>
                      </a>
                    </VStack>
                  </VStack>
                </Box>
              </motion.div>
            ))}
          </Grid>
        </VStack>

        <VStack className="gap-12">
          <Box className="flex items-center gap-3">
            <Box className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg">
              <Icon icon={Gamepad2} className="w-5 h-5 text-brand-500" />
            </Box>
            <Text className="text-xl font-bold uppercase tracking-wider font-heading text-white">
              Jogos Desenvolvidos
            </Text>
            <Box className="h-px bg-zinc-800 flex-1 ml-4" />
          </Box>

          <Grid className="grid-cols-1 lg:grid-cols-2 gap-10">
            {jogos.map((projeto) => (
              <motion.div
                key={projeto.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Box className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden hover:border-brand-500/30 transition-all duration-300 group flex flex-col h-full">
                  <a
                    href={projeto.link}
                    target="_blank"
                    className="block relative aspect-video w-full overflow-hidden border-b border-zinc-800 bg-zinc-900"
                  >
                    <img
                      src={projeto.image}
                      alt={projeto.title}
                      className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                  </a>

                  <VStack className="p-6 flex-grow justify-between gap-6">
                    <VStack className="gap-3">
                      <Title className="text-xl font-bold font-heading text-brand-500 uppercase tracking-wide">
                        {projeto.title}
                      </Title>
                      <Text className="text-gray-400 text-sm leading-relaxed font-normal">
                        {projeto.description}
                      </Text>
                    </VStack>

                    <VStack className="gap-6 pt-2">
                      <HStack className="flex-wrap gap-2">
                        {projeto.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            className="bg-zinc-900/50 text-brand-500 border border-brand-500/20 px-2 py-1 text-[10px] font-mono uppercase tracking-wider rounded-sm"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </HStack>

                      <a href={projeto.link} target="_blank" className="block w-full">
                        <Button className="w-full bg-brand-500 hover:bg-brand-600 text-black font-extrabold font-mono text-xs uppercase tracking-widest h-11 transition-all rounded-md">
                          <Icon icon={ExternalLink} className="w-4 h-4 mr-2" />
                          Jogar Agora
                        </Button>
                      </a>
                    </VStack>
                  </VStack>
                </Box>
              </motion.div>
            ))}
          </Grid>
        </VStack>
      </Container>
    </Box>
  )
}
