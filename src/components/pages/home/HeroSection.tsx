import { motion } from 'framer-motion'
import { ArrowDownCircle } from 'lucide-react'
import { memo, useEffect, useRef, useState } from 'react'
import { TypeAnimation } from 'react-type-animation'
import { HeroActions } from '@/components/responsive/HeroActions'
import { HeroBackground } from '@/components/responsive/HeroBackground'
import { HeroBadge } from '@/components/responsive/HeroBadge'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, Container, VStack } from '@/shadcn/components/ui/layout'
import { Link } from '@/shadcn/components/ui/link'

export const HeroSection = memo(() => {
  const [loaded, setLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <Box
      id="inicio"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-14 sm:pt-16 md:pt-20 pb-12 sm:pb-16 md:pb-24 px-3 sm:px-4 font-sans selection:bg-brand-500/30"
    >
      <Box className="absolute inset-0 hero-noise" />

      <HeroBackground />

      <Box
        className="
          absolute inset-0
          bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]
          bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]
          pointer-events-none
        "
      />

      <Container size="xl" className="relative z-10">
        <VStack className="items-center justify-center text-center gap-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-6 sm:mb-7 md:mb-8"
          >
            <HeroBadge />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-8xl font-bold mb-3 sm:mb-4 md:mb-6 leading-none tracking-tighter relative z-20 px-4"
          >
            <span className="block text-white mb-1 sm:mb-2 text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-medium tracking-tight">
              Olá, sou
            </span>
            <span className="text-gradient font-black relative inline-block filter drop-shadow-sm">
              Gabriel Cirqueira
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 1, duration: 1, ease: 'circOut' }}
                className="absolute -bottom-2 left-0 h-1.5 bg-brand-500 hidden md:block rounded-full opacity-80"
              />
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-base sm:text-lg md:text-xl lg:text-3xl text-gray-400 mb-6 sm:mb-8 md:mb-12 h-7 sm:h-8 md:h-10 font-light flex items-center justify-center"
          >
            {loaded && (
              <TypeAnimation
                sequence={[
                  'Desenvolvedor PHP',
                  2000,
                  'Desenvolvedor Symfony',
                  2000,
                  'Desenvolvedor React',
                  2000,
                  'Criador de Jogos',
                  2000,
                  'Arquiteto de Soluções',
                  2000,
                  'Análise e Desenvolvimento de Sistemas',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-brand-300 font-mono font-medium"
                cursor={true}
              />
            )}
          </motion.div>

          <HeroActions />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer z-20"
          >
            <Link href="#sobre">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="flex flex-col items-center gap-2 group p-4"
              >
                <Icon
                  icon={ArrowDownCircle}
                  className="w-6 h-6 text-zinc-500 group-hover:text-brand-400 transition-all duration-300"
                />
              </motion.div>
            </Link>
          </motion.div>
        </VStack>
      </Container>
    </Box>
  )
})
