import { Phone } from 'lucide-react'
import { Button } from '@/shadcn/components/ui/button'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, Container, Grid, HStack, VStack } from '@/shadcn/components/ui/layout'
import { Link } from '@/shadcn/components/ui/link'
import { Text } from '@/shadcn/components/ui/typography'

export function Footer() {
  return (
    <Box className="bg-zinc-950 border-t border-zinc-900">
      <Container size="xl" className="py-12">
        <Grid className="grid-cols-1 md:grid-cols-3 gap-12">
          <VStack className="gap-4">
            <HStack className="gap-2 items-center">
              <Text className="text-emerald-500 font-mono">&lt;/&gt;</Text>
              <Text className="text-emerald-500 font-bold">GabrielDev</Text>
            </HStack>
            <Text className="text-zinc-400 text-xs">
              Desenvolvedor Fullstack & Criador de Jogos.
            </Text>
          </VStack>

          <VStack className="gap-4">
            <Text className="font-bold text-white text-sm">Links Rápidos</Text>
            <VStack className="gap-2">
              {['Sobre', 'Habilidades', 'Projetos', 'Formação', 'Contato'].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-zinc-400 hover:text-emerald-500 transition-colors text-xs"
                >
                  {item}
                </Link>
              ))}
            </VStack>
          </VStack>

          <VStack className="gap-4">
            <Text className="font-bold text-white text-sm">Contato</Text>
            <Link href="https://wa.me/5527996121313" target="_blank">
              <Button className="w-full py-2 rounded-md border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs transition-colors">
                <HStack className="gap-2 items-center justify-center">
                  <Icon icon={Phone} className="size-3" />
                  <Text>WhatsApp</Text>
                </HStack>
              </Button>
            </Link>
          </VStack>
        </Grid>

        <Box className="mt-12 pt-8 border-t border-zinc-900">
          <HStack className="justify-between items-center">
            <Text className="text-zinc-500 text-xs">
              © 2026 Gabriel Cirqueira.
            </Text>
            <Text className="text-zinc-600 text-xs">
              Feito com ❤️
            </Text>
          </HStack>
        </Box>
      </Container>
    </Box>
  )
}
