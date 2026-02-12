import type { LucideIcon } from 'lucide-react'
import { useIsMobile } from '@/hooks/useMediaQuery'
import { Desktop } from './Desktop'
import { Mobile } from './Mobile'

export interface AboutCard {
  icon: LucideIcon
  title: string
  description: string
}

interface AboutContentProps {
  aboutCards: AboutCard[]
}

export function AboutContent({ aboutCards }: AboutContentProps) {
  const isMobile = useIsMobile()
  return isMobile ? <Mobile aboutCards={aboutCards} /> : <Desktop aboutCards={aboutCards} />
}
