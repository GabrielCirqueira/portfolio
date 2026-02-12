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

export const SectionHeaderMobile = ({
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
      className={cn('mb-8', align === 'center' ? 'text-center' : 'text-left', className)}
    >
      {badge && (
        <Badge
          variant="outline"
          className="
            mb-3 px-3 py-1 border-brand-500/30
            text-brand-500 uppercase tracking-widest
            text-[10px] font-bold bg-brand-500/5
            backdrop-blur-md
          "
        >
          {badge}
        </Badge>
      )}
      <Title className="text-2xl font-bold font-heading uppercase tracking-wide">{title}</Title>
      {subtitle && (
        <Text className="text-zinc-400 max-w-2xl mx-auto text-sm font-light mt-2 px-4">
          {subtitle}
        </Text>
      )}
    </motion.div>
  )
}
