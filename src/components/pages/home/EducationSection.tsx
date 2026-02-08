import { motion } from 'framer-motion'
import { Award, Briefcase, CheckCircle } from 'lucide-react'
import { Badge } from '@/shadcn/components/ui/badge'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, Container, Grid, HStack } from '@/shadcn/components/ui/layout'
import { Text, Title } from '@/shadcn/components/ui/typography'

export function EducationSection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const formacao = [
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
      titulo: 'Olimpíadas de Programação',
      descricao: 'Participação em diversas competições de programação.',
      ano: '2023-2024',
    },
  ]

  const experiencias = [
    {
      cargo: 'Desenvolvedor Web',
      empresa: 'Móveis Simonetti',
      periodo: '2025 - Atual',
      descricao: 'Desenvolvimento com Symfony e React, trabalhando com sistemas corporativos.',
    },
    {
      cargo: 'Desenvolvedor de Sistemas Escolares',
      empresa: 'Projetos Independentes',
      periodo: '2023 - 2024',
      descricao: 'Criação de sistemas completos para monitoramento e gestão escolar.',
    },
  ]

  return (
    <Box as="section" id="formacao" className="py-24 bg-black relative font-sans">
      <Box className="absolute inset-0 bg-zinc-950 opacity-50" />
      <Box className="absolute inset-0 bg-[radial-gradient(#10b98140_1px,transparent_1px)] bg-[size:20px_20px]" />

      <Container size="xl" className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge
            variant="outline"
            className="mb-4 px-4 py-1 border-brand-500/50 bg-brand-500/10 text-brand-500 uppercase tracking-widest font-bold"
          >
            Carreira
          </Badge>
          <Title className="text-3xl md:text-4xl font-bold font-heading mb-4 uppercase tracking-wide">
            Formação e <span className="text-brand-500">Experiência</span>
          </Title>
          <Text className="text-gray-400 max-w-2xl mx-auto">
            Meu percurso acadêmico e profissional na área de tecnologia.
          </Text>
        </motion.div>

        <Grid className="grid-cols-1 md:grid-cols-3 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0 }}
          >
            <Box className="border border-brand-500/20 rounded-lg p-6 bg-zinc-950/40 backdrop-blur-sm h-full hover:border-brand-500/40 transition-colors">
              <HStack className="items-center mb-6 gap-3">
                <Icon icon={CheckCircle} className="h-6 w-6 text-brand-500" />
                <Text className="text-xl font-bold font-heading uppercase text-white">
                  Formação
                </Text>
              </HStack>

              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="space-y-8"
              >
                {formacao.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="relative pl-6 border-l border-brand-500/30"
                  >
                    <Box className="absolute top-0 left-0 w-3 h-3 -translate-x-[7px] translate-y-1 rounded-full bg-brand-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                    <Text className="font-bold text-white text-lg">{item.titulo}</Text>
                    <Text className="text-sm text-gray-400 font-mono mt-1">{item.instituicao}</Text>
                    <Text className="text-xs text-brand-500 font-mono mb-2 uppercase tracking-wider">
                      {item.periodo}
                    </Text>
                    <Text className="text-sm text-gray-300 leading-relaxed">{item.descricao}</Text>
                  </motion.div>
                ))}
              </motion.div>
            </Box>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Box className="border border-brand-500/20 rounded-lg p-6 bg-zinc-950/40 backdrop-blur-sm h-full hover:border-brand-500/40 transition-colors">
              <HStack className="items-center mb-6 gap-3">
                <Icon icon={Briefcase} className="h-6 w-6 text-brand-500" />
                <Text className="text-xl font-bold font-heading uppercase text-white">
                  Experiência
                </Text>
              </HStack>

              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="space-y-8"
              >
                {experiencias.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="relative pl-6 border-l border-brand-500/30"
                  >
                    <Box className="absolute top-0 left-0 w-3 h-3 -translate-x-[7px] translate-y-1 rounded-full bg-brand-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                    <Text className="font-bold text-white text-lg">{item.cargo}</Text>
                    <Text className="text-sm text-gray-400 font-mono mt-1">{item.empresa}</Text>
                    <Text className="text-xs text-brand-500 font-mono mb-2 uppercase tracking-wider">
                      {item.periodo}
                    </Text>
                    <Text className="text-sm text-gray-300 leading-relaxed">{item.descricao}</Text>
                  </motion.div>
                ))}
              </motion.div>
            </Box>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Box className="border border-brand-500/20 rounded-lg p-6 bg-zinc-950/40 backdrop-blur-sm h-full hover:border-brand-500/40 transition-colors">
              <HStack className="items-center mb-6 gap-3">
                <Icon icon={Award} className="h-6 w-6 text-brand-500" />
                <Text className="text-xl font-bold font-heading uppercase text-white">
                  Conquistas
                </Text>
              </HStack>

              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="space-y-8"
              >
                {conquistas.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="relative pl-6 border-l border-brand-500/30"
                  >
                    <Box className="absolute top-0 left-0 w-3 h-3 -translate-x-[7px] translate-y-1 rounded-full bg-brand-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                    <Text className="font-bold text-white text-lg">{item.titulo}</Text>
                    <Text className="text-xs text-brand-500 font-mono mb-2 uppercase tracking-wider mt-1">
                      {item.ano}
                    </Text>
                    <Text className="text-sm text-gray-300 leading-relaxed">{item.descricao}</Text>
                  </motion.div>
                ))}
              </motion.div>
            </Box>
          </motion.div>
        </Grid>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 max-w-3xl mx-auto text-center"
        >
          <Badge className="mb-4 bg-brand-500/10 text-brand-500 border border-brand-500/20 uppercase tracking-widest font-bold">
            Sempre em evolução
          </Badge>
          <Text className="text-gray-400">
            Busco constantemente novas oportunidades de aprendizado para continuar evoluindo no
            campo da tecnologia.
          </Text>
        </motion.div>
      </Container>
    </Box>
  )
}
