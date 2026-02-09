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
      if (window.scrollY > 20) {
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

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: 'afterChildren',
      },
    },
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
        when: 'beforeChildren',
      },
    },
  }

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 },
  }

  return (
    <Box
      className={`fixed top-0 w-full z-50 transition-all duration-500 font-sans ${
        scrolled
          ? 'bg-black/70 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.1)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <Container size="xl">
        <HStack className="justify-between items-center h-20">
          <motion.a
            href="#inicio"
            className="flex items-center space-x-2 text-white hover:text-brand-500 transition-colors no-underline group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Text className="font-mono text-brand-500 text-xl group-hover:rotate-12 transition-transform duration-300">
              &lt;
            </Text>
            <Text className="font-bold text-xl tracking-wide uppercase font-heading relative">
              Gabriel.Dev
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-500 transition-all duration-300 group-hover:w-full"></span>
            </Text>
            <Text className="font-mono text-brand-500 text-xl group-hover:-rotate-12 transition-transform duration-300">
              /&gt;
            </Text>
          </motion.a>

          <HStack className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-2 py-1 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-brand-500 transition-colors relative group no-underline"
              >
                <span className="relative z-10">{item.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-500 group-hover:w-full transition-all duration-300 ease-out"></span>
                <span className="absolute -inset-2 bg-brand-500/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
              </a>
            ))}
            <motion.a
              href="https://linktr.ee/gabrielCirqueira"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-4 px-5 py-2 border border-brand-500/50 bg-brand-500/5 text-brand-500 font-bold uppercase tracking-widest hover:bg-brand-500 hover:text-black transition-all duration-300 rounded-sm no-underline text-xs box-border"
            >
              Linktree
            </motion.a>
          </HStack>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 md:hidden text-white hover:text-brand-500 transition-all focus:outline-none"
            aria-label="Menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon icon={X} className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon icon={Menu} className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </HStack>
      </Container>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="md:hidden bg-black/95 border-b border-white/10 backdrop-blur-xl overflow-hidden shadow-2xl"
          >
            <Container size="xl" className="py-8">
              <VStack className="space-y-4">
                {navItems.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    variants={itemVariants}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-lg font-bold uppercase tracking-widest border-l-2 border-transparent text-gray-400 hover:border-brand-500 hover:text-brand-500 hover:pl-6 transition-all duration-300 no-underline bg-gradient-to-r from-transparent to-transparent hover:from-brand-500/5"
                  >
                    {item.name}
                  </motion.a>
                ))}
              </VStack>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  )
}
