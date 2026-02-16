import { motion } from 'framer-motion'
import { Github, Instagram, Linkedin, Mail, Smartphone } from 'lucide-react'
import { memo } from 'react'

import { ContactGrid } from '@/components/responsive/ContactGrid'
import { Badge } from '@/shadcn/components/ui/badge'
import { Box, Container, VStack } from '@/shadcn/components/ui/layout'
import { Span, Text, Title } from '@/shadcn/components/ui/typography'

const contactItems = [
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
    href: 'https://www.instagram.com/gabrielcirqueira711/',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: '@GabrielCirqueira',
    href: 'https://github.com/GabrielCirqueira',
  },
]

export const ContactSection = memo(() => {
  return (
    <Box
      as="section"
      id="contato"
      className="py-16 sm:py-20 md:py-24 lg:py-28 relative bg-black font-sans overflow-hidden"
    >
      <Box className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-brand-900/10 via-black to-black pointer-events-none" />
      <Box className="absolute inset-0 bg-dotted-pattern opacity-10 pointer-events-none" />

      <Container size="xl" className="relative z-10 px-4 sm:px-6">
        <VStack className="items-center text-center gap-4 sm:gap-5 mb-12 sm:mb-14 md:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ willChange: 'transform, opacity' }}
          >
            <Badge
              variant="outline"
              className="
                border-brand-500/40 text-brand-400 uppercase
                tracking-wider text-xs font-semibold px-5 py-2
                bg-brand-500/10 shadow-lg shadow-brand-500/10
                backdrop-blur-sm rounded-full
              "
            >
              Fale Comigo
            </Badge>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ willChange: 'transform, opacity' }}
            className="space-y-4"
          >
            <Title className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold uppercase tracking-tight">
              Canais de <span className="text-gradient">Contato</span>
            </Title>
            <Box className="w-20 sm:w-24 h-1 bg-brand-500 mx-auto rounded-full opacity-60" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center gap-3 px-5 py-2.5 rounded-full border border-green-500/40 bg-green-500/10 backdrop-blur-sm shadow-lg"
          >
            <Span className="relative flex h-2.5 w-2.5">
              <Span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <Span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </Span>
            <Text className="text-xs sm:text-sm text-green-400 font-bold uppercase tracking-wider">
              Disponível para projetos
            </Text>
          </motion.div>
        </VStack>

        <ContactGrid contactItems={contactItems} />
      </Container>
    </Box>
  )
})
