export const isMobileDevice = (): boolean => {
  const userAgent = navigator.userAgent.toLowerCase()
  const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
    userAgent
  )

  const isSmallScreen = window.innerWidth <= 768

  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

  return isMobileUA || (isSmallScreen && hasTouch)
}

export const isLowPerformanceDevice = (): boolean => {
  const cores = navigator.hardwareConcurrency || 2

  const memory = (navigator as any).deviceMemory

  return isMobileDevice() || (memory && memory < 4) || cores < 4
}

export const useIsMobile = (): boolean => {
  if (typeof window === 'undefined') return false
  return isMobileDevice()
}

export const useIsLowPerformance = (): boolean => {
  if (typeof window === 'undefined') return false
  return isLowPerformanceDevice()
}
