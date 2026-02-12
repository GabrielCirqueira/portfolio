import { motion } from 'framer-motion'
import { Github, GraduationCap, Lightbulb, User } from 'lucide-react'
import { memo } from 'react'
import { AboutInfoCard } from '@/components/responsive/AboutInfoCard'
import { ProfileCard } from '@/components/responsive/ProfileCard'
import { SectionHeader } from '@/components/responsive/SectionHeader'
import { Box, Container, Grid, VStack } from '@/shadcn/components/ui/layout'
import { Text } from '@/shadcn/components/ui/typography'
import { useIsLowPerformance } from '@/utils/deviceDetection'

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
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
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

export const AboutSection = memo(() => {
  const isLowPerf = useIsLowPerformance()

  return (
    <Box
      id="sobre"
      className="py-16 sm:py-20 md:py-24 relative font-sans bg-zinc-950/30 overflow-hidden"
    >
      <Box className="absolute inset-0 bg-dotted-pattern opacity-5 pointer-events-none" />

      <motion.div
        animate={
          isLowPerf
            ? {}
            : {
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
                y: [0, -30, 0],
              }
        }
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-0 w-[500px] h-[500px] -translate-y-1/2 -translate-x-1/2 pointer-events-none"
      >
        <div
          className={`w-full h-full bg-brand-500/5 rounded-full ${isLowPerf ? 'blur-[60px]' : 'blur-[120px]'}`}
        />
      </motion.div>

      <Container size="xl" className="relative z-10 px-4">
        <SectionHeader
          badge="Sobre Mim"
          title={
            <>
              Minha <span className="text-gradient">Trajetória</span>
            </>
          }
        />

        <Grid className="grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center px-4"
          >
            <ProfileCard />
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col gap-10"
          >
            <VStack className="gap-4">
              <Text className="text-zinc-400 text-base sm:text-lg leading-relaxed mb-2">
                Desenvolvedor Fullstack focado na criação de aplicações web modernas e escaláveis.
                Combino conhecimento técnico sólido com uma visão prática para entregar software
                robusto e de alto valor. Minha paixão é transformar ideias complexas em interfaces
                simples e funcionais.
              </Text>
            </VStack>

            <Grid className="grid-cols-1 sm:grid-cols-2 gap-5">
              {aboutCards.map((card) => (
                <AboutInfoCard
                  key={card.title}
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                  variants={item}
                />
              ))}
            </Grid>
          </motion.div>
        </Grid>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-24 flex justify-center"
        >
          <Box className="max-w-2xl text-center border-t border-white/5 pt-10 relative">
            <Box className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-1 bg-brand-500 rounded-full blur-[1px]" />
            <Text className="text-zinc-500 font-medium text-sm tracking-[0.3em] uppercase animate-pulse">
              Tecnologia é a ferramenta. Resultado é o objetivo.
            </Text>
          </Box>
        </motion.div>
      </Container>
    </Box>
  )
})
