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
    if (title && document.title !== title) {
      document.title = title
    }

    const setMetaTag = (attrName: string, attrValue: string, content?: string) => {
      if (content === undefined) return

      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`)

      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attrName, attrValue)
        document.head.appendChild(element)
      }

      element.setAttribute('content', content)
    }

    setMetaTag('name', 'description', description)

    setMetaTag('property', 'og:title', ogTitle || title)
    setMetaTag('property', 'og:description', ogDescription || description)
    setMetaTag('property', 'og:type', ogType)
    setMetaTag('property', 'og:image', ogImage)
    setMetaTag(
      'property',
      'og:url',
      canonical || `https://cirqueira.com${window.location.pathname}`
    )

    setMetaTag('name', 'twitter:title', twitterTitle || ogTitle || title)
    setMetaTag('name', 'twitter:description', twitterDescription || ogDescription || description)
    setMetaTag('name', 'twitter:image', ogImage)
    setMetaTag('name', 'twitter:card', 'summary_large_image')

    if (canonical) {
      let canonicalTag = document.querySelector('link[rel="canonical"]')
      if (!canonicalTag) {
        canonicalTag = document.createElement('link')
        canonicalTag.setAttribute('rel', 'canonical')
        document.head.appendChild(canonicalTag)
      }
      canonicalTag.setAttribute('href', canonical)
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
