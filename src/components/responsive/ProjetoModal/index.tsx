import type { Projeto } from '@/types/projeto'
import { useIsMobile } from '@/utils/deviceDetection'
import { ProjetoModalDesktop } from './Desktop'
import { ProjetoModalMobile } from './Mobile'

interface ProjetoModalProps {
  isOpen: boolean
  onClose: () => void
  projeto: Projeto
}

export function ProjetoModal(props: ProjetoModalProps) {
  const isMobile = useIsMobile()

  return isMobile ? <ProjetoModalMobile {...props} /> : <ProjetoModalDesktop {...props} />
}
