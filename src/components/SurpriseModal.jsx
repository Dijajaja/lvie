import { motion, AnimatePresence } from 'framer-motion'
import { X, Gift, Sparkles } from 'lucide-react'

const SurpriseModal = ({ surprise, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.8, opacity: 0, rotate: 10 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="card-romantic w-full max-w-md p-8 text-center relative overflow-hidden"
        >
          {/* Confettis animés */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: -20, x: Math.random() * 400 - 200 }}
                animate={{
                  opacity: [0, 1, 0],
                  y: [0, 300],
                  x: Math.random() * 400 - 200,
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  repeat: Infinity,
                }}
                className="absolute text-2xl"
              >
                {['❤️', '💕', '✨', '🎉', '🎊'][Math.floor(Math.random() * 5)]}
              </motion.div>
            ))}
          </div>

          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="relative z-10"
          >
            <Gift className="w-16 h-16 text-romantic-500 mx-auto mb-4" />
          </motion.div>

          <h2 className="text-3xl font-bold text-romantic-700 mb-4 font-romantic relative z-10">
            {surprise.title}
          </h2>

          {surprise.image && (
            <div className="mb-6 rounded-lg overflow-hidden bg-romantic-50 flex items-center justify-center relative z-10 min-h-[200px]">
              <img
                src={surprise.image}
                alt={surprise.title}
                className="w-full max-h-64 object-contain"
              />
            </div>
          )}

          {surprise.message && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-romantic-600 text-lg mb-6 relative z-10"
            >
              {surprise.message}
            </motion.p>
          )}

          <button
            onClick={onClose}
            className="btn-romantic relative z-10"
          >
            Merci ❤️
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default SurpriseModal

