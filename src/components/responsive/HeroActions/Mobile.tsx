import { motion } from 'framer-motion'
import { Code, Github } from 'lucide-react'
import { Button } from '@/shadcn/components/ui/button'
import { Icon } from '@/shadcn/components/ui/icon'
import { Link } from '@/shadcn/components/ui/link'

export const HeroActionsMobile = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.8 }}
    className="flex flex-col gap-3 mb-20 w-full px-3 max-w-sm mx-auto"
  >
    <Link href="#projetos" className="w-full group">
      <Button
        type="button"
        className="
          w-full rounded-lg py-5
          bg-brand-600 active:bg-brand-500 text-sm
          font-bold uppercase tracking-widest
          shadow-lg shadow-brand-500/20
          transition-all duration-200
          relative overflow-hidden
          mobile-touch-feedback
        "
      >
        <div className="flex items-center justify-center relative z-10 gap-2">
          <Icon icon={Code} className="h-4 w-4" />
          Ver Projetos
        </div>
      </Button>
    </Link>

    <a
      href="https://github.com/GabrielCirqueira"
      target="_blank"
      rel="noopener noreferrer"
      className="w-full"
    >
      <Button
        type="button"
        variant="outline"
        className="
          w-full rounded-lg py-5
          font-bold border border-zinc-700 text-sm
          text-zinc-300 active:text-white
          active:border-brand-500 active:bg-brand-500/10
          uppercase tracking-widest transition-all
          duration-200 mobile-touch-feedback
          flex items-center justify-center gap-2
        "
      >
        <Icon icon={Github} className="h-4 w-4" />
        GitHub Profile
      </Button>
    </a>
  </motion.div>
)
