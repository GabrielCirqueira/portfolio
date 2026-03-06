import { createPortal } from 'react-dom'
import { useIsMobile } from '@/hooks/useMediaQuery'
import type { Projeto } from '@/types/projeto'
import { Desktop } from './Desktop'
import { Mobile } from './Mobile'

interface ProjetoModalProps {
  isOpen: boolean
  onClose: () => void
  projeto: Projeto | undefined
}

export function ProjetoModal(props: ProjetoModalProps) {
  const isMobile = useIsMobile()

  if (!props.projeto) return null

  const modalContent = isMobile ? (
    <Mobile {...(props as { isOpen: boolean; onClose: () => void; projeto: Projeto })} />
  ) : (
    <Desktop {...(props as { isOpen: boolean; onClose: () => void; projeto: Projeto })} />
  )

  return createPortal(modalContent, document.body)
}
