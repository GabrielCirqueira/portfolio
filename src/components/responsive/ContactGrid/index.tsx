import { memo } from 'react'
import { useIsMobile } from '@/hooks/useMediaQuery'
import type { ContactItem } from '@/types/contato'
import { Desktop } from './Desktop'
import { Mobile } from './Mobile'

export type { ContactItem }

interface ContactGridProps {
  contactItems: ContactItem[]
}

export const ContactGrid = memo(function ContactGrid({ contactItems }: ContactGridProps) {
  const isMobile = useIsMobile()

  return isMobile ? <Mobile contactItems={contactItems} /> : <Desktop contactItems={contactItems} />
})
