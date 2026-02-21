import { AnimatePresence, motion } from 'framer-motion'
import { Award, Briefcase, CheckCircle } from 'lucide-react'
import { memo, useState } from 'react'
import { useAnimacaoOtimizada } from '@/hooks/useAnimacaoOtimizada'
import { Badge } from '@/shadcn/components/ui/badge'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, HStack, VStack } from '@/shadcn/components/ui/layout'
import { Span, Text, Title } from '@/shadcn/components/ui/typography'
import type { ConquistaItem, ExperienciaItem, FormacaoItem } from '@/types/educacao'

interface EducationGridProps {
  formacao: FormacaoItem[]
  experiencias: ExperienciaItem[]
  conquistas: ConquistaItem[]
}

const tabs = [
  { key: 'formacao', label: 'Formação', icon: CheckCircle },
  { key: 'experiencia', label: 'Experiência', icon: Briefcase },
  { key: 'conquistas', label: 'Conquistas', icon: Award },
] as const

type TabKey = (typeof tabs)[number]['key']

export const Mobile = memo(({ formacao, experiencias, conquistas }: EducationGridProps) => {
  const [activeTab, setActiveTab] = useState<TabKey>('formacao')
  const { ehDispositivoLento } = useAnimacaoOtimizada()

  return (
    <VStack className="gap-4 w-full">
      <HStack className="bg-zinc-900 border border-zinc-800 rounded-xl p-1 gap-1 w-full relative">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`
                flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg h-10
                text-[10px] sm:text-[11px] font-bold uppercase tracking-wider
                transition-colors duration-300 relative outline-none
                ${isActive ? 'text-black' : 'text-zinc-500 active:text-zinc-300'}
              `}
            >
              {isActive && (
                <motion.div
                  layoutId="activeEducationTab"
                  className="absolute inset-0 bg-brand-500 rounded-lg shadow-lg shadow-brand-500/20"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <HStack className="relative z-10 gap-1.5 items-center justify-center">
                <Icon
                  icon={tab.icon}
                  className={`w-3.5 h-3.5 transition-colors ${isActive ? 'text-black' : 'text-zinc-500'}`}
                />
                <Span className="hidden min-[340px]:inline">{tab.label}</Span>
              </HStack>
            </button>
          )
        })}
      </HStack>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: ehDispositivoLento ? 0.15 : 0.2 }}
          className="border border-zinc-800/60 rounded-xl bg-zinc-900/30 overflow-hidden"
        >
          {activeTab === 'formacao' && (
            <VStack className="divide-y divide-zinc-800/40">
              {formacao.map((item, index) => (
                <VStack key={index} className="p-4 gap-1.5">
                  <HStack className="items-start gap-2.5">
                    <Box className="w-2 h-2 rounded-full bg-brand-500 mt-1.5 flex-shrink-0" />
                    <VStack className="flex-1 min-w-0 gap-0">
                      <Title className="text-[13px] font-bold text-white uppercase tracking-wide leading-snug">
                        {item.titulo}
                      </Title>
                      <Text className="text-[11px] text-zinc-400 font-mono font-bold mt-1">
                        {item.instituicao}
                      </Text>
                      <Badge className="inline-block bg-brand-500/10 text-brand-400 text-[10px] uppercase font-bold px-2 py-0.5 rounded mt-1.5 w-fit">
                        {item.periodo}
                      </Badge>
                      <Text className="text-zinc-300 text-[11px] leading-relaxed mt-2">
                        {item.descricao}
                      </Text>
                    </VStack>
                  </HStack>
                </VStack>
              ))}
            </VStack>
          )}

          {activeTab === 'experiencia' && (
            <VStack className="divide-y divide-zinc-800/40">
              {experiencias.map((item, index) => (
                <VStack key={index} className="p-4 gap-1.5">
                  <HStack className="items-start gap-2.5">
                    <Box className="w-2 h-2 rounded-full bg-brand-500 mt-1.5 flex-shrink-0" />
                    <VStack className="flex-1 min-w-0 gap-0">
                      <Title className="text-[13px] font-bold text-white uppercase tracking-wide leading-snug">
                        {item.cargo}
                      </Title>
                      <Text className="text-[11px] text-zinc-400 font-mono font-bold mt-1">
                        {item.empresa}
                      </Text>
                      <Badge className="inline-block bg-brand-500/10 text-brand-400 text-[10px] uppercase font-bold px-2 py-0.5 rounded mt-1.5 w-fit">
                        {item.periodo}
                      </Badge>
                      <Text className="text-zinc-300 text-[11px] leading-relaxed mt-2">
                        {item.descricao}
                      </Text>
                    </VStack>
                  </HStack>
                </VStack>
              ))}
            </VStack>
          )}

          {activeTab === 'conquistas' && (
            <VStack className="divide-y divide-zinc-800/40">
              {conquistas.map((item, index) => (
                <VStack key={index} className="p-4 gap-1.5">
                  <HStack className="items-start gap-2.5">
                    <Box className="w-2 h-2 rounded-full bg-brand-500 mt-1.5 flex-shrink-0" />
                    <VStack className="flex-1 min-w-0 gap-0">
                      <Title className="text-[13px] font-bold text-white uppercase tracking-wide leading-snug">
                        {item.titulo}
                      </Title>
                      <Badge className="inline-block bg-brand-500/10 text-brand-400 text-[10px] uppercase font-bold px-2 py-0.5 rounded mt-1 w-fit">
                        {item.ano}
                      </Badge>
                      <Text className="text-zinc-300 text-[11px] leading-relaxed mt-2">
                        {item.descricao}
                      </Text>
                    </VStack>
                  </HStack>
                </VStack>
              ))}
            </VStack>
          )}
        </motion.div>
      </AnimatePresence>
    </VStack>
  )
})
