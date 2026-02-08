import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, Container, HStack, VStack } from '@/shadcn/components/ui/layout'
import { Text } from '@/shadcn/components/ui/typography'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Início', href: '#inicio' },
    { name: 'Sobre', href: '#sobre' },
    { name: 'Habilidades', href: '#habilidades' },
    { name: 'Projetos', href: '#projetos' },
    { name: 'Formação', href: '#formacao' },
    { name: 'Contato', href: '#contato' },
  ]

  return (
    <Box
      as="header"
      className={`fixed top-0 w-full z-50 transition-all duration-300 font-sans ${
        scrolled ? 'bg-black/80 backdrop-blur-md border-b border-brand-500/20' : 'bg-transparent'
      }`}
    >
      <Container size="xl">
        <HStack className="justify-between items-center h-20">
          <a
            href="#inicio"
            className="flex items-center space-x-2 text-white hover:text-brand-500 transition-colors no-underline"
          >
            <Text className="font-mono text-brand-500 text-xl">&lt;</Text>
            <Text className="font-bold text-xl tracking-wide uppercase font-heading">
              Gabriel.Dev
            </Text>
            <Text className="font-mono text-brand-500 text-xl">/&gt;</Text>
          </a>

          <HStack as="nav" className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-3 py-2 text-sm font-semibold uppercase tracking-wider text-gray-300 hover:text-brand-500 transition-colors relative group no-underline"
              >
                <span className="relative z-10">{item.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-500 group-hover:w-full transition-all duration-300 ease-out"></span>
              </a>
            ))}
            <a
              href="https://linktr.ee/gabrielCirqueira"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-6 px-6 py-2 border border-brand-500 text-brand-500 font-bold uppercase tracking-wider hover:bg-brand-500/10 transition-colors rounded-none no-underline text-xs"
            >
              Linktree
            </a>
          </HStack>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 md:hidden text-white hover:text-brand-500 transition-all focus:outline-none"
            aria-label="Menu"
          >
            {isOpen ? (
              <Icon icon={X} className="h-6 w-6" />
            ) : (
              <Icon icon={Menu} className="h-6 w-6" />
            )}
          </button>
        </HStack>
      </Container>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/95 border-t border-brand-500/20 backdrop-blur-md overflow-hidden"
          >
            <Container size="xl" className="py-6">
              <VStack as="nav" className="space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-base font-semibold uppercase tracking-wider border-l-2 border-brand-500/20 text-gray-300 hover:border-brand-500 hover:text-brand-500 hover:bg-brand-500/5 transition-all no-underline"
                  >
                    {item.name}
                  </a>
                ))}
              </VStack>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  )
}
