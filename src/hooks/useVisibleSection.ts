import { useEffect, useState } from 'react'

export type SectionId = 'inicio' | 'sobre' | 'habilidades' | 'projetos' | 'formacao' | 'contato'

export function useVisibleSection() {
  const [visibleSection, setVisibleSection] = useState<SectionId>('inicio')

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Encontra a seção com maior intersecção
        const visibleEntries = entries.filter((entry) => entry.isIntersecting)

        if (visibleEntries.length > 0) {
          // Ordena por ratio de intersecção (maior primeiro)
          const mostVisible = visibleEntries.reduce((prev, current) =>
            current.intersectionRatio > prev.intersectionRatio ? current : prev
          )

          const id = mostVisible.target.id as SectionId
          if (id) {
            console.log('👁️ Seção visível:', id, 'Ratio:', mostVisible.intersectionRatio)
            setVisibleSection(id)
          }
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5],
        rootMargin: '-100px 0px -100px 0px',
      }
    )

    for (const section of sections) {
      observer.observe(section)
    }

    return () => {
      for (const section of sections) {
        observer.unobserve(section)
      }
    }
  }, [])

  return visibleSection
}
