import { ChevronDown, Github, Monitor } from 'lucide-react'
import { Badge } from '@/shadcn/components/ui/badge'
import { Button } from '@/shadcn/components/ui/button'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, Container, HStack, VStack } from '@/shadcn/components/ui/layout'
import { Link } from '@/shadcn/components/ui/link'
import { Text, Title } from '@/shadcn/components/ui/typography'

export function HeroSection() {
  return (
    <Container size="xl" className="py-40">
      <VStack className="gap-12 items-center text-center">
        <Badge className="px-4 py-2 bg-transparent border border-emerald-900 text-emerald-500 rounded-md text-xs font-normal">
          <HStack className="gap-2 items-center">
            <Box className="size-1.5 rounded-full bg-emerald-500" />
            <Text>Dev Fullstack</Text>
          </HStack>
        </Badge>

        <VStack className="gap-4">
          <Text className="text-zinc-600 text-sm tracking-widest uppercase">OLÁ, SOU</Text>
          <Title className="font-bold text-white text-6xl md:text-7xl lg:text-8xl">
            Gabriel Cirqueira
          </Title>
          <Title className="text-3xl font-medium">
            <Text as="span" className="text-zinc-400">
              Desenvolvedor{' '}
            </Text>
            <Text as="span" className="text-emerald-500">
              React
            </Text>
          </Title>
        </VStack>

        <HStack className="gap-4 pt-6">
          <Link href="#projetos">
            <Button className="px-8 py-3 rounded-md bg-emerald-500 hover:bg-emerald-600 text-black font-semibold text-sm transition-colors">
              <HStack className="gap-2 items-center">
                <Icon icon={Monitor} className="size-4" />
                <Text>Ver Projetos</Text>
              </HStack>
            </Button>
          </Link>
          <Link href="https://github.com/GabrielCirqueira" target="_blank">
            <Button className="px-8 py-3 rounded-md border border-zinc-800 bg-transparent hover:bg-zinc-900 text-zinc-300 font-semibold text-sm transition-colors">
              <HStack className="gap-2 items-center">
                <Icon icon={Github} className="size-4" />
                <Text>GitHub</Text>
              </HStack>
            </Button>
          </Link>
        </HStack>

        <Box className="pt-12">
          <Link href="#sobre">
            <Icon icon={ChevronDown} className="size-6 text-emerald-500 animate-bounce" />
          </Link>
        </Box>
      </VStack>
    </Container>
  )
}
