import { motion } from 'framer-motion'
import { Cloud, Layout, Server, Wrench } from 'lucide-react'
import { memo } from 'react'
import { SectionHeader } from '@/components/responsive/SectionHeader'
import { SkillCard } from '@/components/responsive/SkillCard'
import { Box, Container, VStack } from '@/shadcn/components/ui/layout'

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

export const SkillsSection = memo(() => {
  return (
    <Box
      id="habilidades"
      className="py-12 sm:py-16 md:py-20 lg:py-24 relative bg-black font-sans overflow-hidden"
    >
      <Container size="xl" className="relative z-10 px-4">
        <VStack className="items-center text-center gap-3 sm:gap-4 mb-10 sm:mb-12 md:mb-14 lg:mb-20 px-3 sm:px-4">
          <SectionHeader
            badge="Habilidades"
            title={
              <>
                Stack & <span className="text-gradient">Ferramentas</span>
              </>
            }
            subtitle="Trabalho com um conjunto de tecnologias modernas voltadas à criação de aplicações web performáticas, escaláveis e bem estruturadas. Busco sempre utilizar ferramentas que facilitem manutenção, colaboração e evolução contínua dos sistemas."
            className="mb-10 sm:mb-12 md:mb-14 lg:mb-20"
          />
        </VStack>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
        >
          {skills.map((skill) => (
            <SkillCard key={skill.category} skill={skill} variants={itemVariants} />
          ))}
        </motion.div>
      </Container>
    </Box>
  )
})
