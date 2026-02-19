import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink, Sparkles } from 'lucide-react'
import { memo } from 'react'
import { Badge } from '@/shadcn/components/ui/badge'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, Grid, HStack, VStack } from '@/shadcn/components/ui/layout'
import { Text } from '@/shadcn/components/ui/typography'
import type { ContactItem } from '@/types/contato'

interface ContactGridProps {
  contactItems: ContactItem[]
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as const,
      opacity: { duration: 0.3 },
    },
  },
}

export const Desktop = memo(({ contactItems }: ContactGridProps) => (
  <motion.div
    variants={container}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: '-50px' }}
  >
    <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
      {contactItems.map((contact, index) => (
        <motion.div key={index} variants={item} className="h-full">
          <motion.a
            href={contact.href || undefined}
            target={contact.href ? '_blank' : undefined}
            rel={contact.href ? 'noopener noreferrer' : undefined}
            aria-label={`${contact.label}: ${contact.value}`}
            className={`group block relative h-full rounded-xl transition-all duration-300 ${
              contact.highlight
                ? 'bg-zinc-950 border border-brand-500/50 shadow-lg shadow-brand-500/20'
                : 'bg-zinc-950 border border-zinc-800 hover:border-brand-500/40'
            } overflow-hidden`}
            whileHover={{ y: -6, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <Box className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />

            <Box
              className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                contact.highlight
                  ? 'bg-brand-500/5'
                  : 'bg-gradient-to-br from-brand-500/[0.03] to-transparent'
              }`}
            />

            <Box className="relative z-10 p-5 md:p-6 h-full flex flex-col">
              <HStack className="items-start justify-between gap-4 mb-4">
                <Box
                  className={`p-3 rounded-xl shrink-0 transition-all duration-300 ${
                    contact.highlight
                      ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/40 group-hover:shadow-xl group-hover:shadow-brand-500/50 group-hover:scale-105'
                      : 'bg-zinc-900 text-brand-400 border border-zinc-800 group-hover:bg-brand-500 group-hover:text-white group-hover:border-brand-500 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-brand-500/30'
                  }`}
                >
                  <Icon icon={contact.icon} className="h-6 w-6" />
                </Box>

                {contact.href && (
                  <Box className="p-2 rounded-lg bg-zinc-900/50 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-brand-500/20">
                    <Icon
                      icon={ArrowRight}
                      className="h-4 w-4 text-zinc-500 group-hover:text-brand-400 group-hover:-rotate-45 transition-all duration-300"
                    />
                  </Box>
                )}
              </HStack>

              <VStack className="gap-2 flex-1">
                <Text className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-brand-400 transition-colors duration-300">
                  {contact.label}
                </Text>
                <Text className="text-base md:text-lg font-bold font-heading text-white group-hover:text-brand-50 transition-colors duration-300 leading-snug break-words">
                  {contact.value}
                </Text>

                {contact.description && (
                  <Text className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300 mt-1 leading-relaxed">
                    {contact.description}
                  </Text>
                )}

                {contact.responseTime && (
                  <HStack className="items-center gap-2 mt-2 text-xs text-brand-400/80 group-hover:text-brand-400 transition-colors duration-300">
                    <Box className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
                    <Text className="font-medium">{contact.responseTime}</Text>
                  </HStack>
                )}
              </VStack>

              {contact.highlight && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-4 pt-4 border-t border-brand-500/20"
                >
                  <HStack className="items-center justify-between gap-2">
                    <HStack className="items-center gap-2 text-brand-400 flex-1">
                      <Icon icon={Sparkles} className="h-3 w-3" />
                      <Text className="text-xs font-semibold uppercase tracking-wider">
                        Preferencial
                      </Text>
                    </HStack>
                    <Badge className="bg-brand-500/20 text-brand-400 border border-brand-500/30 hover:bg-brand-500/30 text-[10px] font-bold px-2 py-0.5 transition-colors">
                      Urgente
                    </Badge>
                  </HStack>
                </motion.div>
              )}
            </Box>
          </motion.a>
        </motion.div>
      ))}

      <motion.div variants={item} className="h-full">
        <motion.a
          href="https://linktr.ee/gabrielCirqueira"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ver todos os links no Linktree"
          className="
            group block relative h-full
            bg-zinc-950 border border-zinc-800 hover:border-brand-500
            rounded-xl transition-all duration-300
            overflow-hidden
          "
          whileHover={{ y: -6, scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <Box className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />
          <Box className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-brand-500/[0.03] via-transparent to-blue-500/[0.03]" />

          <Box className="relative z-10 p-5 md:p-6 h-full flex flex-col justify-between">
            <HStack className="items-start justify-between gap-4">
              <Box className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-brand-400 group-hover:bg-brand-500 group-hover:text-white group-hover:border-brand-500 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-brand-500/30 shrink-0">
                <Icon icon={ExternalLink} className="h-6 w-6" />
              </Box>

              <Badge className="bg-brand-500 text-white hover:bg-brand-400 font-bold text-[10px] uppercase tracking-widest px-3 py-1.5 shadow-lg shadow-brand-500/40 group-hover:shadow-xl group-hover:shadow-brand-500/60 transition-all duration-300">
                Ver Todos
              </Badge>
            </HStack>

            <VStack className="gap-2 mt-4">
              <Text className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-brand-400 transition-colors duration-300">
                Mais Links
              </Text>
              <Text className="text-xl font-bold font-heading text-white uppercase tracking-wide group-hover:text-brand-50 transition-colors duration-300">
                Linktree
              </Text>
              <Text className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300 mt-1">
                Todos os meus links em um só lugar
              </Text>
            </VStack>
          </Box>
        </motion.a>
      </motion.div>
    </Grid>
  </motion.div>
))
