import { motion, useScroll, useTransform } from 'framer-motion'
import { useIsLowPerformance } from '@/utils/deviceDetection'

export const HeroBackgroundDesktop = () => {
  const isLowPerf = useIsLowPerformance()
  const { scrollY } = useScroll()

  // Parallax effects
  const y1 = useTransform(scrollY, [0, 500], isLowPerf ? [0, 0] : [0, 200])
  const y2 = useTransform(scrollY, [0, 500], isLowPerf ? [0, 0] : [0, -150])

  return (
    <>
      <motion.div
        style={{ y: y1 }}
        className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-0"
      >
        <motion.div
          animate={
            isLowPerf
              ? {}
              : {
                  scale: [1, 1.2, 1],
                  opacity: [0.15, 0.25, 0.15],
                  rotate: [0, 45, 0],
                }
          }
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px]"
        >
          <div
            className={`w-full h-full bg-brand-500/20 rounded-full ${isLowPerf ? 'blur-[60px]' : 'blur-[120px]'}`}
          />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0"
      >
        <motion.div
          animate={
            isLowPerf
              ? {}
              : {
                  scale: [1, 1.3, 1],
                  opacity: [0.1, 0.2, 0.1],
                  x: [0, 30, 0],
                }
          }
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px]"
        >
          <div
            className={`w-full h-full bg-brand-800/20 rounded-full ${isLowPerf ? 'blur-[50px]' : 'blur-[100px]'}`}
          />
        </motion.div>
      </motion.div>
    </>
  )
}
