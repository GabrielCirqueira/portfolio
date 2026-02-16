import { motion } from 'framer-motion'
import { memo, useState } from 'react'
import { SiWhatsapp } from 'react-icons/si'
import { ModalWhatsApp } from '@/components/modal/ModalWhatsApp'

export const WhatsAppButton = memo(() => {
  const [estaAberto, setEstaAberto] = useState(false)

  const handleAbrir = () => {
    setEstaAberto(true)
  }

  const handleFechar = () => {
    setEstaAberto(false)
  }

  return (
    <>
      <motion.button
        type="button"
        onClick={handleAbrir}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-3 md:p-4 shadow-lg hover:shadow-xl transition-colors"
        aria-label="Abrir WhatsApp"
      >
        <SiWhatsapp className="w-6 h-6 md:w-7 md:h-7" />

        <motion.div
          className="absolute inset-0 bg-[#25D366] rounded-full -z-10"
          animate={{
            scale: [1, 1.4, 1.4, 1],
            opacity: [0.6, 0.3, 0, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
        />
      </motion.button>

      <ModalWhatsApp estaAberto={estaAberto} aoFechar={handleFechar} />
    </>
  )
})

WhatsAppButton.displayName = 'WhatsAppButton'
