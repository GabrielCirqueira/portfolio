import { Github, Instagram, Linkedin, Mail, Smartphone } from 'lucide-react'
import type { ContactItem } from '@/types/contato'

export const contactItems: ContactItem[] = [
  {
    icon: Smartphone,
    label: 'WhatsApp',
    value: '+55 27 99612-1313',
    href: 'https://wa.me/+5527996121313',
    highlight: true,
  },
  {
    icon: Mail,
    label: 'E-mail',
    value: 'gabrielcirqueira711@gmail.com',
    href: 'mailto:gabrielcirqueira711@gmail.com',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'Gabriel Cirqueira',
    href: 'https://www.linkedin.com/in/gabriel-cirqueira-barbosa/',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    value: '@gabrielcirqueira711',
    href: 'https://www.instagram.com/gabrielcirqueira7/',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: '@GabrielCirqueira',
    href: 'https://github.com/GabrielCirqueira',
  },
]
