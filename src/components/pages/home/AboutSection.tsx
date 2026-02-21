import { motion } from 'framer-motion'
import { memo } from 'react'
import { AboutContent } from '@/components/responsive/AboutContent'
import { aboutCards } from '@/data/sobre'
import { useIsMobile } from '@/hooks/useMediaQuery'
import { Box, Container } from '@/shadcn/components/ui/layout'
import { useIsLowPerformance } from '@/utils/deviceDetection'

export const AboutSection = memo(() => {
  const isLowPerf = useIsLowPerformance()
  const isMobile = useIsMobile()

  return (
    <Box
      as="section"
      id="sobre"
      className="py-20 sm:py-24 md:py-32 relative font-sans bg-black sm:bg-zinc-950/30 overflow-hidden"
    >
      <Box className="absolute inset-0 bg-dotted-pattern opacity-[0.03] sm:opacity-5 pointer-events-none" />
      <Box className="absolute inset-0 bg-zinc-950/50 hidden sm:block" />
      <Box className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] sm:bg-[size:24px_24px]" />

      <motion.div
        animate={
          isLowPerf || isMobile
            ? {}
            : {
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
                y: [0, -30, 0],
              }
        }
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden sm:block absolute top-1/2 left-0 w-[500px] h-[500px] -translate-y-1/2 -translate-x-1/2 pointer-events-none"
      >
        <div
          className={`w-full h-full bg-brand-500/10 rounded-full ${isLowPerf ? 'blur-[60px]' : 'blur-[120px]'}`}
        />
      </motion.div>

      <motion.div
        animate={
          isLowPerf || isMobile
            ? {}
            : {
                scale: [1, 1.1, 1],
                opacity: [0.05, 0.15, 0.05],
                y: [0, 40, 0],
              }
        }
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="hidden sm:block absolute bottom-0 right-0 w-[600px] h-[600px] translate-y-1/4 translate-x-1/4 pointer-events-none"
      >
        <div
          className={`w-full h-full bg-blue-600/10 rounded-full ${isLowPerf ? 'blur-[60px]' : 'blur-[120px]'}`}
        />
      </motion.div>

      <Container size="xl" className="relative z-10 px-4">
        <AboutContent aboutCards={aboutCards} />
      </Container>
    </Box>
  )
})
