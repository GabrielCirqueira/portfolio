import { motion } from 'framer-motion'
import { memo } from 'react'
import { WorkflowCard } from '@/components/responsive/WorkflowCard'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Terminal } from '@/components/ui/Terminal'
import { useAnimation } from '@/contexts'
import { workflowSteps } from '@/data/workflow'
import { Box, Container, Grid } from '@/shadcn/components/ui/layout'

export const WorkflowSection = memo(() => {
  const { fadeUp, reducedMotion } = useAnimation()

  return (
    <Box as="section" id="workflow" className="py-24 relative bg-black overflow-hidden">
      <Box className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-500/5 via-transparent to-transparent pointer-events-none" />

      <Container size="xl" className="relative z-10 px-6">
        <SectionHeader
          number="06"
          title="Metodologia"
          subtitle="Processo estruturado de desenvolvimento focado em código limpo, performance e entrega contínua de valor."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <motion.div
            variants={reducedMotion ? {} : fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="h-full"
          >
            <Grid className="grid-cols-1 sm:grid-cols-2 gap-4 h-full">
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
          </motion.div>

          <motion.div
            variants={reducedMotion ? {} : fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.2 }}
            className="h-full"
          >
            <Terminal />
          </motion.div>
        </div>
      </Container>
    </Box>
  )
})

WorkflowSection.displayName = 'WorkflowSection'
