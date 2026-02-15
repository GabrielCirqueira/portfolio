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
    <VStack className="py-12 px-6 relative z-10 gap-0">
      <Center className="mb-8">
        <Link href="#inicio" className="flex items-center gap-2 text-white no-underline group">
          <Span className="font-mono text-brand-500 text-xl group-active:rotate-12 transition-transform duration-300">
            &lt;
          </Span>
          <Span className="font-bold text-lg tracking-wide uppercase font-heading">
            Gabriel.Dev
          </Span>
          <Span className="font-mono text-brand-500 text-xl group-active:-rotate-12 transition-transform duration-300">
            /&gt;
          </Span>
        </Link>
      </Center>

      <HStack className="justify-center gap-4 mb-8">
        {socials.map((social, index) => (
          <Link
            key={index}
            href={social.href}
            external
            className="
              flex justify-center items-center w-12 h-12
              border border-zinc-800 rounded-xl text-zinc-400 no-underline
              active:bg-brand-500/10 active:text-brand-400 active:border-brand-500/40
              active:scale-95 transition-all duration-200
              shadow-lg
            "
            aria-label={social.label}
          >
            <Icon icon={social.icon} className="h-5 w-5" />
          </Link>
        ))}
      </HStack>

      <Grid className="grid-cols-3 gap-x-3 gap-y-3 mb-8 max-w-sm mx-auto w-full">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="text-zinc-400 text-xs font-semibold uppercase tracking-wide text-center py-2 active:text-brand-400 transition-colors no-underline"
          >
            {link.name}
          </Link>
        ))}
      </Grid>

      <Link
        href="https://wa.me/+5527996121313"
        external
        className="no-underline w-full max-w-sm mx-auto mb-8"
      >
        <Button
          className="
            flex items-center justify-center gap-2.5 w-full py-4
            border-2 border-brand-500/40 bg-brand-500/10 text-brand-400
            font-bold uppercase tracking-wide text-sm rounded-2xl
            active:bg-brand-500 active:text-black transition-all
            shadow-lg shadow-brand-500/10 active:shadow-brand-500/20
            active:scale-[0.98]
          "
        >
          <Icon icon={Phone} className="w-5 h-5" />
          WhatsApp
        </Button>
      </Link>

      <Box className="h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent mb-6 w-full" />

      <VStack className="items-center gap-3">
        <Span className="text-zinc-500 text-xs font-mono uppercase tracking-wider">
          © {currentYear} Gabriel Cirqueira.
        </Span>
        <HStack className="items-center gap-2">
          <Span className="text-zinc-600 text-xs font-mono">Code with</Span>
          <Icon icon={Code} className="w-3 h-3 text-brand-500" />
          <Span className="text-zinc-600 text-xs font-mono">&</Span>
          <Span className="text-xs font-mono text-zinc-400">Passion</Span>
        </HStack>
      </VStack>
    </VStack>
  )
})
