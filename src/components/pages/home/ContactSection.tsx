import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink, Github, Instagram, Mail, MapPin, Smartphone } from 'lucide-react'
import { Badge } from '@/shadcn/components/ui/badge'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, Container, Grid, HStack, VStack } from '@/shadcn/components/ui/layout'
import { Text, Title } from '@/shadcn/components/ui/typography'

export function ContactSection() {
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
      value: 'Pinheiros - ES, Brasil',
      href: null,
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  return (
    <Box id="contato" className="py-24 relative bg-black font-sans">
      <Box className="absolute inset-0 bg-dotted-pattern opacity-10 pointer-events-none" />

      <Container size="xl" className="relative z-10 px-4">
        <VStack className="items-center text-center gap-6 mb-16">
          <Badge
            variant="outline"
            className="border-brand-500/50 text-brand-500 uppercase tracking-widest text-xs font-bold px-3 py-1 bg-brand-500/5"
          >
            Fale Comigo
          </Badge>
          <Title className="text-4xl md:text-5xl font-heading font-bold uppercase tracking-wide">
            Canais de <span className="text-brand-500">Contato</span>
          </Title>
        </VStack>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <Grid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contactItems.map((contact, index) => (
              <motion.div key={index} variants={item}>
                <a
                  href={contact.href || undefined}
                  target={contact.href ? '_blank' : undefined}
                  rel={contact.href ? 'noopener noreferrer' : undefined}
                  className={`group flex items-center gap-4 bg-zinc-900/40 border border-zinc-800 hover:border-brand-500/50 p-4 rounded-xl transition-all duration-300 hover:bg-zinc-900/80 ${
                    contact.highlight ? 'border-brand-500/30 bg-brand-500/5' : ''
                  }`}
                >
                  <Box
                    className={`p-3 rounded-lg shrink-0 ${
                      contact.highlight
                        ? 'bg-brand-500 text-black shadow-[0_0_15px_rgba(34,197,94,0.4)]'
                        : 'bg-zinc-950 text-brand-500 border border-zinc-800 group-hover:border-brand-500/50 group-hover:text-brand-400'
                    } transition-colors duration-300`}
                  >
                    <Icon icon={contact.icon} className="h-5 w-5" />
                  </Box>

                  <VStack className="gap-0.5 min-w-0 flex-1">
                    <Text className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 group-hover:text-brand-500 transition-colors">
                      {contact.label}
                    </Text>
                    <Text className="text-sm md:text-base font-bold font-heading text-white truncate group-hover:text-brand-100 transition-colors">
                      {contact.value}
                    </Text>
                  </VStack>

                  {contact.href && (
                    <Icon
                      icon={ArrowRight}
                      className="h-4 w-4 text-zinc-700 group-hover:text-brand-500 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0"
                    />
                  )}
                </a>
              </motion.div>
            ))}

            {/* Linktree Card Compact */}
            <motion.div variants={item}>
              <a
                href="https://linktr.ee/gabrielCirqueira"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 bg-zinc-900/40 border border-zinc-800 hover:border-brand-500 p-4 rounded-xl transition-all duration-300 h-full hover:bg-brand-500/5"
              >
                <HStack className="items-center gap-4">
                  <Box className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-brand-500 group-hover:bg-brand-500 group-hover:text-black transition-colors shrink-0">
                    <Icon icon={ExternalLink} className="h-5 w-5" />
                  </Box>
                  <VStack className="gap-0.5">
                    <Text className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 group-hover:text-brand-500 transition-colors">
                      Mais Links
                    </Text>
                    <Text className="text-base font-bold font-heading text-white uppercase tracking-wide group-hover:text-brand-100">
                      Linktree
                    </Text>
                  </VStack>
                </HStack>

                <Badge className="bg-brand-500 text-black hover:bg-brand-600 font-bold text-[10px] uppercase tracking-wider px-2 py-1">
                  Acessar
                </Badge>
              </a>
            </motion.div>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  )
}
