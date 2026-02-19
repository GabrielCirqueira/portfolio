import type React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'

interface WelcomeContextType {
  isWelcomeModalOpen: boolean
  closeWelcomeModal: () => void
}

const WelcomeContext = createContext<WelcomeContextType>({
  isWelcomeModalOpen: false,
  closeWelcomeModal: () => {
    // Intencionalmente vazio
  },
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

  const closeWelcomeModal = () => {
    setIsWelcomeModalOpen(false)
    document.body.style.overflow = ''
  }

  return (
    <WelcomeContext.Provider value={{ isWelcomeModalOpen, closeWelcomeModal }}>
      {children}
    </WelcomeContext.Provider>
  )
}

export const useWelcome = () => useContext(WelcomeContext)
