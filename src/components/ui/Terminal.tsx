import { motion } from 'framer-motion'
import { memo, useEffect, useState } from 'react'
import { Box, HStack } from '@/shadcn/components/ui/layout'
import { Text } from '@/shadcn/components/ui/typography'

const COMMANDS = [
  { text: 'npm install', delay: 1000 },
  { text: '✓ Added 242 packages', delay: 500, type: 'success' },
  { text: 'git checkout -b feature/ui-refactor', delay: 1200 },
  { text: 'Switched to a new branch', delay: 400, type: 'info' },
  { text: 'npm run build', delay: 1500 },
  { text: 'Creating an optimized production build...', delay: 800 },
  { text: '✓ Build successful (4.2s)', delay: 600, type: 'success' },
  { text: 'docker-compose up -d', delay: 1000 },
  { text: '✓ Containers started', delay: 500, type: 'success' },
  { text: 'git commit -m "feat: implement premium ssg"', delay: 800 },
  { text: 'git push origin main', delay: 1200 },
  { text: '🚀 Deployed to production!', delay: 1000, type: 'success' },
]

export const Terminal = memo(() => {
  const [visibleCommands, setVisibleCommands] = useState<typeof COMMANDS>([])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index >= COMMANDS.length) {
      const timeout = setTimeout(() => {
        setVisibleCommands([])
        setIndex(0)
      }, 5000)
      return () => clearTimeout(timeout)
    }

    const timeout = setTimeout(() => {
      setVisibleCommands((prev) => [...prev, COMMANDS[index]])
      setIndex((prev) => prev + 1)
    }, COMMANDS[index].delay)

    return () => clearTimeout(timeout)
  }, [index])

  return (
    <Box className="w-full h-full min-h-[500px] bg-[#0d1117] rounded-[2rem] border border-zinc-800 shadow-2xl overflow-hidden flex flex-col font-mono text-[13px]">
      <HStack className="bg-[#161b22] px-6 py-4 border-b border-zinc-800 justify-between items-center">
        <HStack className="gap-2">
          <Box className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <Box className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <Box className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </HStack>
        <Text className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">
          zsh — gabriel.dev
        </Text>
      </HStack>

      <Box className="p-6 flex-1 overflow-y-auto space-y-2 scrollbar-hide">
        {visibleCommands.map((cmd, i) => (
          <motion.div
            key={`${i}-${cmd.text}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-2"
          >
            <span className="text-brand-500">➜</span>
            <span className="text-zinc-400">~</span>
            <Text
              className={
                cmd.type === 'success'
                  ? 'text-emerald-400'
                  : cmd.type === 'info'
                    ? 'text-blue-400'
                    : 'text-zinc-100'
              }
            >
              {cmd.text}
            </Text>
          </motion.div>
        ))}
        {index < COMMANDS.length && (
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-2 h-5 bg-brand-500 inline-block ml-1"
          />
        )}
      </Box>
    </Box>
  )
})

Terminal.displayName = 'Terminal'
