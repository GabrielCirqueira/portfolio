import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { Card } from '@/shadcn/components/ui/card'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, HStack, VStack } from '@/shadcn/components/ui/layout'
import { Text } from '@/shadcn/components/ui/typography'

interface AboutInfoCardProps {
  icon: LucideIcon
  title: string
  description: string
  variants?: any
}

export const AboutInfoCardMobile = ({ icon, title, description, variants }: AboutInfoCardProps) => {
  return (
    <motion.div variants={variants} className="h-full">
      <Card
        className="
          bg-zinc-900/40 border border-zinc-800 p-4
          active:border-brand-500/30 active:bg-zinc-900/60
          transition-colors duration-200 h-full
          relative overflow-hidden
        "
      >
        <HStack className="items-start gap-3 relative z-10">
          <Box
            className="
              p-2 rounded-lg bg-zinc-950 text-brand-500
              border border-brand-500/10 mt-0.5 shrink-0
            "
          >
            <Icon icon={icon} className="h-4 w-4" />
          </Box>
          <VStack className="gap-1 min-w-0">
            <Text className="font-bold text-white uppercase font-heading tracking-wide text-xs">
              {title}
            </Text>
            <Text className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
              {description}
            </Text>
          </VStack>
        </HStack>
      </Card>
    </motion.div>
  )
}
