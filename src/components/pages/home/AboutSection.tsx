import { motion } from 'framer-motion'
import { memo } from 'react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { TechTag } from '@/components/ui/TechTag'
import { useAnimation } from '@/contexts'
import { Box, Container } from '@/shadcn/components/ui/layout'

export const AboutSection = memo(() => {
  const { fadeUp, reducedMotion } = useAnimation()

  return (
    <Box as="section" id="sobre" className="py-24 relative bg-black overflow-hidden">
      <Box className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-500/5 via-transparent to-transparent pointer-events-none" />

      <Container size="xl" className="relative z-10 px-6">
        <SectionHeader number="02" title="Sobre" />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            variants={reducedMotion ? {} : fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="space-y-6"
          >
            <p className="text-white text-lg md:text-xl leading-relaxed font-medium">
              Sou Gabriel Cirqueira, desenvolvedor fullstack de 20 anos do Espírito Santo. Trabalho
              com{' '}
              <span className="text-brand-400 font-bold border-b-2 border-brand-500/20">
                React, TypeScript, php e Symfony
              </span>{' '}
              há mais de 4 anos — construindo desde interfaces de alta fidelidade até arquiteturas
              de backend robustas.
            </p>

            <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
              Minha jornada começou em 2022 com C e PHP, evoluindo rapidamente para o ecossistema
              moderno de PHP. Hoje desenvolvo sistemas complexos como o <strong>UnyTools</strong> —
              que utiliza processamento inteligente de mídia — e plataformas inovadoras como o{' '}
              <strong>SpaceNow</strong>.
            </p>

            <p className="text-zinc-500 text-base md:text-lg leading-relaxed">
              Atualmente atuo como desenvolvedor web na Móveis Simonetti, onde aplico na prática
              metodologias ágeis e padrões de projeto em um ambiente de produção real, sempre
              buscando a excelência técnica e o código limpo.
            </p>

            <div className="flex flex-wrap gap-2.5 pt-4">
              {[
                'React',
                'TypeScript',
                'Symfony',
                'PHP',
                'Python',
                'Docker',
                'PostgreSQL',
                'Tailwind',
              ].map((tech) => (
                <TechTag
                  key={tech}
                  variant={tech === 'Symfony' || tech === 'PHP' ? 'emerald' : 'neutral'}
                >
                  {tech}
                </TechTag>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={reducedMotion ? {} : fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="space-y-6"
          >
            <div className="group border border-zinc-800 bg-zinc-900/30 rounded-2xl p-6 sm:p-8 hover:border-brand-500/40 transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-brand-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <p className="text-brand-400 text-xs font-black uppercase tracking-[0.2em] mb-4">
                O que eu faço
              </p>
              <ul className="text-zinc-300 text-sm md:text-base space-y-4 leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-brand-500 font-bold">→</span>
                  <span>
                    Sistemas web fullstack com <strong>React</strong> + <strong>Symfony</strong> e
                    typecript
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-500 font-bold">→</span>
                  <span>
                    Automações e processamento de mídia com <strong>Python</strong>
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-500 font-bold">→</span>
                  <span>APIs RESTful com autenticação JWT e Doctrine ORM</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-500 font-bold">→</span>
                  <span>
                    Ambientes escaláveis e containerizados com <strong>Docker</strong>
                  </span>
                </li>
              </ul>
            </div>

            <div className="group border border-zinc-800 bg-zinc-900/30 rounded-2xl p-6 sm:p-8 hover:border-purple-500/40 transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <p className="text-purple-400 text-xs font-black uppercase tracking-[0.2em] mb-4">
                Forma de trabalho
              </p>
              <ul className="text-zinc-300 text-sm md:text-base space-y-4 leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-purple-500 font-bold">→</span>
                  <span>Código limpo, tipado e auto-documentado</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-500 font-bold">→</span>
                  <span>Commits padronizados e versionamento semântico</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-500 font-bold">→</span>
                  <span>Foco em performance e acessibilidade (SEO)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-500 font-bold">→</span>
                  <span>Metodologias ágeis e entrega contínua</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </Container>
    </Box>
  )
})

AboutSection.displayName = 'AboutSection'
