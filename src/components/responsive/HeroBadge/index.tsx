import { useIsMobile } from '@/utils/deviceDetection'
import { HeroBadgeDesktop } from './Desktop'
import { HeroBadgeMobile } from './Mobile'

export function HeroBadge() {
  const isMobile = useIsMobile()

  return isMobile ? <HeroBadgeMobile /> : <HeroBadgeDesktop />
}
