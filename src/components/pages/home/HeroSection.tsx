import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDownCircle, Code, Terminal } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { TypeAnimation } from 'react-type-animation'
import { Badge } from '@/shadcn/components/ui/badge'
import { Button } from '@/shadcn/components/ui/button'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, Container, VStack } from '@/shadcn/components/ui/layout'
import { Link } from '@/shadcn/components/ui/link'
import { Text } from '@/shadcn/components/ui/typography'

export function HeroSection() {
  const [loaded, setLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  const y1 = useTransform(scrollY, [0, 500], [0, 200])
  const y2 = useTransform(scrollY, [0, 500], [0, -150])

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <Box
      id="inicio"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-24 font-sans selection:bg-brand-500/30"
    >
      <Box className="absolute inset-0 hero-noise" />

      <motion.div
        style={{ y: y1 }}
        className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-0"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
            rotate: [0, 45, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-brand-500/20 rounded-full blur-[120px] mix-blend-screen"
        />
      </motion.div>

      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0"
      >
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
            x: [0, 30, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-800/20 rounded-full blur-[100px] mix-blend-screen"
        />
      </motion.div>

      <Box className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <Container size="xl" className="relative z-10">
        <VStack className="items-center justify-center text-center gap-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-8"
          >
            <Badge className="inline-flex items-center px-4 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-300 text-xs md:text-sm uppercase tracking-widest font-bold shadow-[0_0_20px_rgba(16,185,129,0.15)] backdrop-blur-md hover:bg-brand-500/20 transition-colors cursor-default">
              <Icon icon={Terminal} className="w-3.5 h-3.5 mr-2 text-brand-400" />
              <Text>Dev Fullstack & Game Dev</Text>
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-9xl font-bold mb-6 leading-tight tracking-tighter relative z-20"
          >
            <span className="block text-white mb-2 text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight">
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
            className="text-xl md:text-3xl text-gray-400 mb-12 h-10 font-light flex items-center justify-center"
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
                className="text-brand-300 font-mono font-medium"
                cursor={true}
              />
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 mb-32 w-full justify-center px-4 max-w-lg mx-auto sm:max-w-none"
          >
            <Link href="#projetos" className="w-full sm:w-auto group">
              <Button
                type="button"
                className="w-full sm:w-auto rounded px-8 py-6 bg-brand-600 hover:bg-brand-500 text-black font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_40px_rgba(34,197,94,0.5)] transition-all duration-300 relative overflow-hidden transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-center relative z-10">
                  <Icon
                    icon={Code}
                    className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform"
                  />
                  Ver Projetos
                </div>
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
              </Button>
            </Link>

            <a
              href="https://github.com/GabrielCirqueira"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto rounded px-8 py-6 font-bold border-2 border-zinc-700 text-zinc-300 hover:text-white hover:border-brand-500 hover:bg-brand-500/10 uppercase tracking-widest transition-all duration-300 transform hover:-translate-y-1"
              >
                GitHub Profile
              </Button>
            </a>
          </motion.div>

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
}
