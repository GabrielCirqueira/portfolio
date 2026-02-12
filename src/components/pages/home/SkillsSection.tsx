import { motion } from 'framer-motion'
import { Cloud, Layout, Server, Wrench } from 'lucide-react'
import { memo } from 'react'
import { SkillsGrid } from '@/components/responsive/SkillsGrid'
import { Badge } from '@/shadcn/components/ui/badge'
import { Box, Container, VStack } from '@/shadcn/components/ui/layout'
import { Text, Title } from '@/shadcn/components/ui/typography'

const skills = [
  {
    category: 'Frontend',
    description:
      'Criação de interfaces modernas, responsivas e com foco em experiência do usuário.',
    icon: Layout,
    technologies: [
      'TypeScript',
      'React',
      'Vite',
      'Tailwind CSS',
      'Chakra UI / Shadcn',
      'Framer Motion',
    ],
  },
  {
    category: 'Backend',
    description: 'Desenvolvimento de APIs robustas, seguras e escaláveis.',
    icon: Server,
    technologies: ['PHP', 'SQL', 'Symfony', 'FastAPI', 'REST APIs', 'JWT / Auth'],
  },
  {
    category: 'Infraestrutura & Deploy',
    description:
      'Além do desenvolvimento, realizo a configuração de ambientes de produção, VPS, DNS, Nginx e deploy de aplicações.',
    icon: Cloud,
    technologies: [
      'VPS / Linux',
      'Nginx / Proxy',
      'DNS & Domínios',
      'SSL / HTTPS',
      'Docker / Compose',
      'Deploy WEB',
    ],
  },
  {
    category: 'Ferramentas',
    description: 'Utilitários e plataformas essenciais para workflow, versionamento e testes.',
    icon: Wrench,
    technologies: ['Git / GitHub', 'Shell', 'Postman / Insomnia', 'VS Code', 'RabbitMQ', 'Grafana'],
  },
]

export const SkillsSection = memo(() => {
  return (
    <Box
      id="habilidades"
      className="py-12 sm:py-16 md:py-20 lg:py-24 relative bg-black font-sans overflow-hidden"
    >
      <Container size="xl" className="relative z-10 px-4">
        <VStack className="items-center text-center gap-3 sm:gap-4 mb-10 sm:mb-12 md:mb-14 lg:mb-20 px-3 sm:px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="outline"
              className="
                border-brand-500/30 text-brand-500
                uppercase tracking-widest text-xs font-mono
                px-4 py-1.5 bg-brand-500/5 backdrop-blur-md
                shadow-[0_0_15px_var(--tw-shadow-color)]
                shadow-brand-500/10
              "
            >
              Habilidades
            </Badge>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Title className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight font-heading">
              Stack & <span className="text-gradient">Ferramentas</span>
            </Title>
            <Text className="text-gray-400 mt-3 sm:mt-4 md:mt-6 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-3">
              Trabalho com um conjunto de tecnologias modernas voltadas à criação de aplicações web
              performáticas, escaláveis e bem estruturadas. Busco sempre utilizar ferramentas que
              facilitem manutenção, colaboração e evolução contínua dos sistemas.
            </Text>
          </motion.div>
        </VStack>

        <SkillsGrid skills={skills} />
      </Container>
    </Box>
  )
})
