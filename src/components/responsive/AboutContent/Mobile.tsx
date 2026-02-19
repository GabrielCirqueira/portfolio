import { ContadorAnimado } from '@app/components/ui/ContadorAnimado'
import { motion } from 'framer-motion'
import { Code, FileCode, FolderGit2, Layers, Trophy } from 'lucide-react'
import { memo } from 'react'
import Marquee from 'react-fast-marquee'
import { useAnimacaoOtimizada } from '@/hooks/useAnimacaoOtimizada'
import { Badge } from '@/shadcn/components/ui/badge'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, Grid, HStack, VStack } from '@/shadcn/components/ui/layout'
import { Span, Text, Title } from '@/shadcn/components/ui/typography'
import type { AboutCard } from './index'

const estatisticas = [
  { icone: FolderGit2, rotulo: 'Repos', valor: 32, sufixo: '+' },
  { icone: Layers, rotulo: 'Projetos', valor: 12, sufixo: '+' },
  { icone: Code, rotulo: 'Techs', valor: 20, sufixo: '+' },
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
]

interface MobileProps {
  aboutCards: AboutCard[]
}

export const Mobile = memo(({ aboutCards }: MobileProps) => {
  const { ehDispositivoLento } = useAnimacaoOtimizada()

  return (
    <Box className="w-full px-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10 space-y-3"
      >
        <Badge
          variant="outline"
          className="mx-auto w-fit px-3 py-1 border-brand-500/30 text-brand-400 uppercase tracking-wider text-[10px] font-bold bg-brand-500/5 backdrop-blur-sm rounded-full"
        >
          Sobre Mim
        </Badge>
        <Title
          as="h2"
          className="text-3xl font-black font-heading uppercase tracking-tight text-white"
        >
          Minha <Span className="text-gradient">Trajetória</Span>
        </Title>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center mb-10"
      >
        <motion.div
          animate={ehDispositivoLento ? {} : { y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Box className="relative w-64 h-80 rounded-2xl overflow-hidden border border-zinc-700/50 bg-zinc-900 shadow-2xl mb-6 group">
            <Box className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
            <img
              src="/images/gabriel1.webp"
              alt="Gabriel Cirqueira"
              loading="lazy"
              className="object-cover w-full h-full opacity-90"
            />
            <HStack className="absolute bottom-4 left-4 right-4 items-center justify-between z-20">
              <VStack className="gap-0.5">
                <Span className="text-[10px] text-brand-400 font-mono uppercase tracking-wider font-bold">
                  Fullstack Dev
                </Span>
                <Span className="text-sm font-bold text-white font-heading uppercase">
                  Gabriel C.
                </Span>
              </VStack>
              <Box className="p-2 bg-brand-500 text-black rounded-lg shadow-lg shadow-brand-500/20">
                <Icon icon={FileCode} className="h-4 w-4" />
              </Box>
            </HStack>
          </Box>
        </motion.div>

        <Text className="text-zinc-400 text-sm leading-relaxed text-center max-w-sm">
          Desenvolvedor Fullstack focado na criação de{' '}
          <Span className="text-white font-medium">aplicações web modernas e escaláveis.</Span>
        </Text>
      </motion.div>

      <Grid className="grid-cols-2 gap-3 mb-8">
        {estatisticas.map((stat, index) => (
          <motion.div
            key={stat.rotulo}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: ehDispositivoLento ? 0.2 : 0.4,
              delay: index * 0.05,
            }}
            className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-sm text-center relative overflow-hidden"
          >
            <motion.div
              animate={{ opacity: [0, 0.1, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: index * 1 }}
              className="absolute inset-0 bg-brand-500 pointer-events-none"
            />

            <Icon icon={stat.icone} className="h-5 w-5 text-brand-500 mx-auto mb-2 opacity-80" />
            <Text className="text-xl font-black text-white font-heading">
              <ContadorAnimado ate={stat.valor} sufixo={stat.sufixo} duracao={2} />
            </Text>
            <Text className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold mt-1">
              {stat.rotulo}
            </Text>
          </motion.div>
        ))}
      </Grid>

      <Box className="mb-10 -mx-4 py-3 bg-zinc-900/30 border-y border-zinc-800/30">
        <Marquee gradient={false} speed={25}>
          {technologies.map((tech) => (
            <span
              key={tech}
              className="mx-4 text-zinc-500 font-bold uppercase tracking-widest text-[10px]"
            >
              {tech}
            </span>
          ))}
        </Marquee>
      </Box>

      <VStack className="gap-4 w-full mb-10">
        {aboutCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: ehDispositivoLento ? 0.2 : 0.4,
              delay: index * 0.1,
            }}
          >
            <HStack className="items-start gap-4 bg-zinc-900/30 border border-zinc-800 p-5 rounded-2xl active:bg-zinc-800/50 transition-colors relative overflow-hidden">
              <Box className="p-2.5 rounded-lg bg-zinc-950 text-brand-400 border border-zinc-800 shrink-0 relative z-10">
                <Icon icon={card.icon} className="h-5 w-5" />
              </Box>
              <VStack className="gap-1 relative z-10">
                <Span className="font-bold text-white uppercase font-heading tracking-wide text-sm">
                  {card.title}
                </Span>
                <Span className="text-xs text-zinc-400 leading-relaxed text-balance">
                  {card.description}
                </Span>
              </VStack>
            </HStack>
          </motion.div>
        ))}
      </VStack>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="text-center pt-6 border-t border-white/5 relative"
      ></motion.div>
    </Box>
  )
})
