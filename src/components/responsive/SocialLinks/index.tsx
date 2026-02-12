import { useIsMobile } from '@/utils/deviceDetection'
import { SocialLinksDesktop } from './Desktop'
import { SocialLinksMobile } from './Mobile'

export function SocialLinks() {
  const isMobile = useIsMobile()

  return isMobile ? <SocialLinksMobile /> : <SocialLinksDesktop />
}
