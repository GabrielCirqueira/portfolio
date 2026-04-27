import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

const projetosPath = path.join(rootDir, 'src/data/projetos.ts')
const indexPath = path.join(rootDir, 'dist/index.html')

if (!fs.existsSync(indexPath)) {
  console.error('❌ dist/index.html não encontrado. Rode o build primeiro.')
  process.exit(1)
}

const projetosContent = fs.readFileSync(projetosPath, 'utf-8')
const indexContent = fs.readFileSync(indexPath, 'utf-8')

const projectRegex =
  /id:\s*'([^']+)',[\s\S]*?titulo:\s*'([^']+)',[\s\S]*?descricao:\s*'([^']+)',[\s\S]*?imagens:\s*\[\s*'([^']+)'/g

const projects = []
while (true) {
  const match = projectRegex.exec(projetosContent)
  if (match === null) break

  projects.push({
    id: match[1],
    titulo: match[2],
    descricao: match[3],
    imagem: match[4],
  })
}

console.log(`🚀 Iniciando injeção de SEO estático para ${projects.length} projetos...`)

function updateTag(html, attr, value, content) {
  const regex = new RegExp(`<meta\\s+[^>]*?${attr}=["']${value}["'][^>]*?>`, 'i')
  const newTag = `<meta ${attr}="${value}" content="${content}" />`
  if (regex.test(html)) {
    return html.replace(regex, newTag)
  }
  return html.replace('</head>', `  ${newTag}\n</head>`)
}

projects.forEach((project) => {
  const projectDir = path.join(rootDir, `dist/projetos/${project.id}`)
  if (!fs.existsSync(projectDir)) {
    fs.mkdirSync(projectDir, { recursive: true })
  }

  let html = indexContent
  const title = `${project.titulo} | Gabriel Cirqueira`
  const description = project.descricao
  const image = `https://cirqueira.com${project.imagem}`
  const url = `https://cirqueira.com/projetos/${project.id}`

  html = html.replace(/<title>.*?<\/title>/i, `<title>${title}</title>`)

  html = updateTag(html, 'name', 'title', title)
  html = updateTag(html, 'name', 'description', description)

  html = updateTag(html, 'property', 'og:title', title)
  html = updateTag(html, 'property', 'og:description', description)
  html = updateTag(html, 'property', 'og:image', image)
  html = updateTag(html, 'property', 'og:url', url)

  html = updateTag(html, 'name', 'twitter:title', title)
  html = updateTag(html, 'name', 'twitter:description', description)
  html = updateTag(html, 'name', 'twitter:image', image)

  fs.writeFileSync(path.join(projectDir, 'index.html'), html)
  console.log(`✅ SEO Estático: /projetos/${project.id}`)
})

console.log('✨ Injeção de SEO concluída com sucesso!')
