import { useIsMobile } from '@/hooks/useMediaQuery'
import type { ConquistaItem, ExperienciaItem, FormacaoItem } from '@/types/educacao'
import { Desktop } from './Desktop'
import { Mobile } from './Mobile'

export type { FormacaoItem, ExperienciaItem, ConquistaItem }

interface EducationGridProps {
  formacao: FormacaoItem[]
  experiencias: ExperienciaItem[]
  conquistas: ConquistaItem[]
}

export function EducationGrid(props: EducationGridProps) {
  const isMobile = useIsMobile()
  return isMobile ? <Mobile {...props} /> : <Desktop {...props} />
}
