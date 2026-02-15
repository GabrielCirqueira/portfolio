import { motion } from 'framer-motion'
import { ArrowDownCircle, Code, Github, Sparkles } from 'lucide-react'
import { memo, useEffect, useState } from 'react'
import { TypeAnimation } from 'react-type-animation'
import { Badge } from '@/shadcn/components/ui/badge'
import { Button } from '@/shadcn/components/ui/button'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, HStack, VStack } from '@/shadcn/components/ui/layout'
import { Link } from '@/shadcn/components/ui/link'
import { Text } from '@/shadcn/components/ui/typography'

export const Mobile = memo(() => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <Box className="relative min-h-[100svh] flex items-center justify-center overflow-hidden px-4 font-sans selection:bg-brand-500/30">
      {/* Background Effects */}
      <Box className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />

      <Box className="absolute top-[10%] right-[-20%] w-[250px] h-[250px] pointer-events-none z-0">
        <Box className="w-full h-full bg-brand-500/20 rounded-full blur-[70px]" />
      </Box>
      <Box className="absolute bottom-[20%] left-[-15%] w-[200px] h-[200px] pointer-events-none z-0">
        <Box className="w-full h-full bg-brand-700/15 rounded-full blur-[60px]" />
      </Box>

      <Box
        className="
          absolute inset-0
          bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)]
          bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)]
          pointer-events-none
        "
      />

      <Box className="relative z-10 w-full max-w-md mx-auto py-20">
        <VStack className="items-center text-center gap-6">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <Badge
              className="
                inline-flex items-center px-4 py-2
                rounded-full border border-brand-500/40
                bg-brand-500/10 backdrop-blur-sm text-brand-300 text-xs
                uppercase tracking-wider font-semibold
                shadow-lg shadow-brand-500/10
              "
            >
              <Icon icon={Sparkles} className="w-3.5 h-3.5 mr-2 text-brand-400" />
              Desenvolvedor Fullstack
            </Badge>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            className="space-y-2"
          >
            <Text className="text-zinc-400 text-base font-medium tracking-wide">Olá, eu sou</Text>
            <Box className="relative">
              <h1 className="text-gradient font-black text-4xl leading-[1.1] tracking-tight">
                Gabriel
                <br />
                Cirqueira
              </h1>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 1, duration: 0.8, ease: 'circOut' }}
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-brand-500 to-brand-600 rounded-full"
              />
            </Box>
          </motion.div>

          {/* Typing Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="h-8 flex items-center"
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
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-brand-400 font-mono font-medium text-sm tracking-wide"
                cursor={true}
              />
            )}
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Text className="text-zinc-500 text-sm leading-relaxed max-w-sm px-4">
              Criando experiências web modernas e escaláveis com foco em performance e design
            </Text>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="w-full pt-4"
          >
            <VStack className="gap-3 w-full px-6">
              <Link href="#projetos" className="w-full no-underline">
                <Button
                  className="
                    w-full h-14 rounded-2xl
                    bg-gradient-to-r from-brand-600 to-brand-500
                    active:from-brand-500 active:to-brand-400
                    text-black text-sm font-bold uppercase tracking-wide
                    transition-all duration-200
                    shadow-lg shadow-brand-500/20
                    active:shadow-brand-500/30 active:scale-[0.98]
                  "
                >
                  <HStack className="gap-2">
                    <Icon icon={Code} className="w-5 h-5" />
                    <span>Ver Projetos</span>
                  </HStack>
                </Button>
              </Link>

              <Link
                href="https://github.com/GabrielCirqueira"
                external
                className="w-full no-underline"
              >
                <Button
                  variant="outline"
                  className="
                    w-full h-14 rounded-2xl
                    bg-zinc-900/50 backdrop-blur-sm
                    border-2 border-zinc-700/50
                    text-zinc-200 active:text-white text-sm
                    active:border-brand-500/50 active:bg-brand-500/5
                    font-bold uppercase tracking-wide
                    transition-all duration-200
                    active:scale-[0.98]
                  "
                >
                  <HStack className="gap-2">
                    <Icon icon={Github} className="w-5 h-5" />
                    <span>GitHub</span>
                  </HStack>
                </Button>
              </Link>
            </VStack>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="pt-8"
          >
            <Link href="#sobre" className="no-underline">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="flex flex-col items-center gap-2"
              >
                <Text className="text-zinc-600 text-xs uppercase tracking-widest font-semibold">
                  Scroll
                </Text>
                <Icon icon={ArrowDownCircle} className="w-6 h-6 text-zinc-700" />
              </motion.div>
            </Link>
          </motion.div>
        </VStack>
      </Box>
    </Box>
  )
})
