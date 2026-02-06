import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/contexts'
import { Button } from '@/shadcn/components/ui/button'
import { Icon } from '@/shadcn/components/ui/icon'
import { Container, HStack } from '@/shadcn/components/ui/layout'
import { Link } from '@/shadcn/components/ui/link'
import { Text } from '@/shadcn/components/ui/typography'

export function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Container size="xl" className="py-6 sticky top-0 bg-black/90 backdrop-blur-lg z-50 border-b border-zinc-900">
      <HStack className="justify-between items-center">
        <HStack className="gap-2 items-center">
          <Text className="text-emerald-500 font-mono text-lg">&lt;/&gt;</Text>
          <Text className="text-emerald-500 font-bold text-lg">GabrielDev</Text>
          <Text className="text-emerald-500 font-mono text-lg">/&gt;</Text>
        </HStack>

        <HStack className="gap-8 items-center">
          <Link href="#sobre" className="text-sm text-zinc-400 hover:text-emerald-500 transition-colors">
            Sobre
          </Link>
          <Link href="#habilidades" className="text-sm text-zinc-400 hover:text-emerald-500 transition-colors">
            Habilidades
          </Link>
          <Link href="#projetos" className="text-sm text-zinc-400 hover:text-emerald-500 transition-colors">
            Projetos
          </Link>
          <Link href="#formacao" className="text-sm text-zinc-400 hover:text-emerald-500 transition-colors">
            Formação
          </Link>
          <Link href="#contato" className="text-sm text-zinc-400 hover:text-emerald-500 transition-colors">
            Contato
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full hover:bg-zinc-900"
          >
            <Icon icon={theme === 'light' ? Moon : Sun} className="size-4 text-zinc-400" />
          </Button>
          <Link href="https://linktr.ee/GabrielCirqueira" target="_blank">
            <Button className="text-black font-bold text-sm px-6 py-2 rounded-md bg-emerald-500 hover:bg-emerald-600 transition-colors">
              Linktree
            </Button>
          </Link>
        </HStack>
      </HStack>
    </Container>
  )
}
