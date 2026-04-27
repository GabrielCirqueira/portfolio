import { useNavigate } from 'react-router-dom'
import { useIsMobile } from '@/hooks/useMediaQuery'
import type { Projeto } from '@/types/projeto'
import { Desktop } from './Desktop'
import { Mobile } from './Mobile'

interface CardProjetoProps {
  projeto: Projeto
  onAbrirModal?: (id: string) => void
  isFeatured?: boolean
}

export function CardProjeto(props: CardProjetoProps) {
  const isMobile = useIsMobile()
  const navigate = useNavigate()

  const handleOpen = () => {
    navigate(`/projetos/${props.projeto.id}`)
  }

  return isMobile ? (
    <Mobile {...props} onAbrirModal={handleOpen} />
  ) : (
    <Desktop {...props} onAbrirModal={handleOpen} />
  )
}
