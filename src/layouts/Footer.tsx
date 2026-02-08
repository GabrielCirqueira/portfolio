import { AtSign, Code, Github, Instagram, Phone } from 'lucide-react'
import { Button } from '@/shadcn/components/ui/button'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, Container, Grid, HStack, VStack } from '@/shadcn/components/ui/layout'
import { Text, Title } from '@/shadcn/components/ui/typography'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socials = [
    { icon: Github, href: 'https://github.com/GabrielCirqueira', label: 'GitHub' },
    { icon: Instagram, href: 'https://www.instagram.com/gabrielcirqueira711/', label: 'Instagram' },
    { icon: AtSign, href: 'mailto:gabrielcirqueira711@gmail.com', label: 'Email' },
  ]

  const links = [
    { name: 'Início', href: '#inicio' },
    { name: 'Sobre', href: '#sobre' },
    { name: 'Habilidades', href: '#habilidades' },
    { name: 'Projetos', href: '#projetos' },
    { name: 'Formação', href: '#formacao' },
    { name: 'Contato', href: '#contato' },
  ]

  return (
    <Box className="bg-black border-t border-brand-500/20 relative font-sans">
      <Box className="absolute inset-0 bg-[radial-gradient(#10b98110_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-20" />

      <Container size="xl" className="py-20 relative z-10 px-4">
        <Grid className="grid-cols-1 md:grid-cols-3 gap-16 items-start">
          <VStack className="gap-6">
            <a
              href="#inicio"
              className="flex items-center space-x-2 text-white hover:text-brand-500 transition-colors no-underline group"
            >
              <Text className="font-mono text-brand-500 text-2xl group-hover:translate-x-1 transition-transform">
                &lt;
              </Text>
              <Text className="font-bold text-2xl tracking-wide uppercase font-heading text-white">
                Gabriel.Dev
              </Text>
              <Text className="font-mono text-brand-500 text-2xl group-hover:-translate-x-1 transition-transform">
                /&gt;
              </Text>
            </a>

            <Text className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Desenvolvedor Fullstack & Criador de Jogos. Transformando ideias complexas em soluções
              digitais interativas e performáticas.
            </Text>

            <HStack className="gap-4 pt-4">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center items-center w-10 h-10 border border-white/10 rounded-full hover:bg-brand-500 hover:text-black hover:border-brand-500 transition-all duration-300 text-gray-400"
                  aria-label={social.label}
                >
                  <Icon icon={social.icon} className="h-5 w-5" />
                </a>
              ))}
            </HStack>
          </VStack>

          <VStack className="gap-8">
            <Title className="text-lg font-bold uppercase tracking-widest font-heading border-b border-brand-500/20 pb-4 inline-block w-full">
              Index
            </Title>
            <Grid className="grid-cols-2 gap-4">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-400 hover:text-brand-500 hover:pl-2 transition-all duration-300 flex items-center group text-sm font-semibold uppercase tracking-wider"
                >
                  <Text className="text-brand-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    ›
                  </Text>
                  {link.name}
                </a>
              ))}
            </Grid>
          </VStack>

          <VStack className="gap-8">
            <Title className="text-lg font-bold uppercase tracking-widest font-heading border-b border-brand-500/20 pb-4 inline-block w-full">
              Suporte
            </Title>
            <Text className="text-gray-400 text-sm">
              Precisa de uma resposta rápida? Fale comigo diretamente no WhatsApp.
            </Text>

            <a
              href="https://wa.me/+5527996121313"
              target="_blank"
              className="w-full"
              rel="noopener noreferrer"
            >
              <Button className="w-full py-6 bg-transparent border border-brand-500 text-brand-500 hover:bg-brand-500 hover:text-black font-bold uppercase tracking-widest transition-all duration-300">
                <Icon icon={Phone} className="w-5 h-5 mr-3" />
                WhatsApp
              </Button>
            </a>
          </VStack>
        </Grid>

        <Box className="my-16 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <HStack className="flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <Text className="text-gray-500 text-xs font-mono uppercase tracking-widest">
            © {currentYear} Gabriel Cirqueira.
          </Text>
          <HStack className="items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
            <Text className="text-gray-500 text-xs font-mono">Code with</Text>
            <Icon icon={Code} className="w-3 h-3 text-brand-500" />
            <Text className="text-gray-500 text-xs font-mono">&</Text>
            <Text className="text-xs font-mono text-white">Passion</Text>
          </HStack>
        </HStack>
      </Container>
    </Box>
  )
}
