import { motion } from 'framer-motion'
import { ExternalLink, Github, Instagram, Mail, MapPin, Smartphone } from 'lucide-react'
import { memo } from 'react'
import { ContactCard } from '@/components/responsive/ContactCard'
import { SectionHeader } from '@/components/responsive/SectionHeader'
import { Badge } from '@/shadcn/components/ui/badge'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, Container, Grid, HStack, VStack } from '@/shadcn/components/ui/layout'
import { Text } from '@/shadcn/components/ui/typography'

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
    <Box
      id="contato"
      className="py-12 sm:py-16 md:py-20 lg:py-24 relative bg-black font-sans overflow-hidden"
    >
      <Box className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-brand-900/10 via-black to-black pointer-events-none" />
      <Box className="absolute inset-0 bg-dotted-pattern opacity-10 pointer-events-none" />

      <Container size="xl" className="relative z-10 px-4">
        <VStack className="items-center text-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-8 sm:mb-10 md:mb-12 lg:mb-16 px-3 sm:px-4">
          <SectionHeader
            badge="Fale Comigo"
            title={
              <>
                Canais de <span className="text-brand-500 relative inline-block">Contato</span>
              </>
            }
          />
        </VStack>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <Grid className="grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {contactItems.map((contact, index) => (
              <motion.div
                key={index}
                variants={item}
                className="h-full"
                style={{ willChange: 'transform, opacity' }}
              >
                <ContactCard {...contact} />
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
                  mobile-touch-feedback
                "
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
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
