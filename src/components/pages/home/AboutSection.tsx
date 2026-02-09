import { motion } from 'framer-motion'
import { FileCode, Github, GraduationCap, Lightbulb, User } from 'lucide-react'
import { Badge } from '@/shadcn/components/ui/badge'
import { Card } from '@/shadcn/components/ui/card'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, Container, Grid, HStack, VStack } from '@/shadcn/components/ui/layout'
import { Text, Title } from '@/shadcn/components/ui/typography'

export function AboutSection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const aboutCards = [
    {
      icon: User,
      title: 'Perfil Profissional',
      description: 'Focado em desenvolvimento web moderno, performance e interfaces responsivas.',
    },
    {
      icon: GraduationCap,
      title: 'Formação Técnica',
      description: 'Técnico em Internet com base sólida em lógica e arquitetura de sistemas.',
    },
    {
      icon: Github,
      title: 'Portfólio Ativo',
      description:
        'Mais de 18 repositórios públicos. Desenvolvimento contínuo de sistemas e aplicações.',
    },
    {
      icon: Lightbulb,
      title: 'Experiência',
      description: 'Atuação prática em desenvolvimento corporativo e competições de tecnologia.',
    },
  ]

  return (
    <Box id="sobre" className="py-24 relative font-sans bg-zinc-950/50 overflow-hidden">
      <Box className="absolute inset-0 bg-dotted-pattern opacity-10 pointer-events-none" />

      {/* Dynamic Background Blob */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none"
      />

      <Container size="xl" className="relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge
            variant="outline"
            className="mb-4 px-4 py-1 border-brand-500/50 text-brand-500 uppercase tracking-widest text-xs font-bold bg-brand-500/5 backdrop-blur-md"
          >
            Sobre Mim
          </Badge>
          <Title className="text-4xl md:text-5xl font-bold font-heading uppercase tracking-wide">
            Minha <span className="text-gradient">Trajetória</span>
          </Title>
        </motion.div>

        <Grid className="grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <Box className="relative w-full max-w-sm aspect-[3/4] rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-[0_0_40px_rgba(0,0,0,0.5)] group">
              <div className="absolute inset-0 bg-brand-500/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
              <img
                src="/images/gabriel1.png"
                alt="Gabriel Cirqueira"
                className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
              />

              <Box className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />

              <Box className="absolute bottom-6 left-6 right-6 p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md z-20 hover:bg-white/10 transition-colors duration-300">
                <HStack className="justify-between items-center">
                  <VStack className="gap-0">
                    <Text className="text-xs text-brand-500 font-mono uppercase tracking-wider mb-1">
                      Fullstack Dev
                    </Text>
                    <Text className="text-lg font-bold text-white font-heading uppercase">
                      Gabriel Cirqueira
                    </Text>
                  </VStack>
                  <Box className="p-2 bg-brand-500/10 rounded-full border border-brand-500/20">
                    <Icon icon={FileCode} className="text-brand-500 h-5 w-5" />
                  </Box>
                </HStack>
              </Box>
            </Box>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            <Text className="text-zinc-400 text-lg leading-relaxed mb-2 text-center lg:text-left">
              Desenvolvedor Fullstack focado na criação de aplicações web modernas e escaláveis.
              Combino conhecimento técnico sólido com uma visão prática para entregar software
              robusto e de alto valor.
            </Text>

            <Grid className="grid-cols-1 sm:grid-cols-2 gap-5">
              {aboutCards.map((card) => (
                <motion.div key={card.title} variants={item} className="h-full">
                  <Card className="bg-black/40 border border-zinc-800 p-6 hover:border-brand-500/50 transition-all duration-300 group h-full hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] hover:-translate-y-1 backdrop-blur-sm">
                    <HStack className="items-start gap-4">
                      <Box className="p-2.5 rounded-lg bg-zinc-900/80 text-brand-500 border border-brand-500/20 mt-1 shrink-0 group-hover:bg-brand-500 group-hover:text-black transition-colors duration-300">
                        <Icon icon={card.icon} className="h-5 w-5" />
                      </Box>
                      <VStack className="gap-2">
                        <Text className="font-bold text-white uppercase font-heading tracking-wide text-base group-hover:text-brand-500 transition-colors">
                          {card.title}
                        </Text>
                        <Text className="text-sm text-zinc-500 group-hover:text-zinc-300 transition-colors leading-relaxed">
                          {card.description}
                        </Text>
                      </VStack>
                    </HStack>
                  </Card>
                </motion.div>
              ))}
            </Grid>
          </motion.div>
        </Grid>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-20 flex justify-center"
        >
          <Box className="max-w-2xl text-center border-t border-zinc-800 pt-10">
            <Text className="text-zinc-500 font-medium text-sm tracking-[0.2em] uppercase">
              Tecnologia é a ferramenta. Resultado é o objetivo.
            </Text>
          </Box>
        </motion.div>
      </Container>
    </Box>
  )
}
