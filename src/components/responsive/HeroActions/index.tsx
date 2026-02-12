import { useIsMobile } from '@/utils/deviceDetection'
import { HeroActionsDesktop } from './Desktop'
import { HeroActionsMobile } from './Mobile'

export function HeroActions() {
  const isMobile = useIsMobile()

  return isMobile ? <HeroActionsMobile /> : <HeroActionsDesktop />
}
