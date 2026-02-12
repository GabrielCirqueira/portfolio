import { motion } from 'framer-motion'
import { Github, GraduationCap, Lightbulb, User } from 'lucide-react'
import { memo } from 'react'
import { AboutContent } from '@/components/responsive/AboutContent'
import { Box, Container } from '@/shadcn/components/ui/layout'
import { useIsLowPerformance } from '@/utils/deviceDetection'

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
        <AboutContent aboutCards={aboutCards} />
      </Container>
    </Box>
  )
})
