import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { Card } from '@/shadcn/components/ui/card'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, HStack, VStack } from '@/shadcn/components/ui/layout'
import { Text } from '@/shadcn/components/ui/typography'
import { useIsLowPerformance } from '@/utils/deviceDetection'

interface AboutInfoCardProps {
  icon: LucideIcon
  title: string
  description: string
  variants?: any
}

export const AboutInfoCardDesktop = ({
  icon,
  title,
  description,
  variants,
}: AboutInfoCardProps) => {
  const isLowPerf = useIsLowPerformance()

  return (
    <motion.div variants={variants} className="h-full">
      <Card
        className={`
          ${isLowPerf ? 'bg-zinc-900/80' : 'bg-zinc-900/40 backdrop-blur-sm'} border border-zinc-800 p-5 sm:p-6
          hover:border-brand-500/30 transition-all
          duration-300 group h-full
          hover:shadow-[0_0_20px_var(--tw-shadow-color)]
          hover:shadow-brand-500/10 hover:-translate-y-1
          relative overflow-hidden
        `}
      >
        <Box className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <HStack className="items-start gap-4 relative z-10">
          <Box
            className="
              p-3 rounded-lg bg-zinc-950 text-brand-500
              border border-brand-500/10 mt-1 shrink-0
              group-hover:bg-brand-500 group-hover:text-black
              transition-all duration-300 shadow-sm
            "
          >
            <Icon icon={icon} className="h-5 w-5" />
          </Box>
          <VStack className="gap-2">
            <Text className="font-bold text-white uppercase font-heading tracking-wide text-sm group-hover:text-brand-400 transition-colors">
              {title}
            </Text>
            <Text className="text-sm text-zinc-500 group-hover:text-zinc-300 transition-colors leading-relaxed">
              {description}
            </Text>
          </VStack>
        </HStack>
      </Card>
    </motion.div>
  )
}
