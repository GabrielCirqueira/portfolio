import { motion } from 'framer-motion'
import { ArrowDownCircle, Code, Terminal } from 'lucide-react'
import { memo, useEffect, useState } from 'react'
import { TypeAnimation } from 'react-type-animation'
import { Badge } from '@/shadcn/components/ui/badge'
import { Button } from '@/shadcn/components/ui/button'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, Center, VStack } from '@/shadcn/components/ui/layout'
import { Link } from '@/shadcn/components/ui/link'
import { Span, Title } from '@/shadcn/components/ui/typography'

export const Mobile = memo(() => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <Box className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-16 pb-16 px-5 font-sans selection:bg-brand-500/30">
      <Box className="absolute inset-0 hero-noise" />

      <Box className="absolute top-[-5%] right-[-10%] w-[300px] h-[300px] pointer-events-none z-0">
        <Box className="w-full h-full bg-brand-500/15 rounded-full blur-[80px]" />
      </Box>
      <Box className="absolute bottom-[-5%] left-[-10%] w-[250px] h-[250px] pointer-events-none z-0">
        <Box className="w-full h-full bg-brand-800/15 rounded-full blur-[60px]" />
      </Box>

      <Box
        className="
          absolute inset-0
          bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]
          bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_50%,#000_60%,transparent_100%)]
          pointer-events-none
        "
      />

      <Box className="relative z-10 w-full">
        <VStack className="items-center text-center gap-0">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="mb-5"
          >
            <Badge
              className="
                inline-flex items-center px-3 py-1.5
                rounded-full border border-brand-500/30
                bg-brand-500/10 text-brand-300 text-[10px]
                uppercase tracking-widest font-bold
              "
            >
              <Icon icon={Terminal} className="w-3 h-3 mr-1.5 text-brand-400" />
              Dev Fullstack & Game Dev
            </Badge>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
          >
            <Title className="font-bold mb-3 leading-none tracking-tighter relative z-20">
              <Span className="block text-white mb-1 text-lg font-medium tracking-tight">
                Olá, sou
              </Span>
              <Span className="text-gradient font-black text-3xl relative inline-block">
                Gabriel Cirqueira
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.8, duration: 0.8, ease: 'circOut' }}
                  className="absolute -bottom-1.5 left-0 h-1 bg-brand-500 rounded-full opacity-70"
                />
              </Span>
            </Title>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="text-base text-gray-400 mb-8 h-6 font-light"
          >
            <Center>
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
                  className="text-brand-300 font-mono font-medium text-sm"
                  cursor={true}
                />
              )}
            </Center>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="w-full"
          >
            <VStack className="gap-3 w-full max-w-xs mx-auto mb-20">
              <Link href="#projetos" className="w-full no-underline">
                <Button
                  className="
                    w-full rounded-xl px-6 py-4
                    bg-brand-600 active:bg-brand-500 text-black text-sm
                    font-bold uppercase tracking-widest
                    transition-colors duration-150
                    relative overflow-hidden
                    flex items-center justify-center gap-2
                  "
                >
                  <Icon icon={Code} className="w-4 h-4" />
                  Ver Projetos
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
                    w-full rounded-xl px-6 py-4
                    bg-transparent border-2 border-zinc-700
                    text-zinc-300 active:text-white text-sm
                    active:border-brand-500 active:bg-brand-500/10
                    font-bold uppercase tracking-widest
                    transition-colors duration-150
                  "
                >
                  GitHub Profile
                </Button>
              </Link>
            </VStack>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20"
          >
            <Link href="#sobre" className="no-underline">
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="p-3"
              >
                <Center>
                  <Icon icon={ArrowDownCircle} className="w-5 h-5 text-zinc-600" />
                </Center>
              </motion.div>
            </Link>
          </motion.div>
        </VStack>
      </Box>
    </Box>
  )
})
