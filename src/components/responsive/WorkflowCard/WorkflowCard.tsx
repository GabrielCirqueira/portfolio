import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { memo } from 'react'
import { Card, CardContent } from '@/shadcn/components/ui/card'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, VStack } from '@/shadcn/components/ui/layout'
import { Text, Title } from '@/shadcn/components/ui/typography'

interface WorkflowCardProps {
  numero: string
  titulo: string
  descricao: string
  icone: LucideIcon
  index: number
}

export const WorkflowCard = memo(
  ({ numero, titulo, descricao, icone, index }: WorkflowCardProps) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ scale: 1.05 }}
        className="h-full"
      >
        <Card className="bg-zinc-900/50 border-zinc-800 hover:border-brand-500 transition-all duration-300 h-full backdrop-blur-sm">
          <CardContent className="p-6">
            <VStack className="gap-4 items-start">
              <Box className="flex items-start justify-between w-full">
                <Box className="w-12 h-12 rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-2xl shadow-lg shadow-brand-500/20">
                  <Icon icon={icone} className="w-6 h-6 text-white" />
                </Box>
                <Text className="text-4xl font-bold text-brand-500/30">{numero}</Text>
              </Box>
              <Box>
                <Title as="h4" className="text-white font-bold mb-2">
                  {titulo}
                </Title>
                <Text className="text-zinc-400 text-sm leading-relaxed">{descricao}</Text>
              </Box>
            </VStack>
          </CardContent>
        </Card>
      </motion.div>
    )
  }
)

WorkflowCard.displayName = 'WorkflowCard'
