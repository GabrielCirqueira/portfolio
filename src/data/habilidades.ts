import { Cloud, Layout, Server, Wrench } from 'lucide-react'
import {
  SiChakraui,
  SiDocker,
  SiFastapi,
  SiFramer,
  SiGit,
  SiGithub,
  SiGrafana,
  SiInsomnia,
  SiJsonwebtokens,
  SiLinux,
  SiMysql,
  SiNginx,
  SiPhp,
  SiRabbitmq,
  SiReact,
  SiShadcnui,
  SiSymfony,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from 'react-icons/si'
import type { SkillCategory, TechIcon } from '@/types/habilidades'

export const skills: SkillCategory[] = [
  {
    category: 'Frontend',
    description:
      'Criação de interfaces modernas, responsivas e com foco em experiência do usuário.',
    icon: Layout,
    technologies: [
      'TypeScript',
      'React',
      'Vite',
      'Tailwind CSS',
      'Chakra UI / Shadcn',
      'Framer Motion',
    ],
  },
  {
    category: 'Backend',
    description: 'Desenvolvimento de APIs robustas, seguras e escaláveis.',
    icon: Server,
    technologies: ['PHP', 'SQL', 'Symfony', 'FastAPI', 'REST APIs', 'JWT / Auth'],
  },
  {
    category: 'Infraestrutura & Deploy',
    description:
      'Além do desenvolvimento, realizo a configuração de ambientes de produção, VPS, DNS, Nginx e deploy de aplicações.',
    icon: Cloud,
    technologies: [
      'VPS / Linux',
      'Nginx / Proxy',
      'DNS & Domínios',
      'SSL / HTTPS',
      'Docker / Compose',
      'Deploy WEB',
    ],
  },
  {
    category: 'Ferramentas',
    description: 'Utilitários e plataformas essenciais para workflow, versionamento e testes.',
    icon: Wrench,
    technologies: ['Git / GitHub', 'Shell', 'Postman / Insomnia', 'VS Code', 'RabbitMQ', 'Grafana'],
  },
]

export const techIcons: TechIcon[] = [
  {
    Icon: SiPhp,
    name: 'PHP',
    color: '#777BB4',
    description: 'Linguagem server-side para desenvolvimento web dinâmico',
  },
  {
    Icon: SiSymfony,
    name: 'Symfony',
    color: '#fff',
    description: 'Framework PHP robusto para aplicações enterprise',
  },
  {
    Icon: SiTypescript,
    name: 'TypeScript',
    color: '#3178C6',
    description: 'JavaScript com tipagem estática para código mais seguro',
  },
  {
    Icon: SiJsonwebtokens,
    name: 'JWT',
    color: '#fff',
    description: 'Autenticação segura baseada em tokens',
  },
  {
    Icon: SiMysql,
    name: 'MySQL',
    color: '#4479A1',
    description: 'Banco de dados relacional de alta performance',
  },
  {
    Icon: SiReact,
    name: 'React',
    color: '#61DAFB',
    description: 'Biblioteca JavaScript para interfaces interativas',
  },
  {
    Icon: SiTailwindcss,
    name: 'Tailwind CSS',
    color: '#06B6D4',
    description: 'Framework CSS utility-first para design rápido',
  },
  {
    Icon: SiChakraui,
    name: 'Chakra UI',
    color: '#319795',
    description: 'Biblioteca de componentes React acessíveis',
  },
  {
    Icon: SiLinux,
    name: 'Linux',
    color: '#FCC624',
    description: 'Sistema operacional open-source para servidores',
  },
  {
    Icon: SiGit,
    name: 'Git',
    color: '#F05032',
    description: 'Controle de versão distribuído para código',
  },
  {
    Icon: SiDocker,
    name: 'Docker',
    color: '#2496ED',
    description: 'Containerização para ambientes consistentes',
  },
  {
    Icon: SiFastapi,
    name: 'FastAPI',
    color: '#009688',
    description: 'Framework Python moderno para APIs de alta performance',
  },
  {
    Icon: SiVite,
    name: 'Vite',
    color: '#646CFF',
    description: 'Build tool extremamente rápido para projetos frontend',
  },
  {
    Icon: SiFramer,
    name: 'Framer Motion',
    color: '#0055FF',
    description: 'Biblioteca de animações fluidas para React',
  },
  {
    Icon: SiShadcnui,
    name: 'Shadcn UI',
    color: '#fff',
    description: 'Componentes React reutilizáveis e customizáveis',
  },
  {
    Icon: SiNginx,
    name: 'Nginx',
    color: '#009639',
    description: 'Servidor web e reverse proxy de alta performance',
  },
  {
    Icon: SiMysql,
    name: 'Doctrine',
    color: '#F56A3F',
    description: 'ORM PHP para mapeamento objeto-relacional',
  },
  {
    Icon: SiInsomnia,
    name: 'Insomnia',
    color: '#4000BF',
    description: 'Cliente REST para testar e documentar APIs',
  },
  {
    Icon: SiGithub,
    name: 'GitHub',
    color: '#fff',
    description: 'Plataforma de colaboração e hospedagem de código',
  },
  {
    Icon: SiRabbitmq,
    name: 'RabbitMQ',
    color: '#FF6600',
    description: 'Message broker para comunicação assíncrona',
  },
  {
    Icon: SiGrafana,
    name: 'Grafana',
    color: '#F46800',
    description: 'Plataforma de observabilidade e dashboards',
  },
]
