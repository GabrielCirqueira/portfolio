import { useIsMobile } from '@/hooks/useMediaQuery'
import type { AboutCard } from '@/types/sobre'
import { Desktop } from './Desktop'
import { Mobile } from './Mobile'

export type { AboutCard }

interface AboutContentProps {
  aboutCards: AboutCard[]
}

export function AboutContent({ aboutCards }: AboutContentProps) {
  const isMobile = useIsMobile()
  return isMobile ? <Mobile aboutCards={aboutCards} /> : <Desktop aboutCards={aboutCards} />
}
