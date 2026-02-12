import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { Badge } from '@/shadcn/components/ui/badge'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, HStack } from '@/shadcn/components/ui/layout'
import { Text } from '@/shadcn/components/ui/typography'
import type { TimelineItemData } from './Desktop'

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
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
}

export const TimelineCardMobile = ({ icon, title, items, delay = 0 }: TimelineCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="relative h-full"
    >
      <Box
        className="
          border border-brand-500/20 rounded-xl p-4
          bg-zinc-900/40 h-full
        "
      >
        <HStack className="items-center mb-6 gap-3 border-b border-brand-500/10 pb-3">
          <Box className="p-1.5 bg-brand-500/10 rounded-lg">
            <Icon icon={icon} className="h-5 w-5 text-brand-500" />
          </Box>
          <Text className="text-lg font-bold font-heading uppercase text-white tracking-widest">
            {title}
          </Text>
        </HStack>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-6"
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative pl-4 border-l border-brand-500/20"
            >
              <Box
                className="
                  absolute top-0 left-0 w-2.5 h-2.5 -translate-x-[5.5px]
                  translate-y-1.5 rounded-full bg-black border
                  border-brand-500
                "
              />
              <Text className="font-bold text-white text-base uppercase tracking-wide leading-tight">
                {item.title}
              </Text>
              {item.subtitle && (
                <Text className="text-xs text-gray-400 font-bold font-mono mt-1 mb-1">
                  {item.subtitle}
                </Text>
              )}
              <Badge className="bg-brand-500/10 text-brand-500 border-none my-1.5 text-[9px] uppercase font-bold px-1.5 py-0.5">
                {item.period}
              </Badge>
              <Text className="text-xs text-gray-300 leading-relaxed font-light block">
                {item.description}
              </Text>
            </motion.div>
          ))}
        </motion.div>
      </Box>
    </motion.div>
  )
}
