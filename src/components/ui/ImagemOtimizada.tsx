import { memo, useState } from 'react'

interface ImagemOtimizadaProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  loading?: 'lazy' | 'eager'
  priority?: boolean
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
  }: ImagemOtimizadaProps) => {
    const [carregada, setCarregada] = useState(false)
    const [erro, setErro] = useState(false)

    return (
      <div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
        {!carregada && !erro && <div className="absolute inset-0 bg-zinc-900 animate-pulse" />}
        {erro ? (
          <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
            <span className="text-zinc-600 text-sm">Erro ao carregar</span>
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? 'eager' : loading}
            decoding="async"
            onLoad={() => setCarregada(true)}
            onError={() => setErro(true)}
            className={`${className} transition-opacity duration-300 ${carregada ? 'opacity-100' : 'opacity-0'}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </div>
    )
  }
)

ImagemOtimizada.displayName = 'ImagemOtimizada'
