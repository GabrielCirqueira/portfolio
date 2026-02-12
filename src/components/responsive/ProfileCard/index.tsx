import { useIsMobile } from '@/utils/deviceDetection'
import { ProfileCardDesktop } from './Desktop'
import { ProfileCardMobile } from './Mobile'

export function ProfileCard() {
  const isMobile = useIsMobile()

  return isMobile ? <ProfileCardMobile /> : <ProfileCardDesktop />
}
