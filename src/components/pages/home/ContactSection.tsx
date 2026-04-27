import { memo } from 'react'
import { ContactGrid } from '@/components/responsive/ContactGrid'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { contactItems } from '@/data/contato'
import { Box, Container } from '@/shadcn/components/ui/layout'

export const ContactSection = memo(() => {
  return (
    <Box as="section" id="contato" className="py-24 relative bg-black overflow-hidden">
      <Box className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-brand-500/10 via-transparent to-transparent pointer-events-none" />

      <Container size="xl" className="relative z-10 px-6">
        <SectionHeader
          number="07"
          title="Contato"
          subtitle="Vamos transformar sua ideia em uma solução técnica robusta? Estou disponível para novos projetos e colaborações."
        />

        <div className="mt-16">
          <ContactGrid contactItems={contactItems} />
        </div>
      </Container>
    </Box>
  )
})

ContactSection.displayName = 'ContactSection'
