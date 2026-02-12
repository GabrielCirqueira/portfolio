import { motion } from 'framer-motion'
import { AtSign, Github, Instagram } from 'lucide-react'
import { Icon } from '@/shadcn/components/ui/icon'
import { HStack } from '@/shadcn/components/ui/layout'

const socials = [
  { icon: Github, href: 'https://github.com/GabrielCirqueira', label: 'GitHub' },
  { icon: Instagram, href: 'https://www.instagram.com/gabrielcirqueira711/', label: 'Instagram' },
  { icon: AtSign, href: 'mailto:gabrielcirqueira711@gmail.com', label: 'Email' },
]

export const SocialLinksMobile = () => {
  return (
    <HStack className="gap-4 pt-4 justify-center w-full">
      {socials.map((social, index) => (
        <motion.a
          key={index}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex justify-center items-center w-12 h-12
            border border-white/10 rounded-full text-gray-400
            active:bg-brand-500/10 active:text-brand-500
            active:border-brand-500/50 transition-all duration-300
          "
          aria-label={social.label}
          whileTap={{ scale: 0.95 }}
        >
          <Icon icon={social.icon} className="h-6 w-6" />
        </motion.a>
      ))}
    </HStack>
  )
}
