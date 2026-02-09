import { motion } from 'framer-motion'
import { ArrowDownCircle, Code, Terminal } from 'lucide-react'
import { useEffect, useState } from 'react'
import { TypeAnimation } from 'react-type-animation'
import { Badge } from '@/shadcn/components/ui/badge'
import { Button } from '@/shadcn/components/ui/button'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, Container, VStack } from '@/shadcn/components/ui/layout'
import { Link } from '@/shadcn/components/ui/link'
import { Text } from '@/shadcn/components/ui/typography'

export function HeroSection() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <Box
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 pb-24 font-sans"
    >
      <Box className="absolute inset-0 hero-noise" />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-brand-500/10 rounded-full filter blur-[120px] mix-blend-screen pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, 50, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-800/20 rounded-full filter blur-[100px] mix-blend-screen pointer-events-none"
      />

      <Box className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <Container size="xl" className="relative z-10">
        <VStack className="items-center justify-center text-center gap-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Badge className="inline-flex items-center px-4 py-2 rounded-full border border-brand-500/30 bg-brand-500/5 text-brand-400 text-xs md:text-sm uppercase tracking-widest font-bold shadow-[0_0_15px_rgba(16,185,129,0.2)] backpack-blur-sm">
              <Icon icon={Terminal} className="w-4 h-4 mr-2 animate-pulse" />
              <Text>Dev Fullstack & Game Dev</Text>
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight tracking-tight relative"
          >
            <span className="block text-white mb-2">Olá, sou</span>
            <span className="text-gradient font-black relative inline-block">
              Gabriel Cirqueira
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.8, duration: 1 }}
                className="absolute -bottom-2 left-0 h-1 bg-brand-500/50 hidden md:block"
              />
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl md:text-3xl text-gray-400 mb-10 h-20 font-light"
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
                className="text-brand-300 font-mono"
                cursor={true}
              />
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 mb-32 w-full justify-center px-4"
          >
            <Link href="#projetos" className="w-full sm:w-auto">
              <Button
                type="button"
                className="w-full sm:w-auto rounded-none skew-x-[-10deg] px-10 py-7 group bg-brand-500 hover:bg-brand-400 text-black font-extrabold uppercase tracking-widest shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] transition-all duration-300 relative overflow-hidden"
              >
                <div className="skew-x-[10deg] flex items-center justify-center">
                  <Icon
                    icon={Code}
                    className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform"
                  />
                  Ver Projetos
                </div>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
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
                className="w-full sm:w-auto rounded-none skew-x-[-10deg] px-10 py-7 font-bold border border-brand-500/50 text-brand-500 hover:bg-brand-500/10 hover:border-brand-500 uppercase tracking-widest backdrop-blur-sm transition-all duration-300"
              >
                <div className="skew-x-[10deg]">GitHub Profile</div>
              </Button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
          >
            <Link href="#sobre">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="flex flex-col items-center gap-2 group"
              >
                <Icon
                  icon={ArrowDownCircle}
                  className="w-8 h-8 text-brand-500/50 group-hover:text-brand-500 transition-all duration-300"
                />
              </motion.div>
            </Link>
          </motion.div>
        </VStack>
      </Container>
    </Box>
  )
}
