import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink, Sparkles } from 'lucide-react'
import { memo } from 'react'
import { useAnimacaoOtimizada } from '@/hooks/useAnimacaoOtimizada'
import { Badge } from '@/shadcn/components/ui/badge'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, HStack, VStack } from '@/shadcn/components/ui/layout'
import { Link } from '@/shadcn/components/ui/link'
import { Text } from '@/shadcn/components/ui/typography'
import type { ContactItem } from '@/types/contato'

interface ContactGridProps {
  contactItems: ContactItem[]
}

export const Mobile = memo(({ contactItems }: ContactGridProps) => {
  const { ehDispositivoLento } = useAnimacaoOtimizada()

  return (
    <VStack className="gap-3 w-full">
      {contactItems.map((contact, index) => {
        const isHighlight = contact.highlight

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px', amount: 0.3 }}
            transition={{
              duration: ehDispositivoLento ? 0.2 : 0.4,
              delay: ehDispositivoLento ? 0 : index * 0.05,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="w-full"
          >
            {contact.href ? (
              <Link
                href={contact.href}
                external
                aria-label={`${contact.label}: ${contact.value}`}
                className={`
                  block w-full rounded-2xl border backdrop-blur-sm
                  transition-all duration-200 no-underline
                  active:scale-[0.98] relative overflow-hidden
                  ${
                    isHighlight
                      ? 'bg-gradient-to-br from-brand-500/15 via-brand-500/10 to-transparent border-brand-500/50 active:border-brand-500/70'
                      : 'bg-zinc-900/50 border-zinc-800/80 active:bg-zinc-800/70 active:border-brand-500/30'
                  }
                `}
              >
                {/* Efeito de brilho */}
                <Box
                  className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent ${isHighlight ? 'opacity-50' : 'opacity-30'}`}
                />

                <Box className="relative z-10 p-4 flex items-center gap-3.5">
                  <Box
                    className={`
                      p-3 rounded-xl flex-shrink-0 transition-all duration-200
                      ${
                        isHighlight
                          ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/40'
                          : 'bg-zinc-950/80 text-brand-400 border border-zinc-800'
                      }
                    `}
                  >
                    <Icon icon={contact.icon} className="w-5 h-5" />
                  </Box>

                  <VStack className="flex-1 min-w-0 gap-1">
                    <Text className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                      {contact.label}
                    </Text>
                    <Text className="text-sm font-bold font-heading text-white truncate">
                      {contact.value}
                    </Text>
                    {isHighlight && (
                      <HStack className="items-center gap-1.5 text-brand-400 mt-0.5">
                        <Icon icon={Sparkles} className="h-2.5 w-2.5" />
                        <Text className="text-[9px] font-semibold uppercase tracking-wider">
                          Preferencial
                        </Text>
                      </HStack>
                    )}
                  </VStack>

                  <Box
                    className={`p-2 rounded-lg transition-all duration-200 ${isHighlight ? 'bg-brand-500/20' : 'bg-zinc-950/40'}`}
                  >
                    <Icon
                      icon={ArrowRight}
                      className={`w-4 h-4 -rotate-45 ${isHighlight ? 'text-brand-400' : 'text-zinc-500'}`}
                    />
                  </Box>
                </Box>
              </Link>
            ) : (
              <Box
                className="
                  w-full rounded-2xl border bg-zinc-900/50 
                  border-zinc-800/80 backdrop-blur-sm
                  relative overflow-hidden
                "
              >
                <Box className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-30" />

                <Box className="relative z-10 p-4 flex items-center gap-3.5">
                  <Box className="p-3 rounded-xl bg-zinc-950/80 text-brand-400 border border-zinc-800 flex-shrink-0">
                    <Icon icon={contact.icon} className="w-5 h-5" />
                  </Box>

                  <VStack className="flex-1 min-w-0 gap-1">
                    <Text className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                      {contact.label}
                    </Text>
                    <Text className="text-sm font-bold font-heading text-white">
                      {contact.value}
                    </Text>
                  </VStack>
                </Box>
              </Box>
            )}
          </motion.div>
        )
      })}

      {/* Card Linktree */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{
          duration: ehDispositivoLento ? 0.2 : 0.4,
          delay: ehDispositivoLento ? 0 : contactItems.length * 0.05,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className="w-full"
      >
        <Link
          href="https://linktr.ee/gabrielCirqueira"
          external
          aria-label="Ver todos os links no Linktree"
          className="
            block w-full rounded-2xl border border-zinc-800/80
            bg-gradient-to-br from-zinc-900/60 via-zinc-900/40 to-zinc-950/60
            backdrop-blur-sm transition-all duration-200
            active:scale-[0.98] active:border-brand-500/30
            no-underline relative overflow-hidden
          "
        >
          <Box className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-30" />
          <Box className="absolute inset-0 bg-gradient-to-br from-brand-500/[0.03] via-transparent to-blue-500/[0.03]" />

          <Box className="relative z-10 p-4">
            <HStack className="items-center justify-between gap-3 mb-3">
              <Box className="p-3 rounded-xl bg-zinc-950/80 text-brand-400 border border-zinc-800 flex-shrink-0">
                <Icon icon={ExternalLink} className="w-5 h-5" />
              </Box>

              <Badge className="bg-brand-500 text-white font-bold text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-lg shadow-brand-500/40">
                Ver Todos
              </Badge>
            </HStack>

            <VStack className="gap-1">
              <Text className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Mais Links
              </Text>
              <Text className="text-base font-bold font-heading text-white uppercase tracking-wide">
                Linktree
              </Text>
              <Text className="text-xs text-zinc-500 mt-0.5">
                Todos os meus links em um só lugar
              </Text>
            </VStack>
          </Box>
        </Link>
      </motion.div>
    </VStack>
  )
})
