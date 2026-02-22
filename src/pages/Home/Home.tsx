import {
  AboutSection,
  ContactSection,
  EducationSection,
  HeroSection,
  ProjectsSection,
  SkillsSection,
  WorkflowSection,
} from '@app/components/pages/home'
import { AppContainer, Footer, Header } from '@app/layouts'
import { lazy, memo, Suspense, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

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
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')
      const elemento = document.getElementById(id)
      if (elemento) {
        setTimeout(() => {
          elemento.scrollIntoView({ behavior: 'smooth' })
        }, 50)
      }
    }
  }, [location.hash])

  return (
    <AppContainer paddingX="0" className={`min-h-screen bg-black w-full`}>
      <Suspense fallback={null}>
        <ProgressoRolagem />
        <SegredoEscondido />
        <Mascote />
        <WhatsAppButton />
      </Suspense>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
        <WorkflowSection />
        <ContactSection />
      </main>
      <Footer />
    </AppContainer>
  )
})
