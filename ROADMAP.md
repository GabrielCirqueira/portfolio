# 🗺️ Roadmap Completo de Refatoração — Portfólio Gabriel Cirqueira
> **Versão:** 2.0 — Refatoração Profunda  
> **Inspiração:** celly-guimaraes-dev.netlify.app  
> **Meta:** Site rápido, limpo, profissional — identidade esmeralda + mascote SVG preservados  
> **Estimativa total:** ~20–30h de implementação  

---

## 📋 Índice

1. [Limpeza de Performance — CSS Crítico](#tópico-01)
2. [Remoção do EasterEgg e Contextos Mortos](#tópico-02)
3. [Substituir Terminal por Texto Real](#tópico-03)
4. [Substituir BarraHabilidade por Tags Agrupadas](#tópico-04)
5. [Simplificar AnimationContext](#tópico-05)
6. [Refatorar HeroSection](#tópico-06)
7. [Refatorar ProjectsSection e Cards](#tópico-07)
8. [Criar Seção de Experiência + Formação](#tópico-08)
9. [Padronizar Design System Completo](#tópico-09)
10. [Auditoria Final — Bundle, SEO e Deploy](#tópico-10)

---

## Legenda de Prioridade

| Símbolo | Significado |
|---------|-------------|
| 🔴 | Crítico — fazer primeiro, impacto imediato |
| 🟡 | Alto — muda a percepção do site inteiro |
| 🟢 | Médio — melhoria incremental |
| ⚪ | Opcional — nice-to-have após tudo pronto |

---

<a name="tópico-01"></a>
## Tópico 01 — Limpeza de Performance: CSS Crítico 🔴
> **Estimativa:** 2–3h  
> **Arquivos:** `src/index.css`, todos os componentes com `backdrop-blur`

### Por que isso trava o site

O browser tem uma etapa chamada **compositing**. Cada elemento com `backdrop-blur` cria uma nova camada de composição. A cada scroll, o browser precisa recalcular o blur de TODAS essas camadas. Em mobile (GPU fraca), isso derruba o framerate para 15–20fps — daí o travamento.

As sombras neon com `box-shadow: 0 0 20px hsl(173,100%,39%)` são recalculadas a cada repaint. Com múltiplos cards na tela, isso empilha.

### Passo a Passo

**1. Auditar quais elementos usam blur:**
```bash
# Rodar no terminal dentro do projeto
grep -rn "backdrop-blur" src/
grep -rn "blur-heavy\|blur-light\|blur-md\|blur-sm" src/
grep -rn "glow-intensity\|box-shadow.*hsl\|drop-shadow" src/
```
Anote todos os arquivos que aparecerem.

**2. No `src/index.css`, alterar o `:root`:**
```css
/* ANTES */
:root {
  --glow-intensity: 1;
  --blur-heavy: 24px;
  --blur-light: 8px;
  --transition-smooth: 0.3s ease-in-out;
}

/* DEPOIS */
:root {
  --glow-intensity: 0;        /* zera todos os glows */
  --blur-heavy: 0px;          /* remove glassmorphism */
  --blur-light: 0px;
  --transition-smooth: 0.25s ease-out;
  --border-emerald: 1px solid hsl(173, 100%, 39%, 0.25);
  --border-emerald-hover: 1px solid hsl(173, 100%, 39%, 0.8);
  --border-surface: 1px solid hsl(240, 5%, 15%);
}
```

**3. Remover todas as classes Tailwind de blur nos componentes:**
```bash
# Encontrar todos os usos
grep -rn "backdrop-blur\|bg-opacity\|bg.*\/[0-9]" src/components/
```
Para cada ocorrência, substituir o padrão:
```tsx
// ANTES — glassmorphism típico
className="backdrop-blur-md bg-white/10 border border-white/20"

// DEPOIS — sólido e limpo
className="bg-surface border border-surface-hover"
// onde --surface = hsl(240, 5%, 10%) e --surface-hover = hsl(240, 5%, 14%)
```

**4. Substituir box-shadow coloridos por bordas:**
```tsx
// ANTES — nos cards
style={{ boxShadow: `0 0 20px hsl(173, 100%, 39%, 0.3)` }}

// DEPOIS — hover com borda
className="border border-surface transition-colors duration-200 
           hover:border-emerald-500/50"
```

**5. Remover animações de `@keyframes` de pulse/glow no CSS:**
```css
/* Deletar blocos como estes do index.css: */
@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 10px var(--color-emerald-500); }
  50% { box-shadow: 0 0 25px var(--color-emerald-500); }
}

@keyframes neon-flicker { ... }
```

**6. Verificar com DevTools:**
- Abrir Chrome DevTools → Performance → gravar scroll de 5 segundos
- Antes: vai ter muitos eventos "Composite Layers" em vermelho
- Depois: scroll deve ficar verde, 60fps estável

**Checklist:**
- [ ] `grep -rn "backdrop-blur" src/` retorna zero resultados
- [ ] `grep -rn "glow-intensity" src/` retorna apenas a declaração no `:root`
- [ ] Scroll no mobile sem travamento
- [ ] Cards com borda sutil, hover com borda esmeralda

---

<a name="tópico-02"></a>
## Tópico 02 — Remoção do EasterEgg e Contextos Mortos 🟡
> **Estimativa:** 1h  
> **Arquivos:** `EasterEgg.tsx`, `EasterEggContext.tsx`, `App.tsx`

### O problema

`EasterEgg.tsx` registra um `window.addEventListener('keydown', ...)` global que fica ativo durante toda a sessão do usuário, verificando cada tecla pressionada contra a sequência Konami. O Canvas do Matrix Rain aloca memória de GPU que nunca é liberada enquanto a sessão durar.

Além disso, o `EasterEggContext` envolve toda a árvore de componentes desnecessariamente.

### Passo a Passo

**1. Deletar os arquivos:**
```bash
rm src/components/ui/EasterEgg.tsx
rm src/contexts/EasterEggContext.tsx
```

**2. Remover o Provider do `App.tsx` ou `main.tsx`:**
```tsx
// ANTES
import { EasterEggProvider } from '@/contexts/EasterEggContext'

function App() {
  return (
    <EasterEggProvider>
      <AnimationProvider>
        {/* ... */}
      </AnimationProvider>
    </EasterEggProvider>
  )
}

// DEPOIS — remover o EasterEggProvider completamente
function App() {
  return (
    <AnimationProvider>
      {/* ... */}
    </AnimationProvider>
  )
}
```

**3. Remover qualquer referência ao EasterEgg nos componentes:**
```bash
grep -rn "EasterEgg\|easterEgg\|easter-egg\|konami" src/
```
Para cada arquivo encontrado, remover o import e o uso.

**4. Remover os keyframes de Glitch do CSS:**
```bash
grep -n "glitch\|matrix\|scanline" src/index.css
```
Deletar os blocos `@keyframes` e as classes correspondentes.

**5. Rodar o linter para confirmar:**
```bash
npx biome check src/ --apply
```
Não deve sobrar nenhum import não utilizado relacionado ao EasterEgg.

**Checklist:**
- [ ] `grep -rn "EasterEgg" src/` retorna zero resultados
- [ ] `grep -rn "konami\|matrix\|glitch" src/` retorna zero resultados
- [ ] Build sem warnings de import não utilizado
- [ ] Nenhum listener `keydown` global no DevTools → Event Listeners

---

<a name="tópico-03"></a>
## Tópico 03 — Substituir Terminal por Texto Real 🟡
> **Estimativa:** 2h  
> **Arquivos:** `TerminalSimulado.tsx`, `AboutSection.tsx`

### O problema

O terminal usa `setInterval` para efeito de digitação, o que significa timers rodando continuamente. Com scanlines via CSS pseudo-element animado, adiciona mais repaint. E o mais importante: **o conteúdo em si é fraco** — comandos de terminal fictícios não comunicam quem você é melhor do que um parágrafo bem escrito.

### O que construir no lugar

Inspirado na `AboutSection` da Marcelly: texto direto em duas colunas — texto biográfico à esquerda, dois cards de destaque à direita.

**1. Deletar o componente:**
```bash
rm src/components/ui/TerminalSimulado.tsx
```

**2. Reescrever `AboutSection.tsx` do zero:**
```tsx
// src/components/pages/home/AboutSection.tsx

import { SectionHeader } from '@/components/ui/SectionHeader'
import { TechTag } from '@/components/ui/TechTag'

export function AboutSection() {
  return (
    <section id="sobre" className="py-24 px-6 max-w-6xl mx-auto">
      <SectionHeader number="01" title="Sobre" />

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Coluna esquerda — texto */}
        <div className="space-y-5">
          <p className="text-foreground text-base leading-relaxed">
            Sou Gabriel Cirqueira, desenvolvedor fullstack de 18 anos de
            Espírito Santo. Trabalho com{' '}
            <span className="text-emerald-400 font-medium">
              React, TypeScript e Symfony
            </span>{' '}
            há 2 anos — construindo desde interfaces até arquiteturas de
            backend com filas, processamento de mídia e integração com IA.
          </p>

          <p className="text-muted-foreground text-base leading-relaxed">
            Comecei em 2022 com C e PHP. Hoje desenvolvo sistemas completos
            como o UnyTools — que usa FFmpeg, Whisper e OCR — e plataformas
            3D como o SpaceNow, com dados reais da NASA e Three.js.
          </p>

          <p className="text-muted-foreground text-base leading-relaxed">
            Atualmente como Trainee na Móveis Simonetti, onde aplico
            na prática tudo que construo nos projetos pessoais.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {['React', 'TypeScript', 'Symfony', 'PHP', 'Python', 'Docker'].map(tech => (
              <TechTag key={tech}>{tech}</TechTag>
            ))}
          </div>
        </div>

        {/* Coluna direita — cards de destaque */}
        <div className="space-y-4">
          <div className="border border-surface rounded-lg p-5 hover:border-emerald-500/40 transition-colors">
            <p className="text-emerald-400 text-sm font-medium mb-1">
              O que eu faço
            </p>
            <ul className="text-muted-foreground text-sm space-y-2 leading-relaxed">
              <li>→ Sistemas web fullstack com React + Symfony</li>
              <li>→ Automações e processamento de mídia com Python</li>
              <li>→ APIs RESTful com autenticação JWT e Doctrine ORM</li>
              <li>→ Ambientes containerizados com Docker</li>
            </ul>
          </div>

          <div className="border border-surface rounded-lg p-5 hover:border-emerald-500/40 transition-colors">
            <p className="text-purple-400 text-sm font-medium mb-1">
              Forma de trabalho
            </p>
            <ul className="text-muted-foreground text-sm space-y-2 leading-relaxed">
              <li>→ Código limpo e tipado (TypeScript strict)</li>
              <li>→ Commits padronizados com Commitlint</li>
              <li>→ Testes e linting com Biome + Husky</li>
              <li>→ Deploy contínuo via Vercel e GitHub Actions</li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  )
}
```

**3. Criar `TechTag.tsx` reutilizável:**
```tsx
// src/components/ui/TechTag.tsx
interface TechTagProps {
  children: React.ReactNode
  variant?: 'emerald' | 'purple' | 'neutral'
}

export function TechTag({ children, variant = 'neutral' }: TechTagProps) {
  const styles = {
    emerald: 'border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10',
    purple: 'border-purple-500/40 text-purple-400 hover:bg-purple-500/10',
    neutral: 'border-surface-hover text-muted-foreground hover:border-emerald-500/40',
  }

  return (
    <span className={`
      inline-block px-3 py-1 text-xs rounded-full border
      transition-colors duration-200 cursor-default
      ${styles[variant]}
    `}>
      {children}
    </span>
  )
}
```

**Checklist:**
- [ ] `TerminalSimulado.tsx` deletado
- [ ] Nenhum `setInterval` relacionado a efeito de digitação no bundle
- [ ] `AboutSection` com texto real e informações verdadeiras
- [ ] `TechTag` funcionando com variantes
- [ ] Seção legível em mobile sem scroll horizontal

---

<a name="tópico-04"></a>
## Tópico 04 — Substituir BarraHabilidade por Tags Agrupadas 🟡
> **Estimativa:** 2–3h  
> **Arquivos:** `BarraHabilidade.tsx`, `SkillsSection.tsx`, novo `src/data/skills.ts`

### O problema

Barras de porcentagem de habilidade ("React: 90%") são consideradas um anti-padrão na comunidade dev. Nenhum recrutador técnico sabe o que "90% em React" significa. Além disso, a animação de largura baseada em scroll usa `ResizeObserver` + `IntersectionObserver` ao mesmo tempo, pesando no main thread.

### O que construir no lugar

Três cards de categoria com tags pill — exatamente como a Marcelly faz com "Frontend & UI", "Back-end & DB", "Mobile & Tools".

**1. Criar a fonte de dados:**
```ts
// src/data/skills.ts

export interface SkillCategory {
  id: string
  title: string
  description: string
  icon: string // nome do ícone Lucide
  variant: 'emerald' | 'purple' | 'neutral'
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend & UI',
    description: 'Interfaces reativas, tipadas e acessíveis.',
    icon: 'Monitor',
    variant: 'emerald',
    skills: [
      'React 19', 'TypeScript', 'Vite', 'Tailwind CSS',
      'Framer Motion', 'Radix UI', 'React Router', 'shadcn/ui',
    ],
  },
  {
    id: 'backend',
    title: 'Backend & DevOps',
    description: 'APIs, filas, containers e automações.',
    icon: 'Server',
    variant: 'purple',
    skills: [
      'Symfony', 'PHP', 'Python', 'Doctrine ORM',
      'PostgreSQL', 'MySQL', 'Docker', 'RabbitMQ',
      'JWT', 'SSE', 'REST APIs',
    ],
  },
  {
    id: 'tools',
    title: 'Ferramentas & Outros',
    description: 'Stack de qualidade e ferramentas especializadas.',
    icon: 'Wrench',
    variant: 'neutral',
    skills: [
      'FFmpeg', 'Whisper AI', 'Tesseract OCR', 'Three.js',
      'Git', 'GitHub Actions', 'Vercel', 'Biome',
      'Husky', 'Web Crypto API',
    ],
  },
]
```

**2. Reescrever `SkillsSection.tsx`:**
```tsx
// src/components/pages/home/SkillsSection.tsx
import { Monitor, Server, Wrench } from 'lucide-react'
import { motion } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { TechTag } from '@/components/ui/TechTag'
import { skillCategories } from '@/data/skills'

const icons = { Monitor, Server, Wrench }

export function SkillsSection() {
  return (
    <section id="habilidades" className="py-24 px-6 max-w-6xl mx-auto">
      <SectionHeader number="02" title="Habilidades" />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {skillCategories.map((category, i) => {
          const Icon = icons[category.icon as keyof typeof icons]
          const iconColor = {
            emerald: 'text-emerald-400',
            purple: 'text-purple-400',
            neutral: 'text-muted-foreground',
          }[category.variant]

          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="border border-surface rounded-xl p-6 
                         hover:border-emerald-500/30 transition-colors duration-300"
            >
              <Icon className={`w-5 h-5 ${iconColor} mb-4`} />
              <h3 className="text-foreground font-medium text-base mb-1">
                {category.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {category.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {category.skills.map(skill => (
                  <TechTag key={skill} variant={category.variant}>
                    {skill}
                  </TechTag>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
```

**3. Deletar o componente antigo:**
```bash
rm src/components/ui/BarraHabilidade.tsx
grep -rn "BarraHabilidade" src/ # confirmar zero resultados
```

**Checklist:**
- [ ] `BarraHabilidade.tsx` deletado
- [ ] `src/data/skills.ts` criado com dados reais
- [ ] Três cards responsivos: 1 coluna mobile, 3 colunas desktop
- [ ] Tags pill com variantes de cor
- [ ] Nenhuma animação de largura baseada em scroll

---

<a name="tópico-05"></a>
## Tópico 05 — Simplificar AnimationContext 🟡
> **Estimativa:** 2h  
> **Arquivos:** `src/contexts/AnimationContext.tsx`, todos os componentes que o consomem

### O problema

O `AnimationContext` atual detecta hardware e distribui 3 níveis de fidelidade visual por toda a árvore. Isso cria um acoplamento forte entre a lógica de animação e todos os componentes. Se você quiser mudar uma animação, precisa considerar os 3 níveis.

### O novo AnimationContext

Simplificar para expor apenas o que realmente importa: respeitar `prefers-reduced-motion`.

**1. Reescrever `AnimationContext.tsx`:**
```tsx
// src/contexts/AnimationContext.tsx
import { createContext, useContext, useEffect, useState } from 'react'

interface AnimationContextValue {
  reducedMotion: boolean
  fadeUp: object       // variants prontos para usar em qualquer componente
  fadeIn: object
  staggerContainer: object
}

const AnimationContext = createContext<AnimationContextValue | null>(null)

// Variants reutilizáveis — definidos uma vez, usados em todo o projeto
const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.35, ease: 'easeOut' },
    },
  },
  staggerContainer: {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08 },
    },
  },
}

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <AnimationContext.Provider value={{ reducedMotion, ...variants }}>
      {children}
    </AnimationContext.Provider>
  )
}

export function useAnimation() {
  const ctx = useContext(AnimationContext)
  if (!ctx) throw new Error('useAnimation deve ser usado dentro de AnimationProvider')
  return ctx
}
```

**2. Atualizar os componentes para usar o novo contexto:**
```tsx
// Padrão de uso em qualquer seção
import { motion } from 'framer-motion'
import { useAnimation } from '@/contexts/AnimationContext'

export function MinhaSecao() {
  const { fadeUp, reducedMotion } = useAnimation()

  return (
    <motion.div
      variants={reducedMotion ? {} : fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {/* conteúdo */}
    </motion.div>
  )
}
```

**3. Remover todas as referências ao sistema de níveis (level1/level2/level3):**
```bash
grep -rn "level1\|level2\|level3\|fidelityLevel\|hardwareConcurrency\|deviceMemory" src/
```
Para cada ocorrência, remover a lógica condicional e usar o `fadeUp` diretamente.

**Checklist:**
- [ ] `AnimationContext` simplificado com apenas `reducedMotion` + variants
- [ ] Nenhuma referência a `hardwareConcurrency` ou `deviceMemory`
- [ ] Todos os componentes usando `fadeUp` ou `fadeIn` do contexto
- [ ] `prefers-reduced-motion: reduce` desabilita animações corretamente
- [ ] `viewport={{ once: true }}` em todos os `whileInView` — anima só uma vez

---

<a name="tópico-06"></a>
## Tópico 06 — Refatorar HeroSection Completa 🔴
> **Estimativa:** 3–4h  
> **Arquivos:** `HeroSection.tsx`, `MascoteVisual.tsx`

### Filosofia

A hero é o primeiro e mais importante ponto de contato. O visitante decide em 5 segundos se vai continuar. Precisa comunicar: **quem é, o que faz, como contatar**. Nada mais.

O mascote SVG é o diferencial — ele deve ser o único elemento "vivo" na hero. Tudo o mais deve ser estático e direto.

### Layout alvo

```
┌─────────────────────────────┬──────────────────┐
│ [badge] Disponível          │                  │
│                             │   [MASCOTE SVG]  │
│ Olá, eu sou                 │   tracking cursor│
│ Gabriel Cirqueira           │   piscada olhos  │
│ (Chakra Petch, bold, 4xl+)  │                  │
│                             │                  │
│ Desenvolvedor Fullstack     │                  │
│ React & Symfony             │                  │
│ (esmeralda, 2xl)            │                  │
│                             │                  │
│ [Ver projetos]  [GitHub]    │                  │
│                             │                  │
│ 📍 Espírito Santo, BR       │                  │
└─────────────────────────────┴──────────────────┘
```

**1. Reescrever `HeroSection.tsx`:**
```tsx
// src/components/pages/home/HeroSection.tsx
import { Github, ArrowDown, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { MascoteVisual } from '@/components/ui/MascoteVisual'
import { useAnimation } from '@/contexts/AnimationContext'

export function HeroSection() {
  const { fadeUp, reducedMotion } = useAnimation()

  return (
    <section
      id="inicio"
      className="min-h-screen flex items-center px-6 max-w-6xl mx-auto"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">

        {/* Coluna esquerda */}
        <motion.div
          variants={reducedMotion ? {} : fadeUp}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Badge disponibilidade */}
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs
                           border border-emerald-500/40 text-emerald-400
                           rounded-full w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 
                             animate-pulse" />
            Disponível para projetos
          </span>

          {/* Nome */}
          <div className="space-y-1">
            <p className="text-muted-foreground text-lg">Olá, eu sou</p>
            <h1 className="font-chakra text-5xl lg:text-6xl font-bold 
                           text-foreground leading-tight">
              Gabriel<br />Cirqueira
            </h1>
          </div>

          {/* Cargo */}
          <div>
            <p className="text-emerald-400 font-chakra text-xl font-medium">
              Desenvolvedor Fullstack
            </p>
            <p className="text-muted-foreground text-lg">
              React & Symfony · Espírito Santo, BR
            </p>
          </div>

          {/* Descrição curta */}
          <p className="text-muted-foreground text-base leading-relaxed max-w-md">
            Construo sistemas web completos — do frontend ao backend,
            com foco em performance, privacidade e código limpo.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#projetos"
              className="px-5 py-2.5 bg-emerald-500 text-black font-medium
                         text-sm rounded-lg hover:bg-emerald-400 
                         transition-colors duration-200"
            >
              Ver projetos
            </a>
            <a
              href="https://github.com/GabrielCirqueira"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 border border-surface-hover text-foreground
                         text-sm rounded-lg hover:border-emerald-500/50
                         transition-colors duration-200 flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>

          {/* Localização */}
          <div className="flex items-center gap-1.5 text-muted-foreground text-sm pt-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>Espírito Santo, BR</span>
          </div>
        </motion.div>

        {/* Coluna direita — Mascote */}
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center lg:justify-end"
        >
          <MascoteVisual />
        </motion.div>

      </div>

      {/* Seta scroll */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={reducedMotion ? {} : { y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ArrowDown className="w-5 h-5 text-muted-foreground/50" />
      </motion.div>
    </section>
  )
}
```

**2. Limpar `MascoteVisual.tsx`:**
- Manter: piscada aleatória de olhos + tracking de cursor no eixo X/Y
- Remover: vibração em estado de erro (não existe "estado de erro" na hero)
- Remover: qualquer glow/sombra ao redor do mascote
- Testar se o mascote ocupa no máximo `300px × 300px` — no mobile deve sumir ou ir para baixo do texto

**3. Configurar a font Chakra Petch no Tailwind:**
```ts
// tailwind.config.ts
theme: {
  extend: {
    fontFamily: {
      chakra: ['"Chakra Petch"', 'sans-serif'],
      sans: ['Inter', 'system-ui', 'sans-serif'], // corpo de texto
    },
  },
}
```

**Checklist:**
- [ ] Hero carrega sem nenhuma animação de entrada pesada
- [ ] Nome em Chakra Petch bold, cargo em esmeralda
- [ ] Badge "Disponível" com dot pulsante (único elemento animado além do mascote)
- [ ] Mascote sem glow, sem vibração
- [ ] Botões com hover limpo (sem glow)
- [ ] Mobile: layout em coluna única, mascote abaixo do texto
- [ ] Seta de scroll com animação leve de bounce

---

<a name="tópico-07"></a>
## Tópico 07 — Refatorar ProjectsSection e Cards 🔴
> **Estimativa:** 4–5h  
> **Arquivos:** `ProjectsSection.tsx`, `src/data/projetos.ts`, novo `ProjectCard.tsx`

### O problema atual

Cards com imagem WebP de capa (peso desnecessário), glassmorphism, `AnimatePresence mode="popLayout"` causando re-renders custosos, e glow no hover. O resultado é uma seção que parece um catálogo de jogos ao invés de um portfólio de dev.

### A nova estrutura de dados

**1. Atualizar `src/data/projetos.ts`:**
```ts
// src/data/projetos.ts

export type ProjectStatus = 'producao' | 'desenvolvimento' | 'arquivado'
export type ProjectCategory = 'sistema' | 'jogo'

export interface Project {
  id: string
  name: string
  category: ProjectCategory
  description: string
  longDescription?: string
  status: ProjectStatus
  featured: boolean          // destaque na grid (card maior)
  techs: string[]
  links: {
    demo?: string
    github?: string
    case?: string
  }
  highlights?: string[]      // 2-3 pontos técnicos de destaque
}

export const projects: Project[] = [
  {
    id: 'unytools',
    name: 'UnyTools',
    category: 'sistema',
    description: 'Ecossistema unificado de produtividade com foco em privacidade.',
    longDescription: 'Plataforma com ferramentas de conversão de mídia, transcrição de áudio com IA e OCR, tudo processado localmente sem enviar dados para servidores externos.',
    status: 'producao',
    featured: true,
    techs: ['React', 'TypeScript', 'Symfony', 'PHP', 'FFmpeg', 'Whisper', 'Tesseract', 'SSE', 'Web Crypto API'],
    links: { demo: 'https://unytools.app', github: 'https://github.com/GabrielCirqueira/unytools' },
    highlights: [
      'Processamento de vídeo via FFmpeg com progresso em tempo real (SSE)',
      'Transcrição de áudio offline com Whisper AI',
      'Criptografia local via Web Crypto API — nenhum dado sai do dispositivo',
    ],
  },
  {
    id: 'spacenow',
    name: 'SpaceNow',
    category: 'sistema',
    description: 'Plataforma de visualização astronômica com dados reais da NASA.',
    status: 'producao',
    featured: true,
    techs: ['React', 'Three.js', 'Symfony', 'RabbitMQ', 'Docker', 'NASA API'],
    links: { demo: 'https://spacenow.app', github: 'https://github.com/GabrielCirqueira/spacenow' },
    highlights: [
      'Renderização 3D de planetas com Three.js',
      'Mensageria assíncrona com RabbitMQ para atualizações de dados',
      'Integração com APOD e NeoWs da NASA',
    ],
  },
  // ... outros projetos
]

export const featured = projects.filter(p => p.featured)
export const sistemas = projects.filter(p => p.category === 'sistema')
export const jogos = projects.filter(p => p.category === 'jogo')
```

**2. Criar `ProjectCard.tsx`:**
```tsx
// src/components/ui/ProjectCard.tsx
import { ExternalLink, Github, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { TechTag } from './TechTag'
import type { Project } from '@/data/projetos'

interface ProjectCardProps {
  project: Project
  featured?: boolean
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const statusLabel = {
    producao: { label: 'Em produção', color: 'text-emerald-400 border-emerald-500/30' },
    desenvolvimento: { label: 'Em desenvolvimento', color: 'text-amber-400 border-amber-500/30' },
    arquivado: { label: 'Arquivado', color: 'text-muted-foreground border-surface-hover' },
  }[project.status]

  return (
    <div className={`
      group border border-surface rounded-xl p-6 
      hover:border-emerald-500/40 transition-colors duration-300
      flex flex-col gap-4
      ${featured ? 'lg:col-span-2' : ''}
    `}>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {project.featured && (
              <Star className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
            )}
            <h3 className="font-chakra font-semibold text-foreground text-lg">
              {project.name}
            </h3>
          </div>
          <span className={`text-xs border px-2 py-0.5 rounded-full ${statusLabel.color}`}>
            {statusLabel.label}
          </span>
        </div>

        {/* Links */}
        <div className="flex gap-2 shrink-0">
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-muted-foreground hover:text-emerald-400 
                         transition-colors"
              title="Ver demo"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-muted-foreground hover:text-foreground 
                         transition-colors"
              title="Ver código"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Descrição */}
      <p className="text-muted-foreground text-sm leading-relaxed">
        {project.description}
      </p>

      {/* Highlights técnicos (só em cards featured) */}
      {featured && project.highlights && (
        <ul className="space-y-1.5">
          {project.highlights.map((h, i) => (
            <li key={i} className="text-xs text-muted-foreground flex gap-2">
              <span className="text-emerald-400 mt-0.5 shrink-0">→</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
        {project.techs.map(tech => (
          <TechTag key={tech} variant="neutral">{tech}</TechTag>
        ))}
      </div>
    </div>
  )
}
```

**3. Reescrever `ProjectsSection.tsx`:**
```tsx
// src/components/pages/home/ProjectsSection.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { sistemas, jogos } from '@/data/projetos'
import { useAnimation } from '@/contexts/AnimationContext'

type Filter = 'sistemas' | 'jogos'

export function ProjectsSection() {
  const [filter, setFilter] = useState<Filter>('sistemas')
  const { fadeUp, reducedMotion } = useAnimation()

  const current = filter === 'sistemas' ? sistemas : jogos

  return (
    <section id="projetos" className="py-24 px-6 max-w-6xl mx-auto">
      <SectionHeader number="03" title="Projetos" />

      {/* Filtros */}
      <div className="mt-8 flex gap-2">
        {(['sistemas', 'jogos'] as Filter[]).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`
              px-4 py-1.5 text-sm rounded-lg border transition-colors duration-200
              ${filter === f
                ? 'border-emerald-500/60 text-emerald-400 bg-emerald-500/10'
                : 'border-surface-hover text-muted-foreground hover:border-emerald-500/30'
              }
            `}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Grid de projetos */}
      <motion.div
        layout
        className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-5"
      >
        <AnimatePresence mode="wait">
          {current.map((project, i) => (
            <motion.div
              key={project.id}
              variants={reducedMotion ? {} : fadeUp}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ delay: i * 0.05 }}
              layout
            >
              <ProjectCard
                project={project}
                featured={project.featured && i === 0}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Link para GitHub */}
      <div className="mt-10 text-center">
        <a
          href="https://github.com/GabrielCirqueira"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:text-emerald-400 
                     transition-colors inline-flex items-center gap-1.5"
        >
          Ver mais repositórios no GitHub →
        </a>
      </div>
    </section>
  )
}
```

**Checklist:**
- [ ] Sem imagens WebP nos cards (removidas)
- [ ] `AnimatePresence mode="wait"` ao invés de `"popLayout"`
- [ ] Cards com borda, sem blur, hover com borda esmeralda
- [ ] Cards "featured" com 2 colunas e highlights técnicos
- [ ] Status do projeto visível (em produção / em desenvolvimento)
- [ ] Links de demo e GitHub funcionando
- [ ] Filtro Sistemas/Jogos com estado visual claro
- [ ] Grid responsivo: 1 coluna mobile, 2 colunas desktop

---

<a name="tópico-08"></a>
## Tópico 08 — Criar Seção de Experiência + Formação 🟢
> **Estimativa:** 2–3h  
> **Arquivos:** `ExperienceSection.tsx` (novo), `src/data/experience.ts` (novo)

### Por que isso importa

Recrutadores olham experiência profissional antes de projetos pessoais. Não ter isso destacado é desperdiçar a oportunidade do Trainee na Simonetti.

**1. Criar `src/data/experience.ts`:**
```ts
// src/data/experience.ts

export interface ExperienceItem {
  id: string
  type: 'work' | 'education'
  title: string
  organization: string
  period: string
  current: boolean
  description: string
  techs?: string[]
}

export const experiences: ExperienceItem[] = [
  {
    id: 'simonetti',
    type: 'work',
    title: 'Trainee — Desenvolvimento',
    organization: 'Móveis Simonetti',
    period: '2024 – presente',
    current: true,
    description: 'Desenvolvimento e manutenção de sistemas internos. Trabalho com PHP, React e integrações com APIs de fornecedores.',
    techs: ['PHP', 'React', 'MySQL', 'REST APIs'],
  },
]

export const education: ExperienceItem[] = [
  {
    id: 'tecnico',
    type: 'education',
    title: 'Técnico em Internet',
    organization: 'Escola Técnica / IFES',
    period: '2022 – 2024',
    current: false,
    description: 'Formação técnica em desenvolvimento web, redes e banco de dados.',
    techs: ['PHP', 'HTML', 'CSS', 'MySQL', 'JavaScript'],
  },
  {
    id: 'robotica',
    type: 'education',
    title: 'Etapa Nacional — Robótica',
    organization: 'Olimpíada Brasileira de Robótica',
    period: '2023',
    current: false,
    description: 'Representação em competição nacional de robótica educacional.',
  },
]
```

**2. Criar `ExperienceSection.tsx`:**
```tsx
// src/components/pages/home/ExperienceSection.tsx
import { Briefcase, GraduationCap } from 'lucide-react'
import { motion } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { TechTag } from '@/components/ui/TechTag'
import { experiences, education } from '@/data/experience'
import { useAnimation } from '@/contexts/AnimationContext'

function TimelineItem({ item, index }: { item: ExperienceItem; index: number }) {
  const { fadeUp, reducedMotion } = useAnimation()

  return (
    <motion.div
      variants={reducedMotion ? {} : fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="border border-surface rounded-xl p-5 
                 hover:border-emerald-500/30 transition-colors duration-300"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <h4 className="text-foreground font-medium text-sm">{item.title}</h4>
          <p className="text-emerald-400 text-sm">{item.organization}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-muted-foreground text-xs">{item.period}</p>
          {item.current && (
            <span className="text-xs text-emerald-400 border border-emerald-500/30 
                             px-2 py-0.5 rounded-full mt-1 inline-block">
              Atual
            </span>
          )}
        </div>
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed mb-3">
        {item.description}
      </p>
      {item.techs && (
        <div className="flex flex-wrap gap-1.5">
          {item.techs.map(t => (
            <TechTag key={t} variant="neutral">{t}</TechTag>
          ))}
        </div>
      )}
    </motion.div>
  )
}

export function ExperienceSection() {
  return (
    <section id="experiencia" className="py-24 px-6 max-w-6xl mx-auto">
      <SectionHeader number="04" title="Experiência & Formação" />

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Experiências profissionais */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <Briefcase className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-foreground font-medium">Experiências</h3>
          </div>
          <div className="space-y-4">
            {experiences.map((item, i) => (
              <TimelineItem key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* Formação */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <GraduationCap className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-foreground font-medium">Formação</h3>
          </div>
          <div className="space-y-4">
            {education.map((item, i) => (
              <TimelineItem key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
```

**3. Registrar na lista de seções do `index.ts`:**
```ts
// src/components/pages/home/index.ts
export { HeroSection } from './HeroSection'
export { AboutSection } from './AboutSection'
export { SkillsSection } from './SkillsSection'
export { ProjectsSection } from './ProjectsSection'
export { ExperienceSection } from './ExperienceSection'  // ← novo
export { ContactSection } from './ContactSection'
```

**Checklist:**
- [ ] `src/data/experience.ts` com dados reais preenchidos
- [ ] Dois cards para Trainee Simonetti (com período e techs)
- [ ] Badge "Atual" no item de experiência corrente
- [ ] Grid 2 colunas desktop, 1 coluna mobile
- [ ] Seção registrada no `index.ts` e adicionada ao `Home` na ordem correta
- [ ] Link de navegação "Experiência" adicionado ao menu

---

<a name="tópico-09"></a>
## Tópico 09 — Padronizar Design System Completo 🟡
> **Estimativa:** 3–4h  
> **Arquivos:** `SectionHeader.tsx` (novo), `tailwind.config.ts`, `src/index.css`, todos os componentes

### O problema

Cada seção provavelmente foi construída em momentos diferentes, com estilos levemente inconsistentes — título com tamanhos diferentes, espaçamentos variados, bordas com opacidades diferentes. Isso cria a sensação de "site montado" ao invés de "design coeso".

### Passos

**1. Criar `SectionHeader.tsx` — usado em TODAS as seções:**
```tsx
// src/components/ui/SectionHeader.tsx
import { motion } from 'framer-motion'
import { useAnimation } from '@/contexts/AnimationContext'

interface SectionHeaderProps {
  number: string   // "01", "02", etc.
  title: string
  subtitle?: string
}

export function SectionHeader({ number, title, subtitle }: SectionHeaderProps) {
  const { fadeUp, reducedMotion } = useAnimation()

  return (
    <motion.div
      variants={reducedMotion ? {} : fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-4">
        <span className="font-chakra text-emerald-400 font-medium text-base">
          {number}.
        </span>
        <h2 className="font-chakra text-2xl lg:text-3xl font-bold text-foreground">
          {title}
        </h2>
        {/* Linha divisória */}
        <div className="flex-1 h-px bg-surface-hover max-w-xs hidden sm:block" />
      </div>
      {subtitle && (
        <p className="mt-3 text-muted-foreground text-base leading-relaxed max-w-xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
```

**2. Atualizar `tailwind.config.ts` com tokens consistentes:**
```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        chakra: ['"Chakra Petch"', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Não sobrescreve as cores do Tailwind — adiciona aliases semânticos
        emerald: {
          400: 'hsl(160, 84%, 55%)',
          500: 'hsl(173, 100%, 39%)',
        },
        surface: {
          DEFAULT: 'hsl(240, 5%, 10%)',   // bg dos cards
          hover: 'hsl(240, 5%, 15%)',     // borda padrão dos cards
        },
        foreground: {
          DEFAULT: 'hsl(0, 0%, 95%)',     // texto principal
        },
        background: {
          DEFAULT: 'hsl(240, 10%, 3.9%)', // fundo da página
        },
      },
      maxWidth: {
        content: '72rem', // 1152px — container padrão de todas as seções
      },
    },
  },
  plugins: [],
} satisfies Config
```

**3. Limpar e reorganizar `src/index.css`:**
```css
/* src/index.css — versão limpa */
@import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500;600;700&family=Inter:wght@400;500&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
    scroll-padding-top: 80px; /* compensa o header fixo */
  }

  body {
    background: hsl(240, 10%, 3.9%);
    color: hsl(0, 0%, 95%);
    font-family: 'Inter', system-ui, sans-serif;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }

  /* Scrollbar personalizada */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: hsl(240, 10%, 3.9%); }
  ::-webkit-scrollbar-thumb {
    background: hsl(240, 5%, 20%);
    border-radius: 3px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: hsl(173, 100%, 39%, 0.5);
  }

  /* Seleção de texto */
  ::selection {
    background: hsl(173, 100%, 39%, 0.3);
    color: hsl(0, 0%, 95%);
  }
}

@layer utilities {
  /* Helpers semânticos — usar nos componentes */
  .text-muted-foreground { color: hsl(240, 5%, 55%); }
  .bg-surface { background: hsl(240, 5%, 10%); }
  .border-surface { border-color: hsl(240, 5%, 15%); }
  .border-surface-hover { border-color: hsl(240, 5%, 20%); }
}

/* REMOVER: tudo que estava abaixo relacionado a blur, glow, scanlines, matrix */
```

**4. Espaçamento vertical consistente em TODAS as seções:**
```tsx
// Padrão a adotar em TODAS as seções — sem exceção
<section className="py-24 px-6 max-w-content mx-auto">
  {/* py-24 = 96px top e bottom */}
  {/* px-6 = 24px lateral */}
  {/* max-w-content mx-auto = container centralizado */}
</section>
```

**5. Auditoria de consistência — rodar após as mudanças:**
```bash
# Verificar se há py- diferentes entre seções
grep -rn "py-[0-9]" src/components/pages/
# Deve aparecer apenas py-24 — ajustar os que fugirem

# Verificar se há max-w diferentes
grep -rn "max-w-" src/components/pages/
# Deve aparecer apenas max-w-content ou max-w-6xl
```

**Checklist:**
- [ ] `SectionHeader` criado e implementado em todas as 6+ seções
- [ ] Numeração consistente: 01 Hero, 02 Sobre, 03 Habilidades, 04 Projetos, 05 Experiência, 06 Contato
- [ ] Fonts: Chakra Petch em títulos, Inter no corpo
- [ ] Espaçamento `py-24` em todas as seções sem exceção
- [ ] `src/index.css` sem nenhum keyframe de glow/blur/scanline
- [ ] Scrollbar personalizada esmeralda funcionando
- [ ] Seleção de texto com cor esmeralda

---

<a name="tópico-10"></a>
## Tópico 10 — Auditoria Final: Bundle, SEO, Acessibilidade e Deploy 🟢
> **Estimativa:** 3–4h  
> **Arquivos:** `index.html`, `vercel.json`, `vite.config.ts`

### Bundle Analysis

**1. Instalar e rodar o analisador:**
```bash
npm install -D rollup-plugin-visualizer
```
```ts
// vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
      gzipSize: true,
      filename: 'dist/bundle-analysis.html',
    }),
  ],
})
```
```bash
npm run build
# Vai abrir o bundle-analysis.html automaticamente
```

**2. O que buscar e corrigir no bundle:**
```ts
// ❌ Import inteiro do Framer Motion (pesado)
import { motion, AnimatePresence, useAnimation } from 'framer-motion'

// ✅ Import específico (tree-shakeable)
import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'
```

```ts
// ❌ Import inteiro do Lucide (cada ícone é um componente)
import * as Icons from 'lucide-react'

// ✅ Imports específicos
import { Github, ExternalLink, MapPin } from 'lucide-react'
```

**3. Lazy loading de seções com React.lazy:**
```tsx
// src/pages/Home.tsx
import { lazy, Suspense } from 'react'
import { HeroSection } from '@/components/pages/home/HeroSection' // hero carrega direto

// Seções abaixo do fold carregam sob demanda
const AboutSection = lazy(() => import('@/components/pages/home/AboutSection').then(m => ({ default: m.AboutSection })))
const SkillsSection = lazy(() => import('@/components/pages/home/SkillsSection').then(m => ({ default: m.SkillsSection })))
const ProjectsSection = lazy(() => import('@/components/pages/home/ProjectsSection').then(m => ({ default: m.ProjectsSection })))
const ExperienceSection = lazy(() => import('@/components/pages/home/ExperienceSection').then(m => ({ default: m.ExperienceSection })))
const ContactSection = lazy(() => import('@/components/pages/home/ContactSection').then(m => ({ default: m.ContactSection })))

export function Home() {
  return (
    <main>
      <HeroSection />
      <Suspense fallback={null}>
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </Suspense>
    </main>
  )
}
```

### SEO — Meta Tags Estáticas no HTML

**4. Atualizar `index.html`:**
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- Primary Meta Tags -->
  <title>Gabriel Cirqueira — Desenvolvedor Fullstack React & Symfony</title>
  <meta name="title" content="Gabriel Cirqueira — Desenvolvedor Fullstack React & Symfony" />
  <meta name="description" content="Portfólio de Gabriel Cirqueira, desenvolvedor fullstack de 18 anos especializado em React, TypeScript e Symfony. Projetos com FFmpeg, Three.js, IA e Docker. Espírito Santo, BR." />
  <meta name="keywords" content="desenvolvedor fullstack, React, Symfony, PHP, TypeScript, Espírito Santo" />
  <meta name="author" content="Gabriel Cirqueira" />

  <!-- Open Graph / Facebook / LinkedIn -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://cirqueira.com/" />
  <meta property="og:title" content="Gabriel Cirqueira — Desenvolvedor Fullstack" />
  <meta property="og:description" content="Desenvolvedor fullstack de 18 anos. React, TypeScript, Symfony, Docker. Construo sistemas com FFmpeg, Whisper AI e Three.js." />
  <meta property="og:image" content="https://cirqueira.com/og-image.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:locale" content="pt_BR" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="https://cirqueira.com/" />
  <meta name="twitter:title" content="Gabriel Cirqueira — Desenvolvedor Fullstack" />
  <meta name="twitter:description" content="Desenvolvedor fullstack de 18 anos. React, TypeScript, Symfony, Docker." />
  <meta name="twitter:image" content="https://cirqueira.com/og-image.png" />

  <!-- Preload de fontes críticas -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@700&family=Inter:wght@400;500&display=swap" rel="stylesheet" />

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

  <!-- JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Gabriel Cirqueira",
    "jobTitle": "Desenvolvedor Fullstack",
    "url": "https://cirqueira.com",
    "email": "gabrielcirqueira711@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "Espírito Santo",
      "addressCountry": "BR"
    },
    "knowsAbout": ["React", "TypeScript", "Symfony", "PHP", "Docker", "Three.js"],
    "sameAs": [
      "https://github.com/GabrielCirqueira",
      "https://linkedin.com/in/gabriel-cirqueira-barbosa"
    ]
  }
  </script>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>
```

**5. Gerar `og-image.png`:**
Criar uma imagem 1200×630px com:
- Fundo preto `hsl(240, 10%, 3.9%)`
- Nome em branco bold: "Gabriel Cirqueira"
- Cargo em esmeralda: "Desenvolvedor Fullstack"
- Stack em tags pill: React · Symfony · TypeScript · Docker
- URL no canto inferior: `cirqueira.com`

Ferramenta gratuita: [og-image.vercel.app](https://og-image.vercel.app) ou usar o Figma.

**6. Configurar `vercel.json`:**
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ]
}
```

### Acessibilidade

**7. Checklist de acessibilidade mínima:**
```tsx
// Todo ícone interativo sem texto visível precisa de aria-label
<a href="..." aria-label="Ver projeto UnyTools no GitHub">
  <Github className="w-4 h-4" />
</a>

// Imagens precisam de alt
<img src="..." alt="Screenshot do UnyTools" />

// Foco visível nos botões (não remover outline)
// Adicionar no CSS:
:focus-visible {
  outline: 2px solid hsl(173, 100%, 39%);
  outline-offset: 2px;
  border-radius: 4px;
}
```

### Testes Finais

**8. Rodar Lighthouse localmente:**
```bash
npm run build
npm run preview
# Em outra aba do terminal:
npx lighthouse http://localhost:4173 --view
```
Metas:
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 95
- SEO: > 90

**9. Testar Open Graph:**
- [opengraph.xyz/url/https://cirqueira.com](https://opengraph.xyz)
- Deve mostrar a `og-image.png` com título e descrição corretos

**10. Testar responsividade:**
```
320px  → celular pequeno (iPhone SE)
375px  → iPhone 14
768px  → iPad
1024px → laptop
1440px → desktop padrão
```

**Checklist:**
- [ ] Bundle analysis rodou — nenhum chunk > 200KB
- [ ] Framer Motion importado por módulo (sem `import *`)
- [ ] Seções abaixo do fold com `React.lazy`
- [ ] `index.html` com todas as meta tags preenchidas
- [ ] `og-image.png` gerada e testada no opengraph.xyz
- [ ] `vercel.json` com cache de assets configurado
- [ ] `aria-label` em todos os ícones sem texto
- [ ] `:focus-visible` com outline esmeralda
- [ ] Lighthouse Performance > 90
- [ ] Lighthouse Accessibility > 95

---

## 📊 Resumo Executivo

| # | Tópico | Prioridade | Estimativa | Impacto |
|---|--------|-----------|------------|---------|
| 01 | Remover glassmorphism e glow | 🔴 Crítico | 2–3h | Elimina o lag |
| 02 | Remover EasterEgg | 🟡 Alto | 1h | Limpa o bundle |
| 03 | Substituir Terminal | 🟡 Alto | 2h | Conteúdo real |
| 04 | Substituir BarraHabilidade | 🟡 Alto | 2–3h | Credibilidade |
| 05 | Simplificar AnimationContext | 🟡 Alto | 2h | Código limpo |
| 06 | Refatorar HeroSection | 🔴 Crítico | 3–4h | Primeira impressão |
| 07 | Refatorar ProjectsSection | 🔴 Crítico | 4–5h | Core do portfólio |
| 08 | Seção Experiência | 🟢 Médio | 2–3h | Contexto profissional |
| 09 | Design System completo | 🟡 Alto | 3–4h | Coesão visual |
| 10 | Bundle, SEO e Deploy | 🟢 Médio | 3–4h | Distribuição |
| **Total** | | | **~24–34h** | |

---

## 🔄 Ordem Recomendada de Execução

```
Semana 1 — Performance (sentir resultado rápido)
  01 → Glassmorphism/Glow     (2–3h)
  02 → EasterEgg              (1h)
  05 → AnimationContext       (2h)

Semana 2 — Conteúdo e Visual
  03 → Terminal → Texto       (2h)
  04 → Barras → Tags          (2–3h)
  09 → Design System          (3–4h)

Semana 3 — Seções Principais
  06 → HeroSection            (3–4h)
  07 → ProjectsSection        (4–5h)

Semana 4 — Finalização
  08 → Experiência            (2–3h)
  10 → Bundle/SEO/Deploy      (3–4h)
```

---

## ⚠️ Regras para Não Quebrar a Identidade

1. **Paleta esmeralda + roxo nunca muda** — apenas a frequência de uso
2. **Mascote SVG é intocável** — só remove glow e vibração de erro
3. **Chakra Petch permanece** — mas só em títulos e nome
4. **Fundo preto profundo permanece** — `hsl(240, 10%, 3.9%)`
5. **Framer Motion permanece** — mas apenas com `fadeUp` simples

---

*Gerado em Abril de 2026 · v2.0 · Portfólio cirqueira.com*