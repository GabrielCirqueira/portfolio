import { useIsMobile } from '@app/hooks/useMediaQuery'
import { motion } from 'framer-motion'
import { Cloud, Layout, Server, Wrench } from 'lucide-react'
import { memo, useEffect, useState } from 'react'
import Marquee from 'react-fast-marquee'
import {
  SiChakraui,
  SiDocker,
  SiFastapi,
  SiFramer,
  SiGit,
  SiGithub,
  SiGrafana,
  SiInsomnia,
  SiJsonwebtokens,
  SiLinux,
  SiMysql,
  SiNginx,
  SiPhp,
  SiRabbitmq,
  SiReact,
  SiShadcnui,
  SiSymfony,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from 'react-icons/si'
import { SkillsGrid } from '@/components/responsive/SkillsGrid'
import { Badge } from '@/shadcn/components/ui/badge'
import { Box, Center, Container, VStack } from '@/shadcn/components/ui/layout'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shadcn/components/ui/tooltip'
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

const techIcons = [
  {
    Icon: SiPhp,
    name: 'PHP',
    color: '#777BB4',
    description: 'Linguagem server-side para desenvolvimento web dinâmico',
  },
  {
    Icon: SiSymfony,
    name: 'Symfony',
    color: '#fff',
    description: 'Framework PHP robusto para aplicações enterprise',
  },
  {
    Icon: SiTypescript,
    name: 'TypeScript',
    color: '#3178C6',
    description: 'JavaScript com tipagem estática para código mais seguro',
  },
  {
    Icon: SiJsonwebtokens,
    name: 'JWT',
    color: '#fff',
    description: 'Autenticação segura baseada em tokens',
  },
  {
    Icon: SiMysql,
    name: 'MySQL',
    color: '#4479A1',
    description: 'Banco de dados relacional de alta performance',
  },
  {
    Icon: SiReact,
    name: 'React',
    color: '#61DAFB',
    description: 'Biblioteca JavaScript para interfaces interativas',
  },
  {
    Icon: SiTailwindcss,
    name: 'Tailwind CSS',
    color: '#06B6D4',
    description: 'Framework CSS utility-first para design rápido',
  },
  {
    Icon: SiChakraui,
    name: 'Chakra UI',
    color: '#319795',
    description: 'Biblioteca de componentes React acessíveis',
  },
  {
    Icon: SiLinux,
    name: 'Linux',
    color: '#FCC624',
    description: 'Sistema operacional open-source para servidores',
  },
  {
    Icon: SiGit,
    name: 'Git',
    color: '#F05032',
    description: 'Controle de versão distribuído para código',
  },
  {
    Icon: SiDocker,
    name: 'Docker',
    color: '#2496ED',
    description: 'Containerização para ambientes consistentes',
  },
  {
    Icon: SiFastapi,
    name: 'FastAPI',
    color: '#009688',
    description: 'Framework Python moderno para APIs de alta performance',
  },
  {
    Icon: SiVite,
    name: 'Vite',
    color: '#646CFF',
    description: 'Build tool extremamente rápido para projetos frontend',
  },
  {
    Icon: SiFramer,
    name: 'Framer Motion',
    color: '#0055FF',
    description: 'Biblioteca de animações fluidas para React',
  },
  {
    Icon: SiShadcnui,
    name: 'Shadcn UI',
    color: '#fff',
    description: 'Componentes React reutilizáveis e customizáveis',
  },
  {
    Icon: SiNginx,
    name: 'Nginx',
    color: '#009639',
    description: 'Servidor web e reverse proxy de alta performance',
  },
  {
    Icon: SiMysql,
    name: 'Doctrine',
    color: '#F56A3F',
    description: 'ORM PHP para mapeamento objeto-relacional',
  },
  {
    Icon: SiInsomnia,
    name: 'Insomnia',
    color: '#4000BF',
    description: 'Cliente REST para testar e documentar APIs',
  },
  {
    Icon: SiGithub,
    name: 'GitHub',
    color: '#fff',
    description: 'Plataforma de colaboração e hospedagem de código',
  },
  {
    Icon: SiRabbitmq,
    name: 'RabbitMQ',
    color: '#FF6600',
    description: 'Message broker para comunicação assíncrona',
  },
  {
    Icon: SiGrafana,
    name: 'Grafana',
    color: '#F46800',
    description: 'Plataforma de observabilidade e dashboards',
  },
]

export const SkillsSection = memo(() => {
  const isMobile = useIsMobile()
  const [openTooltipIndex, setOpenTooltipIndex] = useState<number | null>(null)

  useEffect(() => {
    if (!isMobile) return

    const handleClickOutside = () => {
      setOpenTooltipIndex(null)
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMobile])

  const handleTooltipClick = (index: number, e: React.MouseEvent) => {
    if (!isMobile) return
    e.stopPropagation()
    setOpenTooltipIndex((prev) => (prev === index ? null : index))
  }

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

        <Box className="mt-12 sm:mt-16 md:mt-20 lg:mt-24 relative">
          <TooltipProvider delayDuration={200}>
            <Marquee speed={50} gradient gradientColor="#000000" gradientWidth={80} pauseOnHover>
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
                        flex-shrink-0 lg:px-10 py-5 px-5
                        transition-all duration-300
                        group cursor-pointer
                      "
                    >
                      <tech.Icon
                        size={isMobile ? 25 : 40}
                        style={{ color: tech.color }}
                        className="sm:text-[36px] md:text-[40px] group-hover:scale-150 transition-transform duration-300"
                      />
                    </Center>
                  </TooltipTrigger>
                  <TooltipContent className="bg-zinc-900 border-zinc-800 max-w-sm">
                    <Text className="text-sm font-bold text-brand-500 mb-1">{tech.name}</Text>
                    <Text className="text-md text-zinc-400">{tech.description}</Text>
                  </TooltipContent>
                </Tooltip>
              ))}
            </Marquee>
          </TooltipProvider>
        </Box>
      </Container>
    </Box>
  )
})
