import type { LucideIcon } from 'lucide-react'
import { useIsMobile } from '@/hooks/useMediaQuery'
import { Desktop } from './Desktop'
import { Mobile } from './Mobile'

export interface SkillCategory {
  category: string
  description: string
  icon: LucideIcon
  technologies: string[]
}

interface SkillsGridProps {
  skills: SkillCategory[]
}

export function SkillsGrid(props: SkillsGridProps) {
  const isMobile = useIsMobile()
  return isMobile ? <Mobile {...props} /> : <Desktop {...props} />
}
