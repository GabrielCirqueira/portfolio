import { useIsMobile } from '@/hooks/useMediaQuery'
import { Desktop } from './Desktop'
import { Mobile } from './Mobile'

export function HeroContent() {
  const isMobile = useIsMobile()
  return isMobile ? <Mobile /> : <Desktop />
}
