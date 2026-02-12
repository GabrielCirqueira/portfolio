import { AnimatePresence, motion } from 'framer-motion'
import { Calendar, Code2, ExternalLink, Image as ImageIcon, Sparkles, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Badge } from '@/shadcn/components/ui/badge'
import { Button } from '@/shadcn/components/ui/button'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, HStack, VStack } from '@/shadcn/components/ui/layout'
import { Text, Title } from '@/shadcn/components/ui/typography'
import type { Projeto } from '@/types/projeto'

interface ProjetoModalProps {
  isOpen: boolean
  onClose: () => void
  projeto: Projeto
}

function formatarData(data: string): string {
  const [ano, mes, dia] = data.split('-')
  return `${dia}/${mes}/${ano}`
}

function formatarPeriodo(dataInicio: string, dataFim?: string): string {
  if (!dataFim) {
    return `${formatarData(dataInicio)} à Presente`
  }
  return `${formatarData(dataInicio)} à ${formatarData(dataFim)}`
}

export function Desktop({ isOpen, onClose, projeto }: ProjetoModalProps) {
  const [imagemSelecionada, setImagemSelecionada] = useState(0)
  const [imagemExpandida, setImagemExpandida] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // biome-ignore lint/correctness/useExhaustiveDependencies: Resetar imagem ao trocar de projeto
  useEffect(() => {
    setImagemSelecionada(0)
  }, [projeto.id])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/80"
            onClick={onClose}
          />

          <Box className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[90vw] md:max-w-4xl lg:max-w-5xl max-h-[88vh] pointer-events-auto"
            >
              <Box className="relative bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl shadow-brand-500/10 max-h-[88vh] flex flex-col overflow-hidden">
                <Box className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-500/5 via-transparent to-transparent pointer-events-none z-0" />
                <Box className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent z-0" />

                <Box className="relative z-10 bg-gradient-to-br from-zinc-900/95 to-zinc-950/95 border-b border-zinc-800 p-4 md:p-5 flex-shrink-0">
                  <HStack className="justify-between items-start gap-3">
                    <VStack className="gap-2 flex-1 min-w-0">
                      <HStack className="items-center gap-2 flex-wrap">
                        <Box className="p-1.5 bg-brand-500/10 border border-brand-500/20 rounded-lg flex-shrink-0">
                          <Icon icon={Sparkles} className="w-4 h-4 text-brand-400" />
                        </Box>
                        <Title className="text-base md:text-xl lg:text-2xl font-bold uppercase tracking-tight font-heading text-white leading-tight">
                          {projeto.titulo}
                        </Title>
                      </HStack>

                      <HStack className="items-center gap-2 flex-wrap">
                        <HStack className="items-center gap-2 text-xs text-zinc-300 font-mono bg-zinc-900/80 border border-zinc-800 px-2.5 py-1.5 rounded-lg backdrop-blur-sm">
                          <Icon icon={Calendar} className="w-3.5 h-3.5 text-brand-400" />
                          <Text className="text-zinc-200 font-medium">
                            {formatarPeriodo(projeto.dataInicio, projeto.dataFim)}
                          </Text>
                        </HStack>
                        <Badge className="bg-brand-500/10 text-brand-300 border border-brand-500/30 px-2.5 py-1 text-xs font-mono uppercase tracking-wider rounded-lg">
                          {projeto.tipo === 'jogo' ? '🎮 Jogo' : '💻 Sistema'}
                        </Badge>
                      </HStack>
                    </VStack>

                    <Button
                      onClick={onClose}
                      className="bg-zinc-900 border border-zinc-700 hover:border-brand-500 hover:bg-brand-600 hover:text-black text-white transition-all duration-300 rounded-lg w-9 h-9 p-0 flex items-center justify-center flex-shrink-0"
                    >
                      <Icon icon={X} className="w-4 h-4" />
                    </Button>
                  </HStack>
                </Box>

                <Box className="relative z-10 overflow-y-auto overflow-x-hidden custom-scrollbar flex-1 overscroll-behavior-contain">
                  <VStack className="p-4 md:p-6 gap-5 md:gap-6">
                    <Box className="relative w-full">
                      <Box className="relative w-full overflow-hidden rounded-lg border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 shadow-lg group">
                        <Box className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none z-[1]" />

                        <Box className="relative w-full min-h-[220px] md:min-h-[280px] lg:min-h-[350px] flex items-center justify-center p-3">
                          <img
                            src={projeto.imagens[imagemSelecionada]}
                            alt={`${projeto.titulo} - ${imagemSelecionada + 1}`}
                            className="max-w-full max-h-[220px] md:max-h-[280px] lg:max-h-[400px] object-contain rounded relative z-[2]"
                          />

                          <Button
                            onClick={() => setImagemExpandida(projeto.imagens[imagemSelecionada])}
                            className="absolute top-2 right-2 z-[3] bg-zinc-900/90 border border-brand-500/30 text-brand-400 hover:bg-brand-500 hover:text-black hover:border-brand-500 transition-all duration-300 rounded-lg w-10 h-10 p-0 flex items-center justify-center backdrop-blur-md shadow-lg shadow-brand-500/10 hover:shadow-brand-500/40"
                          >
                            <Icon icon={ImageIcon} className="w-5 h-5" />
                          </Button>
                        </Box>

                        <Box className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-500/50 via-brand-400/50 to-transparent z-[2]" />
                      </Box>

                      {projeto.imagens.length > 1 && (
                        <HStack className="gap-2 mt-3 overflow-x-auto pb-2 custom-scrollbar">
                          {projeto.imagens.map((imagem, index) => (
                            <button
                              type="button"
                              key={index}
                              onClick={() => setImagemSelecionada(index)}
                              className={`relative flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer bg-zinc-900 flex items-center justify-center ${
                                imagemSelecionada === index
                                  ? 'border-brand-500 shadow-lg shadow-brand-500/30'
                                  : 'border-zinc-700 hover:border-zinc-600 opacity-60 hover:opacity-100'
                              }`}
                            >
                              <img
                                src={imagem}
                                alt={`Thumbnail ${index + 1}`}
                                className="max-w-full max-h-full object-contain p-0.5"
                              />
                              {imagemSelecionada === index && (
                                <Box className="absolute inset-0 bg-brand-500/10 pointer-events-none" />
                              )}
                            </button>
                          ))}
                        </HStack>
                      )}
                    </Box>

                    <VStack className="gap-4">
                      <HStack className="items-center gap-2">
                        <Box className="p-1.5 bg-brand-500/10 border border-brand-500/20 rounded-lg">
                          <Icon icon={Code2} className="w-4 h-4 text-brand-400" />
                        </Box>
                        <Title className="text-base md:text-lg font-bold uppercase tracking-wide font-heading text-white">
                          Sobre o Projeto
                        </Title>
                        <Box className="h-px bg-gradient-to-r from-brand-500/50 to-transparent flex-1" />
                      </HStack>

                      <VStack className="gap-3 relative pl-3">
                        <Box className="absolute -left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-500/50 via-brand-500/20 to-transparent rounded-full" />
                        {projeto.descricaoCompleta.map((paragrafo, index) => (
                          <Text key={index} className="text-gray-300 text-sm leading-relaxed">
                            {paragrafo}
                          </Text>
                        ))}
                      </VStack>
                    </VStack>

                    <VStack className="gap-3">
                      <HStack className="items-center gap-2">
                        <Box className="w-0.5 h-5 bg-gradient-to-b from-brand-500 to-brand-400 rounded-full" />
                        <Title className="text-sm md:text-base font-bold uppercase tracking-wide font-heading text-white">
                          Tecnologias Utilizadas
                        </Title>
                      </HStack>
                      <HStack className="flex-wrap gap-2">
                        {projeto.tecnologias.map((tech) => (
                          <Badge
                            key={tech}
                            className="bg-zinc-900 text-brand-300 border border-brand-500/20 px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-lg transition-all duration-300 hover:border-brand-500/50 hover:bg-zinc-800"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </HStack>
                    </VStack>

                    {projeto.link && (
                      <Box className="pb-2 w-full">
                        <motion.a
                          href={projeto.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="
                            w-full px-6 py-3 border border-brand-500/30
                            bg-brand-500/5 text-brand-400 font-bold
                            uppercase tracking-widest hover:bg-brand-500
                            hover:text-black hover:border-brand-500
                            transition-all duration-300 rounded text-sm
                            shadow-[0_0_15px_var(--tw-shadow-color)]
                            shadow-brand-500/10
                            hover:shadow-[0_0_25px_var(--tw-shadow-color)]
                            hover:shadow-brand-500/40
                            flex items-center justify-center gap-2
                          "
                        >
                          <Icon icon={ExternalLink} className="w-4 h-4" />
                          {projeto.tipo === 'jogo' ? 'Jogar Agora' : 'Acessar Projeto'}
                        </motion.a>
                      </Box>
                    )}
                  </VStack>
                </Box>
              </Box>
            </motion.div>
          </Box>
        </>
      )}

      <AnimatePresence>
        {imagemExpandida && (
          <Box
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            onClick={() => setImagemExpandida(null)}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/98 backdrop-blur-lg"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-[95vw] max-h-[95vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                onClick={() => setImagemExpandida(null)}
                className="absolute top-2 right-2 z-10 bg-black/80 border border-zinc-700 hover:border-brand-500 hover:bg-brand-600 hover:text-black text-white transition-all duration-300 rounded-lg w-10 h-10 p-0 flex items-center justify-center backdrop-blur-md shadow-lg"
              >
                <Icon icon={X} className="w-5 h-5" />
              </Button>

              <img
                src={imagemExpandida}
                alt="Visualização expandida"
                className="max-w-full max-h-[95vh] object-contain rounded-lg shadow-2xl border border-zinc-800"
              />
            </motion.div>
          </Box>
        )}
      </AnimatePresence>
    </AnimatePresence>
  )
}
