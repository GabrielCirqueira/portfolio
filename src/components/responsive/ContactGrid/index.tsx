import type { LucideIcon } from 'lucide-react'
import { useIsMobile } from '@/hooks/useMediaQuery'
import { Desktop } from './Desktop'
import { Mobile } from './Mobile'

export interface ContactItem {
  icon: LucideIcon
  label: string
  value: string
  href: string | null
  highlight?: boolean
}

interface ContactGridProps {
  contactItems: ContactItem[]
}

export function ContactGrid(props: ContactGridProps) {
  const isMobile = useIsMobile()
  return isMobile ? <Mobile {...props} /> : <Desktop {...props} />
}
