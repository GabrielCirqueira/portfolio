import { motion } from 'framer-motion'
import { memo } from 'react'
import Marquee from 'react-fast-marquee'
import { EducationGrid } from '@/components/responsive/EducationGrid'
import { Badge } from '@/shadcn/components/ui/badge'
import { Box, Container } from '@/shadcn/components/ui/layout'
import { Span, Text, Title } from '@/shadcn/components/ui/typography'

const palavrasChaveCarreira = [
  'Symfony',
  'React',
  'TypeScript',
  'PHP',
  'Docker',
  'FastAPI',
  'MySQL',
  'Linux',
  'Git',
  'Tailwind CSS',
  'RabbitMQ',
  'Nginx',
  'REST APIs',
  'JWT',
  'Vite',
]

const formacao = [
  {
    titulo: 'Análise e Desenvolvimento de Sistemas (ADS)',
    instituicao: 'Centro Universitário Vale do Cricaré (UNIVC)',
    periodo: '2025 - Atual (Iniciando 3º Período)',
    descricao:
      'Graduação superior com foco em engenharia de software, banco de dados e gestão de projetos.',
  },
  {
    titulo: 'Ensino Médio Integrado - Técnico em Internet',
    instituicao: 'Escola Nossa Senhora de Lourdes',
    periodo: '2022 - 2024',
    descricao: 'Formação técnica com foco em desenvolvimento web e tecnologias de internet.',
  },
]

const conquistas = [
  {
    titulo: 'Etapa Nacional de Robótica',
    descricao: 'Classificado para competir em Goiânia na etapa nacional.',
    ano: '2024',
  },
  {
    titulo: 'MS CODE - Formação Web',
    instituicao: 'Móveis Simonetti',
    periodo: '2024',
    descricao:
      'Treinamento intensivo de programação web. Finalizado com apresentação de projeto prático.',
    ano: '2024',
  },
  {
    titulo: 'Olimpíadas de Programação',
    descricao: 'Participação em diversas competições de programação.',
    ano: '2023-2024',
  },
]

const experiencias = [
  {
    cargo: 'Desenvolvedor Web',
    empresa: 'Móveis Simonetti',
    periodo: '2025 - 2026 (atual)',
    descricao: 'Desenvolvimento com Symfony e React, trabalhando com sistemas corporativos.',
  },
  {
    cargo: 'Desenvolvedor de Sistemas Escolares',
    empresa: 'Projetos Independentes',
    periodo: '2023 - 2024',
    descricao: 'Criação de sistemas completos para monitoramento e gestão escolar.',
  },
]

export const EducationSection = memo(() => {
  return (
    <Box
      as="section"
      id="formacao"
      className="py-16 sm:py-20 md:py-24 lg:py-28 bg-black relative font-sans overflow-hidden"
    >
      <Box className="absolute inset-0 bg-zinc-950/50" />
      <Box className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <Container size="xl" className="relative z-10 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-14 md:mb-16 lg:mb-20 space-y-4"
        >
          <Badge
            variant="outline"
            className="
              px-5 py-2 border-brand-500/40
              text-brand-400 uppercase tracking-wider
              text-xs font-semibold bg-brand-500/10
              backdrop-blur-sm shadow-lg shadow-brand-500/10
              rounded-full
            "
          >
            Formação
          </Badge>
          <Title className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-heading uppercase tracking-tight">
            Formação e <Span className="text-gradient">Experiência</Span>
          </Title>
          <Box className="w-20 sm:w-24 h-1 bg-brand-500 mx-auto rounded-full opacity-60" />
          <Text className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-4 leading-relaxed">
            Meu percurso acadêmico e profissional na área de tecnologia.
          </Text>
        </motion.div>

        <EducationGrid formacao={formacao} experiencias={experiencias} conquistas={conquistas} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 sm:mt-20 max-w-3xl mx-auto text-center"
        >
          <Badge
            className="
              mb-6 bg-transparent text-brand-400
              border border-brand-500/40
              uppercase tracking-wider font-semibold text-xs
              px-5 py-2 active:bg-brand-500
              active:text-black transition-all
              backdrop-blur-sm rounded-full
            "
          >
            Sempre em evolução
          </Badge>
          <Text className="text-zinc-400 text-sm sm:text-base md:text-lg px-4 leading-relaxed">
            Busco constantemente novas oportunidades de aprendizado para continuar evoluindo no
            campo da tecnologia.
          </Text>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 sm:mt-20 relative"
        >
          <Box className="absolute inset-y-0 left-0 w-20 sm:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <Box className="absolute inset-y-0 right-0 w-20 sm:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
          <Box className="border-y border-zinc-800/50 py-5">
            <Marquee speed={25} gradient={false} direction="right">
              {palavrasChaveCarreira.map((palavraChave, index) => (
                <Box key={index} className="flex items-center mx-4 sm:mx-6">
                  <Text className="text-xs sm:text-sm text-zinc-700 uppercase tracking-wider font-mono font-semibold whitespace-nowrap">
                    {palavraChave}
                  </Text>
                  <Box className="w-1.5 h-1.5 rounded-full bg-brand-500/40 ml-4 sm:ml-6" />
                </Box>
              ))}
            </Marquee>
          </Box>
        </motion.div>
      </Container>
    </Box>
  )
})
