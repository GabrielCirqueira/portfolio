import { AtSign, Github, Instagram, Linkedin } from 'lucide-react'
import { FooterContent } from '@/components/responsive/FooterContent'
import { Box } from '@/shadcn/components/ui/layout'

export function Footer() {
  const socials = [
    { icon: Github, href: 'https://github.com/GabrielCirqueira', label: 'GitHub' },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/gabriel-cirqueira-barbosa/',
      label: 'LinkedIn',
    },
    { icon: Instagram, href: 'https://www.instagram.com/gabrielcirqueira711/', label: 'Instagram' },
    { icon: AtSign, href: 'mailto:gabrielcirqueira711@gmail.com', label: 'Email' },
  ]

  const links = [
    { name: 'Início', href: '#inicio' },
    { name: 'Sobre', href: '#sobre' },
    { name: 'Projetos', href: '#projetos' },
    { name: 'Formação', href: '#formacao' },
    { name: 'Contato', href: '#contato' },
  ]

  return (
    <Box
      as="footer"
      className="bg-black border-t border-brand-500/10 relative font-sans overflow-hidden"
    >
      <Box className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />
      <Box className="absolute inset-0 bg-[radial-gradient(currentColor_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-20 text-brand-500/10" />

      <FooterContent socials={socials} links={links} />
    </Box>
  )
}
