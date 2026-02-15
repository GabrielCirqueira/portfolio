import {
  AboutSection,
  ContactSection,
  EducationSection,
  HeroSection,
  ProjectsSection,
  SkillsSection,
} from '@app/components/pages/home'
import { Mascote } from '@app/components/ui/Mascote'
import { ProgressoRolagem } from '@app/components/ui/ProgressoRolagem'
import { SegredoEscondido } from '@app/components/ui/SegredoEscondido'
import { WhatsAppButton } from '@app/components/ui/WhatsAppButton'
import { AppContainer, Footer, Header } from '@app/layouts'
import { memo } from 'react'

export const Component = memo(() => {
  return (
    <AppContainer paddingX="0" className={`min-h-screen bg-black w-full`}>
      <ProgressoRolagem />
      <SegredoEscondido />
      <Mascote />
      <WhatsAppButton />
      <Header />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <EducationSection />
      <ContactSection />
      <Footer />
    </AppContainer>
  )
})
