import { motion } from 'framer-motion'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, HStack, VStack } from '@/shadcn/components/ui/layout'
import { Text, Title } from '@/shadcn/components/ui/typography'
import type { Skill } from './Desktop'

interface SkillCardProps {
  skill: Skill
  variants?: any
}

export const SkillCardMobile = ({ skill, variants }: SkillCardProps) => {
  return (
    <motion.div variants={variants} className="h-full">
      <Box
        className="
          h-full bg-zinc-900/40 border border-zinc-800/60 
          rounded-xl p-4 overflow-hidden
          active:border-brand-500/30 active:bg-zinc-900/60
          transition-colors duration-200
        "
      >
        <VStack className="gap-4 h-full">
          <HStack className="justify-between items-center">
            <Box className="p-2 rounded-lg bg-zinc-950 border border-zinc-800 text-brand-400">
              <Icon icon={skill.icon} className="w-5 h-5" />
            </Box>
            <Title className="text-sm font-bold font-heading uppercase tracking-wide text-white flex-1 text-right">
              {skill.category}
            </Title>
          </HStack>

          <Text className="text-[10px] leading-relaxed text-zinc-400 line-clamp-3">
            {skill.description}
          </Text>

          <Box className="mt-auto pt-3 border-t border-zinc-800/50 grid grid-cols-2 gap-x-2 gap-y-1.5">
            {skill.technologies.map((tech) => (
              <HStack key={tech} className="items-center gap-1.5">
                <Box className="w-1 h-1 rounded-full bg-brand-500/50" />
                <Text className="text-[10px] font-mono text-zinc-300 truncate">{tech}</Text>
              </HStack>
            ))}
          </Box>
        </VStack>
      </Box>
    </motion.div>
  )
}
