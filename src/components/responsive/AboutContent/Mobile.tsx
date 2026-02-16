import { ContadorAnimado } from '@app/components/ui/ContadorAnimado'
import { motion } from 'framer-motion'
import { Code, FileCode, FolderGit2, Layers, Trophy } from 'lucide-react'
import { memo } from 'react'
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

interface MobileProps {
  aboutCards: AboutCard[]
}

export const Mobile = memo(({ aboutCards }: MobileProps) => {
  const { ehDispositivoLento } = useAnimacaoOtimizada()

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '0px' }}
        transition={{ duration: ehDispositivoLento ? 0.2 : 0.3 }}
        className="text-center mb-10"
      >
        <Badge
          variant="outline"
          className="mb-5 px-4 py-2 border-brand-500/40 text-brand-400 uppercase tracking-wider text-xs font-semibold bg-brand-500/5 backdrop-blur-sm rounded-full shadow-lg shadow-brand-500/10"
        >
          Sobre Mim
        </Badge>
        <Title
          as="h2"
          className="text-3xl font-bold font-heading uppercase tracking-tight text-white mb-3"
        >
          Minha <Span className="text-gradient">Trajetória</Span>
        </Title>
        <Box className="w-16 h-1 bg-brand-500 mx-auto rounded-full opacity-60" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '0px' }}
        transition={{ duration: ehDispositivoLento ? 0.2 : 0.3 }}
        className="flex flex-col items-center mb-10"
      >
        <Box className="relative w-56 h-72 rounded-2xl overflow-hidden border-2 border-zinc-800 bg-zinc-900 shadow-xl mb-6 group">
          <img
            src="/images/gabriel1.webp"
            alt="Gabriel Cirqueira"
            loading="lazy"
            className="object-cover w-full h-full opacity-90 transition-transform duration-300 group-active:scale-105"
          />
          <Box className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />
          <HStack className="absolute bottom-3 left-3 right-3 items-center justify-between z-20">
            <VStack className="gap-0.5">
              <Span className="text-[9px] text-brand-400 font-mono uppercase tracking-wider">
                Fullstack Dev
              </Span>
              <Span className="text-xs font-bold text-white font-heading uppercase tracking-wide">
                Gabriel C.
              </Span>
            </VStack>
            <Box className="p-2 bg-gradient-to-br from-brand-500 to-brand-600 text-black rounded-lg shadow-lg">
              <Icon icon={FileCode} className="h-3.5 w-3.5" />
            </Box>
          </HStack>
        </Box>

        <Text className="text-zinc-400 text-sm leading-relaxed text-center px-4 max-w-md">
          Desenvolvedor Fullstack focado na criação de aplicações web modernas e escaláveis. Combino
          conhecimento técnico sólido com uma visão prática para entregar software robusto e de alto
          valor.
        </Text>
      </motion.div>

      <VStack className="gap-3.5 mb-10 w-full px-2">
        {aboutCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '0px', amount: 0.2 }}
            transition={{
              duration: ehDispositivoLento ? 0.15 : 0.25,
              delay: ehDispositivoLento ? 0 : index * 0.05,
            }}
            className="w-full"
            style={{ willChange: 'opacity' }}
          >
            <HStack className="items-start gap-4 bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 p-5 rounded-2xl active:border-brand-500/40 active:bg-zinc-900/80 transition-all duration-200 shadow-lg">
              <Box className="p-3 rounded-xl bg-zinc-950 text-brand-400 border border-brand-500/20 shrink-0 shadow-inner">
                <Icon icon={card.icon} className="h-5 w-5" />
              </Box>
              <VStack className="flex-1 min-w-0 gap-1.5">
                <Span className="font-bold text-white uppercase font-heading tracking-wide text-sm">
                  {card.title}
                </Span>
                <Span className="text-xs text-zinc-400 leading-relaxed">{card.description}</Span>
              </VStack>
            </HStack>
          </motion.div>
        ))}
      </VStack>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '0px' }}
        transition={{ duration: ehDispositivoLento ? 0.2 : 0.3 }}
        className="mb-10 px-2"
      >
        <Grid className="grid-cols-2 gap-3">
          {estatisticas.map((estatistica, index) => (
            <motion.div
              key={estatistica.rotulo}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '0px' }}
              transition={{
                duration: ehDispositivoLento ? 0.15 : 0.25,
                delay: ehDispositivoLento ? 0 : index * 0.05,
              }}
              style={{ willChange: 'opacity' }}
            >
              <Box className="text-center p-5 rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm shadow-lg active:border-brand-500/30 active:bg-zinc-900/80 transition-all duration-200">
                <Icon icon={estatistica.icone} className="h-6 w-6 text-brand-400 mx-auto mb-3" />
                <Text className="text-2xl font-black text-white font-heading mb-1">
                  <ContadorAnimado
                    ate={estatistica.valor}
                    sufixo={estatistica.sufixo}
                    duracao={2}
                  />
                </Text>
                <Text className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">
                  {estatistica.rotulo}
                </Text>
              </Box>
            </motion.div>
          ))}
        </Grid>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '0px' }}
        transition={{ duration: ehDispositivoLento ? 0.2 : 0.3 }}
        className="text-center pt-8 border-t border-zinc-800/50 relative px-6"
      >
        <Box className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-brand-500 to-transparent rounded-full" />
        <Text className="text-zinc-500 font-medium text-xs tracking-wider leading-relaxed">
          Tecnologia é a ferramenta.
          <br />
          <Span className="text-brand-400">Resultado é o objetivo.</Span>
        </Text>
      </motion.div>
    </>
  )
})
