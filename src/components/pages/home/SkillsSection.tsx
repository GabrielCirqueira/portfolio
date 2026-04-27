import { motion } from 'framer-motion'
import { Monitor, Server, Wrench } from 'lucide-react'
import { memo } from 'react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { TechTag } from '@/components/ui/TechTag'
import { skillCategories } from '@/data/skills'
import { Box, Container } from '@/shadcn/components/ui/layout'

const icons = { Monitor, Server, Wrench }

export const SkillsSection = memo(() => {
  return (
    <Box as="section" id="habilidades" className="py-24 relative bg-black overflow-hidden">
      <Box className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-brand-500/5 via-transparent to-transparent pointer-events-none" />

      <Container size="xl" className="relative z-10 px-6">
        <SectionHeader number="03" title="Habilidades" />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {skillCategories.map((category, i) => {
            const Icon = icons[category.icon as keyof typeof icons]
            const iconColor = {
              emerald: 'text-brand-400',
              purple: 'text-purple-400',
              neutral: 'text-zinc-500',
            }[category.variant]

            const borderColor = {
              emerald: 'group-hover:border-brand-500/40',
              purple: 'group-hover:border-purple-500/40',
              neutral: 'group-hover:border-zinc-500/40',
            }[category.variant]

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`group border border-zinc-800 bg-zinc-900/30 rounded-2xl p-6 sm:p-8 
                           ${borderColor} transition-all duration-300 relative overflow-hidden`}
              >
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${category.variant === 'emerald' ? 'from-brand-500/5' : category.variant === 'purple' ? 'from-purple-500/5' : 'from-zinc-500/5'} to-transparent`}
                />

                <Box
                  className={`mb-6 p-3 rounded-xl bg-zinc-950 border border-zinc-800 group-hover:border-current transition-colors w-fit ${iconColor}`}
                >
                  <Icon className="w-6 h-6" />
                </Box>

                <h3 className="text-white font-bold text-xl mb-2 font-heading uppercase tracking-wide">
                  {category.title}
                </h3>

                <p className="text-zinc-400 text-sm md:text-base mb-8 leading-relaxed">
                  {category.description}
                </p>

                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill) => (
                    <TechTag key={skill} variant={category.variant}>
                      {skill}
                    </TechTag>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </Box>
  )
})

SkillsSection.displayName = 'SkillsSection'
