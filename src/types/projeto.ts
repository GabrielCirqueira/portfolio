export interface Projeto {
  id: string
  titulo: string
  descricao: string
  descricaoCompleta: string[]
  imagem: string
  imagens: string[]
  tecnologias: string[]
  link?: string
  dataInicio: string
  dataFim?: string
  tipo: 'sistema' | 'jogo'
}

export type Sistema = Projeto & {
  tipo: 'sistema'
}

export type Jogo = Projeto & {
  tipo: 'jogo'
}
