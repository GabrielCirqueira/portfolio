import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, type LucideIcon } from 'lucide-react'
import { memo, useState } from 'react'
import { Badge } from '@/shadcn/components/ui/badge'
import { Button } from '@/shadcn/components/ui/button'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, Flex, VStack } from '@/shadcn/components/ui/layout'
import { Span, Text } from '@/shadcn/components/ui/typography'

export interface SkillCategory {
  category: string
  description: string
  icon: LucideIcon
  technologies: string[]
}

interface SkillsGridProps {
  skills: SkillCategory[]
}

export const Mobile = memo(({ skills }: SkillsGridProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <VStack className="gap-2 w-full">
      {skills.map((skill, index) => {
        const isOpen = openIndex === index

        return (
          <motion.div
            key={skill.category}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, delay: index * 0.05 }}
            className="w-full"
          >
            <Button
              variant="ghost"
              onClick={() => toggle(index)}
              className={`
                w-full h-auto flex items-center gap-3 px-4 py-3.5
                bg-zinc-900/60 border rounded-xl
                transition-all duration-200
                ${
                  isOpen
                    ? 'border-brand-500/30 bg-zinc-900/80 rounded-b-none'
                    : 'border-zinc-800/60 active:bg-zinc-800/50'
                }
              `}
            >
              <Box
                className={`
                p-2 rounded-lg border transition-colors duration-200
                ${
                  isOpen
                    ? 'bg-brand-500 border-brand-500 text-black'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                }
              `}
              >
                <Icon icon={skill.icon} className="w-4 h-4" />
              </Box>

              <Span
                className={`
                flex-1 text-left text-sm font-bold font-heading uppercase tracking-wide
                transition-colors duration-200
                ${isOpen ? 'text-brand-400' : 'text-white'}
              `}
              >
                {skill.category}
              </Span>

              <Span className="text-[10px] text-zinc-500 font-mono mr-1">
                {skill.technologies.length}
              </Span>

              <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <Icon
                  icon={ChevronDown}
                  className={`w-4 h-4 transition-colors ${isOpen ? 'text-brand-400' : 'text-zinc-600'}`}
                />
              </motion.div>
            </Button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <VStack className="px-4 pb-4 pt-3 bg-zinc-900/40 border border-t-0 border-zinc-800/40 rounded-b-xl gap-3">
                    <Text className="text-zinc-400 text-[11px] leading-relaxed">
                      {skill.description}
                    </Text>

                    <Flex className="flex-wrap gap-1.5">
                      {skill.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          className="
                            flex items-center gap-1.5 bg-zinc-950 border border-zinc-800
                            text-zinc-300 px-2.5 py-1 text-[11px] font-mono rounded-lg
                          "
                        >
                          <Box className="w-1 h-1 rounded-full bg-brand-500/60" />
                          {tech}
                        </Badge>
                      ))}
                    </Flex>
                  </VStack>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </VStack>
  )
})
