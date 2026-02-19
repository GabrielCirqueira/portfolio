import { motion } from 'framer-motion'
import { lazy, memo, Suspense } from 'react'
import { EducationGrid } from '@/components/responsive/EducationGrid'
import { conquistas, experiencias, formacao, palavrasChaveCarreira } from '@/data/educacao'
import { useDispositivoMovel } from '@/hooks/useDispositivoMovel'
import { Badge } from '@/shadcn/components/ui/badge'
import { Box, Container } from '@/shadcn/components/ui/layout'
import { Span, Text, Title } from '@/shadcn/components/ui/typography'

const Marquee = lazy(() => import('react-fast-marquee'))

export const EducationSection = memo(() => {
  const ehMovel = useDispositivoMovel()

  return (
    <Box
      as="section"
      id="formacao"
      className="py-16 sm:py-20 md:py-24 lg:py-28 bg-black relative font-sans overflow-hidden"
    >
      <Container size="xl" className="relative z-10 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-14 md:mb-16 lg:mb-20 space-y-4"
        >
          <Badge
            variant="outline"
            className="
              px-5 py-2 border-brand-500/40
              text-brand-400 uppercase tracking-wider
              text-xs font-semibold bg-brand-500/10
              backdrop-blur-sm shadow-lg shadow-brand-500/10
              rounded-full
            "
          >
            Formação
          </Badge>
          <Title
            as="h2"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-heading uppercase tracking-tight"
          >
            Formação e <Span className="text-gradient">Experiência</Span>
          </Title>
          <Box className="w-20 sm:w-24 h-1 bg-brand-500 mx-auto rounded-full opacity-60" />
          <Text className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-4 leading-relaxed">
            Meu percurso acadêmico e profissional na área de tecnologia.
          </Text>
        </motion.div>

        <EducationGrid formacao={formacao} experiencias={experiencias} conquistas={conquistas} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 sm:mt-20 max-w-3xl mx-auto text-center"
        >
          <Badge
            className="
              mb-6 bg-transparent text-brand-400
              border border-brand-500/40
              uppercase tracking-wider font-semibold text-xs
              px-5 py-2 active:bg-brand-500
              active:text-black transition-all
              backdrop-blur-sm rounded-full
            "
          >
            Sempre em evolução
          </Badge>
          <Text className="text-zinc-400 text-sm sm:text-base md:text-lg px-4 leading-relaxed">
            Busco constantemente novas oportunidades de aprendizado para continuar evoluindo no
            campo da tecnologia.
          </Text>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 sm:mt-20 relative"
        >
          {!ehMovel && (
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
