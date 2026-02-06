import { Briefcase, Code2, GraduationCap, Lightbulb, User } from 'lucide-react'
import { Badge } from '@/shadcn/components/ui/badge'
import { Card } from '@/shadcn/components/ui/card'
import { Icon } from '@/shadcn/components/ui/icon'
import { Container, Grid, HStack, VStack } from '@/shadcn/components/ui/layout'
import { Text, Title } from '@/shadcn/components/ui/typography'

export function AboutSection() {
  return (
    <Container size="xl" id="sobre" className="py-24">
      <VStack className="gap-16">
        <VStack className="gap-4 items-center text-center">
          <Badge className="px-4 py-2 bg-transparent border border-emerald-900 text-emerald-500 rounded-md text-xs">
            Sobre mim
          </Badge>
          <Title className="text-4xl font-bold">
            <Text as="span" className="text-white">Conheça </Text>
            <Text as="span" className="text-emerald-500">minha história</Text>
          </Title>
          <Text className="text-zinc-400 max-w-2xl text-sm leading-relaxed">
            Sou desenvolvedor web apaixonado por tecnologia, com experiência em sistemas completos para gestão escolar e jogos educativos.
          </Text>
        </VStack>

        <Grid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: User,
              title: 'Perfil',
              description: '18 anos, apaixonado por tecnologia e programação. Sempre em busca de novos desafios.',
            },
            {
              icon: GraduationCap,
              title: 'Formação',
              description: 'Ensino médio integrado com curso técnico em Internet. Início na programação em 2022.',
            },
            {
              icon: Code2,
              title: 'Projetos',
              description: '18 repositórios públicos no GitHub. Sistemas completos para gestão escolar e jogos educativos.',
            },
            {
              icon: Briefcase,
              title: 'Experiência',
              description: 'Classificado para etapa nacional de Robótica em Goiânia. Desenvolvedor na Móveis Simonetti.',
            },
          ].map((item) => (
            <Card key={item.title} className="p-6 rounded-lg bg-zinc-950 border border-zinc-900 hover:border-zinc-800 transition-all">
              <VStack className="gap-4">
                <Icon icon={item.icon} className="size-8 text-cyan-500" />
                <VStack className="gap-2">
                  <Text className="font-bold text-white text-base">{item.title}</Text>
                  <Text className="text-zinc-400 text-xs leading-relaxed">{item.description}</Text>
                </VStack>
              </VStack>
            </Card>
          ))}
        </Grid>

        <Card className="p-8 rounded-lg bg-zinc-950 border border-zinc-900">
          <HStack className="gap-4 items-start">
            <Icon icon={Lightbulb} className="size-6 text-cyan-500 flex-shrink-0 mt-1" />
            <Text className="text-zinc-300 italic text-sm leading-relaxed">
              "Sou Gabriel Cirqueira, gosto por tecnologia e programação. Busco constantemente desafios e oportunidades de aprendizado para evoluir no campo da tecnologia."
            </Text>
          </HStack>
        </Card>
      </VStack>
    </Container>
  )
}
