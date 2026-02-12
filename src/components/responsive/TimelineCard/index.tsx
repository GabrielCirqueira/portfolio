import type { LucideIcon } from 'lucide-react'
import { useIsMobile } from '@/utils/deviceDetection'
import type { TimelineItemData } from './Desktop'
import { TimelineCardDesktop } from './Desktop'
import { TimelineCardMobile } from './Mobile'

interface TimelineCardProps {
  icon: LucideIcon
  title: string
  items: TimelineItemData[]
  delay?: number
}

export function TimelineCard(props: TimelineCardProps) {
  const isMobile = useIsMobile()

  return isMobile ? <TimelineCardMobile {...props} /> : <TimelineCardDesktop {...props} />
}

export type { TimelineItemData }
