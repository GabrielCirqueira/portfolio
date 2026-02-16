import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { SiWhatsapp } from 'react-icons/si'
import { Button } from '@/shadcn/components/ui/button'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, HStack, VStack } from '@/shadcn/components/ui/layout'
import { Text, Title } from '@/shadcn/components/ui/typography'

interface ModalWhatsAppProps {
  estaAberto: boolean
  aoFechar: () => void
}

const WHATSAPP_URL =
  'https://wa.me/+5527996121313?text=Ol%C3%A1%20Gabriel!%20Vim%20pelo%20seu%20portf%C3%B3lio.'

export function ModalWhatsApp({ estaAberto, aoFechar }: ModalWhatsAppProps) {
  const handleConfirmar = () => {
    window.open(WHATSAPP_URL, '_blank')
    aoFechar()
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
            onClick={aoFechar}
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
              className="relative w-full max-w-md pointer-events-auto"
            >
              <Box className="relative overflow-hidden rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl shadow-[#25D366]/20">
                <Box className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#25D366]/10 via-transparent to-transparent pointer-events-none" />
                <Box className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#25D366]/50 to-transparent" />
                <Box className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-[#25D366]/5 to-transparent pointer-events-none" />

                <VStack className="relative z-10 p-6 sm:p-8 gap-6 text-center items-center">
                  <Box className="relative">
                    <Box className="absolute inset-0 bg-[#25D366]/20 blur-xl rounded-full" />
                    <Box className="relative p-4 bg-zinc-900/50 border border-[#25D366]/30 rounded-2xl shadow-inner shadow-white/5">
                      <SiWhatsapp className="w-8 h-8 sm:w-10 sm:h-10 text-[#25D366]" />
                    </Box>
                  </Box>

                  <VStack className="gap-2 w-full">
                    <Title className="text-2xl w-full sm:text-3xl text-center font-bold font-heading text-white tracking-tight">
                      Abrir <span className="text-[#25D366]">WhatsApp</span>
                    </Title>
                    <Text className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
                      Você será redirecionado para iniciar uma conversa diretamente comigo.
                    </Text>
                  </VStack>

                  <Box className="w-full bg-zinc-900/50 border border-[#25D366]/20 rounded-lg p-3">
                    <Text className="text-[#25D366] text-center font-mono text-sm md:text-base tracking-wider">
                      +55 27 99612-1313
                    </Text>
                  </Box>

                  <HStack className="w-full gap-3 pt-2">
                    <Button
                      variant="outline"
                      onClick={aoFechar}
                      className="flex-1 border-zinc-800 hover:bg-zinc-900 text-zinc-300 py-6"
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={handleConfirmar}
                      className="flex-1 bg-[#25D366] hover:bg-[#20BA5A] text-black font-bold tracking-wide uppercase py-6 shadow-lg shadow-[#25D366]/25 hover:shadow-[#25D366]/40"
                    >
                      Continuar
                    </Button>
                  </HStack>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={aoFechar}
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
