import { ExternalLink, Github, Instagram, Mail, MapPin, Phone } from 'lucide-react'
import { Badge } from '@/shadcn/components/ui/badge'
import { Button } from '@/shadcn/components/ui/button'
import { Card } from '@/shadcn/components/ui/card'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, Container, Grid, HStack, VStack } from '@/shadcn/components/ui/layout'
import { Link } from '@/shadcn/components/ui/link'
import { Text, Title } from '@/shadcn/components/ui/typography'

export function ContactSection() {
  return (
    <Container size="xl" id="contato" className="py-32">
      <VStack className="gap-16">
        <VStack className="gap-4 items-center text-center">
          <Badge className="px-4 py-2 bg-transparent border border-emerald-900 text-emerald-500 rounded-md text-xs">
            Fale comigo
          </Badge>
          <Title className="text-4xl font-bold">
            <Text as="span" className="text-white">
              Entre em{' '}
            </Text>
            <Text as="span" className="text-emerald-500">
              Contato
            </Text>
          </Title>
          <Text className="text-zinc-400 text-sm">
            Estou disponível para novos projetos e oportunidades.
          </Text>
        </VStack>

        <Grid className="grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-8 rounded-lg bg-zinc-950 border border-zinc-900">
            <VStack className="gap-6">
              <Text className="font-bold text-white text-lg">Informações de Contato</Text>
              <VStack className="gap-4">
                {[
                  {
                    icon: Mail,
                    label: 'E-mail',
                    value: 'gabrielcirqueira711@gmail.com',
                    link: 'mailto:gabrielcirqueira711@gmail.com',
                  },
                  {
                    icon: Phone,
                    label: 'WhatsApp',
                    value: '+55 27 99612-1313',
                    link: 'https://wa.me/5527996121313',
                  },
                  {
                    icon: Instagram,
                    label: 'Instagram',
                    value: '@gabrielcirqueira711',
                    link: 'https://instagram.com/gabrielcirqueira711',
                  },
                  {
                    icon: Github,
                    label: 'GitHub',
                    value: '@GabrielCirqueira',
                    link: 'https://github.com/GabrielCirqueira',
                  },
                  {
                    icon: MapPin,
                    label: 'Localização',
                    value: 'Pinheiros - ES, Brasil',
                    link: null,
                  },
                ].map((item) => (
                  <HStack key={item.label} className="gap-4 items-start">
                    <Box className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center flex-shrink-0">
                      <Icon icon={item.icon} className="size-5 text-cyan-500" />
                    </Box>
                    <VStack className="gap-1">
                      <Text className="text-xs text-zinc-500">{item.label}</Text>
                      {item.link ? (
                        <Link
                          href={item.link}
                          target="_blank"
                          className="text-sm font-medium text-white hover:text-emerald-500 transition-colors"
                        >
                          {item.value}
                        </Link>
                      ) : (
                        <Text className="text-sm font-medium text-white">{item.value}</Text>
                      )}
                    </VStack>
                  </HStack>
                ))}
              </VStack>
            </VStack>
          </Card>

          <Card className="p-8 rounded-lg bg-zinc-950 border border-zinc-900">
            <VStack className="gap-6">
              <Text className="font-bold text-white text-lg">Links Rápidos</Text>
              <Text className="text-zinc-400 text-sm">
                Aqui está meu Linktree para acessar todos os meu perfis:
              </Text>
              <Link href="https://linktr.ee/GabrielCirqueira" target="_blank" className="w-full">
                <Button className="w-full py-3 rounded-md bg-emerald-500 hover:bg-emerald-600 text-black font-semibold text-sm transition-colors">
                  <HStack className="gap-2 items-center justify-center">
                    <Icon icon={ExternalLink} className="size-4" />
                    <Text>Acessar Linktree</Text>
                  </HStack>
                </Button>
              </Link>
              <Box className="pt-4 border-t border-zinc-900">
                <VStack className="gap-3">
                  <Text className="text-xs text-zinc-400">Interessado em colaborações?</Text>
                  <Link href="https://wa.me/5527996121313" target="_blank" className="w-full">
                    <Button className="w-full py-3 rounded-md border border-zinc-800 bg-transparent hover:bg-zinc-900 text-zinc-300 text-sm transition-colors">
                      <HStack className="gap-2 items-center justify-center">
                        <Icon icon={Phone} className="size-4" />
                        <Text>WhatsApp</Text>
                      </HStack>
                    </Button>
                  </Link>
                </VStack>
              </Box>
            </VStack>
          </Card>
        </Grid>
      </VStack>
    </Container>
  )
}
