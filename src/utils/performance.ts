export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return function (this: any, ...args: Parameters<T>) {
    const now = Date.now()
    const timeSinceLastCall = now - lastCall

    if (timeSinceLastCall >= delay) {
      lastCall = now
      func.apply(this, args)
    } else {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        lastCall = Date.now()
        func.apply(this, args)
      }, delay - timeSinceLastCall)
    }
  }
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return function (this: any, ...args: Parameters<T>) {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

export function rafThrottle<T extends (...args: any[]) => any>(
  func: T
): (...args: Parameters<T>) => void {
  let rafId: number | null = null
  let lastArgs: Parameters<T> | null = null

  return function (this: any, ...args: Parameters<T>) {
    lastArgs = args
    if (rafId !== null) return

    rafId = requestAnimationFrame(() => {
      if (lastArgs) {
        func.apply(this, lastArgs)
        lastArgs = null
      }
      rafId = null
    })
  }
}

export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false

  return (
    /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      navigator.userAgent.toLowerCase()
    ) || window.innerWidth < 768
  )
}

export function isLowEndDevice(): boolean {
  if (typeof window === 'undefined') return false

  const cores = navigator.hardwareConcurrency || 2
  const memory = (navigator as any).deviceMemory

  return (memory && memory < 4) || cores < 4
}

export function shouldReduceMotion(): boolean {
  if (typeof window === 'undefined') return true

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
