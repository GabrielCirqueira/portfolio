import { motion } from 'framer-motion'
import { memo, Suspense } from 'react'
import { EducationGrid } from '@/components/responsive/EducationGrid'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { useAnimation } from '@/contexts'
import { conquistas, experiencias, formacao, palavrasChaveCarreira } from '@/data/educacao'
import { Box, Container } from '@/shadcn/components/ui/layout'
import { Text } from '@/shadcn/components/ui/typography'
import { lazyWithRetry } from '@/utils/importRetry'

const Marquee = lazyWithRetry(() => import('react-fast-marquee'))

export const EducationSection = memo(() => {
  const { reducedMotion } = useAnimation()

  return (
    <Box as="section" id="formacao" className="py-24 bg-black relative overflow-hidden">
      <Container size="xl" className="relative z-10 px-6">
        <SectionHeader
          number="05"
          title="Experiência & Formação"
          subtitle="Meu percurso acadêmico e profissional na área de tecnologia, focando em desenvolvimento fullstack e inovação."
        />

        <div className="mt-16">
          <EducationGrid formacao={formacao} experiencias={experiencias} conquistas={conquistas} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20 max-w-3xl mx-auto text-center"
        >
          <Text className="text-zinc-400 text-sm sm:text-base md:text-lg leading-relaxed">
            Busco constantemente novas oportunidades de aprendizado para continuar evoluindo no
            campo da tecnologia.
          </Text>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 relative"
        >
          {!reducedMotion && (
            <>
              <Box className="absolute inset-y-0 left-0 w-20 sm:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
              <Box className="absolute inset-y-0 right-0 w-20 sm:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
              <Box className="border-y border-zinc-800/50 py-5">
                <Suspense fallback={<Box className="h-12" />}>
                  <Marquee speed={25} gradient={false} direction="right">
                    {palavrasChaveCarreira.map((palavraChave, index) => (
                      <Box key={index} className="flex items-center mx-4 sm:mx-6">
                        <Text className="text-xs sm:text-sm text-zinc-700 uppercase tracking-wider font-mono font-semibold whitespace-nowrap">
                          {palavraChave}
                        </Text>
                        <Box className="w-1.5 h-1.5 rounded-full bg-brand-500/40 ml-4 sm:ml-6" />
                      </Box>
                    ))}
                  </Marquee>
                </Suspense>
              </Box>
            </>
          )}
        </motion.div>
      </Container>
    </Box>
  )
})

EducationSection.displayName = 'EducationSection'
