import { motion } from 'framer-motion'

interface MascoteVisualProps {
  isActive?: boolean
  className?: string
}

export function MascoteVisual({ isActive = false, className = '' }: MascoteVisualProps) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <motion.div
        className={`absolute inset-0 ${isActive ? 'bg-purple-500/40' : 'bg-brand-500/20'} rounded-xl blur-lg`}
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
      />

      <svg
        viewBox="0 0 48 58"
        className="relative w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <motion.line
          x1="24"
          y1="2"
          x2="24"
          y2="9"
          stroke={isActive ? '#a855f7' : 'rgba(34,197,94,0.5)'}
          strokeWidth="1.5"
          strokeLinecap="round"
          animate={
            isActive
              ? { y1: [-2, 2, -2], y2: [-2, 2, -2] }
              : { y1: [-0.5, 0.5, -0.5], y2: [-0.5, 0.5, -0.5] }
          }
          transition={
            isActive
              ? { duration: 0.4, repeat: Number.POSITIVE_INFINITY }
              : { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }
          }
        />
        <motion.circle
          cx="24"
          cy="2"
          r="2.5"
          fill={isActive ? '#a855f7' : '#22c55e'}
          animate={
            isActive
              ? {
                  fill: ['#a855f7', '#ef4444', '#f59e0b', '#22c55e', '#3b82f6', '#a855f7'],
                  r: [2.5, 3.2, 2.5],
                }
              : { r: [2.5, 3, 2.5] }
          }
          style={{
            filter: isActive
              ? 'drop-shadow(0 0 5px #a855f7)'
              : 'drop-shadow(0 0 4px rgba(34,197,94,0.8))',
          }}
          transition={
            isActive
              ? { duration: 1, repeat: Number.POSITIVE_INFINITY }
              : { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }
          }
        />

        <rect
          x="8"
          y="8"
          width="32"
          height="20"
          rx="5"
          fill={isActive ? '#2d1b4e' : '#18181b'}
          stroke={isActive ? '#a855f7' : 'rgba(34,197,94,0.6)'}
          strokeWidth="1.5"
        />
        <rect x="10" y="9.5" width="28" height="5" rx="3" fill="white" fillOpacity="0.07" />

        <motion.rect
          x="12"
          y="13"
          width="8"
          height="9"
          rx="2"
          fill={isActive ? '#a855f7' : '#22c55e'}
          style={{
            filter: isActive
              ? 'drop-shadow(0 0 4px #a855f7)'
              : 'drop-shadow(0 0 3px rgba(34,197,94,0.7))',
          }}
          animate={
            isActive
              ? {
                  scaleY: [1, 0.07, 1, 1, 0.07, 1],
                  fill: ['#a855f7', '#ef4444', '#f59e0b', '#22c55e', '#a855f7'],
                }
              : { scaleY: [1, 0.07, 1] }
          }
          transition={
            isActive
              ? { duration: 0.8, repeat: Number.POSITIVE_INFINITY }
              : { duration: 3, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2.5 }
          }
        />
        <motion.rect
          x="28"
          y="13"
          width="8"
          height="9"
          rx="2"
          fill={isActive ? '#a855f7' : '#22c55e'}
          style={{
            filter: isActive
              ? 'drop-shadow(0 0 4px #a855f7)'
              : 'drop-shadow(0 0 3px rgba(34,197,94,0.7))',
          }}
          animate={
            isActive
              ? {
                  scaleY: [1, 0.07, 1, 1, 0.07, 1],
                  fill: ['#a855f7', '#ef4444', '#f59e0b', '#22c55e', '#a855f7'],
                }
              : { scaleY: [1, 0.07, 1] }
          }
          transition={
            isActive
              ? { duration: 0.8, repeat: Number.POSITIVE_INFINITY, delay: 0.15 }
              : { duration: 3, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2.5, delay: 0.15 }
          }
        />

        <rect
          x="20"
          y="28"
          width="8"
          height="4"
          fill={isActive ? 'rgba(168,85,247,0.4)' : 'rgba(34,197,94,0.25)'}
        />

        <rect
          x="3"
          y="32"
          width="42"
          height="24"
          rx="6"
          fill={isActive ? '#1e0a3c' : '#18181b'}
          stroke={isActive ? '#a855f7' : 'rgba(34,197,94,0.5)'}
          strokeWidth="1.5"
        />
        <rect x="5" y="33.5" width="38" height="5" rx="4" fill="white" fillOpacity="0.05" />

        <motion.rect
          x="0"
          y="35"
          width="3"
          height="13"
          rx="1.5"
          fill={isActive ? '#2d1b4e' : '#27272a'}
          stroke={isActive ? 'rgba(168,85,247,0.5)' : 'rgba(34,197,94,0.3)'}
          strokeWidth="1"
          animate={isActive ? { rotate: [0, -15, 15, -15, 0] } : {}}
          style={{ transformOrigin: '1.5px 35px' }}
          transition={isActive ? { duration: 0.5, repeat: Number.POSITIVE_INFINITY } : {}}
        />
        <motion.rect
          x="45"
          y="35"
          width="3"
          height="13"
          rx="1.5"
          fill={isActive ? '#2d1b4e' : '#27272a'}
          stroke={isActive ? 'rgba(168,85,247,0.5)' : 'rgba(34,197,94,0.3)'}
          strokeWidth="1"
          animate={isActive ? { rotate: [0, 15, -15, 15, 0] } : {}}
          style={{ transformOrigin: '46.5px 35px' }}
          transition={isActive ? { duration: 0.5, repeat: Number.POSITIVE_INFINITY } : {}}
        />

        <rect
          x="10"
          y="39"
          width="28"
          height="12"
          rx="3"
          fill={isActive ? 'rgba(168,85,247,0.12)' : 'rgba(34,197,94,0.08)'}
          stroke={isActive ? 'rgba(168,85,247,0.25)' : 'rgba(34,197,94,0.2)'}
          strokeWidth="1"
        />
        <motion.rect
          x="14"
          y="43"
          width="20"
          height="3.5"
          rx="1.75"
          fill={isActive ? '#a855f7' : 'rgba(34,197,94,0.8)'}
          style={{
            filter: isActive
              ? 'drop-shadow(0 0 3px #a855f7)'
              : 'drop-shadow(0 0 2px rgba(34,197,94,0.5))',
          }}
          animate={
            isActive
              ? {
                  opacity: [1, 0.2, 1],
                  scaleX: [1, 0.4, 1.4, 1],
                  fill: ['#a855f7', '#ef4444', '#f59e0b', '#22c55e', '#a855f7'],
                }
              : { opacity: [0.6, 1, 0.6] }
          }
          transition={
            isActive
              ? { duration: 0.5, repeat: Number.POSITIVE_INFINITY }
              : { duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }
          }
        />
      </svg>

      <motion.div
        className={`absolute -top-1 -right-1 w-2.5 h-2.5 md:w-3 md:h-3 ${isActive ? 'bg-purple-500' : 'bg-brand-500'} rounded-full border-2 border-black ${isActive ? 'shadow-[0_0_12px_rgba(168,85,247,0.9)]' : 'shadow-[0_0_8px_rgba(34,197,94,0.8)]'}`}
        animate={
          isActive
            ? {
                scale: [1, 1.8, 1],
                rotate: [0, 180, 360],
                backgroundColor: ['#a855f7', '#ef4444', '#f59e0b', '#22c55e', '#3b82f6', '#a855f7'],
                boxShadow: [
                  '0 0 12px rgba(168,85,247,0.9)',
                  '0 0 20px rgba(239,68,68,0.9)',
                  '0 0 20px rgba(245,158,11,0.9)',
                  '0 0 20px rgba(34,197,94,0.9)',
                  '0 0 20px rgba(59,130,246,0.9)',
                  '0 0 12px rgba(168,85,247,0.9)',
                ],
              }
            : {
                scale: [1, 1.3, 1],
                boxShadow: [
                  '0 0 8px rgba(34,197,94,0.8)',
                  '0 0 16px rgba(34,197,94,1)',
                  '0 0 8px rgba(34,197,94,0.8)',
                ],
              }
        }
        transition={
          isActive
            ? {
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
              }
            : {
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'easeInOut',
              }
        }
      />
    </div>
  )
}
