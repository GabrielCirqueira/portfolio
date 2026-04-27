import { motion } from 'framer-motion'
import { ArrowDown, Github, MapPin } from 'lucide-react'
import { memo } from 'react'
import { MascoteVisual } from '@/components/ui/MascoteVisual'
import { useAnimation } from '@/contexts'
import { Box, Container, HStack, VStack } from '@/shadcn/components/ui/layout'
import { Span, Text, Title } from '@/shadcn/components/ui/typography'

export const HeroSection = memo(() => {
  const { fadeUp, reducedMotion } = useAnimation()

  return (
    <Box
      as="section"
      id="inicio"
      className="min-h-[100svh] flex items-center relative overflow-hidden bg-black"
    >
      <Box className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,_var(--tw-gradient-stops))] from-brand-500/10 via-transparent to-transparent pointer-events-none" />

      <Container size="xl" className="relative z-10 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-20">
          <motion.div
            variants={reducedMotion ? {} : fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-8"
          >
            <HStack className="items-center gap-2 px-4 py-1.5 border border-brand-500/30 bg-brand-500/5 rounded-full w-fit">
              <Box className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
              <Span className="text-[10px] uppercase font-black tracking-widest text-brand-400">
                Disponível para projetos
              </Span>
            </HStack>

            <VStack className="gap-2">
              <Text className="text-zinc-500 text-lg md:text-xl font-medium">Olá, eu sou</Text>
              <Title className="font-chakra text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter uppercase">
                Gabriel
                <br />
                <Span className="text-brand-500">Cirqueira</Span>
              </Title>
            </VStack>

            <VStack className="gap-1">
              <Text className="text-brand-400 font-chakra text-xl md:text-2xl font-bold uppercase tracking-tight">
                Desenvolvedor Fullstack
              </Text>
              <HStack className="items-center gap-2 text-zinc-500 text-sm md:text-base font-medium">
                <MapPin className="w-4 h-4 text-brand-500" />
                <span>Espírito Santo, BR</span>
              </HStack>
            </VStack>

            <Text className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-md">
              Construo sistemas web de alta performance — do frontend ao backend, com foco em
              escalabilidade, arquitetura limpa e experiência do usuário.
            </Text>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#projetos"
                className="px-8 py-4 bg-brand-500 text-black font-black uppercase tracking-widest text-sm rounded-xl hover:bg-brand-400 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-brand-500/20"
              >
                Ver projetos
              </a>
              <a
                href="https://github.com/GabrielCirqueira"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border border-zinc-800 text-white font-black uppercase tracking-widest text-sm rounded-xl hover:border-brand-500/50 transition-all duration-300 flex items-center gap-2 hover:bg-zinc-900"
              >
                <Github className="w-5 h-5" />
                GitHub
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center lg:justify-end items-center"
          >
            <Box className="relative group">
              <Box className="absolute -inset-10 bg-brand-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <MascoteVisual className="w-[280px] md:w-[320px] lg:w-[400px]" />
            </Box>
          </motion.div>
        </div>
      </Container>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={reducedMotion ? {} : { y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        <Span className="text-[10px] uppercase font-black tracking-[0.3em] text-zinc-600">
          Scroll
        </Span>
        <ArrowDown className="w-5 h-5 text-brand-500/50" />
      </motion.div>
    </Box>
  )
})

HeroSection.displayName = 'HeroSection'
