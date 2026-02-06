import { AppContainer } from '@/layouts'
import { Header, Footer } from '@/layouts'
import {
  HeroSection,
  AboutSection,
  SkillsSection,
  ProjectsSection,
  EducationSection,
  ContactSection,
} from '@/components/pages/home'

export function Component() {
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
}
