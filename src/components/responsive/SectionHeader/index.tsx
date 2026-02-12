import type { ReactNode } from 'react'
import { useIsMobile } from '@/utils/deviceDetection'
import { SectionHeaderDesktop } from './Desktop'
import { SectionHeaderMobile } from './Mobile'

interface SectionHeaderProps {
  badge?: string
  title: ReactNode
  subtitle?: string
  align?: 'center' | 'left'
  className?: string
}

export function SectionHeader(props: SectionHeaderProps) {
  const isMobile = useIsMobile()

  return isMobile ? <SectionHeaderMobile {...props} /> : <SectionHeaderDesktop {...props} />
}
