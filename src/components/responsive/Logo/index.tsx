import { useIsMobile } from '@/utils/deviceDetection'
import { LogoDesktop } from './Desktop'
import { LogoMobile } from './Mobile'

export function Logo() {
  const isMobile = useIsMobile()

  return isMobile ? <LogoMobile /> : <LogoDesktop />
}
