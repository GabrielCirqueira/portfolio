import { ContadorAnimado } from '@app/components/ui/ContadorAnimado'
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Code, FileCode, FolderGit2, Layers, Trophy } from 'lucide-react'
import type { MouseEvent } from 'react'
import { memo } from 'react'
import Marquee from 'react-fast-marquee'
import { Badge } from '@/shadcn/components/ui/badge'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, Grid, HStack, VStack } from '@/shadcn/components/ui/layout'
import { Span, Text, Title } from '@/shadcn/components/ui/typography'
import { useIsLowPerformance } from '@/utils/deviceDetection'
import type { AboutCard } from './index'

const estatisticas = [
  { icone: FolderGit2, rotulo: 'Repositórios', valor: 18, sufixo: '+' },
  { icone: Layers, rotulo: 'Projetos', valor: 12, sufixo: '+' },
  { icone: Code, rotulo: 'Tecnologias', valor: 20, sufixo: '+' },
  { icone: Trophy, rotulo: 'Conquistas', valor: 5, sufixo: '' },
]

const technologies = [
  'React',
  'TypeScript',
  'Node.js',
  'Next.js',
  'TailwindCSS',
  'PostgreSQL',
  'Docker',
  'AWS',
  'Git',
  'Figma',
  'Redux',
  'GraphQL',
]

function TiltCard({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 })
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 })

  function onMouseMove(event: MouseEvent<HTMLDivElement>) {
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect()
    const xPct = (event.clientX - left) / width - 0.5
    const yPct = (event.clientY - top) / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  function onMouseLeave() {
    x.set(0)
    y.set(0)
  }

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10])

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="relative w-full h-full"
    >
      {children}
    </motion.div>
  )
}

function SpotlightCard({
  children,
  className = '',
  disabled = false,
}: {
  children: React.ReactNode
  className?: string
  disabled?: boolean
}) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    if (disabled) return
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: Visual spotlight effect
    <div
      className={`group relative border border-zinc-800 bg-zinc-900/50 overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      {!disabled && (
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                650px circle at ${mouseX}px ${mouseY}px,
                rgba(14, 165, 233, 0.15),
                transparent 80%
              )
            `,
          }}
        />
      )}
      <div className="relative h-full">{children}</div>
    </div>
  )
}

interface DesktopProps {
  aboutCards: AboutCard[]
}

