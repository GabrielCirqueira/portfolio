import type { Projeto } from '@/types/projeto'
import { useIsMobile } from '@/utils/deviceDetection'
import { ProjectCardDesktop } from './Desktop'
import { ProjectCardMobile } from './Mobile'

interface CardProjetoProps {
  projeto: Projeto
  onAbrirModal: (id: string) => void
}

export function ProjectCard(props: CardProjetoProps) {
  const isMobile = useIsMobile()

  return isMobile ? <ProjectCardMobile {...props} /> : <ProjectCardDesktop {...props} />
}
