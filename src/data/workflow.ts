import type { LucideIcon } from 'lucide-react'
import { ClipboardList, Code, FlaskConical, Rocket } from 'lucide-react'

export interface WorkflowStep {
  numero: string
  titulo: string
  descricao: string
  icone: LucideIcon
}

export const workflowSteps: WorkflowStep[] = [
  {
    numero: '01',
    titulo: 'Planejamento',
    descricao:
      'Análise de requisitos, definição de escopo e arquitetura do projeto. Escolha das melhores tecnologias para solucionar o problema.',
    icone: ClipboardList,
  },
  {
    numero: '02',
    titulo: 'Desenvolvimento',
    descricao:
      'Codificação seguindo as melhores práticas, padrões de projeto e clean code. Commits semânticos e versionamento com Git.',
    icone: Code,
  },
  {
    numero: '03',
    titulo: 'Testes',
    descricao:
      'Testes unitários, de integração e E2E para garantir qualidade. Análise de cobertura de código e correção de bugs identificados.',
    icone: FlaskConical,
  },
  {
    numero: '04',
    titulo: 'Deploy',
    descricao:
      'CI/CD automatizado, deploy em produção e monitoramento. Otimização de performance e garantia de alta disponibilidade.',
    icone: Rocket,
  },
]
