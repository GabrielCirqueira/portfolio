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

export const ContactCardDesktop = ({ icon, label, value, href, highlight }: ContactCardProps) => {
  return (
    <motion.a
      href={href || undefined}
      target={href ? '_blank' : undefined}
      rel={href ? 'noopener noreferrer' : undefined}
      className={`group flex items-center gap-3 sm:gap-4 md:gap-5 bg-zinc-900/40 border border-zinc-800 p-3 sm:p-4 md:p-5 lg:p-6 rounded-xl transition-all duration-300 h-full backdrop-blur-sm relative overflow-hidden ${
        highlight
          ? 'border-brand-500/50 bg-brand-500/10 shadow-[0_0_30px_var(--tw-shadow-color)] shadow-brand-500/15'
          : 'hover:border-brand-500/40 hover:bg-zinc-900/60 hover:shadow-[0_0_20px_var(--tw-shadow-color)] hover:shadow-brand-500/10'
      }`}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out pointer-events-none" />

      <Box
        className={`p-3.5 rounded-xl shrink-0 ${
          highlight
            ? 'bg-brand-500 text-black shadow-[0_0_15px_var(--tw-shadow-color)] shadow-brand-500/40'
            : 'bg-zinc-950 text-brand-500 border border-zinc-800/50 group-hover:border-brand-500/50 group-hover:text-brand-400 group-hover:scale-110 transition-all duration-300'
        }`}
      >
        <Icon icon={icon} className="h-6 w-6" />
      </Box>

      <VStack className="gap-1 min-w-0 flex-1 relative z-10">
        <Text className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 group-hover:text-brand-500 transition-colors">
          {label}
        </Text>
        <Text className="text-sm md:text-base font-bold font-heading text-white truncate group-hover:text-brand-100 transition-colors">
          {value}
        </Text>
      </VStack>

      {href && (
        <Box className="relative z-10 w-8 h-8 flex items-center justify-center rounded-full bg-transparent group-hover:bg-brand-500/10 transition-colors">
          <Icon
            icon={ArrowRight}
            className="h-4 w-4 text-zinc-600 group-hover:text-brand-500 group-hover:-rotate-45 transition-all duration-300"
          />
        </Box>
      )}
    </motion.a>
  )
}
