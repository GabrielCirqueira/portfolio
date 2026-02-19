import { motion } from 'framer-motion'
import { memo } from 'react'
import { AboutContent } from '@/components/responsive/AboutContent'
import { aboutCards } from '@/data/sobre'
import { Box, Container } from '@/shadcn/components/ui/layout'
import { useIsLowPerformance } from '@/utils/deviceDetection'

export const AboutSection = memo(() => {
  const isLowPerf = useIsLowPerformance()

  return (
    <Box
      as="section"
      id="sobre"
      className="py-16 sm:py-20 md:py-24 relative font-sans bg-zinc-950/30 overflow-hidden"
    >
      <Box className="absolute inset-0 bg-dotted-pattern opacity-5 pointer-events-none" />
      <Box className="absolute inset-0 bg-zinc-950/50" />
      <Box className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
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
