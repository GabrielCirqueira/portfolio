import type { LucideIcon } from 'lucide-react'
import { useIsMobile } from '@/utils/deviceDetection'
import { ContactCardDesktop } from './Desktop'
import { ContactCardMobile } from './Mobile'

interface ContactCardProps {
  icon: LucideIcon
  label: string
  value: string
  href?: string | null
  highlight?: boolean
}

export function ContactCard(props: ContactCardProps) {
  const isMobile = useIsMobile()

  return isMobile ? <ContactCardMobile {...props} /> : <ContactCardDesktop {...props} />
}
