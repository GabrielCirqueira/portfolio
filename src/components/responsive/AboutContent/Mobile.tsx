import { ContadorAnimado } from '@app/components/ui/ContadorAnimado'
import { motion } from 'framer-motion'
import { Code, FileCode, FolderGit2, Layers, Trophy } from 'lucide-react'
import { memo } from 'react'
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
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-center mb-8"
      >
        <Badge
          variant="outline"
          className="mb-4 px-3 py-1 border-brand-500/30 text-brand-500 uppercase tracking-widest text-[10px] font-bold bg-brand-500/5 rounded-full"
        >
          Sobre Mim
        </Badge>
        <Title className="text-2xl font-bold font-heading uppercase tracking-wide text-white">
          Minha <Span className="text-gradient">Trajetória</Span>
        </Title>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-col items-center mb-8"
      >
        <Box className="relative w-32 h-40 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-lg mb-4">
          <img
            src="/images/gabriel1.png"
            alt="Gabriel Cirqueira"
            className="object-cover w-full h-full opacity-90"
          />
          <Box className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent z-10" />
          <HStack className="absolute bottom-2 left-2 right-2 items-center justify-between z-20">
            <VStack className="gap-0">
              <Span className="text-[8px] text-brand-400 font-mono uppercase tracking-wider">
                Fullstack Dev
              </Span>
              <Span className="text-[10px] font-bold text-white font-heading uppercase">
                Gabriel
              </Span>
            </VStack>
            <Box className="p-1.5 bg-brand-500 text-black rounded-md">
              <Icon icon={FileCode} className="h-3 w-3" />
            </Box>
          </HStack>
        </Box>

        <Text className="text-zinc-400 text-sm leading-relaxed text-center px-2 max-w-sm">
          Desenvolvedor Fullstack focado na criação de aplicações web modernas e escaláveis. Combino
          conhecimento técnico sólido com uma visão prática para entregar software robusto e de alto
          valor.
        </Text>
      </motion.div>

      <VStack className="gap-3 mb-8 w-full">
        {aboutCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="w-full"
          >
            <HStack className="items-start gap-3 bg-zinc-900/80 border border-zinc-800 p-4 rounded-xl active:border-brand-500/30 transition-colors">
              <Box className="p-2.5 rounded-lg bg-zinc-950 text-brand-500 border border-brand-500/10 shrink-0 mt-0.5">
                <Icon icon={card.icon} className="h-4 w-4" />
              </Box>
              <VStack className="flex-1 min-w-0 gap-0">
                <Span className="font-bold text-white uppercase font-heading tracking-wide text-xs mb-1">
                  {card.title}
                </Span>
                <Span className="text-xs text-zinc-500 leading-relaxed">{card.description}</Span>
              </VStack>
            </HStack>
          </motion.div>
        ))}
      </VStack>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="mb-8"
      >
        <Grid className="grid-cols-4 gap-2">
          {estatisticas.map((estatistica, index) => (
            <motion.div
              key={estatistica.rotulo}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
            >
              <Box className="text-center p-3 rounded-lg border border-zinc-800 bg-zinc-900/60">
                <Icon
                  icon={estatistica.icone}
                  className="h-3.5 w-3.5 text-brand-500 mx-auto mb-1.5"
                />
                <Text className="text-lg font-black text-white font-heading">
                  <ContadorAnimado
                    ate={estatistica.valor}
                    sufixo={estatistica.sufixo}
                    duracao={2}
                  />
                </Text>
                <Text className="text-[8px] text-zinc-500 uppercase tracking-widest font-bold">
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
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="text-center pt-6 border-t border-white/5 relative"
      >
        <Box className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-0.5 bg-brand-500 rounded-full" />
        <Text className="text-zinc-500 font-medium text-[11px] tracking-[0.25em] uppercase">
          Tecnologia é a ferramenta. Resultado é o objetivo.
        </Text>
      </motion.div>
    </>
  )
})
