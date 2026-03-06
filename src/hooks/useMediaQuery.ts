import { useEffect, useState } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const mql = window.matchMedia(query)

    setMatches(mql.matches)

    let timeoutId: number
    const handler = (e: MediaQueryListEvent) => {
      clearTimeout(timeoutId)
      timeoutId = window.setTimeout(() => {
        setMatches(e.matches)
      }, 150)
    }

    mql.addEventListener('change', handler)
    return () => {
      clearTimeout(timeoutId)
      mql.removeEventListener('change', handler)
    }
  }, [query])

  return matches
}

export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 767px)')
}

export function useIsTablet(): boolean {
  return useMediaQuery('(min-width: 768px) and (max-width: 1023px)')
}

export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1024px)')
}
