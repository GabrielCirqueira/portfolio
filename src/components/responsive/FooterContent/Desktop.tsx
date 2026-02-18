import { motion } from 'framer-motion'
import { Code, Phone } from 'lucide-react'
import { memo } from 'react'
import { Button } from '@/shadcn/components/ui/button'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, Container, Grid, HStack, VStack } from '@/shadcn/components/ui/layout'
import { Text, Title } from '@/shadcn/components/ui/typography'
import type { LinkItem, SocialItem } from '@/types/navegacao'

interface FooterContentProps {
  socials: SocialItem[]
  links: LinkItem[]
}

export const Desktop = memo(({ socials, links }: FooterContentProps) => {
  const currentYear = new Date().getFullYear()

  return (
    <Container size="xl" className="py-20 relative z-10 px-4">
      <Grid className="grid-cols-1 md:grid-cols-3 gap-16 items-start">
        <VStack className="gap-6">
          <motion.a
            href="#inicio"
            className="flex items-center space-x-2 text-white hover:text-brand-500 transition-colors no-underline group w-fit"
            whileHover={{ scale: 1.05 }}
          >
            <Text className="font-mono text-brand-500 text-2xl group-hover:rotate-12 transition-transform duration-300">
              &lt;
            </Text>
            <Text className="font-bold text-2xl tracking-wide uppercase font-heading text-white">
              Gabriel.Dev
            </Text>
            <Text className="font-mono text-brand-500 text-2xl group-hover:-rotate-12 transition-transform duration-300">
              /&gt;
            </Text>
          </motion.a>

          <Text className="text-gray-400 text-sm leading-relaxed max-w-sm">
            Desenvolvedor Fullstack & Criador de Jogos. Transformando ideias complexas em soluções
            digitais interativas e performáticas.
          </Text>

          <HStack className="gap-4 pt-4">
            {socials.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex justify-center items-center w-10 h-10
                  border border-white/10 rounded-full text-gray-400
                  hover:bg-brand-500/10 hover:text-brand-500
                  hover:border-brand-500/50 transition-all duration-300
                "
                aria-label={social.label}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon icon={social.icon} className="h-5 w-5" />
              </motion.a>
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
                className="
                  text-gray-400 hover:text-brand-500
                  transition-colors duration-300
                  flex items-center group text-sm font-semibold
                  uppercase tracking-wider relative overflow-hidden
                "
              >
                <Text
                  className="
                    text-brand-500 absolute left-0
                    opacity-0 -translate-x-2
                    group-hover:opacity-100 group-hover:translate-x-0
                    transition-all duration-300
                  "
                >
                  ›
                </Text>
                <span className="transition-transform duration-300 group-hover:translate-x-4">
                  {link.name}
                </span>
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

          <motion.a
            href="https://wa.me/+5527996121313"
            target="_blank"
            className="w-full block"
            rel="noopener noreferrer"
            aria-label="Fale comigo no WhatsApp"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              className="
                w-full py-6 bg-transparent border
                border-brand-500 text-brand-500
                hover:bg-brand-500 hover:text-black
                font-bold uppercase tracking-widest
                transition-all duration-300
                shadow-[0_0_15px_var(--tw-shadow-color)]
                shadow-brand-500/10
                hover:shadow-[0_0_25px_var(--tw-shadow-color)]
                hover:shadow-brand-500/30
              "
            >
              <Icon icon={Phone} className="w-5 h-5 mr-3" />
              WhatsApp
            </Button>
          </motion.a>
        </VStack>
      </Grid>

      <Box className="my-16 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

      <HStack className="flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
        <Text className="text-gray-500 text-xs font-mono uppercase tracking-widest">
          © {currentYear} Gabriel Cirqueira. ( digite "cirqueira" 👀)
        </Text>
        <HStack className="items-center gap-2 opacity-50 hover:opacity-100 transition-opacity cursor-default">
          <Text className="text-gray-500 text-xs font-mono">Code with</Text>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Icon icon={Code} className="w-3 h-3 text-brand-500" />
          </motion.div>
          <Text className="text-gray-500 text-xs font-mono">&</Text>
          <Text className="text-xs font-mono text-white">Passion</Text>
        </HStack>
      </HStack>
    </Container>
  )
})
