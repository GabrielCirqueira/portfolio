import type { LucideIcon } from 'lucide-react'
import { useIsMobile } from '@/utils/deviceDetection'
import { AboutInfoCardDesktop } from './Desktop'
import { AboutInfoCardMobile } from './Mobile'

interface AboutInfoCardProps {
  icon: LucideIcon
  title: string
  description: string
  variants?: any
}

export function AboutInfoCard(props: AboutInfoCardProps) {
  const isMobile = useIsMobile()

  return isMobile ? <AboutInfoCardMobile {...props} /> : <AboutInfoCardDesktop {...props} />
}
