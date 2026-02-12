import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { Badge } from '@/shadcn/components/ui/badge'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, HStack } from '@/shadcn/components/ui/layout'
import { Text } from '@/shadcn/components/ui/typography'
import { useIsLowPerformance } from '@/utils/deviceDetection'

export interface TimelineItemData {
  title: string
  subtitle?: string
  period: string
  description: string
}

interface TimelineCardProps {
  icon: LucideIcon
  title: string
  items: TimelineItemData[]
  delay?: number
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
}

export const TimelineCardDesktop = ({ icon, title, items, delay = 0 }: TimelineCardProps) => {
  const isLowPerf = useIsLowPerformance()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="relative h-full"
    >
      <Box className="absolute inset-0 bg-gradient-to-b from-brand-500/5 to-transparent rounded-xl pointer-events-none" />
      <Box
        className={`
          border border-brand-500/20 rounded-xl p-6 sm:p-7 md:p-8
          ${isLowPerf ? 'bg-zinc-900/80' : 'bg-zinc-900/40 backdrop-blur-md'} h-full
          hover:border-brand-500/40 transition-all duration-300
          hover:shadow-[0_0_20px_var(--tw-shadow-color)]
          hover:shadow-brand-500/5
        `}
      >
        <HStack className="items-center mb-8 gap-4 border-b border-brand-500/10 pb-4">
          <Box className="p-2 bg-brand-500/10 rounded-lg">
            <Icon icon={icon} className="h-6 w-6 text-brand-500" />
          </Box>
          <Text className="text-xl font-bold font-heading uppercase text-white tracking-widest">
            {title}
          </Text>
        </HStack>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-10"
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative pl-8 border-l-2 border-brand-500/20 group"
            >
              <Box
                className="
                  absolute top-0 left-0 w-4 h-4 -translate-x-[9px]
                  translate-y-1 rounded-full bg-black border-2
                  border-brand-500 group-hover:bg-brand-500
                  group-hover:shadow-[0_0_10px_var(--tw-shadow-color)]
                  group-hover:shadow-brand-500/80 transition-all duration-300
                "
              />
              <Text className="font-bold text-white text-lg group-hover:text-brand-500 transition-colors uppercase tracking-wide leading-tight">
                {item.title}
              </Text>
              {item.subtitle && (
                <Text className="text-sm text-gray-400 font-bold font-mono mt-2 mb-1">
                  {item.subtitle}
                </Text>
              )}
              <Badge className="bg-brand-500/10 text-brand-500 border-none my-2 text-[10px] uppercase font-bold px-2 py-0.5">
                {item.period}
              </Badge>
              <Text className="text-sm text-gray-300 leading-relaxed font-light block">
                {item.description}
              </Text>
            </motion.div>
          ))}
        </motion.div>
      </Box>
    </motion.div>
  )
}
