import type { LucideIcon } from 'lucide-react'
import { useIsMobile } from '@/hooks/useMediaQuery'
import { Desktop } from './Desktop'
import { Mobile } from './Mobile'

export interface SocialItem {
  icon: LucideIcon
  href: string
  label: string
}

export interface LinkItem {
  name: string
  href: string
}

interface FooterContentProps {
  socials: SocialItem[]
  links: LinkItem[]
}

export function FooterContent(props: FooterContentProps) {
  const isMobile = useIsMobile()
  return isMobile ? <Mobile {...props} /> : <Desktop {...props} />
}
