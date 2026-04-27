import type { ReactNode } from 'react'

interface TechTagProps {
  children: ReactNode
  variant?: 'emerald' | 'purple' | 'neutral'
}

export function TechTag({ children, variant = 'neutral' }: TechTagProps) {
  const variants = {
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:border-emerald-500/40',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20 hover:border-purple-500/40',
    neutral: 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700',
  }

  return (
    <span
      className={`
        px-3 py-1 rounded-md text-xs font-medium border transition-colors cursor-default
        ${variants[variant]}
      `}
    >
      {children}
    </span>
  )
}
