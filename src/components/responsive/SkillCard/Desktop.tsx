import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, HStack, VStack } from '@/shadcn/components/ui/layout'
import { Text, Title } from '@/shadcn/components/ui/typography'

export interface Skill {
  category: string
  description: string
  icon: LucideIcon
  technologies: string[]
}

interface SkillCardProps {
  skill: Skill
  variants?: any
}

export const SkillCardDesktop = ({ skill, variants }: SkillCardProps) => {
  return (
    <motion.div variants={variants} className="h-full">
      <Box
        className="
          group relative h-full bg-zinc-900/40 border border-zinc-800/60 
          rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 overflow-hidden hover:border-brand-500/30
          transition-all duration-300 hover:-translate-y-1
          hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]
          hover:shadow-brand-500/5
        "
      >
        <Box
          className="
            absolute inset-0 bg-brand-500/5 opacity-0 
            group-hover:opacity-100 transition-opacity duration-500
          "
        />

        <VStack className="gap-6 relative z-10 h-full">
          <HStack className="justify-between items-start">
            <Box
              className="
                p-2 sm:p-2.5 md:p-3 rounded-lg bg-zinc-950 border border-zinc-800
                group-hover:border-brand-500/30 group-hover:text-brand-400
                text-zinc-400 transition-colors duration-300
              "
            >
              <Icon icon={skill.icon} className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </Box>
            <Box
              className="
                w-12 h-12 bg-brand-500/10 rounded-full blur-2xl
                absolute -top-2 -right-2 opacity-0 group-hover:opacity-100
                transition-opacity duration-500
              "
            />
          </HStack>

          <VStack className="gap-2">
            <Title className="text-xs sm:text-sm md:text-base lg:text-lg font-bold font-heading uppercase tracking-wide text-white">
              {skill.category}
            </Title>
            <Text className="text-[10px] sm:text-xs leading-relaxed min-h-[30px] sm:min-h-[36px] md:min-h-[40px]">
              {skill.description}
            </Text>
          </VStack>

          <VStack className="gap-2 mt-auto pt-4 border-t border-zinc-800/50 group-hover:border-brand-500/10 transition-colors">
            {skill.technologies.map((tech) => (
              <HStack key={tech} className="items-center gap-2 group/item">
                <Box className="w-1 h-1 rounded-full bg-brand-500/50 group-hover/item:bg-brand-400 transition-colors" />
                <Text className="text-sm font-mono text-zinc-300 group-hover/item:text-white transition-colors">
                  {tech}
                </Text>
              </HStack>
            ))}
          </VStack>
        </VStack>
      </Box>
    </motion.div>
  )
}
