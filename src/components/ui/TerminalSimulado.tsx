import { motion } from 'framer-motion'
import { memo, useEffect, useState } from 'react'
import { Card } from '@/shadcn/components/ui/card'
import { Box, VStack } from '@/shadcn/components/ui/layout'

const comandos = [
  '$ git clone projeto.git',
  '$ npm install',
  '$ npm run dev',
  '> Servidor rodando em http://localhost:3000',
  '$ git add .',
  '$ git commit -m "feat: nova funcionalidade"',
  '$ npm run build',
  '> Build completo com sucesso! ✓',
]

export const TerminalSimulado = memo(() => {
  const [linhasVisiveis, setLinhasVisiveis] = useState<string[]>([])
  const [linhaAtual, setLinhaAtual] = useState(0)

  useEffect(() => {
    if (linhaAtual >= comandos.length) {
      const timer = setTimeout(() => {
        setLinhasVisiveis([])
        setLinhaAtual(0)
      }, 3000)
      return () => clearTimeout(timer)
    }

    const timer = setTimeout(() => {
      setLinhasVisiveis((prev) => [...prev, comandos[linhaAtual]])
      setLinhaAtual((prev) => prev + 1)
    }, 800)

    return () => clearTimeout(timer)
  }, [linhaAtual])

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="h-full"
    >
      <Card className="bg-zinc-950 border-zinc-800 h-full min-h-[400px] overflow-hidden">
        <Box className="bg-zinc-900 px-4 py-3 flex items-center gap-2 border-b border-zinc-800">
          <Box className="w-3 h-3 rounded-full bg-red-500" />
          <Box className="w-3 h-3 rounded-full bg-yellow-500" />
          <Box className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-2 text-zinc-400 text-sm font-mono">terminal</span>
        </Box>
        <VStack className="p-4 gap-2 font-mono text-sm h-[calc(100%-52px)] overflow-y-auto">
          {linhasVisiveis.map((linha, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className={
                linha.startsWith('$')
                  ? 'text-brand-400'
                  : linha.startsWith('>')
                    ? 'text-blue-400'
                    : 'text-zinc-300'
              }
            >
              {linha}
              {index === linhasVisiveis.length - 1 && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                  className="inline-block w-2 h-4 bg-brand-400 ml-1"
                />
              )}
            </motion.div>
          ))}
        </VStack>
      </Card>
    </motion.div>
  )
})

TerminalSimulado.displayName = 'TerminalSimulado'
