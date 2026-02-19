import { Github, Instagram, Linkedin, Mail, Smartphone } from 'lucide-react'
import type { ContactItem } from '@/types/contato'

export const contactItems: ContactItem[] = [
  {
    icon: Smartphone,
    label: 'WhatsApp',
    value: '+55 27 99612-1313',
    href: 'https://wa.me/+5527996121313',
    highlight: true,
    description: 'Melhor forma de contato rápido',
    responseTime: 'Respondo em até 2 horas',
  },
  {
    icon: Mail,
    label: 'E-mail',
    value: 'gabrielcirqueira711@gmail.com',
    href: 'mailto:gabrielcirqueira711@gmail.com',
    description: 'Para propostas e projetos formais',
    responseTime: 'Respondo em até 24 horas',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'Gabriel Cirqueira',
    href: 'https://www.linkedin.com/in/gabriel-cirqueira-barbosa/',
    description: 'Networking profissional e portfólio',
    responseTime: 'Conecte-se comigo',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    value: '@gabrielcirqueira711',
    href: 'https://www.instagram.com/gabrielcirqueira7/',
    description: 'Bastidores e conteúdo criativo',
    responseTime: 'Siga para acompanhar',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: '@GabrielCirqueira',
    href: 'https://github.com/GabrielCirqueira',
    description: 'Projetos open source e código',
    responseTime: 'Veja meu trabalho',
  },
]
