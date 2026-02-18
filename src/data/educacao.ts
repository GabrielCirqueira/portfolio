import type { ConquistaItem, ExperienciaItem, FormacaoItem } from '@/types/educacao'

export const palavrasChaveCarreira: string[] = [
  'Symfony',
  'React',
  'TypeScript',
  'PHP',
  'Docker',
  'FastAPI',
  'MySQL',
  'Linux',
  'Git',
  'Tailwind CSS',
  'RabbitMQ',
  'Nginx',
  'REST APIs',
  'JWT',
  'Vite',
]

export const formacao: FormacaoItem[] = [
  {
    titulo: 'Análise e Desenvolvimento de Sistemas (ADS)',
    instituicao: 'Centro Universitário Vale do Cricaré (UNIVC)',
    periodo: '2025 - Atual (Iniciando 3º Período)',
    descricao:
      'Graduação superior com foco em engenharia de software, banco de dados e gestão de projetos.',
  },
  {
    titulo: 'Ensino Médio Integrado - Técnico em Internet',
    instituicao: 'Escola Nossa Senhora de Lourdes',
    periodo: '2022 - 2024',
    descricao: 'Formação técnica com foco em desenvolvimento web e tecnologias de internet.',
  },
]

export const conquistas: ConquistaItem[] = [
  {
    titulo: 'Etapa Nacional de Robótica',
    descricao: 'Classificado para competir em Goiânia na etapa nacional.',
    ano: '2024',
  },
  {
    titulo: 'MS CODE - Formação Web',
    instituicao: 'Móveis Simonetti',
    periodo: '2024',
    descricao:
      'Treinamento intensivo de programação web. Finalizado com apresentação de projeto prático.',
    ano: '2024',
  },
  {
    titulo: 'Olimpíadas de Programação',
    descricao: 'Participação em diversas competições de programação.',
    ano: '2023-2024',
  },
]

export const experiencias: ExperienciaItem[] = [
  {
    cargo: 'Desenvolvedor Web',
    empresa: 'Móveis Simonetti',
    periodo: '2025 - 2026 (atual)',
    descricao: 'Desenvolvimento com Symfony e React, trabalhando com sistemas corporativos.',
  },
  {
    cargo: 'Desenvolvedor de Sistemas Escolares',
    empresa: 'Projetos Independentes',
    periodo: '2023 - 2024',
    descricao: 'Criação de sistemas completos para monitoramento e gestão escolar.',
  },
]
