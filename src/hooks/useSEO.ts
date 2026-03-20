import { useEffect } from 'react'

interface useSEOProps {
  title?: string
  description?: string
  canonical?: string
  ogTitle?: string
  ogDescription?: string
  ogType?: string
  ogImage?: string
  twitterTitle?: string
  twitterDescription?: string
}

export const useSEO = ({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogType = 'website',
  ogImage = 'https://cirqueira.com/og-image.png',
  twitterTitle,
  twitterDescription,
}: useSEOProps) => {
  useEffect(() => {
    if (title) {
      document.title = title
    }
    const updateMeta = (selector: string, content?: string) => {
      if (!content) return
      const element = document.querySelector(selector)
      if (element) {
        element.setAttribute('content', content)
      }
    }

    updateMeta('meta[name="description"]', description)

    updateMeta('meta[property="og:title"]', ogTitle || title)
    updateMeta('meta[property="og:description"]', ogDescription || description)
    updateMeta('meta[property="og:type"]', ogType)
    updateMeta('meta[property="og:image"]', ogImage)

    updateMeta('meta[name="twitter:title"]', twitterTitle || ogTitle || title)
    updateMeta(
      'meta[name="twitter:description"]',
      twitterDescription || ogDescription || description
    )
    updateMeta('meta[name="twitter:image"]', ogImage)
    if (canonical) {
      const canonicalTag = document.querySelector('link[rel="canonical"]')
      if (canonicalTag) {
        canonicalTag.setAttribute('href', canonical)
      }
    }
  }, [
    title,
    description,
    canonical,
    ogTitle,
    ogDescription,
    ogType,
    ogImage,
    twitterTitle,
    twitterDescription,
  ])
}
