import { Briefcase, Calendar, GraduationCap, Trophy } from 'lucide-react'
import { Badge } from '@/shadcn/components/ui/badge'
import { Card } from '@/shadcn/components/ui/card'
import { Icon } from '@/shadcn/components/ui/icon'
import { Container, Grid, HStack, VStack } from '@/shadcn/components/ui/layout'
import { Text, Title } from '@/shadcn/components/ui/typography'

export function EducationSection() {
  return (
    <Container size="xl" id="formacao" className="py-24">
      <VStack className="gap-16">
        <VStack className="gap-4 items-center text-center">
          <Badge className="px-4 py-2 bg-transparent border border-emerald-900 text-emerald-500 rounded-md text-xs">
            Carreira
          </Badge>
          <Title className="text-4xl font-bold">
            <Text as="span" className="text-white">
              Formação e{' '}
            </Text>
            <Text as="span" className="text-emerald-500">
              Experiência
            </Text>
          </Title>
          <Text className="text-zinc-400 text-sm">
            Meu percurso acadêmico e profissional na área de tecnologia.
          </Text>
        </VStack>

        <Grid className="grid-cols-1 md:grid-cols-3 gap-8">
          <VStack className="gap-6">
            <HStack className="gap-3 items-center">
              <Icon icon={GraduationCap} className="size-6 text-cyan-500" />
              <Text className="font-bold text-white text-lg">Formação</Text>
            </HStack>
            <Card className="p-6 rounded-lg bg-zinc-950 border border-zinc-900">
              <VStack className="gap-3">
                <Text className="font-bold text-white text-sm">
                  Ensino Médio Integrado - Técnico em Internet
                </Text>
                <Text className="text-zinc-400 text-xs">Escola Nossa Senhora de Lourdes</Text>
                <HStack className="gap-2 items-center text-zinc-500">
                  <Icon icon={Calendar} className="size-3" />
                  <Text className="text-xs">2022 - 2024</Text>
                </HStack>
                <Text className="text-zinc-400 text-xs leading-relaxed">
                  Formação técnica com foco em desenvolvimento web e tecnologias de internet.
                </Text>
              </VStack>
            </Card>
          </VStack>

          <VStack className="gap-6">
            <HStack className="gap-3 items-center">
              <Icon icon={Trophy} className="size-6 text-yellow-500" />
              <Text className="font-bold text-white text-lg">Conquistas</Text>
            </HStack>
            <VStack className="gap-4">
              <Card className="p-6 rounded-lg bg-zinc-950 border border-zinc-900">
                <VStack className="gap-2">
                  <Text className="font-bold text-white text-sm">Etapa Nacional de Robótica</Text>
                  <Text className="text-xs text-zinc-500">2024</Text>
                  <Text className="text-zinc-400 text-xs">
                    Classificado para competir em Goiânia.
                  </Text>
                </VStack>
              </Card>
              <Card className="p-6 rounded-lg bg-zinc-950 border border-zinc-900">
                <VStack className="gap-2">
                  <Text className="font-bold text-white text-sm">Olimpíadas de Programação</Text>
                  <Text className="text-xs text-zinc-500">2023-2024</Text>
                  <Text className="text-zinc-400 text-xs">
                    Participação em diversas competições.
                  </Text>
                </VStack>
              </Card>
            </VStack>
          </VStack>

          <VStack className="gap-6">
            <HStack className="gap-3 items-center">
              <Icon icon={Briefcase} className="size-6 text-cyan-500" />
              <Text className="font-bold text-white text-lg">Experiência</Text>
            </HStack>
            <VStack className="gap-4">
              <Card className="p-6 rounded-lg bg-zinc-950 border border-zinc-900">
                <VStack className="gap-2">
                  <Text className="font-bold text-white text-sm">Desenvolvedor Trainee</Text>
                  <Text className="text-zinc-400 text-xs">Móveis Simonetti</Text>
                  <Text className="text-xs text-zinc-500">2025 - Atual</Text>
                  <Text className="text-zinc-400 text-xs">
                    Desenvolvimento com Symfony e React.
                  </Text>
                </VStack>
              </Card>
              <Card className="p-6 rounded-lg bg-zinc-950 border border-zinc-900">
                <VStack className="gap-2">
                  <Text className="font-bold text-white text-sm">Desenvolvedor de Sistemas</Text>
                  <Text className="text-zinc-400 text-xs">Projetos Independentes</Text>
                  <Text className="text-xs text-zinc-500">2023 - 2024</Text>
                  <Text className="text-zinc-400 text-xs">Sistemas de monitoramento escolar.</Text>
                </VStack>
              </Card>
            </VStack>
          </VStack>
        </Grid>
      </VStack>
    </Container>
  )
}
