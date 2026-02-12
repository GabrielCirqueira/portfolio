import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink, type LucideIcon } from 'lucide-react'
import { memo } from 'react'
import { Badge } from '@/shadcn/components/ui/badge'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, HStack, VStack } from '@/shadcn/components/ui/layout'
import { Link } from '@/shadcn/components/ui/link'
import { Text, Title } from '@/shadcn/components/ui/typography'

export interface ContactItem {
  icon: LucideIcon
  label: string
  value: string
  href: string | null
  highlight?: boolean
}

interface ContactGridProps {
  contactItems: ContactItem[]
}

export const Mobile = memo(({ contactItems }: ContactGridProps) => (
  <VStack className="gap-2 w-full">
    {contactItems.map((contact, index) => {
      const isHighlight = contact.highlight

      return (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2, delay: index * 0.04 }}
          className="w-full"
        >
          {contact.href ? (
            <Link
              href={contact.href}
              external
              className={`
                flex items-center gap-3 w-full px-4 py-3.5
                rounded-xl border transition-colors duration-150 no-underline
                ${
                  isHighlight
                    ? 'bg-brand-500/10 border-brand-500/40 active:bg-brand-500/20'
                    : 'bg-zinc-900/50 border-zinc-800/60 active:bg-zinc-800/60'
                }
              `}
            >
              <Box
                className={`
                p-2.5 rounded-xl flex-shrink-0
                ${
                  isHighlight
                    ? 'bg-brand-500 text-black shadow-sm shadow-brand-500/30'
                    : 'bg-zinc-950 text-brand-500 border border-zinc-800'
                }
              `}
              >
                <Icon icon={contact.icon} className="w-5 h-5" />
              </Box>

              <VStack className="flex-1 min-w-0 gap-0">
                <Text className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                  {contact.label}
                </Text>
                <Text className="text-[13px] font-bold font-heading text-white truncate mt-0.5">
                  {contact.value}
                </Text>
              </VStack>

              <Icon icon={ArrowRight} className="w-4 h-4 text-zinc-500 flex-shrink-0 -rotate-45" />
            </Link>
          ) : (
            <HStack
              className="
                items-center gap-3 w-full px-4 py-3.5
                rounded-xl border bg-zinc-900/50 border-zinc-800/60
              "
            >
              <Box className="p-2.5 rounded-xl bg-zinc-950 text-brand-500 border border-zinc-800 flex-shrink-0">
                <Icon icon={contact.icon} className="w-5 h-5" />
              </Box>
              <VStack className="flex-1 min-w-0 gap-0">
                <Text className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                  {contact.label}
                </Text>
                <Text className="text-[13px] font-bold font-heading text-white mt-0.5">
                  {contact.value}
                </Text>
              </VStack>
            </HStack>
          )}
        </motion.div>
      )
    })}

    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.2, delay: contactItems.length * 0.04 }}
      className="w-full"
    >
      <Link
        href="https://linktr.ee/gabrielCirqueira"
        external
        className="
          flex items-center justify-between gap-3 w-full px-4 py-3.5
          rounded-xl border border-zinc-800/60 bg-zinc-900/50
          active:bg-brand-500/10 active:border-brand-500/30 transition-colors no-underline
        "
      >
        <HStack className="items-center gap-3">
          <Box className="p-2.5 rounded-xl bg-zinc-950 text-brand-500 border border-zinc-800 flex-shrink-0">
            <Icon icon={ExternalLink} className="w-5 h-5" />
          </Box>
          <VStack className="gap-0">
            <Text className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
              Mais Links
            </Text>
            <Title className="text-[13px] font-bold font-heading text-white uppercase tracking-wide mt-0.5">
              Linktree
            </Title>
          </VStack>
        </HStack>

        <Badge className="bg-brand-500 text-black font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-sm shadow-brand-500/20">
          Abrir
        </Badge>
      </Link>
    </motion.div>
  </VStack>
))
