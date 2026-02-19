import { motion } from 'framer-motion'
import { memo } from 'react'
import { WorkflowCard } from '@/components/responsive/WorkflowCard'
import { TerminalSimulado } from '@/components/ui/TerminalSimulado'
import { workflowSteps } from '@/data/workflow'
import { Badge } from '@/shadcn/components/ui/badge'
import { Box, Container, Grid, VStack } from '@/shadcn/components/ui/layout'
import { Text, Title } from '@/shadcn/components/ui/typography'

export const WorkflowSection = memo(() => {
  return (
    <Box
      as="section"
      id="workflow"
      className="py-16 sm:py-20 md:py-24 lg:py-28 relative bg-black font-sans overflow-hidden"
    >
      <Box className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-black to-black" />
      <Box
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(var(--brand-500), 0.03) 35px, rgba(var(--brand-500), 0.03) 70px)',
        }}
      />
      <Box className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--brand-500),0.1)_0%,transparent_50%)]" />

      <Container size="xl" className="relative z-10 px-4 sm:px-6">
        <VStack className="items-center text-center gap-4 sm:gap-5 mb-12 sm:mb-14 md:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="outline"
              className="
                border-brand-500/40 text-brand-400
                uppercase tracking-wider text-xs font-semibold
                px-5 py-2 bg-brand-500/10 backdrop-blur-md
                shadow-lg shadow-brand-500/10 rounded-full mb-6
              "
            >
              Metodologia
            </Badge>
            <Title
              as="h2"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight font-heading"
            >
              PROCESSO DE <span className="text-gradient">DESENVOLVIMENTO</span>
            </Title>
            <Box className="w-20 sm:w-24 h-1 bg-brand-500 mx-auto rounded-full opacity-60 mt-4" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl"
          >
            <Text className="text-zinc-400 text-base sm:text-lg md:text-xl leading-relaxed">
              Metodologia ágil e estruturada para entregar soluções de alta qualidade. Do
              planejamento ao deploy, cada etapa é executada com excelência.
            </Text>
          </motion.div>
        </VStack>

        <Grid className="grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <Box className="order-1">
            <TerminalSimulado />
          </Box>

          <Box className="order-2">
            <Grid className="grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {workflowSteps.map((step, index) => (
                <WorkflowCard
                  key={step.numero}
                  numero={step.numero}
                  titulo={step.titulo}
                  descricao={step.descricao}
                  icone={step.icone}
                  index={index}
                />
              ))}
            </Grid>
          </Box>
        </Grid>
      </Container>
    </Box>
  )
})

WorkflowSection.displayName = 'WorkflowSection'
