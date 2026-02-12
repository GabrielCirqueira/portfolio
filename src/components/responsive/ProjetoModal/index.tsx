import { useIsMobile } from '@/hooks/useMediaQuery'
import type { Projeto } from '@/types/projeto'
import { Desktop } from './Desktop'
import { Mobile } from './Mobile'

interface ProjetoModalProps {
  isOpen: boolean
  onClose: () => void
  projeto: Projeto
}

export function ProjetoModal(props: ProjetoModalProps) {
  const isMobile = useIsMobile()
  return isMobile ? <Mobile {...props} /> : <Desktop {...props} />
}
