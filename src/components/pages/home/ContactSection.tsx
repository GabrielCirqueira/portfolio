import { motion } from 'framer-motion'
import { memo } from 'react'

import { ContactGrid } from '@/components/responsive/ContactGrid'
import { contactItems } from '@/data/contato'
import { Box, Container, VStack } from '@/shadcn/components/ui/layout'
import { Span, Title } from '@/shadcn/components/ui/typography'

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
        </VStack>
        <ContactGrid contactItems={contactItems} />
      </Container>
    </Box>
  )
})
