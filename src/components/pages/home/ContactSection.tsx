import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink, Github, Instagram, Mail, MapPin, Smartphone } from 'lucide-react'
import { memo } from 'react'
import { Badge } from '@/shadcn/components/ui/badge'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, Container, Grid, HStack, VStack } from '@/shadcn/components/ui/layout'
import { Text, Title } from '@/shadcn/components/ui/typography'

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
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
}

export const ContactSection = memo(() => {
  return (
    <Box id="contato" className="py-24 relative bg-black font-sans overflow-hidden">
      <Box className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-brand-900/10 via-black to-black pointer-events-none" />
      <Box className="absolute inset-0 bg-dotted-pattern opacity-10 pointer-events-none" />

      <Container size="xl" className="relative z-10 px-4">
        <VStack className="items-center text-center gap-6 mb-16">
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
            <Title className="text-4xl md:text-5xl font-heading font-bold uppercase tracking-wide">
              Canais de <span className="text-brand-500 relative inline-block">Contato</span>
            </Title>
          </motion.div>
        </VStack>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <Grid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactItems.map((contact, index) => (
              <motion.div
                key={index}
                variants={item}
                className="h-full"
                style={{ willChange: 'transform, opacity' }}
              >
                <motion.a
                  href={contact.href || undefined}
                  target={contact.href ? '_blank' : undefined}
                  rel={contact.href ? 'noopener noreferrer' : undefined}
                  className={`group flex items-center gap-5 bg-zinc-900/40 border border-zinc-800 p-6 rounded-xl transition-all duration-300 h-full backdrop-blur-sm relative overflow-hidden ${
                    contact.highlight
                      ? 'border-brand-500/50 bg-brand-500/10 shadow-[0_0_30px_var(--tw-shadow-color)] shadow-brand-500/15'
                      : 'hover:border-brand-500/40 hover:bg-zinc-900/60 hover:shadow-[0_0_20px_var(--tw-shadow-color)] hover:shadow-brand-500/10'
                  }`}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out pointer-events-none" />

                  <Box
                    className={`p-3.5 rounded-xl shrink-0 ${
                      contact.highlight
                        ? 'bg-brand-500 text-black shadow-[0_0_15px_var(--tw-shadow-color)] shadow-brand-500/40'
                        : 'bg-zinc-950 text-brand-500 border border-zinc-800/50 group-hover:border-brand-500/50 group-hover:text-brand-400 group-hover:scale-110 transition-all duration-300'
                    }`}
                  >
                    <Icon icon={contact.icon} className="h-6 w-6" />
                  </Box>

                  <VStack className="gap-1 min-w-0 flex-1 relative z-10">
                    <Text className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 group-hover:text-brand-500 transition-colors">
                      {contact.label}
                    </Text>
                    <Text className="text-sm md:text-base font-bold font-heading text-white truncate group-hover:text-brand-100 transition-colors">
                      {contact.value}
                    </Text>
                  </VStack>

                  {contact.href && (
                    <Box className="relative z-10 w-8 h-8 flex items-center justify-center rounded-full bg-transparent group-hover:bg-brand-500/10 transition-colors">
                      <Icon
                        icon={ArrowRight}
                        className="h-4 w-4 text-zinc-600 group-hover:text-brand-500 group-hover:-rotate-45 transition-all duration-300"
                      />
                    </Box>
                  )}
                </motion.a>
              </motion.div>
            ))}

            <motion.div
              variants={item}
              className="h-full"
              style={{ willChange: 'transform, opacity' }}
            >
              <motion.a
                href="https://linktr.ee/gabrielCirqueira"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group flex items-center justify-between gap-4
                  bg-zinc-900/40 border border-zinc-800
                  hover:border-brand-500 p-6 rounded-xl
                  transition-all duration-300 h-full
                  hover:bg-brand-500/5 backdrop-blur-sm
                  relative overflow-hidden
                "
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out pointer-events-none" />

                <HStack className="items-center gap-5 relative z-10">
                  <Box
                    className="
                      p-3.5 rounded-xl bg-zinc-950 border
                      border-zinc-800 text-brand-500
                      group-hover:bg-brand-500 group-hover:text-black
                      transition-all duration-300 shrink-0
                      group-hover:shadow-[0_0_15px_var(--tw-shadow-color)]
                      group-hover:shadow-brand-500/40
                    "
                  >
                    <Icon icon={ExternalLink} className="h-6 w-6" />
                  </Box>
                  <VStack className="gap-1">
                    <Text className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 group-hover:text-brand-500 transition-colors">
                      Mais Links
                    </Text>
                    <Text className="text-base font-bold font-heading text-white uppercase tracking-wide group-hover:text-brand-100">
                      Linktree
                    </Text>
                  </VStack>
                </HStack>

                <Badge
                  className="
                    bg-brand-500 text-black hover:bg-brand-400
                    font-bold text-[10px] uppercase tracking-wider
                    px-3 py-1.5 shadow-[0_0_10px_var(--tw-shadow-color)]
                    shadow-brand-500/30 relative z-10
                  "
                >
                  Acessar
                </Badge>
              </motion.a>
            </motion.div>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  )
})