export const Desktop = memo(({ aboutCards }: DesktopProps) => {
  const isLowPerf = useIsLowPerformance()

  return (
    <Box className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center mb-16 space-y-4"
      >
        <Badge
          variant="outline"
          className="
            px-4 py-1.5 rounded-full border-brand-500/30
            text-brand-500 uppercase tracking-widest text-xs font-bold
            bg-brand-500/5 backdrop-blur-md
            shadow-[0_0_20px_-5px_var(--tw-shadow-color)] shadow-brand-500/30
          "
        >
          Sobre Mim
        </Badge>
        <Title
          as="h2"
          className="text-4xl md:text-5xl lg:text-7xl font-black font-heading tracking-tight text-white"
        >
          Minha <Span className="text-gradient">Trajetória</Span>
        </Title>
      </motion.div>

      <Grid className="grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <Box className="lg:col-span-5 flex flex-col gap-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'backOut' }}
            className="relative z-10 perspective-1000 group"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              {isLowPerf ? (
                <Box className="relative rounded-3xl overflow-hidden border border-zinc-700/50 bg-zinc-900 shadow-2xl aspect-[4/5] transform transition-transform duration-500 group-hover:shadow-brand-500/20">
                  <Box className="absolute inset-0 bg-gradient-to-tr from-brand-500/20 to-transparent mix-blend-overlay z-20 pointer-events-none" />
                  <img
                    src="/images/gabriel1.webp"
                    alt="Gabriel Cirqueira"
                    className="object-cover w-full h-full transform scale-105 transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/70 backdrop-blur-lg border border-white/10 z-30 flex items-center justify-between shadow-xl"
                  >
                    <VStack className="gap-1">
                      <Text className="text-[10px] text-brand-400 font-mono uppercase tracking-wider font-bold">
                        Gabriel Cirqueira
                      </Text>
                      <Text className="text-lg font-bold text-white font-heading leading-none">
                        Fullstack Developer
                      </Text>
                    </VStack>
                    <Box className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center text-zinc-950 shadow-[0_0_15px_rgba(14,165,233,0.5)]">
                      <Icon icon={FileCode} className="w-5 h-5" />
                    </Box>
                  </motion.div>
                </Box>
              ) : (
                <TiltCard>
                  <Box className="relative rounded-3xl overflow-hidden border border-zinc-700/50 bg-zinc-900 shadow-2xl aspect-[4/5] transform transition-transform duration-500 group-hover:shadow-brand-500/20">
                    <Box className="absolute inset-0 bg-gradient-to-tr from-brand-500/20 to-transparent mix-blend-overlay z-20 pointer-events-none" />
                    <img
                      src="/images/gabriel1.webp"
                      alt="Gabriel Cirqueira"
                      className="object-cover w-full h-full transform scale-105 transition-transform duration-700 ease-out group-hover:scale-110"
                    />

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/70 backdrop-blur-lg border border-white/10 z-30 flex items-center justify-between shadow-xl"
                    >
                      <VStack className="gap-1">
                        <Text className="text-[10px] text-brand-400 font-mono uppercase tracking-wider font-bold">
                          Gabriel Cirqueira
                        </Text>
                        <Text className="text-lg font-bold text-white font-heading leading-none">
                          Fullstack Developer
                        </Text>
                      </VStack>
                      <Box className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center text-zinc-950 shadow-[0_0_15px_rgba(14,165,233,0.5)]">
                        <Icon icon={FileCode} className="w-5 h-5" />
                      </Box>
                    </motion.div>
                  </Box>
                </TiltCard>
              )}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="pl-4 border-l-2 border-brand-500/30"
          >
            <Text className="text-zinc-400 text-lg leading-relaxed">
              Desenvolvedor Fullstack apaixonado por criar{' '}
              <Span className="text-brand-400 font-medium text-shadow-sm">
                soluções digitais de alto impacto
              </Span>
              . Combino expertise técnica com visão de produto para entregar aplicações robustas,
              escaláveis e com experiência de usuário excepcional.
            </Text>
          </motion.div>
        </Box>

        <Box className="lg:col-span-7 flex flex-col gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {estatisticas.map((stat) => (
              <motion.div
                key={stat.rotulo}
                whileHover={!isLowPerf ? { y: -5, backgroundColor: 'rgba(24, 24, 27, 0.8)' } : {}}
                className="flex flex-col items-center justify-center p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-sm transition-all duration-300 group cursor-default relative overflow-hidden"
              >
                <Box className="absolute inset-0 bg-brand-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Box className="mb-3 p-2 rounded-lg bg-zinc-900 text-zinc-500 group-hover:text-brand-400 group-hover:bg-brand-500/10 transition-colors relative z-10 w-fit mx-auto">
                  <Icon icon={stat.icone} className="w-5 h-5" />
                </Box>
                <Text className="text-3xl font-black text-white mb-1 font-heading group-hover:text-brand-400 transition-colors relative z-10">
                  <ContadorAnimado ate={stat.valor} sufixo={stat.sufixo} duracao={2.5} />
                </Text>
                <Text className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold relative z-10">
                  {stat.rotulo}
                </Text>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="py-4 border-y border-zinc-800/30 bg-black/10 backdrop-blur-sm -mx-4 px-4 sm:mx-0 sm:px-0 sm:rounded-xl overflow-hidden"
          >
            <Marquee
              gradient={true}
              gradientColor="#000000"
              gradientWidth={50}
              speed={30}
              className="overflow-hidden py-1"
            >
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="mx-6 text-zinc-600 font-bold uppercase tracking-widest text-xs sm:text-sm hover:text-brand-400 transition-colors cursor-default"
                >
                  {tech}
                </span>
              ))}
            </Marquee>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aboutCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                className="h-full"
              >
                <SpotlightCard
                  disabled={isLowPerf}
                  className="h-full rounded-2xl p-6 hover:border-brand-500/30 transition-colors duration-300 flex flex-col"
                >
                  <HStack className="justify-between items-start mb-4">
                    <Box className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center group-hover:border-brand-500/50 group-hover:bg-brand-500/10 transition-colors duration-300 shadow-md">
                      <motion.div
                        animate={{ rotate: [0, 5, 0, -5, 0] }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: index * 0.5,
                        }}
                      >
                        <Icon
                          icon={card.icon}
                          className="w-6 h-6 text-zinc-400 group-hover:text-brand-400 transition-colors"
                        />
                      </motion.div>
                    </Box>
                    <Box className="relative">
                      <Box className="w-2 h-2 rounded-full bg-zinc-800 group-hover:bg-brand-500 transition-colors duration-500 z-10 relative" />
                      <Box className="absolute inset-0 bg-brand-500 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
                    </Box>
                  </HStack>

                  <Title
                    as="h3"
                    className="text-xl font-bold text-white mb-3 font-heading tracking-wide"
                  >
                    {card.title}
                  </Title>
                  <Text className="text-sm text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
                    {card.description}
                  </Text>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </Box>
      </Grid>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 1 }}
        className="mt-24 text-center relative"
      >
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent -z-10" />
      </motion.div>
    </Box>
  )
})
