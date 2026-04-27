import { ExternalLink, Github } from 'lucide-react'
import type { Projeto } from '@/types/projeto'
import { TechTag } from './TechTag'

interface ProjectCardProps {
  projeto: Projeto
}

export function ProjectCard({ projeto }: ProjectCardProps) {
  return (
    <div className="group border border-zinc-800 bg-zinc-900/20 rounded-xl p-6 hover:border-brand-500/40 transition-all duration-300 flex flex-col gap-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-brand-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="flex items-start justify-between gap-4 relative z-10">
        <div className="space-y-2">
          <h3 className="font-chakra font-bold text-white text-xl uppercase tracking-tight">
            {projeto.titulo}
          </h3>
        </div>

        <div className="flex gap-2 shrink-0">
          {projeto.link && (
            <a
              href={projeto.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-zinc-900 text-zinc-400 hover:text-brand-400 border border-zinc-800 rounded-lg transition-all"
              title="Ver demo"
            >
              <ExternalLink className="w-4.5 h-4.5" />
            </a>
          )}
          {projeto.gitHub && (
            <a
              href={projeto.gitHub}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 rounded-lg transition-all"
              title="Ver código"
            >
              <Github className="w-4.5 h-4.5" />
            </a>
          )}
        </div>
      </div>

      <p className="text-zinc-400 text-sm leading-relaxed relative z-10">{projeto.descricao}</p>

      <div className="flex flex-wrap gap-1.5 mt-auto pt-4 relative z-10">
        {projeto.tecnologias.map((tech) => (
          <TechTag key={tech} variant="neutral">
            {tech}
          </TechTag>
        ))}
      </div>
    </div>
  )
}
