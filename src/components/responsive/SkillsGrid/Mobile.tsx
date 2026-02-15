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
    <VStack className="gap-3 w-full px-2">
      {skills.map((skill, index) => {
        const isOpen = openIndex === index

        return (
          <motion.div
            key={skill.category}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="w-full"
          >
            <Button
              variant="ghost"
              onClick={() => toggle(index)}
              className={`
                w-full h-auto flex items-center gap-4 px-5 py-4
                bg-zinc-900/60 backdrop-blur-sm border rounded-2xl
                transition-all duration-200 shadow-lg
                active:scale-[0.98]
                ${
                  isOpen
                    ? 'border-brand-500/40 bg-zinc-900/90 rounded-b-none shadow-brand-500/10'
                    : 'border-zinc-800 active:bg-zinc-800/60'
                }
              `}
            >
              <Box
                className={`
                p-3 rounded-xl border transition-all duration-200
                ${
                  isOpen
                    ? 'bg-gradient-to-br from-brand-500 to-brand-600 border-brand-500 text-black shadow-lg shadow-brand-500/20'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                }
              `}
              >
                <Icon icon={skill.icon} className="w-5 h-5" />
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

              <Badge className="bg-zinc-950 text-zinc-400 border border-zinc-800 px-2 py-1 text-xs font-mono rounded-lg">
                {skill.technologies.length}
              </Badge>

              <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <Icon
                  icon={ChevronDown}
                  className={`w-5 h-5 transition-colors ${isOpen ? 'text-brand-400' : 'text-zinc-600'}`}
                />
              </motion.div>
            </Button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <VStack className="px-5 pb-5 pt-4 bg-zinc-900/60 backdrop-blur-sm border border-t-0 border-zinc-800 rounded-b-2xl gap-4 shadow-lg">
                    <Text className="text-zinc-400 text-xs leading-relaxed">
                      {skill.description}
                    </Text>

                    <Flex className="flex-wrap gap-2">
                      {skill.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          className="
                            flex items-center gap-2 bg-zinc-950 border border-zinc-800
                            text-zinc-300 px-3 py-1.5 text-xs font-mono rounded-xl
                            active:border-brand-500/30 active:bg-zinc-900
                            transition-all duration-150
                          "
                        >
                          <Box className="w-1.5 h-1.5 rounded-full bg-brand-500" />
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
