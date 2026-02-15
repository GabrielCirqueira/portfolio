import { createContext, memo, type ReactNode, useContext, useState } from 'react'

interface EasterEggContextType {
  isActive: boolean
  activate: () => void
  deactivate: () => void
}

const EasterEggContext = createContext<EasterEggContextType | undefined>(undefined)

export const useEasterEgg = () => {
  const context = useContext(EasterEggContext)
  if (!context) {
    throw new Error('useEasterEgg must be used within EasterEggProvider')
  }
  return context
}

interface EasterEggProviderProps {
  children: ReactNode
}

export const EasterEggProvider = memo(({ children }: EasterEggProviderProps) => {
  const [isActive, setIsActive] = useState(false)

  const activate = () => setIsActive(true)
  const deactivate = () => setIsActive(false)

  return (
    <EasterEggContext.Provider value={{ isActive, activate, deactivate }}>
      {children}
    </EasterEggContext.Provider>
  )
})

EasterEggProvider.displayName = 'EasterEggProvider'
