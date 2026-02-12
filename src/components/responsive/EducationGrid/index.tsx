import { useIsMobile } from '@/hooks/useMediaQuery'
import { Desktop } from './Desktop'
import { Mobile } from './Mobile'

export interface FormacaoItem {
  titulo: string
  instituicao: string
  periodo: string
  descricao: string
}

export interface ExperienciaItem {
  cargo: string
  empresa: string
  periodo: string
  descricao: string
}

export interface ConquistaItem {
  titulo: string
  descricao: string
  ano: string
  instituicao?: string
  periodo?: string
}

interface EducationGridProps {
  formacao: FormacaoItem[]
  experiencias: ExperienciaItem[]
  conquistas: ConquistaItem[]
}

export function EducationGrid(props: EducationGridProps) {
  const isMobile = useIsMobile()
  return isMobile ? <Mobile {...props} /> : <Desktop {...props} />
}
