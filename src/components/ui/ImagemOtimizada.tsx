import { memo, useEffect, useRef, useState } from 'react'

interface ImagemOtimizadaProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  loading?: 'lazy' | 'eager'
  priority?: boolean
  objectFit?: 'cover' | 'contain' | 'fill'
}

export const ImagemOtimizada = memo(
  ({
    src,
    alt,
    className = '',
    width,
    height,
    loading = 'lazy',
    priority = false,
    objectFit = 'cover',
  }: ImagemOtimizadaProps) => {
    const [carregada, setCarregada] = useState(false)
    const [erro, setErro] = useState(false)
    const [deveCarregar, setDeveCarregar] = useState(priority)
    const imgRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
      if (priority || loading === 'eager') {
        setDeveCarregar(true)
        return
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setDeveCarregar(true)
              observer.disconnect()
            }
          })
        },
        {
          rootMargin: '50px',
          threshold: 0.01,
        }
      )

      if (imgRef.current) {
        observer.observe(imgRef.current)
      }

      return () => {
        observer.disconnect()
      }
    }, [priority, loading])

    return (
      <div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
        {!carregada && !erro && <div className="absolute inset-0 bg-zinc-900 animate-pulse" />}
        {erro ? (
          <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
            <span className="text-zinc-600 text-sm">Erro ao carregar</span>
          </div>
        ) : (
          <img
            ref={imgRef}
            src={deveCarregar ? src : undefined}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={() => setCarregada(true)}
            onError={() => setErro(true)}
            className={`${className} transition-opacity duration-300 ${carregada ? 'opacity-100' : 'opacity-0'}`}
            style={{ width: '100%', height: '100%', objectFit }}
          />
        )}
      </div>
    )
  }
)

ImagemOtimizada.displayName = 'ImagemOtimizada'
