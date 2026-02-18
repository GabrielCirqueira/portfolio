import { Github, GraduationCap, Lightbulb, User } from 'lucide-react'
import type { AboutCard } from '@/types/sobre'

export const aboutCards: AboutCard[] = [
  {
    icon: User,
    title: 'Perfil Profissional',
    description: 'Focado em desenvolvimento web moderno, performance e interfaces responsivas.',
  },
  {
    icon: GraduationCap,
    title: 'Formação Técnica',
    description: 'Técnico em Internet com base sólida em lógica e arquitetura de sistemas.',
  },
  {
    icon: Github,
    title: 'Portfólio Ativo',
    description:
      'Mais de 18 repositórios públicos. Desenvolvimento contínuo de sistemas e aplicações.',
  },
  {
    icon: Lightbulb,
    title: 'Experiência',
    description: 'Atuação prática em desenvolvimento corporativo e competições de tecnologia.',
  },
]
