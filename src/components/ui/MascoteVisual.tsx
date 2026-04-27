import { motion, useSpring, useTransform } from 'framer-motion'
import { memo, useEffect } from 'react'
import { useAnimation } from '@/contexts'

interface MascoteVisualProps {
  isActive?: boolean
  className?: string
}

function getCSSVar(name: string): string {
  if (typeof window === 'undefined') return ''
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

export const MascoteVisual = memo(({ isActive = false, className = '' }: MascoteVisualProps) => {
  const { reducedMotion } = useAnimation()

  const mouseX = useSpring(0, { stiffness: 150, damping: 20 })
  const mouseY = useSpring(0, { stiffness: 150, damping: 20 })

  const eyeX = useTransform(mouseX, [-400, 400], [-1.5, 1.5])
  const eyeY = useTransform(mouseY, [-400, 400], [-1, 1])

  useEffect(() => {
    if (reducedMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX - window.innerWidth / 2
      const y = e.clientY - window.innerHeight / 2
      mouseX.set(x)
      mouseY.set(y)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [reducedMotion, mouseX, mouseY])

  const c = {
    brand: getCSSVar('--color-brand-500'),
    purple: getCSSVar('--color-purple-500'),
    red: getCSSVar('--color-red-500'),
    amber: getCSSVar('--color-amber-500'),
    blue: getCSSVar('--color-blue-500'),
    mascoteIdle: getCSSVar('--color-mascote-idle'),
    mascoteIdleArm: getCSSVar('--color-mascote-idle-arm'),
    mascoteActive: getCSSVar('--color-mascote-active'),
    mascoteActiveBody: getCSSVar('--color-mascote-active-body'),
  }

  return (
    <div className={`relative w-full max-w-[300px] aspect-[48/58] ${className}`}>
      <svg
        viewBox="0 0 48 58"
        className="relative w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <g>
          <motion.line
            x1="24"
            y1="2"
            x2="24"
            y2="9"
            stroke={isActive ? 'var(--color-purple-500)' : 'var(--color-brand-500)'}
            strokeWidth="1.5"
            strokeLinecap="round"
            animate={!reducedMotion ? { y: isActive ? [-2, 2, -2] : [-0.5, 0.5, -0.5] } : {}}
            transition={{ duration: isActive ? 0.4 : 2, repeat: Infinity }}
          />
          <motion.circle
            cx="24"
            cy="2"
            r="2.5"
            fill={isActive ? 'var(--color-purple-500)' : 'var(--color-brand-500)'}
            animate={!reducedMotion ? { y: isActive ? [-2, 2, -2] : [-0.5, 0.5, -0.5] } : {}}
            transition={{ duration: isActive ? 0.4 : 2, repeat: Infinity }}
          />
        </g>

        <rect
          x="8"
          y="8"
          width="32"
          height="20"
          rx="5"
          fill={isActive ? c.mascoteActiveBody : c.mascoteIdle}
          stroke={
            isActive
              ? 'var(--color-purple-500)'
              : 'color-mix(in srgb, var(--color-brand-500) 60%, transparent)'
          }
          strokeWidth="1.5"
        />

        <motion.g style={{ x: eyeX, y: eyeY }}>
          <motion.rect
            x="12"
            y="13"
            width="8"
            height="9"
            rx="2"
            fill={isActive ? 'var(--color-purple-500)' : 'var(--color-brand-500)'}
            animate={
              !reducedMotion
                ? {
                    scaleY: [1, 0.1, 1],
                  }
                : {}
            }
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 4 + Math.random() * 2,
            }}
          />
          <motion.rect
            x="28"
            y="13"
            width="8"
            height="9"
            rx="2"
            fill={isActive ? 'var(--color-purple-500)' : 'var(--color-brand-500)'}
            animate={
              !reducedMotion
                ? {
                    scaleY: [1, 0.1, 1],
                  }
                : {}
            }
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 4 + Math.random() * 2,
              delay: 0.1,
            }}
          />
        </motion.g>

        <rect
          x="20"
          y="28"
          width="8"
          height="4"
          fill={
            isActive
              ? 'color-mix(in srgb, var(--color-purple-500) 40%, transparent)'
              : 'color-mix(in srgb, var(--color-brand-500) 25%, transparent)'
          }
        />

        <rect
          x="3"
          y="32"
          width="42"
          height="24"
          rx="6"
          fill={isActive ? c.mascoteActive : c.mascoteIdle}
          stroke={
            isActive
              ? 'var(--color-purple-500)'
              : 'color-mix(in srgb, var(--color-brand-500) 50%, transparent)'
          }
          strokeWidth="1.5"
        />

        <motion.rect
          x="0"
          y="35"
          width="3"
          height="13"
          rx="1.5"
          fill={isActive ? c.mascoteActiveBody : c.mascoteIdleArm}
          stroke={isActive ? c.purple : c.brand}
          strokeOpacity="0.3"
          strokeWidth="1"
          animate={isActive ? { rotate: [0, -15, 15, -15, 0] } : {}}
          style={{ transformOrigin: '1.5px 35px' }}
          transition={isActive ? { duration: 0.5, repeat: Infinity } : {}}
        />
        <motion.rect
          x="45"
          y="35"
          width="3"
          height="13"
          rx="1.5"
          fill={isActive ? c.mascoteActiveBody : c.mascoteIdleArm}
          stroke={isActive ? c.purple : c.brand}
          strokeOpacity="0.3"
          strokeWidth="1"
          animate={isActive ? { rotate: [0, 15, -15, 15, 0] } : {}}
          style={{ transformOrigin: '46.5px 35px' }}
          transition={isActive ? { duration: 0.5, repeat: Infinity } : {}}
        />

        <rect x="10" y="39" width="28" height="12" rx="3" fill="white" fillOpacity="0.05" />
        <motion.rect
          x="14"
          y="43"
          width="20"
          height="3.5"
          rx="1.75"
          fill={isActive ? c.purple : c.brand}
          fillOpacity={isActive ? 1 : 0.6}
          animate={
            !reducedMotion
              ? {
                  opacity: [0.6, 1, 0.6],
                }
              : {}
          }
          transition={{ duration: 2, repeat: Infinity }}
        />
      </svg>

      <div
        className={`absolute -top-1 -right-1 w-3 h-3 ${isActive ? 'bg-purple-500' : 'bg-brand-500'} rounded-full border-2 border-black`}
      />
    </div>
  )
})

MascoteVisual.displayName = 'MascoteVisual'
