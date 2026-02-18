import { useIsMobile } from '@/hooks/useMediaQuery'
import type { ContactItem } from '@/types/contato'
import { Desktop } from './Desktop'
import { Mobile } from './Mobile'

export type { ContactItem }

interface ContactGridProps {
  contactItems: ContactItem[]
}

export function ContactGrid(props: ContactGridProps) {
  const isMobile = useIsMobile()
  return isMobile ? <Mobile {...props} /> : <Desktop {...props} />
}
