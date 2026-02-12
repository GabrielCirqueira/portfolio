import { motion } from 'framer-motion'
import { Award, Briefcase, CheckCircle } from 'lucide-react'
import { memo } from 'react'
import { SectionHeader } from '@/components/responsive/SectionHeader'
import type { TimelineItemData } from '@/components/responsive/TimelineCard'
import { TimelineCard } from '@/components/responsive/TimelineCard'
import { Badge } from '@/shadcn/components/ui/badge'
import { Box, Container, Grid } from '@/shadcn/components/ui/layout'
import { Text as TypographyText } from '@/shadcn/components/ui/typography'

const formacao: TimelineItemData[] = [
  {
    title: 'Análise e Desenvolvimento de Sistemas (ADS)',
    subtitle: 'Centro Universitário Vale do Cricaré (UNIVC)',
    period: '2025 - Atual (Iniciando 3º Período)',
    description:
      'Graduação superior com foco em engenharia de software, banco de dados e gestão de projetos.',
  },
  {
    title: 'Ensino Médio Integrado - Técnico em Internet',
    subtitle: 'Escola Nossa Senhora de Lourdes',
    period: '2022 - 2024',
    description: 'Formação técnica com foco em desenvolvimento web e tecnologias de internet.',
  },
]

const experiencias: TimelineItemData[] = [
  {
    title: 'Desenvolvedor Web',
    subtitle: 'Móveis Simonetti',
    period: '2025 - 2026 (atual)',
    description: 'Desenvolvimento com Symfony e React, trabalhando com sistemas corporativos.',
  },
  {
    title: 'Desenvolvedor de Sistemas Escolares',
    subtitle: 'Projetos Independentes',
    period: '2023 - 2024',
    description: 'Criação de sistemas completos para monitoramento e gestão escolar.',
  },
]

const conquistas: TimelineItemData[] = [
  {
    title: 'Etapa Nacional de Robótica',
    period: '2024',
    description: 'Classificado para competir em Goiânia na etapa nacional.',
  },
  {
    title: 'MS CODE - Formação Web',
    subtitle: 'Móveis Simonetti',
    period: '2024',
    description:
      'Treinamento intensivo de programação web. Finalizado com apresentação de projeto prático.',
  },
  {
    title: 'Olimpíadas de Programação',
    period: '2023-2024',
    description: 'Participação em diversas competições de programação.',
  },
]

export const EducationSection = memo(() => {
  return (
    <Box
      id="formacao"
      className="py-16 sm:py-20 md:py-24 bg-black relative font-sans overflow-hidden"
    >
      <Box className="absolute inset-0 bg-zinc-950/50" />
      <Box className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <Container size="xl" className="relative z-10 px-4">
        <SectionHeader
          badge="Carreira"
          title={
            <>
              Formação e <span className="text-gradient">Experiência</span>
            </>
          }
          subtitle="Meu percurso acadêmico e profissional na área de tecnologia."
        />

        <Grid className="grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-start">
          <TimelineCard icon={CheckCircle} title="Formação" items={formacao} delay={0} />

          <Box className="md:-mt-8">
            <TimelineCard icon={Briefcase} title="Experiência" items={experiencias} delay={0.2} />
          </Box>

          <TimelineCard icon={Award} title="Conquistas" items={conquistas} delay={0.1} />
        </Grid>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20 max-w-3xl mx-auto text-center"
        >
          <Badge
            className="
              mb-6 bg-transparent text-brand-500
              border border-brand-500/40
              uppercase tracking-[0.2em] font-bold text-xs
              px-4 py-2 hover:bg-brand-500
              hover:text-black transition-colors
            "
          >
            Sempre em evolução
          </Badge>
          <TypographyText className="text-gray-400 font-light text-lg">
            Busco constantemente novas oportunidades de aprendizado para continuar evoluindo no
            campo da tecnologia.
          </TypographyText>
        </motion.div>
      </Container>
    </Box>
  )
})
