import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Image as ImageIcon } from 'lucide-react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

const Gallery = ({ events, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null)

  // Récupérer toutes les images des événements
  const images = events
    .filter(event => event.image)
    .map(event => ({
      id: event.id,
      src: event.image,
      title: event.title,
      date: event.date,
      location: event.location,
    }))

  if (images.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="card-romantic w-full max-w-2xl p-8 text-center"
        >
          <ImageIcon className="w-16 h-16 text-romantic-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-romantic-700 mb-4">
            Aucune photo pour le moment
          </h2>
          <p className="text-romantic-500 mb-6">
            Ajoutez des photos à vos événements pour les voir apparaître ici !
          </p>
          <button
            onClick={onClose}
            className="btn-romantic"
          >
            Fermer
          </button>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="card-romantic w-full max-w-6xl max-h-[90vh] overflow-y-auto"
        >
          <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-romantic-200 p-6 flex items-center justify-between z-10">
            <h2 className="text-2xl font-bold text-romantic-700 font-romantic flex items-center gap-2">
              <ImageIcon className="w-6 h-6 text-romantic-500" />
              Galerie de Photos ❤️ ({images.length} {images.length > 1 ? 'photos' : 'photo'})
            </h2>
            <button
              onClick={onClose}
              className="text-romantic-500 hover:text-romantic-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(image)}
                  className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end">
                    <div className="p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity w-full">
                      <p className="text-sm font-semibold truncate">{image.title}</p>
                      {image.date && (
                        <p className="text-xs">
                          {format(new Date(image.date), 'd MMM yyyy', { locale: fr })}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Modal d'image agrandie */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-romantic-300 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />
              <div className="absolute -bottom-12 left-0 right-0 text-center text-white">
                <h3 className="text-xl font-bold mb-2">{selectedImage.title}</h3>
                {selectedImage.date && (
                  <p className="text-sm opacity-80">
                    {format(new Date(selectedImage.date), 'd MMMM yyyy', { locale: fr })}
                    {selectedImage.location && ` • ${selectedImage.location}`}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Gallery

