import { useIsMobile } from '@/hooks/useMediaQuery'
import type { Projeto } from '@/types/projeto'
import { Desktop } from './Desktop'
import { Mobile } from './Mobile'

interface CardProjetoProps {
  projeto: Projeto
  onAbrirModal: (id: string) => void
}

export function CardProjeto(props: CardProjetoProps) {
  const isMobile = useIsMobile()
  return isMobile ? <Mobile {...props} /> : <Desktop {...props} />
}
