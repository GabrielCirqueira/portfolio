import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { memo, useState } from 'react'
import { SiWhatsapp } from 'react-icons/si'

const WHATSAPP_URL = 'https://wa.me/+5527996121313'

export const WhatsAppButton = memo(() => {
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleClick = () => {
    setShowConfirmation(true)
  }

  const handleConfirm = () => {
    window.open(WHATSAPP_URL, '_blank')
    setShowConfirmation(false)
  }

  const handleCancel = () => {
    setShowConfirmation(false)
  }

  return (
    <>
      <motion.button
        type="button"
        onClick={handleClick}
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

      <AnimatePresence>
        {showConfirmation && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCancel}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="relative bg-zinc-900 border-2 border-[#25D366]/30 rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl"
              >
                <button
                  type="button"
                  onClick={handleCancel}
                  className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
                  aria-label="Fechar"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex justify-center mb-4">
                  <div className="bg-[#25D366]/10 p-4 rounded-full border border-[#25D366]/20">
                    <SiWhatsapp className="w-12 h-12 text-[#25D366]" />
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-white text-center mb-2">
                  Abrir WhatsApp
                </h3>

                <p className="text-zinc-400 text-center mb-6">
                  Você será redirecionado para o WhatsApp para iniciar uma conversa.
                </p>

                <div className="bg-zinc-800/50 border border-[#25D366]/20 rounded-lg p-3 mb-6">
                  <p className="text-[#25D366] text-center font-mono text-sm md:text-base">
                    +55 27 99612-1313
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirm}
                    className="flex-1 bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold py-3 px-4 rounded-lg transition-colors shadow-lg shadow-[#25D366]/20"
                  >
                    Continuar
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  )
})

WhatsAppButton.displayName = 'WhatsAppButton'
