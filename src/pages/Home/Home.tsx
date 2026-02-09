import {
  AboutSection,
  ContactSection,
  EducationSection,
  HeroSection,
  ProjectsSection,
  SkillsSection,
} from '@app/components/pages/home'
import { AppContainer, Footer, Header } from '@app/layouts'
import { memo } from 'react'

export const Component = memo(() => {
  return (
    <AppContainer paddingX="0" className="min-h-screen bg-black w-full">
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
