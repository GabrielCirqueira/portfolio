import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { Badge } from '@/shadcn/components/ui/badge'
import { Text, Title } from '@/shadcn/components/ui/typography'
import { cn } from '@/shadcn/lib/utils'

interface SectionHeaderProps {
  badge?: string
  title: ReactNode
  subtitle?: string
  align?: 'center' | 'left'
  className?: string
}

export const SectionHeaderDesktop = ({
  badge,
  title,
  subtitle,
  align = 'center',
  className,
}: SectionHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        'mb-12 sm:mb-14 md:mb-16',
        align === 'center' ? 'text-center' : 'text-left',
        className
      )}
    >
      {badge && (
        <Badge
          variant="outline"
          className="
            mb-6 px-4 py-1.5 border-brand-500/30
            text-brand-500 uppercase tracking-widest
            text-xs font-bold bg-brand-500/5
            backdrop-blur-md shadow-[0_0_15px_var(--tw-shadow-color)]
            shadow-brand-500/10
          "
        >
          {badge}
        </Badge>
      )}
      <Title className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading uppercase tracking-wide">
        {title}
      </Title>
      {subtitle && (
        <Text className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg font-light mt-4">
          {subtitle}
        </Text>
      )}
    </motion.div>
  )
}
