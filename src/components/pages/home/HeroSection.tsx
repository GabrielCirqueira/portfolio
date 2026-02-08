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

      <Box className="absolute inset-0 bg-[linear-gradient(to_right,#080808_1px,transparent_1px),linear-gradient(to_bottom,#080808_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <Container size="xl" className="relative z-10">
        <VStack className="items-center justify-center text-center gap-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <Badge className="inline-flex items-center px-4 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-500 text-sm mb-6 uppercase tracking-wider font-bold">
              <Icon icon={Terminal} className="w-4 h-4 mr-2" />
              <Text>Dev Fullstack</Text>
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="block">Olá, sou</span>
            <span className="text-gradient font-extrabold">Gabriel Cirqueira</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 h-16"
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
                  'Desenvolvedor de Jogos',
                  2000,
                  'Criador de Sistemas',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-500 to-white"
              />
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-24"
          >
            <Link href="#projetos">
              <Button
                type="button"
                className="rounded-md font-bold text-md px-8 py-6 group bg-brand-500 hover:bg-brand-600 text-black uppercase tracking-wider relative overflow-hidden"
              >
                <Icon
                  icon={Code}
                  className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform"
                />
                Ver Projetos
                <Box className="absolute bottom-0 left-0 w-full h-1 bg-brand-300 origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform" />
              </Button>
            </Link>
            <a href="https://github.com/GabrielCirqueira" target="_blank" rel="noopener noreferrer">
              <Button
                type="button"
                variant="outline"
                className="rounded-md px-8 py-6 font-bold text-md border-brand-500 text-brand-500 hover:bg-brand-500/10 uppercase tracking-wider"
              >
                GitHub Profile
              </Button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <Link href="#sobre" className="block animate-bounce">
              <Icon
                icon={ArrowDownCircle}
                className="w-10 h-10 text-brand-500 opacity-75 hover:opacity-100 transition-opacity"
              />
            </Link>
          </motion.div>
        </VStack>
      </Container>

      <Box className="absolute top-1/4 right-[5%] w-64 h-64 bg-brand-500/20 rounded-full filter blur-[100px]" />
      <Box className="absolute bottom-1/4 left-[5%] w-64 h-64 bg-brand-500/20 rounded-full filter blur-[100px]" />
    </Box>
  )
}
