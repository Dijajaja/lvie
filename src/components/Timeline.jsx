import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import EventCard from './EventCard'

const Timeline = ({ events, onEventClick, onUpdateEvent, onDeleteEvent, quizzes }) => {
  // Trier les événements par date (plus récent en premier)
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateB - dateA
  })

  if (sortedEvents.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-romantic p-12 max-w-md mx-auto"
        >
          <h2 className="text-2xl font-bold text-romantic-600 dark:text-romantic-300 mb-4">
            Commencez votre histoire ❤️
          </h2>
          <p className="text-romantic-500 dark:text-romantic-400 mb-6">
            Ajoutez votre premier souvenir pour démarrer votre timeline d'amour
          </p>
          <div className="text-6xl animate-float">💕</div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative"
      >
        {/* Ligne verticale de la timeline */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 md:w-1 bg-gradient-to-b from-romantic-300 to-romantic-400 transform md:-translate-x-1/2"></div>

        {/* Événements */}
        <div className="space-y-8">
          {sortedEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Point sur la timeline */}
              <div className="absolute left-4 md:left-1/2 w-3 h-3 md:w-4 md:h-4 bg-romantic-500 rounded-full border-2 md:border-4 border-white shadow-lg transform md:-translate-x-1/2 z-10 animate-pulse-soft"></div>

              {/* Carte événement */}
              <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                <EventCard
                  event={event}
                  onClick={() => onEventClick(event)}
                  onUpdate={onUpdateEvent}
                  onDelete={onDeleteEvent}
                  hasQuiz={quizzes.some(q => q.id === event.quizId)}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Timeline

