import { motion } from 'framer-motion'
import { Cloud, Layout, Server, Wrench } from 'lucide-react'
import { memo } from 'react'
import { Badge } from '@/shadcn/components/ui/badge'
import { Icon } from '@/shadcn/components/ui/icon'
import { Box, Container, HStack, VStack } from '@/shadcn/components/ui/layout'
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
    <Box id="habilidades" className="py-24 relative bg-black font-sans overflow-hidden">
      <Container size="xl" className="relative z-10 px-4">
        <VStack className="items-center text-center gap-4 mb-20">
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
            <Title className="text-4xl md:text-5xl font-bold uppercase tracking-tight font-heading">
              Stack & <span className="text-gradient">Ferramentas</span>
            </Title>
            <Text className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg">
              Trabalho com um conjunto de tecnologias modernas voltadas à criação de aplicações web
              performáticas, escaláveis e bem estruturadas. Busco sempre utilizar ferramentas que
              facilitem manutenção, colaboração e evolução contínua dos sistemas.
            </Text>
          </motion.div>
        </VStack>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {skills.map((skill) => (
            <motion.div key={skill.category} variants={itemVariants} className="h-full">
              <Box
                className="
                  group relative h-full bg-zinc-900/40 border border-zinc-800/60 
                  rounded-2xl p-6 overflow-hidden hover:border-brand-500/30
                  transition-all duration-300 hover:-translate-y-1
                  hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]
                  hover:shadow-brand-500/5
                "
              >
                <Box
                  className="
                    absolute inset-0 bg-brand-500/5 opacity-0 
                    group-hover:opacity-100 transition-opacity duration-500
                  "
                />

                <VStack className="gap-6 relative z-10 h-full">
                  <HStack className="justify-between items-start">
                    <Box
                      className="
                        p-3 rounded-lg bg-zinc-950 border border-zinc-800
                        group-hover:border-brand-500/30 group-hover:text-brand-400
                        text-zinc-400 transition-colors duration-300
                      "
                    >
                      <Icon icon={skill.icon} className="w-6 h-6" />
                    </Box>
                    <Box
                      className="
                        w-12 h-12 bg-brand-500/10 rounded-full blur-2xl
                        absolute -top-2 -right-2 opacity-0 group-hover:opacity-100
                        transition-opacity duration-500
                      "
                    />
                  </HStack>

                  <VStack className="gap-2">
                    <Title className="text-lg font-bold font-heading uppercase tracking-wide text-white">
                      {skill.category}
                    </Title>
                    <Text className="text-xs text-gray-400 leading-relaxed min-h-[40px]">
                      {skill.description}
                    </Text>
                  </VStack>

                  <VStack className="gap-2 mt-auto pt-4 border-t border-zinc-800/50 group-hover:border-brand-500/10 transition-colors">
                    {skill.technologies.map((tech) => (
                      <HStack key={tech} className="items-center gap-2 group/item">
                        <Box className="w-1 h-1 rounded-full bg-brand-500/50 group-hover/item:bg-brand-400 transition-colors" />
                        <Text className="text-sm font-mono text-zinc-300 group-hover/item:text-white transition-colors">
                          {tech}
                        </Text>
                      </HStack>
                    ))}
                  </VStack>
                </VStack>
              </Box>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Box>
  )
})
