import { memo } from 'react'

interface JSONLDProps {
  data: Record<string, any>
}

export const JSONLD = memo(({ data }: JSONLDProps) => {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD injection
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
})

JSONLD.displayName = 'JSONLD'
