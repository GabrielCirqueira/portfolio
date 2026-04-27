import { motion } from 'framer-motion'
import { memo } from 'react'
import { useAnimation } from '@/contexts'

interface SectionHeaderProps {
  number: string
  title: string
  subtitle?: string
}

export const SectionHeader = memo(({ number, title, subtitle }: SectionHeaderProps) => {
  const { fadeUp, reducedMotion } = useAnimation()

  return (
    <motion.div
      variants={reducedMotion ? {} : fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="space-y-4"
    >
      <div className="flex items-center gap-4 group">
        <span className="font-chakra text-brand-500 font-bold text-lg tracking-tighter">
          {number}.
        </span>
        <h2 className="font-chakra text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter group-hover:text-brand-400 transition-colors">
          {title}
        </h2>
        <div className="flex-1 h-px bg-zinc-800 hidden sm:block relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-brand-500/30"
            initial={{ x: '-100%' }}
            whileInView={{ x: '0%' }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
      </div>
      {subtitle && (
        <p className="text-zinc-500 text-base md:text-lg leading-relaxed max-w-2xl font-medium">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
})

SectionHeader.displayName = 'SectionHeader'
