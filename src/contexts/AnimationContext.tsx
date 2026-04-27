import type { Variants } from 'framer-motion'
import type React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'

interface AnimationContextValue {
  reducedMotion: boolean
  fadeUp: Variants
  fadeIn: Variants
  staggerContainer: Variants
}

const AnimationContext = createContext<AnimationContextValue | null>(null)

const variants: Omit<AnimationContextValue, 'reducedMotion'> = {
  fadeUp: {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.35, ease: 'easeOut' },
    },
  },
  staggerContainer: {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08 },
    },
  },
}

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)

    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <AnimationContext.Provider value={{ reducedMotion, ...variants }}>
      {children}
    </AnimationContext.Provider>
  )
}

export function useAnimation() {
  const ctx = useContext(AnimationContext)
  if (!ctx) throw new Error('useAnimation deve ser usado dentro de AnimationProvider')
  return ctx
}
