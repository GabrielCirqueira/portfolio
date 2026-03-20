import {
  AboutSection,
  ContactSection,
  EducationSection,
  HeroSection,
  ProjectsSection,
  SkillsSection,
  WorkflowSection,
} from '@app/components/pages/home'
import { JSONLD } from '@app/components/ui/JSONLD'
import { useSEO } from '@app/hooks/useSEO'
import { AppContainer, Footer, Header } from '@app/layouts'
import { lazyWithRetry } from '@app/utils/importRetry'
import { memo, Suspense, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const Mascote = lazyWithRetry(() =>
  import('@app/components/ui/Mascote').then((module) => ({ default: module.Mascote }))
)
const ProgressoRolagem = lazyWithRetry(() =>
  import('@app/components/ui/ProgressoRolagem').then((module) => ({
    default: module.ProgressoRolagem,
  }))
)
const SegredoEscondido = lazyWithRetry(() =>
  import('@app/components/ui/SegredoEscondido').then((module) => ({
    default: module.SegredoEscondido,
  }))
)
const WhatsAppButton = lazyWithRetry(() =>
  import('@app/components/ui/WhatsAppButton').then((module) => ({
    default: module.WhatsAppButton,
  }))
)

export const Component = memo(() => {
  const location = useLocation()

  useSEO({
    title: 'Gabriel Cirqueira | Desenvolvedor Fullstack React & Symfony',
    description:
      'Gabriel Cirqueira é Desenvolvedor Fullstack especializado em React, TypeScript e Symfony. Conheça projetos, habilidades técnicas e soluções modernas para web.',
    canonical: 'https://cirqueira.com/',
  })

  const homePageData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://cirqueira.com/#website',
    url: 'https://cirqueira.com/',
    name: 'Gabriel Cirqueira',
    description: 'Portfólio oficial de Gabriel Cirqueira, Desenvolvedor Fullstack.',
  }

  const breadcrumbsData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://cirqueira.com/',
      },
    ],
  }

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
      <JSONLD data={homePageData} />
      <JSONLD data={breadcrumbsData} />
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
