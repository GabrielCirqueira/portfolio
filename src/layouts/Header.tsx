import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Logo } from '@/components/responsive/Logo'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, Container, HStack } from '@/shadcn/components/ui/layout'
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

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
      y: '-100%',
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  return (
    <>
      <Box
        className={`
          fixed top-0 w-full z-50 transition-all
          duration-500 font-sans ${
            scrolled
              ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 shadow-lg'
              : 'bg-transparent border-b border-transparent py-4'
          }
        `}
      >
        <Container size="xl">
          <HStack className="justify-between items-center h-16 md:h-20">
            <Logo />

            <HStack className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors relative group no-underline py-2"
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
              className="p-2 md:hidden text-white hover:text-brand-500 transition-all focus:outline-none relative z-50"
              aria-label="Menu"
            >
              <div className="w-8 h-8 relative flex items-center justify-center">
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
                      <Icon icon={X} className="h-8 w-8" />
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
                      <Icon icon={Menu} className="h-8 w-8" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </button>
          </HStack>
        </Container>
      </Box>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-40 bg-black/98 backdrop-blur-xl flex flex-col md:hidden"
          >
            <Box className="absolute inset-0 bg-brand-500/5 pointer-events-none" />
            <Box className="absolute top-0 right-0 w-48 h-48 bg-brand-500/10 rounded-full blur-[80px] pointer-events-none" />
            <Box className="absolute bottom-0 left-0 w-48 h-48 bg-brand-800/10 rounded-full blur-[80px] pointer-events-none" />

            <Container
              size="xl"
              className="relative z-10 w-full flex-1 flex flex-col justify-center py-20 px-6"
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="flex flex-col items-center space-y-4"
              >
                {navItems.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    variants={itemVariants}
                    onClick={() => setIsOpen(false)}
                    className="group relative block text-center w-full py-2"
                  >
                    <Text
                      className="
                        text-xl font-black uppercase
                        tracking-tight text-white
                        hover:text-brand-400 transition-all duration-300
                        font-heading
                      "
                    >
                      {item.name}
                    </Text>
                    <Box className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-brand-500 group-hover:w-20 transition-all duration-300" />
                  </motion.a>
                ))}

                <motion.div variants={itemVariants} className="pt-6 w-full max-w-xs">
                  <a
                    href="https://linktr.ee/gabrielCirqueira"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="
                      w-full px-5 py-3 border border-brand-500
                      text-brand-500 font-bold uppercase
                      tracking-widest hover:bg-brand-500
                      hover:text-black transition-all
                      duration-300 rounded text-xs block text-center
                    "
                  >
                    Linktree
                  </a>
                </motion.div>
              </motion.div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
