import {
  AtSign,
  Briefcase,
  Code,
  GitBranch,
  Github,
  GraduationCap,
  Home,
  Instagram,
  Linkedin,
  Mail,
  User,
} from 'lucide-react'
import type { LinkItem, NavItem, SocialItem } from '@/types/navegacao'

export const navItems: NavItem[] = [
  { name: 'Início', href: '#inicio', icon: Home },
  { name: 'Sobre', href: '#sobre', icon: User },
  { name: 'Habilidades', href: '#habilidades', icon: Code },
  { name: 'Projetos', href: '#projetos', icon: Briefcase },
  { name: 'Formação', href: '#formacao', icon: GraduationCap },
  { name: 'Workflow', href: '#workflow', icon: GitBranch },
  { name: 'Contato', href: '#contato', icon: Mail },
]

export const socials: SocialItem[] = [
  { icon: Github, href: 'https://github.com/GabrielCirqueira', label: 'GitHub' },
  {
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/gabriel-cirqueira-barbosa/',
    label: 'LinkedIn',
  },
  { icon: Instagram, href: 'https://www.instagram.com/gabrielcirqueira7/', label: 'Instagram' },
  { icon: AtSign, href: 'mailto:gabrielcirqueira711@gmail.com', label: 'Email' },
]

export const footerLinks: LinkItem[] = [
  { name: 'Início', href: '#inicio' },
  { name: 'Sobre', href: '#sobre' },
  { name: 'Projetos', href: '#projetos' },
  { name: 'Formação', href: '#formacao' },
  { name: 'Workflow', href: '#workflow' },
  { name: 'Contato', href: '#contato' },
]
