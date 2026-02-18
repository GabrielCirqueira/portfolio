import type { LucideIcon } from 'lucide-react'
import type React from 'react'

export interface SkillCategory {
  category: string
  description: string
  icon: LucideIcon
  technologies: string[]
}

export interface TechIcon {
  Icon: React.ComponentType<{ size?: number | string; color?: string; className?: string }>
  name: string
  color: string
  description: string
}
