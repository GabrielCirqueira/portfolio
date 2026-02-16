import Clarity from '@microsoft/clarity'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

interface ClarityContextValue {
  estaInicializado: boolean
  identificarUsuario: (
    idUsuario: string,
    idSessao?: string,
    idPagina?: string,
    nomeAmigavel?: string
  ) => void
  definirTag: (chave: string, valor: string | string[]) => void
  registrarEvento: (nomeEvento: string) => void
  definirConsentimento: () => void
  priorizarSessao: (motivo: string) => void
}

const ClarityContext = createContext<ClarityContextValue>({
  estaInicializado: false,
  identificarUsuario: () => undefined,
  definirTag: () => undefined,
  registrarEvento: () => undefined,
  definirConsentimento: () => undefined,
  priorizarSessao: () => undefined,
})

interface PropriedadesProvedorClarity {
  children: React.ReactNode
}

export function ClarityProvider({ children }: PropriedadesProvedorClarity) {
  const [estaInicializado, setEstaInicializado] = useState(false)
  const idClarity = import.meta.env.VITE_CLARITY_ID
  const location = useLocation()

  const identificarUsuario = useCallback(
    (idUsuario: string, idSessao?: string, idPagina?: string, nomeAmigavel?: string) => {
      if (Clarity?.identify) {
        Clarity.identify(idUsuario, idSessao, idPagina, nomeAmigavel)
      }
    },
    []
  )

  const definirTag = useCallback((chave: string, valor: string | string[]) => {
    if (Clarity?.setTag) {
      Clarity.setTag(chave, valor)
    }
  }, [])

  const registrarEvento = useCallback((nomeEvento: string) => {
    if (Clarity?.event) {
      Clarity.event(nomeEvento)
    }
  }, [])

  const definirConsentimento = useCallback(() => {
    const clarityAny = Clarity as any
    if (clarityAny?.consentV2) {
      clarityAny.consentV2({
        ad_Storage: 'denied',
        analytics_Storage: 'granted',
      })
    } else if (Clarity?.consent) {
      Clarity.consent()
    }
  }, [])

  const priorizarSessao = useCallback((motivo: string) => {
    if (Clarity?.upgrade) {
      Clarity.upgrade(motivo)
    }
  }, [])

  useEffect(() => {
    if (!idClarity) return
    if (estaInicializado) return

    Clarity.init(idClarity)
    setEstaInicializado(true)

    if (Clarity.setTag) {
      Clarity.setTag('tipo_app', 'portfolio')
      Clarity.setTag('plataforma', 'web')
    }
  }, [estaInicializado])

  useEffect(() => {
    if (!estaInicializado) return

    const chaveArmazenamento = 'clarity_visitor_id'
    let idVisitante = localStorage.getItem(chaveArmazenamento)

    if (!idVisitante) {
      idVisitante = crypto.randomUUID()
      localStorage.setItem(chaveArmazenamento, idVisitante)
    }

    if (Clarity?.identify) {
      Clarity.identify(idVisitante, undefined, location.pathname, 'Visitante Portfolio')
    }
  }, [estaInicializado, location.pathname])

  return (
    <ClarityContext.Provider
      value={{
        estaInicializado,
        identificarUsuario,
        definirTag,
        registrarEvento,
        definirConsentimento,
        priorizarSessao,
      }}
    >
      {children}
    </ClarityContext.Provider>
  )
}

export function useClarity() {
  return useContext(ClarityContext)
}
