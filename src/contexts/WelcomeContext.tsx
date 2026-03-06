import type React from 'react'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

interface WelcomeContextType {
  isWelcomeModalOpen: boolean
  closeWelcomeModal: () => void
}

const WelcomeContext = createContext<WelcomeContextType>({
  isWelcomeModalOpen: false,
  closeWelcomeModal: () => undefined,
})

export function WelcomeProvider({ children }: { children: React.ReactNode }) {
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false)

  useEffect(() => {
    const contagemArmazenada = localStorage.getItem('contadorVisitas')
    let contagem = contagemArmazenada ? parseInt(contagemArmazenada, 10) : 0

    contagem += 1

    let deveExibir = false

    if (contagem === 1) {
      deveExibir = true
    } else if (contagem >= 5) {
      deveExibir = true
      contagem = 1
    }

    localStorage.setItem('contadorVisitas', contagem.toString())

    if (deveExibir) {
      const temporizador = setTimeout(() => {
        setIsWelcomeModalOpen(true)
        document.body.style.overflow = 'hidden'
      }, 500)
      return () => clearTimeout(temporizador)
    }
  }, [])

  const closeWelcomeModal = useCallback(() => {
    setIsWelcomeModalOpen(false)
    document.body.style.overflow = ''
  }, [])

  const value = useMemo(
    () => ({ isWelcomeModalOpen, closeWelcomeModal }),
    [isWelcomeModalOpen, closeWelcomeModal]
  )

  return <WelcomeContext.Provider value={value}>{children}</WelcomeContext.Provider>
}

export const useWelcome = () => useContext(WelcomeContext)
