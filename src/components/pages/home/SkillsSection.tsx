import { Code2, Database } from 'lucide-react'
import { Badge } from '@/shadcn/components/ui/badge'
import { Card } from '@/shadcn/components/ui/card'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, Container, Grid, VStack } from '@/shadcn/components/ui/layout'
import { Text, Title } from '@/shadcn/components/ui/typography'
import { HStack } from '@/shadcn/components/ui/layout'

export function SkillsSection() {
  return (
    <Container size="xl" id="habilidades" className="py-24">
      <VStack className="gap-16">
        <VStack className="gap-4 items-center text-center">
          <Badge className="px-4 py-2 bg-transparent border border-emerald-900 text-emerald-500 rounded-md text-xs">
            Tecnologias
          </Badge>
          <Title className="text-4xl font-bold">
            <Text as="span" className="text-white">Minhas </Text>
            <Text as="span" className="text-emerald-500">Habilidades</Text>
          </Title>
          <Text className="text-zinc-400 text-sm">
            Desenvolvo com as mais modernas tecnologias, sempre buscando aperfeiçoar meus conhecimentos.
          </Text>
        </VStack>

        <Grid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'PHP', percentage: 62, color: 'bg-purple-500' },
            { name: 'Symfony', percentage: 60, color: 'bg-zinc-100' },
            { name: 'CSS', percentage: 13, color: 'bg-blue-500' },
            { name: 'JavaScript', percentage: 11, color: 'bg-yellow-400' },
            { name: 'Twig', percentage: 8, color: 'bg-emerald-500' },
            { name: 'TypeScript', percentage: 5, color: 'bg-blue-600' },
          ].map((tech) => (
            <Card key={tech.name} className="p-6 rounded-lg bg-zinc-950 border border-zinc-900">
              <VStack className="gap-3">
                <HStack className="justify-between items-center">
                  <Text className="font-bold text-white text-sm">{tech.name}</Text>
                  <Text className="text-zinc-500 font-mono text-xs">{tech.percentage}%</Text>
                </HStack>
                <Box className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                  <Box
                    className={`h-full ${tech.color} transition-all duration-1000`}
                    style={{ width: `${tech.percentage}%` }}
                  />
                </Box>
              </VStack>
            </Card>
          ))}
        </Grid>

        <Card className="p-8 rounded-lg bg-zinc-950 border border-zinc-900">
          <VStack className="gap-6">
            <Text className="font-bold text-white text-lg">Distribuição das Tecnologias</Text>
            <Grid className="grid-cols-2 md:grid-cols-5 gap-6">
              {[
                { label: 'PHP', subtitle: 'Backend', icon: Code2 },
                { label: 'CSS', subtitle: 'Style', icon: Code2 },
                { label: 'JS', subtitle: 'Frontend', icon: Code2 },
                { label: 'DB', subtitle: 'Database', icon: Database },
                { label: 'TS', subtitle: 'Type', icon: Code2 },
              ].map((item) => (
                <VStack key={item.label} className="items-center gap-3 p-4 rounded-lg hover:bg-zinc-900 transition-colors">
                  <Icon icon={item.icon} className="size-8 text-cyan-500" />
                  <VStack className="items-center gap-1">
                    <Text className="font-bold text-white text-sm">{item.label}</Text>
                    <Text className="text-xs text-zinc-500">{item.subtitle}</Text>
                  </VStack>
                </VStack>
              ))}
            </Grid>
          </VStack>
        </Card>
      </VStack>
    </Container>
  )
}
