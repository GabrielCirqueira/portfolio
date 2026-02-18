import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { navItems } from '@/data/navegacao'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, Container, HStack } from '@/shadcn/components/ui/layout'
import { Text } from '@/shadcn/components/ui/typography'
import { MobileMenu } from './MobileMenu'

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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      <Box
        as="header"
        className={`
          fixed top-0 w-full z-50 transition-all
          duration-500 font-sans ${
            scrolled
              ? 'bg-black/90 backdrop-blur-xl border-b border-white/10 shadow-lg'
              : 'bg-transparent border-b border-transparent'
          }
        `}
      >
        <Container size="xl" className="px-4 sm:px-6">
          <HStack className="justify-between items-center h-16 sm:h-18 md:h-20">
            <motion.a
              href="#inicio"
              className="
                flex items-center gap-2 text-white
                hover:text-brand-400 transition-colors
                no-underline group relative z-50
              "
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Ir para o início"
            >
              <Text className="font-mono text-brand-500 text-lg sm:text-xl md:text-2xl group-hover:rotate-12 transition-transform duration-300">
                &lt;
              </Text>
              <Text className="font-bold text-base sm:text-lg md:text-xl tracking-wide uppercase font-heading relative">
                Gabriel.Dev
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-500 transition-all duration-300 group-hover:w-full"></span>
              </Text>
              <Text className="font-mono text-brand-500 text-lg sm:text-xl md:text-2xl group-hover:-rotate-12 transition-transform duration-300">
                /&gt;
              </Text>
            </motion.a>

            <HStack className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors relative group no-underline py-2"
                  aria-label={`Ir para a seção ${item.name}`}
                >
                  <span className="relative z-10">{item.name}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-500 group-hover:w-full transition-all duration-300 ease-out"></span>
                  <span className="absolute -inset-x-2 -inset-y-1 bg-brand-500/0 rounded-md group-hover:bg-brand-500/5 transition-colors duration-300 -z-10"></span>
                </a>
              ))}
              <motion.a
                href="https://linktr.ee/gabrielCirqueira"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Visite meu Linktree"
                className="
                  ml-4 px-6 py-2.5 border border-brand-500/30
                  bg-brand-500/5 text-brand-400 font-bold
                  uppercase tracking-widest hover:bg-brand-500
                  hover:text-black hover:border-brand-500
                  transition-all duration-300 rounded text-xs
                  shadow-[0_0_15px_var(--tw-shadow-color)]
                  shadow-brand-500/10
                  hover:shadow-[0_0_25px_var(--tw-shadow-color)]
                  hover:shadow-brand-500/40
                "
              >
                Linktree
              </motion.a>
            </HStack>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 md:hidden text-white hover:text-brand-500 transition-all focus:outline-none relative z-50 active:scale-95"
              aria-label="Menu"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 relative flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute"
                    >
                      <Icon icon={X} className="h-7 w-7 sm:h-8 sm:w-8" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute"
                    >
                      <Icon icon={Menu} className="h-7 w-7 sm:h-8 sm:w-8" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </button>
          </HStack>
        </Container>
      </Box>

      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
