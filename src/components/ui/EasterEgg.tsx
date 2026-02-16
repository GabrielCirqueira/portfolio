import { useEasterEgg } from '@app/contexts/EasterEggContext'
import { AnimatePresence, motion } from 'framer-motion'
import { memo, useCallback, useEffect, useRef, useState } from 'react'

const KONAMI_CODE = ['c', 'i', 'r', 'q', 'u', 'e', 'i', 'r', 'a']

const matrixChars =
  'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモ0123456789ABCDEF'

const MatrixRain = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = new Array(columns).fill(1)

    let animationFrameId: number

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#a855f7'
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const char = matrixChars[Math.floor(Math.random() * matrixChars.length)]
        ctx.fillText(char, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
      animationFrameId = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-20" />
})

export const EasterEgg = memo(() => {
  const { activate, deactivate } = useEasterEgg()
  const [triggered, setTriggered] = useState(false)
  const [showMessage, setShowMessage] = useState(true)
  const inputRef = useRef<string[]>([])
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const lastAccelerationRef = useRef({ x: 0, y: 0, z: 0 })

  const activateEasterEgg = useCallback(() => {
    setTriggered(true)
    setShowMessage(true)
    activate()
  }, [activate])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      inputRef.current.push(e.key)

      if (inputRef.current.length > KONAMI_CODE.length) {
        inputRef.current.shift()
      }

      const match = inputRef.current.every((key, i) => key === KONAMI_CODE[i])
      if (match && inputRef.current.length === KONAMI_CODE.length) {
        activateEasterEgg()
        inputRef.current = []
      }
    },
    [activateEasterEgg]
  )

  const handleMotion = useCallback(
    (e: DeviceMotionEvent) => {
      const acceleration = e.accelerationIncludingGravity
      if (!acceleration) return

      const x = acceleration.x ?? 0
      const y = acceleration.y ?? 0
      const z = acceleration.z ?? 0
      const last = lastAccelerationRef.current

      const deltaX = Math.abs(x - last.x)
      const deltaY = Math.abs(y - last.y)
      const deltaZ = Math.abs(z - last.z)

      if (deltaX + deltaY + deltaZ > 30) {
        activateEasterEgg()
      }

      lastAccelerationRef.current = { x, y, z }
    },
    [activateEasterEgg]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('devicemotion', handleMotion)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('devicemotion', handleMotion)
    }
  }, [handleKeyDown, handleMotion])

  useEffect(() => {
    if (triggered) {
      const messageTimeout = setTimeout(() => setShowMessage(false), 3000)
      timeoutRef.current = setTimeout(() => {
        setTriggered(false)
        deactivate()
      }, 30000)

      return () => {
        clearTimeout(messageTimeout)
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
      }
    }
  }, [triggered, deactivate])

  useEffect(() => {
    if (triggered) {
      document.body.classList.add('hacked-mode')

      const applyRandomGlitch = () => {
        const elements = document.querySelectorAll('h1, h2, h3, p, a, button')
        const randomElements = Array.from(elements)
          .sort(() => Math.random() - 0.5)
          .slice(0, Math.floor(elements.length * 0.3))

        randomElements.forEach((el) => {
          if (Math.random() > 0.5) {
            el.classList.add('glitch-text')
          }
        })
      }

      applyRandomGlitch()
      const glitchInterval = setInterval(applyRandomGlitch, 2000)

      return () => {
        document.body.classList.remove('hacked-mode')
        clearInterval(glitchInterval)
        document.querySelectorAll('.glitch-text').forEach((el) => {
          el.classList.remove('glitch-text')
        })
      }
    }
  }, [triggered])

  return (
    <>
      <style>
        {`
          @keyframes glitch {
            0%, 100% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
          }

          @keyframes glitch-color {
            0%, 100% { 
              filter: hue-rotate(0deg) contrast(1);
            }
            25% { 
              filter: hue-rotate(90deg) contrast(1.2);
              text-shadow: -2px 0 #ff00ff, 2px 0 #00ffff;
            }
            50% { 
              filter: hue-rotate(180deg) contrast(0.8);
              text-shadow: 2px 0 #ff00ff, -2px 0 #00ffff;
            }
            75% { 
              filter: hue-rotate(270deg) contrast(1.1);
              text-shadow: -2px 0 #00ffff, 2px 0 #ff00ff;
            }
          }

          @keyframes rgb-split {
            0%, 100% { 
              text-shadow: 0 0 transparent;
            }
            33% { 
              text-shadow: -2px 0 #ff00ff, 2px 0 #00ffff, 0 0 #ffff00;
            }
            66% { 
              text-shadow: 2px 0 #ff00ff, -2px 2px #00ffff, -2px -2px #ffff00;
            }
          }

          @keyframes scanlines {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
          }

          @keyframes flicker {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }

          @keyframes pulse-glow {
            0%, 100% { 
              opacity: 0.1;
              box-shadow: 0 0 5px rgba(168, 85, 247, 0.3);
            }
            50% { 
              opacity: 0.3;
              box-shadow: 0 0 15px rgba(168, 85, 247, 0.6);
            }
          }

          .hacked-mode {
            animation: flicker 0.15s infinite;
          }

          .hacked-mode::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: repeating-linear-gradient(
              0deg,
              rgba(168, 85, 247, 0.03) 0px,
              rgba(168, 85, 247, 0.03) 1px,
              transparent 1px,
              transparent 2px
            );
            pointer-events: none;
            z-index: 9998;
            animation: scanlines 8s linear infinite;
          }

          .hacked-mode::after {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              to bottom,
              transparent 0%,
              rgba(168, 85, 247, 0.05) 50%,
              transparent 100%
            );
            pointer-events: none;
            z-index: 9998;
          }

          .glitch-text {
            animation: glitch 0.3s infinite, glitch-color 2s infinite, rgb-split 0.5s infinite;
            position: relative;
            display: inline-block;
          }

          .glitch-text::before,
          .glitch-text::after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }

          .glitch-text::before {
            animation: glitch 0.4s infinite reverse;
            color: #ff00ff;
            z-index: -1;
            clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
          }

          .glitch-text::after {
            animation: glitch 0.3s infinite;
            color: #00ffff;
            z-index: -1;
            clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
          }


        `}
      </style>

      <AnimatePresence>
        {triggered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[9999] pointer-events-none"
          >
            <MatrixRain />

            <div
              className="absolute inset-0 mix-blend-screen opacity-20"
              style={{
                background: 'linear-gradient(45deg, #ff00ff 0%, transparent 50%, #00ffff 100%)',
                animation: 'glitch 0.5s infinite',
              }}
            />

            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(0deg, #a855f7 0px, #a855f7 1px, transparent 1px, transparent 4px)',
              }}
            />

            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-purple-500/30"
                style={{
                  top: `${Math.random() * 80}%`,
                  left: `${Math.random() * 80}%`,
                  width: `${50 + Math.random() * 200}px`,
                  height: `${20 + Math.random() * 60}px`,
                }}
                animate={{
                  opacity: [0, 0.7, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                  scaleX: [1, 1.2, 1],
                }}
                transition={{
                  duration: 0.2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  repeatDelay: Math.random() * 2,
                }}
              />
            ))}

            {showMessage && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-auto"
              >
                <div className="text-center p-8 bg-black/90 backdrop-blur-xl rounded-2xl border-2 border-purple-500/50 shadow-[0_0_60px_var(--tw-shadow-color)] shadow-purple-500/40">
                  <motion.div
                    animate={{
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 0.9, 1],
                    }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="text-5xl sm:text-6xl mb-4"
                  >
                    ⚠️
                  </motion.div>
                  <motion.p
                    className="text-purple-500 font-mono text-lg sm:text-2xl font-bold tracking-wider mb-2"
                    animate={{
                      textShadow: [
                        '0 0 10px #a855f7',
                        '0 0 20px #a855f7, 0 0 30px #ff00ff',
                        '0 0 10px #a855f7',
                      ],
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    SISTEMA COMPROMETIDO
                  </motion.p>
                  <p className="text-red-400 font-mono text-xs sm:text-sm mb-1">
                    [ERRO] Acesso não autorizado detectado
                  </p>
                  <p className="text-green-400 font-mono text-xs">
                    {'>'} Executando modo_caos.exe...
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
})
