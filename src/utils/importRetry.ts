import { type ComponentType, lazy } from 'react'

export const importWithRetry = async <T>(
  importFn: () => Promise<T>,
  retries = 3,
  interval = 800
): Promise<T> => {
  try {
    return await importFn()
  } catch (error) {
    if (retries > 0) {
      console.warn(`[Vite] Falha ao carregar chunk. Tentando novamente (${retries} restantes)...`)
      await new Promise((resolve) => setTimeout(resolve, interval))
      return importWithRetry(importFn, retries - 1, interval)
    }
    throw error
  }
}

export const lazyWithRetry = <T extends ComponentType<any>>(
  componentImport: () => Promise<{ default: T }>,
  retries = 3,
  interval = 800
) => lazy(() => importWithRetry(componentImport, retries, interval))
