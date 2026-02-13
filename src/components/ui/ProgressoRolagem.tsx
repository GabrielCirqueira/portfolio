import { motion, useScroll, useSpring } from 'framer-motion'
import { memo } from 'react'

export const ProgressoRolagem = memo(() => {
  const { scrollYProgress } = useScroll()
  const escalaX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-brand-500 origin-left z-[60]"
      style={{ scaleX: escalaX }}
    />
  )
})
