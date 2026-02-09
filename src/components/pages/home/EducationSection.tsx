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
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
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
    <Box id="formacao" className="py-24 bg-black relative font-sans overflow-hidden">
      <Box className="absolute inset-0 bg-zinc-950 opacity-50" />
      <Box className="absolute inset-0 bg-[radial-gradient(#10b98140_1px,transparent_1px)] bg-[size:20px_20px] opacity-30" />

      {}
      <Box className="absolute bottom-0 left-1/2 w-[500px] h-[300px] bg-brand-500/10 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <Container size="xl" className="relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <Badge
            variant="outline"
            className="mb-4 px-4 py-1 border-brand-500/50 bg-brand-500/10 text-brand-500 uppercase tracking-widest font-bold backdrop-blur-md"
          >
            Carreira
          </Badge>
          <Title className="text-3xl md:text-5xl font-bold font-heading mb-4 uppercase tracking-wide">
            Formação e <span className="text-gradient">Experiência</span>
          </Title>
          <Text className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
            Meu percurso acadêmico e profissional na área de tecnologia.
          </Text>
        </motion.div>

        <Grid className="grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0 }}
            className="relative"
          >
            <Box className="absolute inset-0 bg-gradient-to-b from-brand-500/5 to-transparent rounded-xl pointer-events-none" />
            <Box className="border border-brand-500/20 rounded-xl p-8 bg-black/40 backdrop-blur-md h-full hover:border-brand-500/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.05)]">
              <HStack className="items-center mb-8 gap-4 border-b border-brand-500/10 pb-4">
                <Box className="p-2 bg-brand-500/10 rounded-lg">
                  <Icon icon={CheckCircle} className="h-6 w-6 text-brand-500" />
                </Box>
                <Text className="text-xl font-bold font-heading uppercase text-white tracking-widest">
                  Formação
                </Text>
              </HStack>

              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="space-y-10"
              >
                {formacao.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="relative pl-8 border-l-2 border-brand-500/20 group"
                  >
                    <Box className="absolute top-0 left-0 w-4 h-4 -translate-x-[9px] translate-y-1 rounded-full bg-black border-2 border-brand-500 group-hover:bg-brand-500 group-hover:shadow-[0_0_10px_rgba(16,185,129,0.8)] transition-all duration-300" />
                    <Text className="font-bold text-white text-lg group-hover:text-brand-500 transition-colors uppercase tracking-wide leading-tight">
                      {item.titulo}
                    </Text>
                    <Text className="text-sm text-gray-400 font-bold font-mono mt-2 mb-1">
                      {item.instituicao}
                    </Text>
                    <Badge className="bg-brand-500/10 text-brand-500 border-none mb-3 text-[10px] uppercase font-bold px-2 py-0.5">
                      {item.periodo}
                    </Badge>
                    <Text className="text-sm text-gray-300 leading-relaxed font-light">
                      {item.descricao}
                    </Text>
                  </motion.div>
                ))}
              </motion.div>
            </Box>
          </motion.div>

          {}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:-mt-8 relative"
          >
            <Box className="absolute inset-0 bg-gradient-to-b from-brand-500/5 to-transparent rounded-xl pointer-events-none" />
            <Box className="border border-brand-500/20 rounded-xl p-8 bg-zinc-900/40 backdrop-blur-md h-full hover:border-brand-500/40 transition-all duration-300 hover:shadow-[0_0_25px_rgba(16,185,129,0.1)] hover:-translate-y-2 transform">
              <HStack className="items-center mb-8 gap-4 border-b border-brand-500/10 pb-4">
                <Box className="p-2 bg-brand-500/10 rounded-lg">
                  <Icon icon={Briefcase} className="h-6 w-6 text-brand-500" />
                </Box>
                <Text className="text-xl font-bold font-heading uppercase text-white tracking-widest">
                  Experiência
                </Text>
              </HStack>

              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="space-y-10"
              >
                {experiencias.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="relative pl-8 border-l-2 border-brand-500/20 group"
                  >
                    <Box className="absolute top-0 left-0 w-4 h-4 -translate-x-[9px] translate-y-1 rounded-full bg-black border-2 border-brand-500 group-hover:bg-brand-500 group-hover:shadow-[0_0_10px_rgba(16,185,129,0.8)] transition-all duration-300" />
                    <Text className="font-bold text-white text-lg group-hover:text-brand-500 transition-colors uppercase tracking-wide leading-tight">
                      {item.cargo}
                    </Text>
                    <Text className="text-sm text-gray-400 font-bold font-mono mt-2 mb-1">
                      {item.empresa}
                    </Text>
                    <Badge className="bg-brand-500/10 text-brand-500 border-none mb-3 text-[10px] uppercase font-bold px-2 py-0.5">
                      {item.periodo}
                    </Badge>
                    <Text className="text-sm text-gray-300 leading-relaxed font-light">
                      {item.descricao}
                    </Text>
                  </motion.div>
                ))}
              </motion.div>
            </Box>
          </motion.div>

          {}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            <Box className="absolute inset-0 bg-gradient-to-b from-brand-500/5 to-transparent rounded-xl pointer-events-none" />
            <Box className="border border-brand-500/20 rounded-xl p-8 bg-black/40 backdrop-blur-md h-full hover:border-brand-500/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.05)]">
              <HStack className="items-center mb-8 gap-4 border-b border-brand-500/10 pb-4">
                <Box className="p-2 bg-brand-500/10 rounded-lg">
                  <Icon icon={Award} className="h-6 w-6 text-brand-500" />
                </Box>
                <Text className="text-xl font-bold font-heading uppercase text-white tracking-widest">
                  Conquistas
                </Text>
              </HStack>

              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="space-y-10"
              >
                {conquistas.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="relative pl-8 border-l-2 border-brand-500/20 group"
                  >
                    <Box className="absolute top-0 left-0 w-4 h-4 -translate-x-[9px] translate-y-1 rounded-full bg-black border-2 border-brand-500 group-hover:bg-brand-500 group-hover:shadow-[0_0_10px_rgba(16,185,129,0.8)] transition-all duration-300" />
                    <Text className="font-bold text-white text-lg group-hover:text-brand-500 transition-colors uppercase tracking-wide leading-tight">
                      {item.titulo}
                    </Text>
                    <Badge className="bg-brand-500/10 text-brand-500 border-none my-2 text-[10px] uppercase font-bold px-2 py-0.5">
                      {item.ano}
                    </Badge>
                    <Text className="text-sm text-gray-300 leading-relaxed font-light block">
                      {item.descricao}
                    </Text>
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
          className="mt-20 max-w-3xl mx-auto text-center"
        >
          <Badge className="mb-6 bg-transparent text-brand-500 border border-brand-500/40 uppercase tracking-[0.2em] font-bold text-xs px-4 py-2 hover:bg-brand-500 hover:text-black transition-colors">
            Sempre em evolução
          </Badge>
          <Text className="text-gray-400 font-light text-lg">
            Busco constantemente novas oportunidades de aprendizado para continuar evoluindo no
            campo da tecnologia.
          </Text>
        </motion.div>
      </Container>
    </Box>
  )
}
