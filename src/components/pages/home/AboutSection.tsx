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
    <Box id="sobre" className="py-24 relative font-sans bg-zinc-950/50">
      <Box className="absolute inset-0 bg-dotted-pattern opacity-10 pointer-events-none" />

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
            className="mb-4 px-4 py-1 border-brand-500 text-brand-500 uppercase tracking-widest text-xs font-bold bg-brand-500/5"
          >
            Sobre Mim
          </Badge>
          <Title className="text-4xl md:text-5xl font-bold font-heading uppercase tracking-wide">
            Minha <span className="text-brand-500">Trajetória</span>
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
            <Box className="relative w-full max-w-sm aspect-[3/4] rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl group">
              <img
                src="/images/gabriel1.png"
                alt="Gabriel Cirqueira"
                className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />

              <Box className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent" />

              <Box className="absolute bottom-6 left-6 right-6 p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
                <HStack className="justify-between items-center">
                  <VStack className="gap-0">
                    <Text className="text-xs text-brand-500 font-mono uppercase tracking-wider mb-1">
                      Fullstack Dev
                    </Text>
                    <Text className="text-lg font-bold text-white font-heading uppercase">
                      Gabriel Cirqueira
                    </Text>
                  </VStack>
                  <Icon icon={FileCode} className="text-brand-500 h-6 w-6" />
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
            <Text className="text-zinc-400 text-lg leading-relaxed mb-2 text-center">
              Desenvolvedor Fullstack focado na criação de aplicações web modernas e escaláveis.
              Combino conhecimento técnico sólido com uma visão prática para entregar software
              robusto e de alto valor.
            </Text>

            <Grid className="grid-cols-1 sm:grid-cols-2 gap-5">
              {aboutCards.map((card) => (
                <motion.div key={card.title} variants={item}>
                  <Card className="bg-black border border-zinc-800 p-5 hover:border-brand-500/50 transition-colors group h-full">
                    <HStack className="items-start gap-4">
                      <Box className="p-2 rounded bg-zinc-900 text-brand-500 border border-zinc-800 mt-1 shrink-0">
                        <Icon icon={card.icon} className="h-5 w-5" />
                      </Box>
                      <VStack className="gap-1">
                        <Text className="font-bold text-white uppercase font-heading tracking-wide text-base">
                          {card.title}
                        </Text>
                        <Text className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors leading-relaxed">
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
            <Text className="text-zinc-500 font-medium text-sm tracking-wide">
              TECNOLOGIA É A FERRAMENTA. RESULTADO É O OBJETIVO.
            </Text>
          </Box>
        </motion.div>
      </Container>
    </Box>
  )
}
