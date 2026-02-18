import { useIsMobile } from '@/hooks/useMediaQuery'
import type { SkillCategory } from '@/types/habilidades'
import { Desktop } from './Desktop'
import { Mobile } from './Mobile'

export type { SkillCategory }

interface SkillsGridProps {
  skills: SkillCategory[]
}

export function SkillsGrid(props: SkillsGridProps) {
  const isMobile = useIsMobile()
  return isMobile ? <Mobile {...props} /> : <Desktop {...props} />
}
