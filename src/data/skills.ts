export interface SkillCategory {
  id: string
  title: string
  description: string
  icon: string
  variant: 'emerald' | 'purple' | 'neutral'
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend & UI',
    description: 'Interfaces reativas, tipadas e acessíveis.',
    icon: 'Monitor',
    variant: 'emerald',
    skills: [
      'React 19',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Framer Motion',
      'Radix UI',
      'React Router',
      'shadcn/ui',
    ],
  },
  {
    id: 'backend',
    title: 'Backend & DevOps',
    description: 'APIs, filas, containers e automações.',
    icon: 'Server',
    variant: 'purple',
    skills: [
      'Symfony',
      'PHP',
      'Python',
      'Doctrine ORM',
      'PostgreSQL',
      'MySQL',
      'Docker',
      'RabbitMQ',
      'JWT',
      'SSE',
      'REST APIs',
    ],
  },
  {
    id: 'tools',
    title: 'Ferramentas & Outros',
    description: 'Stack de qualidade e ferramentas especializadas.',
    icon: 'Wrench',
    variant: 'neutral',
    skills: [
      'FFmpeg',
      'Whisper AI',
      'Tesseract OCR',
      'Three.js',
      'Git',
      'GitHub Actions',
      'Vercel',
      'Biome',
      'Husky',
      'Web Crypto API',
    ],
  },
]
