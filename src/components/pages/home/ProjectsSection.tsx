import { Code2, ExternalLink, GamepadIcon, Github } from 'lucide-react'
import { Badge } from '@/shadcn/components/ui/badge'
import { Button } from '@/shadcn/components/ui/button'
import { Card } from '@/shadcn/components/ui/card'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, Container, Grid, HStack, VStack } from '@/shadcn/components/ui/layout'
import { Link } from '@/shadcn/components/ui/link'
import { Text, Title } from '@/shadcn/components/ui/typography'

export function ProjectsSection() {
  return (
    <Container size="xl" id="projetos" className="py-24">
      <VStack className="gap-16">
        <VStack className="gap-4 items-center text-center">
          <Badge className="px-4 py-2 bg-transparent border border-emerald-900 text-emerald-500 rounded-md text-xs">
            Meus trabalhos
          </Badge>
          <Title className="text-4xl font-bold">
            <Text as="span" className="text-white">
              Projetos em{' '}
            </Text>
            <Text as="span" className="text-emerald-500">
              destaque
            </Text>
          </Title>
          <Text className="text-zinc-400 text-sm">
            Conheça alguns dos principais sistemas e jogos que desenvolvi.
          </Text>
        </VStack>

        <VStack className="gap-12">
          <VStack className="gap-6">
            <Text className="text-white font-bold text-lg">Sistemas</Text>
            <Grid className="grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Sistema de Monitoramento Escolar',
                  description:
                    'Sistema completo para monitoramento e gestão de atividades escolares.',
                  tags: ['PHP', 'MySQL', 'JavaScript', 'CSS'],
                  link: 'https://monitoramento.escolansl.com/sistema',
                },
                {
                  title: 'Sistema de Eletivas e Tutorias',
                  description: 'Plataforma para gerenciamento de eletivas e tutorias escolares.',
                  tags: ['PHP', 'MySQL', 'JavaScript', 'CSS'],
                  link: 'https://et.escolansl.com/sistema',
                },
              ].map((project) => (
                <Card
                  key={project.title}
                  className="p-6 rounded-lg bg-zinc-950 border border-zinc-900 hover:border-zinc-800 transition-all"
                >
                  <VStack className="gap-6">
                    <Box className="w-full h-48 bg-zinc-900 rounded-lg flex items-center justify-center">
                      <Icon icon={Code2} className="size-16 text-zinc-800" />
                    </Box>
                    <VStack className="gap-3">
                      <Text className="font-bold text-white text-base">{project.title}</Text>
                      <Text className="text-zinc-400 text-xs leading-relaxed">
                        {project.description}
                      </Text>
                    </VStack>
                    <HStack className="gap-2 flex-wrap">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          className="px-3 py-1 text-xs bg-zinc-900 border border-zinc-800 text-zinc-500 rounded-md"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </HStack>
                    <Link href={project.link} target="_blank" className="w-full">
                      <Button className="w-full rounded-md border border-zinc-800 bg-transparent hover:bg-zinc-900 text-zinc-300 text-sm transition-colors">
                        <HStack className="gap-2 items-center justify-center">
                          <Icon icon={ExternalLink} className="size-4" />
                          <Text>Visualizar</Text>
                        </HStack>
                      </Button>
                    </Link>
                  </VStack>
                </Card>
              ))}
            </Grid>
          </VStack>

          <VStack className="gap-6">
            <Text className="text-white font-bold text-lg">Jogos</Text>
            <Grid className="grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Biome Quest',
                  description:
                    'Jogo educativo onde um robô percorre diferentes biomas resolvendo problemas ambientais.',
                  tags: ['JavaScript', 'GDevelop', 'Game Design'],
                  link: 'https://gd.games/oldgabriel/biome-quest',
                },
                {
                  title: 'Pixel World',
                  description:
                    'Jogo com temática inspirada em One Piece. O jogador coleta chaves e enfrenta chefões.',
                  tags: ['JavaScript', 'GDevelop', 'Pixel Art'],
                  link: 'https://gd.games/oldgabriel/pixel-world',
                },
              ].map((project) => (
                <Card
                  key={project.title}
                  className="p-6 rounded-lg bg-zinc-950 border border-zinc-900 hover:border-zinc-800 transition-all"
                >
                  <VStack className="gap-6">
                    <Box className="w-full h-48 bg-zinc-900 rounded-lg flex items-center justify-center">
                      <Icon icon={GamepadIcon} className="size-16 text-zinc-800" />
                    </Box>
                    <VStack className="gap-3">
                      <Text className="font-bold text-white text-base">{project.title}</Text>
                      <Text className="text-zinc-400 text-xs leading-relaxed">
                        {project.description}
                      </Text>
                    </VStack>
                    <HStack className="gap-2 flex-wrap">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          className="px-3 py-1 text-xs bg-zinc-900 border border-zinc-800 text-zinc-500 rounded-md"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </HStack>
                    <Link href={project.link} target="_blank" className="w-full">
                      <Button className="w-full rounded-md bg-emerald-500 hover:bg-emerald-600 text-black font-semibold text-sm transition-colors">
                        <HStack className="gap-2 items-center justify-center">
                          <Icon icon={GamepadIcon} className="size-4" />
                          <Text>Jogar</Text>
                        </HStack>
                      </Button>
                    </Link>
                  </VStack>
                </Card>
              ))}
            </Grid>
          </VStack>

          <HStack className="justify-center pt-8">
            <Link href="https://github.com/GabrielCirqueira" target="_blank">
              <Button className="px-8 py-3 rounded-md border border-zinc-800 bg-transparent hover:bg-zinc-900 text-zinc-300 text-sm transition-colors">
                <HStack className="gap-2 items-center">
                  <Icon icon={Github} className="size-4" />
                  <Text>Ver todos os projetos no GitHub</Text>
                </HStack>
              </Button>
            </Link>
          </HStack>
        </VStack>
      </VStack>
    </Container>
  )
}
