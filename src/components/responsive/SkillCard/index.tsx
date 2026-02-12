import { useIsMobile } from '@/utils/deviceDetection'
import type { Skill } from './Desktop'
import { SkillCardDesktop } from './Desktop'
import { SkillCardMobile } from './Mobile'

interface SkillCardProps {
  skill: Skill
  variants?: any
}

export function SkillCard(props: SkillCardProps) {
  const isMobile = useIsMobile()

  return isMobile ? <SkillCardMobile {...props} /> : <SkillCardDesktop {...props} />
}

export type { Skill }
