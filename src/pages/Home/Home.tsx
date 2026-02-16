import {
  AboutSection,
  ContactSection,
  EducationSection,
  HeroSection,
  ProjectsSection,
  SkillsSection,
} from '@app/components/pages/home'
import { AppContainer, Footer, Header } from '@app/layouts'
import { lazy, memo, Suspense } from 'react'

const Mascote = lazy(() =>
  import('@app/components/ui/Mascote').then((module) => ({ default: module.Mascote }))
)
const ProgressoRolagem = lazy(() =>
  import('@app/components/ui/ProgressoRolagem').then((module) => ({
    default: module.ProgressoRolagem,
  }))
)
const SegredoEscondido = lazy(() =>
  import('@app/components/ui/SegredoEscondido').then((module) => ({
    default: module.SegredoEscondido,
  }))
)
const WhatsAppButton = lazy(() =>
  import('@app/components/ui/WhatsAppButton').then((module) => ({
    default: module.WhatsAppButton,
  }))
)

export const Component = memo(() => {
  return (
    <AppContainer paddingX="0" className={`min-h-screen bg-black w-full`}>
      <Suspense fallback={null}>
        <ProgressoRolagem />
        <SegredoEscondido />
        <Mascote />
        <WhatsAppButton />
      </Suspense>
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
