import { useIsMobile } from '@app/hooks/useMediaQuery'
import { motion } from 'framer-motion'
import { lazy, memo, Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import { SkillsGrid } from '@/components/responsive/SkillsGrid'
import { useAnimation } from '@/contexts'
import { skills, techIcons } from '@/data/habilidades'
import { Badge } from '@/shadcn/components/ui/badge'
import { Box, Center, Container, VStack } from '@/shadcn/components/ui/layout'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shadcn/components/ui/tooltip'
import { Text, Title } from '@/shadcn/components/ui/typography'

const Marquee = lazy(() => import('react-fast-marquee'))

export const SkillsSection = memo(() => {
  const isMobile = useIsMobile()
  const { viewport, duration, getDelay, ehDispositivoLento } = useAnimation()
  const [openTooltipIndex, setOpenTooltipIndex] = useState<number | null>(null)

  useEffect(() => {
    if (!isMobile) return

    const handleClickOutside = () => {
      setOpenTooltipIndex(null)
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMobile])

  const handleTooltipClick = useCallback(
    (index: number, e: React.MouseEvent) => {
      if (!isMobile) return
      e.stopPropagation()
      setOpenTooltipIndex((prev) => (prev === index ? null : index))
    },
    [isMobile]
  )

  const marqueeSpeed = useMemo(() => (ehDispositivoLento ? 30 : 50), [ehDispositivoLento])

  return (
    <Box
      as="section"
      id="habilidades"
      className="py-16 sm:py-20 md:py-24 lg:py-28 relative bg-black font-sans overflow-hidden"
    >
      <Container size="xl" className="relative z-10 px-4 sm:px-6">
        <VStack className="items-center text-center gap-4 sm:gap-5 mb-12 sm:mb-14 md:mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, scale: ehDispositivoLento ? 0.9 : 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewport}
            transition={{ duration }}
          >
            <Badge
              variant="outline"
              className="
                border-brand-500/40 text-brand-400
                uppercase tracking-wider text-xs font-semibold
                px-5 py-2 bg-brand-500/10 backdrop-blur-md
                shadow-lg shadow-brand-500/10 rounded-full
              "
            >
              Habilidades
            </Badge>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: ehDispositivoLento ? 10 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration, delay: getDelay(0.1) }}
            className="space-y-4"
          >
            <Title
              as="h2"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight font-heading"
            >
              Stack & <span className="text-gradient">Ferramentas</span>
            </Title>
            <Box className="w-20 sm:w-24 h-1 bg-brand-500 mx-auto rounded-full opacity-60" />
            <Text className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-4 leading-relaxed">
              Trabalho com um conjunto de tecnologias modernas voltadas à criação de aplicações web
              performáticas, escaláveis e bem estruturadas.
            </Text>
          </motion.div>
        </VStack>

        <SkillsGrid skills={skills} />

        <Box className="mt-16 sm:mt-20 md:mt-24 lg:mt-28 relative">
          <TooltipProvider delayDuration={200}>
            <Suspense fallback={<Box className="h-16" />}>
              <Marquee
                speed={marqueeSpeed}
                gradient
                gradientColor="#000000"
                gradientWidth={100}
                pauseOnHover={!ehDispositivoLento}
              >
                {techIcons.map((tech, index) => (
                  <Tooltip
                    key={index}
                    open={isMobile ? openTooltipIndex === index : undefined}
                    onOpenChange={isMobile ? undefined : undefined}
                  >
                    <TooltipTrigger asChild>
                      <Center
                        onClick={(e) => handleTooltipClick(index, e)}
                        className="
                            flex-shrink-0 px-4 sm:px-6 lg:px-8 py-4 sm:py-5
                            transition-all duration-300
                            group cursor-pointer
                          "
                      >
                        <tech.Icon
                          size={isMobile ? 32 : 42}
                          color={tech.color}
                          className="group-hover:scale-125 transition-transform duration-300"
                        />
                      </Center>
                    </TooltipTrigger>
                    <TooltipContent className="bg-zinc-900 border-zinc-800 max-w-sm">
                      <Text className="text-sm font-bold text-brand-400 mb-1">{tech.name}</Text>
                      <Text className="text-xs text-zinc-400">{tech.description}</Text>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </Marquee>
            </Suspense>
          </TooltipProvider>
        </Box>
      </Container>
    </Box>
  )
})
