import { Code, type LucideIcon, Phone } from 'lucide-react'
import { memo } from 'react'
import { Button } from '@/shadcn/components/ui/button'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, Center, Grid, HStack, VStack } from '@/shadcn/components/ui/layout'
import { Link } from '@/shadcn/components/ui/link'
import { Span } from '@/shadcn/components/ui/typography'

export interface SocialItem {
  icon: LucideIcon
  href: string
  label: string
}

export interface LinkItem {
  name: string
  href: string
}

interface FooterContentProps {
  socials: SocialItem[]
  links: LinkItem[]
}

export const Mobile = memo(({ socials, links }: FooterContentProps) => {
  const currentYear = new Date().getFullYear()

  return (
    <VStack className="py-10 px-5 relative z-10 gap-0">
      <Center className="mb-5">
        <Link href="#inicio" className="flex items-center space-x-1.5 text-white no-underline">
          <Span className="font-mono text-brand-500 text-lg">&lt;</Span>
          <Span className="font-bold text-lg tracking-wide uppercase font-heading">
            Gabriel.Dev
          </Span>
          <Span className="font-mono text-brand-500 text-lg">/&gt;</Span>
        </Link>
      </Center>

      <HStack className="justify-center gap-4 mb-6">
        {socials.map((social, index) => (
          <Link
            key={index}
            href={social.href}
            external
            className="
              flex justify-center items-center w-10 h-10
              border border-zinc-800 rounded-full text-zinc-400 no-underline
              active:bg-brand-500/10 active:text-brand-500 active:border-brand-500/50
              transition-colors duration-150
            "
            aria-label={social.label}
          >
            <Icon icon={social.icon} className="h-4 w-4" />
          </Link>
        ))}
      </HStack>

      <Grid className="grid-cols-3 gap-x-2 gap-y-2.5 mb-6 max-w-xs mx-auto">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="text-zinc-400 text-[11px] font-semibold uppercase tracking-wider text-center py-1 active:text-brand-500 transition-colors no-underline"
          >
            {link.name}
          </Link>
        ))}
      </Grid>

      <Link href="https://wa.me/+5527996121313" external className="no-underline w-full mb-6">
        <Button
          className="
            flex items-center justify-center gap-2 w-full py-3
            border border-brand-500/40 bg-brand-500/5 text-brand-400
            font-bold uppercase tracking-widest text-xs rounded-xl
            active:bg-brand-500 active:text-black transition-colors
          "
        >
          <Icon icon={Phone} className="w-4 h-4" />
          WhatsApp
        </Button>
      </Link>

      <Box className="h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent mb-5 w-full" />

      <VStack className="items-center gap-2">
        <Span className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest">
          © {currentYear} Gabriel Cirqueira.
        </Span>
        <HStack className="items-center gap-1.5">
          <Span className="text-zinc-600 text-[10px] font-mono">Code with</Span>
          <Icon icon={Code} className="w-2.5 h-2.5 text-brand-500" />
          <Span className="text-zinc-600 text-[10px] font-mono">&</Span>
          <Span className="text-[10px] font-mono text-zinc-400">Passion</Span>
        </HStack>
      </VStack>
    </VStack>
  )
})
