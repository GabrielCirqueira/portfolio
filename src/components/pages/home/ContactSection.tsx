import { motion } from 'framer-motion'
import { memo } from 'react'

import { ContactGrid } from '@/components/responsive/ContactGrid'
import { contactItems } from '@/data/contato'
import { Box, Container, VStack } from '@/shadcn/components/ui/layout'
import { Span, Text, Title } from '@/shadcn/components/ui/typography'

export const ContactSection = memo(() => {
  return (
    <Box
      as="section"
      id="contato"
      className="py-16 sm:py-20 md:py-24 lg:py-28 relative bg-black font-sans overflow-hidden"
    >
      <Box className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-brand-900/10 via-black to-black pointer-events-none" />

      <Container size="xl" className="relative z-10 px-4 sm:px-6">
        <VStack className="items-center text-center gap-4 sm:gap-5 mb-12 sm:mb-14 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ willChange: 'transform, opacity' }}
            className="space-y-4"
          >
            <Title className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Vamos criar algo{' '}
              <Span className="relative inline-block">
                <Span className="text-gradient font-black">incrível</Span>
                <Box className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-brand-500 to-brand-200 rounded-full" />
              </Span>{' '}
              juntos?
            </Title>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center gap-3 mt-10 px-5 py-2.5 rounded-full border border-green-500/40 bg-green-500/10 backdrop-blur-sm shadow-lg"
          >
            <Span className="relative flex h-2.5 w-2.5">
              <Span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <Span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </Span>
            <Text className="text-xs sm:text-sm text-green-400 font-bold uppercase tracking-wider">
              Disponível para projetos
            </Text>
          </motion.div>
        </VStack>
        <ContactGrid contactItems={contactItems} />
      </Container>
    </Box>
  )
})
