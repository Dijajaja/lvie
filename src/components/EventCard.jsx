import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Calendar, MapPin, Image, MessageSquare, Sparkles } from 'lucide-react'

const EventCard = ({ event, onClick, onUpdate, onDelete, hasQuiz }) => {
  const eventDate = new Date(event.date)

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="card-romantic p-6 cursor-pointer hover:shadow-xl transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl sm:text-2xl font-bold text-romantic-700 dark:text-romantic-300 mb-2 font-romantic">
            {event.title}
          </h3>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-romantic-500 dark:text-romantic-400 text-sm mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{format(eventDate, 'd MMMM yyyy', { locale: fr })}</span>
            </div>
            {event.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{event.location}</span>
              </div>
            )}
          </div>
        </div>
        {hasQuiz && (
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          >
            <Sparkles className="w-6 h-6 text-romantic-500" />
          </motion.div>
        )}
      </div>

      {event.image && (
        <div className="mb-4 rounded-lg overflow-hidden bg-romantic-50 dark:bg-gray-800 flex items-center justify-center">
          <img
            src={event.image}
            alt={event.title}
            className="w-full max-h-64 object-contain"
          />
        </div>
      )}

      {event.description && (
        <p className="text-romantic-600 dark:text-romantic-300 mb-4 line-clamp-3">
            {event.description}
          </p>
      )}

      {event.tags && event.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {event.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-romantic-100 dark:bg-gray-700 text-romantic-600 dark:text-romantic-300 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default EventCard

