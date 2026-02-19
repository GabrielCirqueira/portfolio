import { motion } from 'framer-motion'
import { ArrowLeft, Home, Terminal } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MascoteVisual } from '@/components/ui/MascoteVisual'
import { AppContainer } from '@/layouts/AppContainer'
import { Button } from '@/shadcn/components/ui/button'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, HStack, VStack } from '@/shadcn/components/ui/layout'
import { Text, Title } from '@/shadcn/components/ui/typography'

const StarField = () => {
  const [stars, setStars] = useState<
    { id: number; x: number; y: number; size: number; duration: number; delay: number }[]
  >([])

  useEffect(() => {
    const generateStars = () => {
      const newStars = []
      for (let i = 0; i < 50; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          duration: Math.random() * 3 + 2,
          delay: Math.random() * 2,
        })
      }
      setStars(newStars)
    }
    generateStars()
  }, [])

  return (
    <Box className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full opacity-0"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0, 0.5, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: star.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: star.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </Box>
  )
}

const GridBackground = () => (
  <Box className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
    <Box className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
    <Box className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_200px,#18181b,transparent)]" />
  </Box>
)

export function Component() {
  const navigate = useNavigate()

  return (
    <Box className="relative min-h-screen w-full bg-[#030303] overflow-hidden flex items-center justify-center">
      <GridBackground />
      <StarField />

      <Box className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-brand-500/10 blur-[120px] rounded-full pointer-events-none" />
      <Box className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

      <AppContainer
        maxWidth="lg"
        className="relative z-10 flex flex-col items-center justify-center py-12 px-4 md:px-6"
      >
        <VStack className="w-full max-w-2xl items-center text-center gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
            className="relative group w-fit mx-auto"
          >
            <Box className="relative w-40 h-40 md:w-56 md:h-56 mx-auto">
              <Box className="absolute inset-0 bg-brand-500/20 blur-3xl rounded-full scale-75 animate-pulse" />

              <MascoteVisual
                isActive={true}
                className="w-full h-full drop-shadow-2xl transition-transform duration-500 group-hover:-translate-y-2"
              />
            </Box>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-full shadow-lg whitespace-nowrap"
            >
              <Box className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
              <Text className="text-[10px] md:text-xs font-mono text-zinc-300 font-medium tracking-widest uppercase">
                Erro 404
              </Text>
            </motion.div>
          </motion.div>

          <VStack className="gap-4 md:gap-6 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Title className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white p-0 m-0">
                Página{' '}
                <Text
                  as="span"
                  className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600 text-4xl sm:text-5xl md:text-7xl font-bold"
                >
                  Perdida
                </Text>
              </Title>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Text className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-md mx-auto">
                Parece que você navegou para uma área desconhecida do sistema. As coordenadas que
                você procura não foram encontradas.
              </Text>
            </motion.div>
          </VStack>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="w-full"
          >
            <HStack className="w-full flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto min-w-[180px] bg-brand-500 hover:bg-brand-600 text-black font-bold rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.2)] hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all duration-300"
                >
                  <Icon icon={Home} className="mr-2 h-4 w-4" />
                  Ir para Início
                </Button>
              </Link>

              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate(-1)}
                className="w-full sm:w-auto min-w-[180px] border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-xl backdrop-blur-sm transition-all duration-300"
              >
                <Icon icon={ArrowLeft} className="mr-2 h-4 w-4" />
                Voltar
              </Button>
            </HStack>
          </motion.div>
        </VStack>
      </AppContainer>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-6 md:bottom-8 w-full text-center pointer-events-none"
      >
        <Box className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-950/50 backdrop-blur rounded-lg border border-zinc-900/50">
          <Icon icon={Terminal} className="w-3.5 h-3.5 text-zinc-600" />
          <Text className="text-[10px] md:text-xs text-zinc-600 font-mono tracking-wider">
            SYSTEM_STATUS: CORRUPTED_PATH
          </Text>
        </Box>
      </motion.div>
    </Box>
  )
}
