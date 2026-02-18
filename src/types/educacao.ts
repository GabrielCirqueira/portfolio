export interface FormacaoItem {
  titulo: string
  instituicao: string
  periodo: string
  descricao: string
}

export interface ExperienciaItem {
  cargo: string
  empresa: string
  periodo: string
  descricao: string
}

export interface ConquistaItem {
  titulo: string
  descricao: string
  ano: string
  instituicao?: string
  periodo?: string
}
