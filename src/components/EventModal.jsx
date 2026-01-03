import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, MapPin, Image as ImageIcon, Tag, Sparkles } from 'lucide-react'

const EventModal = ({ event, onClose, onSave, onDelete, quizzes }) => {
  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    location: '',
    description: '',
    image: '',
    eventType: '',
    tags: '',
    quizId: '',
  })

  const [imagePreview, setImagePreview] = useState('')

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || '',
        date: event.date ? event.date.split('T')[0] : new Date().toISOString().split('T')[0],
        location: event.location || '',
        description: event.description || '',
        image: event.image || '',
        eventType: event.eventType || '',
        tags: event.tags ? event.tags.join(', ') : '',
        quizId: event.quizId || '',
      })
      setImagePreview(event.image || '')
    }
  }, [event])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result
        setFormData({ ...formData, image: base64String })
        setImagePreview(base64String)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const tagsArray = formData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0)

    const eventData = {
      ...formData,
      tags: tagsArray,
      date: new Date(formData.date).toISOString(),
      image: formData.image || undefined,
    }

    if (event) {
      onSave(event.id, eventData)
    } else {
      onSave(eventData)
    }
  }

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
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="card-romantic w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        >
          <div className="sticky top-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-b border-romantic-200 dark:border-gray-700 p-6 flex items-center justify-between z-10">
            <h2 className="text-2xl font-bold text-romantic-700 dark:text-romantic-300 font-romantic">
              {event ? 'Modifier l\'événement' : 'Nouvel événement ❤️'}
            </h2>
            <button
              onClick={onClose}
              className="text-romantic-500 dark:text-romantic-400 hover:text-romantic-700 dark:hover:text-romantic-300 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label className="block text-romantic-700 dark:text-romantic-300 font-semibold mb-2">
                Titre *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full px-4 py-2 border border-romantic-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
                placeholder="Premier rendez-vous, Voyage à..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-romantic-700 dark:text-romantic-300 font-semibold mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Date *
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-romantic-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-romantic-700 dark:text-romantic-300 font-semibold mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Lieu
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-romantic-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
                  placeholder="Paris, Restaurant..."
                />
              </div>
            </div>

            <div>
              <label className="block text-romantic-700 dark:text-romantic-300 font-semibold mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="4"
                className="w-full px-4 py-2 border border-romantic-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
                placeholder="Racontez ce moment spécial..."
              />
            </div>

            <div>
              <label className="block text-romantic-700 dark:text-romantic-300 font-semibold mb-2">
                Type d'événement
              </label>
              <select
                value={formData.eventType}
                onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                className="w-full px-4 py-2 border border-romantic-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
              >
                <option value="">Sélectionner...</option>
                <option value="first-date">Premier rendez-vous</option>
                <option value="anniversary">Anniversaire</option>
                <option value="travel">Voyage</option>
                <option value="celebration">Célébration</option>
                <option value="milestone">Étape importante</option>
                <option value="surprise">Surprise</option>
                <option value="other">Autre</option>
              </select>
            </div>

            <div>
              <label className="block text-romantic-700 dark:text-romantic-300 font-semibold mb-2">
                <ImageIcon className="w-4 h-4 inline mr-2" />
                Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 border border-romantic-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
              />
              {imagePreview && (
                <div className="mt-4 rounded-lg overflow-hidden bg-romantic-50 dark:bg-gray-800 flex items-center justify-center min-h-[200px]">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full max-h-64 object-contain"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-romantic-700 dark:text-romantic-300 font-semibold mb-2">
                <Tag className="w-4 h-4 inline mr-2" />
                Tags (séparés par des virgules)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-4 py-2 border border-romantic-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
                placeholder="Voyage, Anniversaire, Première fois..."
              />
            </div>

            {quizzes && quizzes.length > 0 && (
              <div>
                <label className="block text-romantic-700 dark:text-romantic-300 font-semibold mb-2">
                  <Sparkles className="w-4 h-4 inline mr-2" />
                  Quiz associé
                </label>
                <select
                  value={formData.quizId}
                  onChange={(e) => setFormData({ ...formData, quizId: e.target.value })}
                  className="w-full px-4 py-2 border border-romantic-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
                >
                  <option value="">Aucun quiz</option>
                  {quizzes.map((quiz) => (
                    <option key={quiz.id} value={quiz.id}>
                      {quiz.title}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="btn-romantic flex-1"
              >
                {event ? 'Enregistrer' : 'Ajouter ❤️'}
              </button>
              {event && onDelete && (
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
                      onDelete(event.id)
                      onClose()
                    }
                  }}
                  className="px-6 py-3 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600 transition-colors"
                >
                  Supprimer
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default EventModal

