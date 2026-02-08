import {
  AboutSection,
  ContactSection,
  EducationSection,
  HeroSection,
  ProjectsSection,
} from '@app/components/pages/home'
import { AppContainer, Footer, Header } from '@app/layouts'

export function Component() {
  return (
    <AppContainer paddingX="0" className="min-h-screen bg-black w-full">
      <Header />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <EducationSection />
      <ContactSection />
      <Footer />
    </AppContainer>
  )
}
