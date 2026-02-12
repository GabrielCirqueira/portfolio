import { motion } from 'framer-motion'
import { Text } from '@/shadcn/components/ui/typography'

export const LogoMobile = () => {
  return (
    <motion.a
      href="#inicio"
      className="
        flex items-center space-x-1.5 text-white
        hover:text-brand-400 transition-colors
        no-underline group relative z-50
      "
      whileTap={{ scale: 0.95 }}
    >
      <Text className="font-mono text-brand-500 text-xl group-hover:rotate-12 transition-transform duration-300">
        &lt;
      </Text>
      <Text className="font-bold text-lg tracking-wide uppercase font-heading relative">
        Gabriel.Dev
      </Text>
      <Text className="font-mono text-brand-500 text-xl group-hover:-rotate-12 transition-transform duration-300">
        /&gt;
      </Text>
    </motion.a>
  )
}
