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
      id="formacao"
      className="py-16 sm:py-20 md:py-24 bg-black relative font-sans overflow-hidden"
    >
      <Box className="absolute inset-0 bg-zinc-950/50" />
      <Box className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <Container size="xl" className="relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14 sm:mb-16 md:mb-20"
        >
          <Badge
            variant="outline"
            className="
              mb-4 px-4 py-1 border-brand-500/50
              bg-brand-500/10 text-brand-500
              uppercase tracking-widest
              font-bold backdrop-blur-md
            "
          >
            Carreira
          </Badge>
          <Title className="text-2xl sm:text-3xl md:text-5xl font-bold font-heading mb-3 sm:mb-4 uppercase tracking-wide">
            Formação e <Span className="text-gradient">Experiência</Span>
          </Title>
          <Text className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg font-light">
            Meu percurso acadêmico e profissional na área de tecnologia.
          </Text>
        </motion.div>

        <EducationGrid formacao={formacao} experiencias={experiencias} conquistas={conquistas} />

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
          <Text className="text-gray-400 font-light text-lg">
            Busco constantemente novas oportunidades de aprendizado para continuar evoluindo no
            campo da tecnologia.
          </Text>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 relative"
        >
          <Box className="absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <Box className="absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
          <Box className="border-y border-zinc-800/50 py-5">
            <Marquee speed={25} gradient={false} direction="right">
              {palavrasChaveCarreira.map((palavraChave, index) => (
                <Box key={index} className="flex items-center mx-5 sm:mx-8">
                  <Text className="text-[10px] sm:text-xs text-zinc-700 uppercase tracking-[0.3em] font-mono font-bold whitespace-nowrap">
                    {palavraChave}
                  </Text>
                  <Box className="w-1.5 h-1.5 rounded-full bg-brand-500/30 ml-5 sm:ml-8" />
                </Box>
              ))}
            </Marquee>
          </Box>
        </motion.div>
      </Container>
    </Box>
  )
})
