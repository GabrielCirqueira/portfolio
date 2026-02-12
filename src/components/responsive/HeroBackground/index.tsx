import { useIsMobile } from '@/utils/deviceDetection'
import { HeroBackgroundDesktop } from './Desktop'
import { HeroBackgroundMobile } from './Mobile'

export function HeroBackground() {
  const isMobile = useIsMobile()

  return isMobile ? <HeroBackgroundMobile /> : <HeroBackgroundDesktop />
}
