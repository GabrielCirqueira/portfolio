import { motion } from 'framer-motion'
import { Code } from 'lucide-react'
import { Button } from '@/shadcn/components/ui/button'
import { Icon } from '@/shadcn/components/ui/icon'
import { Link } from '@/shadcn/components/ui/link'

export const HeroActionsDesktop = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.8 }}
    className="flex flex-row gap-6 mb-32 w-full justify-center px-4 max-w-none"
  >
    <Link href="#projetos" className="w-auto group">
      <Button
        type="button"
        className="
          w-auto rounded px-8 py-6
          bg-brand-600 hover:bg-brand-500 text-base
          font-bold uppercase tracking-widest
          shadow-[0_0_20px_var(--tw-shadow-color)]
          shadow-brand-500/30
          hover:shadow-[0_0_40px_var(--tw-shadow-color)]
          hover:shadow-brand-500/50 transition-all
          duration-300 relative overflow-hidden
          transform hover:-translate-y-1
        "
      >
        <div className="flex items-center justify-center relative z-10">
          <Icon icon={Code} className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
          Ver Projetos
        </div>
        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
      </Button>
    </Link>

    <a
      href="https://github.com/GabrielCirqueira"
      target="_blank"
      rel="noopener noreferrer"
      className="w-auto"
    >
      <Button
        type="button"
        variant="outline"
        className="
          w-auto rounded px-8 py-6
          font-bold border-2 border-zinc-700 text-base
          text-zinc-300 hover:text-white
          hover:border-brand-500 hover:bg-brand-500/10
          uppercase tracking-widest transition-all
          duration-300 transform hover:-translate-y-1
        "
      >
        GitHub Profile
      </Button>
    </a>
  </motion.div>
)
