import { motion } from 'framer-motion'
import { Github, Instagram, Mail, MapPin, Smartphone } from 'lucide-react'
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
  {
    icon: MapPin,
    label: 'Localização',
    value: 'ES, Brasil',
    href: null,
  },
]

export const ContactSection = memo(() => {
  return (
    <Box
      id="contato"
      className="py-12 sm:py-16 md:py-20 lg:py-24 relative bg-black font-sans overflow-hidden"
    >
      <Box className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-brand-900/10 via-black to-black pointer-events-none" />
      <Box className="absolute inset-0 bg-dotted-pattern opacity-10 pointer-events-none" />

      <Container size="xl" className="relative z-10 px-4">
        <VStack className="items-center text-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-8 sm:mb-10 md:mb-12 lg:mb-16 px-3 sm:px-4">
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
                border-brand-500/50 text-brand-500 uppercase
                tracking-widest text-xs font-bold px-3 py-1
                bg-brand-500/5 shadow-[0_0_10px_var(--tw-shadow-color)]
                shadow-brand-500/30
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
          >
            <Title className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold uppercase tracking-wide">
              Canais de <span className="text-brand-500 relative inline-block">Contato</span>
            </Title>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/5 backdrop-blur-sm"
          >
            <Span className="relative flex h-2.5 w-2.5">
              <Span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <Span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </Span>
            <Text className="text-xs text-green-400 font-bold uppercase tracking-widest">
              Disponível para projetos
            </Text>
          </motion.div>
        </VStack>

        <ContactGrid contactItems={contactItems} />
      </Container>
    </Box>
  )
})
