import { motion } from 'framer-motion'
import { Text } from '@/shadcn/components/ui/typography'

export const LogoDesktop = () => {
  return (
    <motion.a
      href="#inicio"
      className="
        flex items-center space-x-2 text-white
        hover:text-brand-400 transition-colors
        no-underline group relative z-50
      "
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Text className="font-mono text-brand-500 text-2xl group-hover:rotate-12 transition-transform duration-300">
        &lt;
      </Text>
      <Text className="font-bold text-xl tracking-wide uppercase font-heading relative">
        Gabriel.Dev
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-500 transition-all duration-300 group-hover:w-full"></span>
      </Text>
      <Text className="font-mono text-brand-500 text-2xl group-hover:-rotate-12 transition-transform duration-300">
        /&gt;
      </Text>
    </motion.a>
  )
}
