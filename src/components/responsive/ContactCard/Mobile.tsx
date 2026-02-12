import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, VStack } from '@/shadcn/components/ui/layout'
import { Text } from '@/shadcn/components/ui/typography'

interface ContactCardProps {
  icon: LucideIcon
  label: string
  value: string
  href?: string | null
  highlight?: boolean
}

export const ContactCardMobile = ({ icon, label, value, href, highlight }: ContactCardProps) => {
  return (
    <motion.a
      href={href || undefined}
      target={href ? '_blank' : undefined}
      rel={href ? 'noopener noreferrer' : undefined}
      className={`
        flex items-center gap-3 bg-zinc-900/40 border p-3 rounded-lg
        transition-all duration-200 h-full relative overflow-hidden
        mobile-touch-feedback min-h-[72px]
        ${
          highlight
            ? 'border-brand-500/50 bg-brand-500/10'
            : 'border-zinc-800 active:border-brand-500/30 active:bg-zinc-900/60'
        }
      `}
      whileTap={{ scale: 0.98 }}
    >
      <Box
        className={`p-2 rounded-lg shrink-0 ${
          highlight
            ? 'bg-brand-500 text-black shadow-sm'
            : 'bg-zinc-950 text-brand-500 border border-zinc-800/50'
        }`}
      >
        <Icon icon={icon} className="h-5 w-5" />
      </Box>

      <VStack className="gap-0.5 min-w-0 flex-1">
        <Text className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">{label}</Text>
        <Text className="text-sm font-bold font-heading text-white truncate leading-tight">
          {value}
        </Text>
      </VStack>

      {href && (
        <Box className="w-6 h-6 flex items-center justify-center">
          <Icon icon={ArrowRight} className="h-3.5 w-3.5 text-zinc-600" />
        </Box>
      )}
    </motion.a>
  )
}
