import { motion } from 'framer-motion'
import { useAnimation } from '@/contexts'

interface MascoteVisualProps {
  isActive?: boolean
  className?: string
}

function getCSSVar(name: string): string {
  if (typeof window === 'undefined') return ''
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

export function MascoteVisual({ isActive = false, className = '' }: MascoteVisualProps) {
  const { usarEfeitosPesados, ehDispositivoLento } = useAnimation()

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
    <div className={`relative w-full h-full ${className}`}>
      {usarEfeitosPesados && (
        <motion.div
          className={`absolute inset-0 ${isActive ? 'bg-purple-500/40' : 'bg-brand-500/20'} rounded-xl blur-lg`}
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
        />
      )}

      <svg
        viewBox="0 0 48 58"
        className="relative w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {!ehDispositivoLento && (
          <>
            <motion.g
              animate={isActive ? { y: [-2, 2, -2] } : { y: [-0.5, 0.5, -0.5] }}
              transition={
                isActive
                  ? { duration: 0.4, repeat: Number.POSITIVE_INFINITY }
                  : { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }
              }
            >
              <line
                x1="24"
                y1="2"
                x2="24"
                y2="9"
                stroke={
                  isActive
                    ? 'var(--color-purple-500)'
                    : 'color-mix(in srgb, var(--color-brand-500) 50%, transparent)'
                }
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </motion.g>
            <motion.g
              animate={isActive ? { y: [-2, 2, -2] } : { y: [-0.5, 0.5, -0.5] }}
              transition={
                isActive
                  ? { duration: 0.4, repeat: Number.POSITIVE_INFINITY }
                  : { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }
              }
            >
              <circle
                cx="24"
                cy="2"
                r="2.5"
                fill={isActive ? 'var(--color-purple-500)' : 'var(--color-brand-500)'}
                style={{
                  filter: isActive
                    ? `drop-shadow(0 0 5px ${c.purple})`
                    : `drop-shadow(0 0 4px ${c.brand}cc)`,
                }}
              />
            </motion.g>
          </>
        )}
        {ehDispositivoLento && (
          <g>
            <line
              x1="24"
              y1="2"
              x2="24"
              y2="9"
              stroke={isActive ? 'var(--color-purple-500)' : 'var(--color-brand-500)'}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle
              cx="24"
              cy="2"
              r="2.5"
              fill={isActive ? 'var(--color-purple-500)' : 'var(--color-brand-500)'}
            />
          </g>
        )}

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
        <rect x="10" y="9.5" width="28" height="5" rx="3" fill="white" fillOpacity="0.07" />

        <motion.rect
          x="12"
          y="13"
          width="8"
          height="9"
          rx="2"
          fill={isActive ? 'var(--color-purple-500)' : 'var(--color-brand-500)'}
          style={
            usarEfeitosPesados
              ? {
                  filter: isActive
                    ? `drop-shadow(0 0 4px ${c.purple})`
                    : `drop-shadow(0 0 3px ${c.brand}b3)`,
                }
              : {}
          }
          animate={
            isActive && !ehDispositivoLento
              ? {
                  scaleY: [1, 0.07, 1, 1, 0.07, 1],
                  fill: [c.purple, c.red, c.amber, c.brand, c.purple],
                }
              : !ehDispositivoLento
                ? { scaleY: [1, 0.07, 1] }
                : {}
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
          fill={isActive ? 'var(--color-purple-500)' : 'var(--color-brand-500)'}
          style={
            usarEfeitosPesados
              ? {
                  filter: isActive
                    ? `drop-shadow(0 0 4px ${c.purple})`
                    : `drop-shadow(0 0 3px ${c.brand}b3)`,
                }
              : {}
          }
          animate={
            isActive && !ehDispositivoLento
              ? {
                  scaleY: [1, 0.07, 1, 1, 0.07, 1],
                  fill: [c.purple, c.red, c.amber, c.brand, c.purple],
                }
              : !ehDispositivoLento
                ? { scaleY: [1, 0.07, 1] }
                : {}
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
        <rect x="5" y="33.5" width="38" height="5" rx="4" fill="white" fillOpacity="0.05" />

        <motion.rect
          x="0"
          y="35"
          width="3"
          height="13"
          rx="1.5"
          fill={isActive ? c.mascoteActiveBody : c.mascoteIdleArm}
          stroke={
            isActive
              ? 'color-mix(in srgb, var(--color-purple-500) 50%, transparent)'
              : 'color-mix(in srgb, var(--color-brand-500) 30%, transparent)'
          }
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
          fill={isActive ? c.mascoteActiveBody : c.mascoteIdleArm}
          stroke={
            isActive
              ? 'color-mix(in srgb, var(--color-purple-500) 50%, transparent)'
              : 'color-mix(in srgb, var(--color-brand-500) 30%, transparent)'
          }
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
          fill={
            isActive
              ? 'color-mix(in srgb, var(--color-purple-500) 12%, transparent)'
              : 'color-mix(in srgb, var(--color-brand-500) 8%, transparent)'
          }
          stroke={
            isActive
              ? 'color-mix(in srgb, var(--color-purple-500) 25%, transparent)'
              : 'color-mix(in srgb, var(--color-brand-500) 20%, transparent)'
          }
          strokeWidth="1"
        />
        <motion.rect
          x="14"
          y="43"
          width="20"
          height="3.5"
          rx="1.75"
          fill={
            isActive
              ? 'var(--color-purple-500)'
              : 'color-mix(in srgb, var(--color-brand-500) 80%, transparent)'
          }
          style={
            usarEfeitosPesados
              ? {
                  filter: isActive
                    ? `drop-shadow(0 0 3px ${c.purple})`
                    : `drop-shadow(0 0 2px ${c.brand}80)`,
                }
              : {}
          }
          animate={
            isActive && !ehDispositivoLento
              ? {
                  opacity: [1, 0.2, 1],
                  scaleX: [1, 0.4, 1.4, 1],
                  fill: [c.purple, c.red, c.amber, c.brand, c.purple],
                }
              : !ehDispositivoLento
                ? { opacity: [0.6, 1, 0.6] }
                : {}
          }
          transition={
            isActive
              ? { duration: 0.5, repeat: Number.POSITIVE_INFINITY }
              : { duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }
          }
        />
      </svg>

      <motion.div
        className={`absolute -top-1 -right-1 w-2.5 h-2.5 md:w-3 md:h-3 ${isActive ? 'bg-purple-500' : 'bg-brand-500'} rounded-full border-2 border-black ${isActive && usarEfeitosPesados ? 'mascote-dot-shadow-active' : usarEfeitosPesados ? 'mascote-dot-shadow' : ''}`}
        animate={
          isActive && !ehDispositivoLento
            ? {
                scale: [1, 1.8, 1],
                rotate: [0, 180, 360],
                backgroundColor: [c.purple, c.red, c.amber, c.brand, c.blue, c.purple],
                boxShadow: usarEfeitosPesados
                  ? [
                      `0 0 12px ${c.purple}e6`,
                      `0 0 20px ${c.red}e6`,
                      `0 0 20px ${c.amber}e6`,
                      `0 0 20px ${c.brand}e6`,
                      `0 0 20px ${c.blue}e6`,
                      `0 0 12px ${c.purple}e6`,
                    ]
                  : undefined,
              }
            : !ehDispositivoLento
              ? {
                  scale: [1, 1.3, 1],
                  boxShadow: usarEfeitosPesados
                    ? [`0 0 8px ${c.brand}cc`, `0 0 16px ${c.brand}ff`, `0 0 8px ${c.brand}cc`]
                    : undefined,
                }
              : {}
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
