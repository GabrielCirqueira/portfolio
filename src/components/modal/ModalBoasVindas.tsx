import { AnimatePresence, motion } from 'framer-motion'
import { Rocket, Sparkles, Terminal, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/shadcn/components/ui/button'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, HStack, VStack } from '@/shadcn/components/ui/layout'
import { Text, Title } from '@/shadcn/components/ui/typography'

export function ModalBoasVindas() {
  const [estaAberto, setEstaAberto] = useState(false)

  useEffect(() => {
    const contagemArmazenada = localStorage.getItem('contadorVisitas')
    let contagem = contagemArmazenada ? parseInt(contagemArmazenada, 10) : 0

    contagem += 1

    let deveExibir = false

    if (contagem === 1) {
      deveExibir = true
    } else if (contagem >= 5) {
      deveExibir = true
      contagem = 1
    }

    localStorage.setItem('contadorVisitas', contagem.toString())

    if (deveExibir) {
      const temporizador = setTimeout(() => {
        setEstaAberto(true)
        document.body.style.overflow = 'hidden'
      }, 500)
      return () => clearTimeout(temporizador)
    }
  }, [])

  const fecharModal = () => {
    setEstaAberto(false)
    document.body.style.overflow = ''
  }

  return (
    <AnimatePresence>
      {estaAberto && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
            onClick={fecharModal}
          />

          <Box className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative w-full max-w-lg pointer-events-auto"
            >
              <Box className="relative overflow-hidden rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl shadow-brand-500/20">
                <Box className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-500/10 via-transparent to-transparent pointer-events-none" />
                <Box className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />
                <Box className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-brand-900/10 to-transparent pointer-events-none" />

                <VStack className="relative z-10 p-6 sm:p-8 gap-6 text-center items-center">
                  <Box className="relative">
                    <Box className="absolute inset-0 bg-brand-500/20 blur-xl rounded-full" />
                    <Box className="relative p-4 bg-zinc-900/50 border border-brand-500/30 rounded-2xl shadow-inner shadow-white/5">
                      <Icon icon={Rocket} className="w-8 h-8 sm:w-10 sm:h-10 text-brand-400" />
                    </Box>
                  </Box>

                  <VStack className="gap-2">
                    <Title className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight">
                      Bem-vindo ao meu <span className="text-brand-400">Portfólio</span>!
                    </Title>
                    <Text className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
                      Explore meus projetos, conheça minhas habilidades e veja como transformo
                      ideias em código. Sinta-se à vontade para navegar!
                    </Text>
                  </VStack>

                  <HStack className="gap-4 justify-center py-2">
                    <Box className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900/50 rounded-lg border border-zinc-800/50">
                      <Icon icon={Terminal} className="w-3.5 h-3.5 text-brand-500" />
                      <Text className="text-xs text-zinc-300 font-mono">Projetos</Text>
                    </Box>
                    <Box className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900/50 rounded-lg border border-zinc-800/50">
                      <Icon icon={Sparkles} className="w-3.5 h-3.5 text-brand-500" />
                      <Text className="text-xs text-zinc-300 font-mono">Design</Text>
                    </Box>
                  </HStack>

                  <Button
                    onClick={fecharModal}
                    className="w-full sm:w-auto min-w-[200px] bg-brand-500 hover:bg-brand-600 text-black font-bold tracking-wide uppercase py-6 text-sm transition-all duration-300 shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40"
                  >
                    Começar a Explorar
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={fecharModal}
                    className="absolute top-4 right-4 text-zinc-500 hover:text-white hover:bg-zinc-800/50"
                  >
                    <Icon icon={X} className="w-5 h-5" />
                  </Button>
                </VStack>
              </Box>
            </motion.div>
          </Box>
        </>
      )}
    </AnimatePresence>
  )
}
