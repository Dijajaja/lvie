import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Timeline from './components/Timeline'
import QuizModal from './components/QuizModal'
import EventModal from './components/EventModal'
import QuizFormModal from './components/QuizFormModal'
import SurpriseModal from './components/SurpriseModal'
import SettingsModal from './components/SettingsModal'
import OurStoryModal from './components/OurStoryModal'
import Gallery from './components/Gallery'
import { Heart, Plus, Settings, Sparkles, BookOpen, Image as ImageIcon } from 'lucide-react'
import { storage } from './utils/storage'

function App() {
  const [events, setEvents] = useState([])
  const [quizzes, setQuizzes] = useState([])
  const [surprises, setSurprises] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [selectedQuiz, setSelectedQuiz] = useState(null)
  const [showEventModal, setShowEventModal] = useState(false)
  const [showQuizFormModal, setShowQuizFormModal] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [showOurStoryModal, setShowOurStoryModal] = useState(false)
  const [showGallery, setShowGallery] = useState(false)
  const [settings, setSettings] = useState(null)
  const [revealedSurprise, setRevealedSurprise] = useState(null)

  const applyTheme = (theme) => {
    // Forcer l'application du thème
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      document.body.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.body.classList.remove('dark')
    }
  }

  const loadData = () => {
    const loadedSettings = storage.getSettings()
    setEvents(storage.getEvents())
    setQuizzes(storage.getQuizzes())
    setSurprises(storage.getSurprises())
    setSettings(loadedSettings)
    applyTheme(loadedSettings?.theme)
  }

  useEffect(() => {
    loadData()
    checkDailySurprises()
    
    // Vérifier les surprises quotidiennes
    const interval = setInterval(checkDailySurprises, 60000) // Chaque minute
    return () => clearInterval(interval)
  }, [])

  // Appliquer le thème quand settings change
  useEffect(() => {
    if (settings?.theme) {
      applyTheme(settings.theme)
    }
  }, [settings?.theme])

  const checkDailySurprises = () => {
    const today = new Date().toDateString()
    const allSurprises = storage.getSurprises()
    
    allSurprises.forEach(surprise => {
      if (!surprise.revealed && surprise.triggerDate) {
        const triggerDate = new Date(surprise.triggerDate).toDateString()
        if (triggerDate === today) {
          setRevealedSurprise(surprise)
          storage.revealSurprise(surprise.id)
          setSurprises(storage.getSurprises())
        }
      }
    })
  }

  const handleAddEvent = (eventData) => {
    const newEvent = storage.addEvent(eventData)
    setEvents(storage.getEvents())
    setShowEventModal(false)
    return newEvent
  }

  const handleUpdateEvent = (id, updates) => {
    storage.updateEvent(id, updates)
    setEvents(storage.getEvents())
  }

  const handleDeleteEvent = (id) => {
    storage.deleteEvent(id)
    setEvents(storage.getEvents())
  }

  const handleEventClick = (event) => {
    setSelectedEvent(event)
    // Si l'événement a un quiz associé, l'afficher
    if (event.quizId) {
      const quiz = quizzes.find(q => q.id === event.quizId)
      if (quiz) {
        setSelectedQuiz(quiz)
      }
    }
  }

  const handleQuizComplete = (quizId, score, answers) => {
    // Vérifier si un quiz réussi à 100% déclenche une surprise
    const quiz = quizzes.find(q => q.id === quizId)
    if (quiz && quiz.surpriseId && score === 100) {
      const surprise = surprises.find(s => s.id === quiz.surpriseId)
      if (surprise && !surprise.revealed) {
        setRevealedSurprise(surprise)
        storage.revealSurprise(surprise.id)
        setSurprises(storage.getSurprises())
      }
    }
    
    setSelectedQuiz(null)
  }

  const handleAddQuiz = (quizData) => {
    storage.addQuiz(quizData)
    setQuizzes(storage.getQuizzes())
    setShowQuizFormModal(false)
  }

  const handleSaveSettings = (newSettings) => {
    storage.saveSettings(newSettings)
    setSettings(newSettings)
    applyTheme(newSettings.theme)
    setShowSettingsModal(false)
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-r from-romantic-500 to-romantic-600 text-white shadow-lg sticky top-0 z-40"
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart className="w-8 h-8 fill-current" />
            </motion.div>
            <h1 className="text-lg sm:text-2xl font-bold font-romantic truncate">
              {settings?.names?.person1 && settings?.names?.person2 
                ? `${settings.names.person1} & ${settings.names.person2}`
                : 'Love Story Interactive'
              }
            </h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowGallery(true)}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Galerie"
              title="Galerie"
            >
              <ImageIcon className="w-6 h-6" />
            </button>
            <button
              onClick={() => setShowOurStoryModal(true)}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Notre Histoire"
              title="Notre Histoire"
            >
              <BookOpen className="w-6 h-6" />
            </button>
            <button
              onClick={() => setShowSettingsModal(true)}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Paramètres"
            >
              <Settings className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Timeline */}
      <Timeline
        events={events}
        onEventClick={handleEventClick}
        onUpdateEvent={handleUpdateEvent}
        onDeleteEvent={handleDeleteEvent}
        quizzes={quizzes}
      />

      {/* Boutons flottants */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-30" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowQuizFormModal(true)}
          className="bg-romantic-400 text-white p-4 rounded-full shadow-lg hover:bg-romantic-500 transition-colors"
          aria-label="Ajouter un quiz"
        >
          <Sparkles className="w-6 h-6" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowEventModal(true)}
          className="bg-romantic-500 text-white p-4 rounded-full shadow-lg hover:bg-romantic-600 transition-colors"
          aria-label="Ajouter un événement"
        >
          <Plus className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showEventModal && (
          <EventModal
            onClose={() => setShowEventModal(false)}
            onSave={handleAddEvent}
            quizzes={quizzes}
          />
        )}
        
        {selectedEvent && (
          <EventModal
            event={selectedEvent}
            onClose={() => {
              setSelectedEvent(null)
              setSelectedQuiz(null)
            }}
            onSave={(updates) => {
              handleUpdateEvent(selectedEvent.id, updates)
              setSelectedEvent(null)
            }}
            onDelete={() => {
              handleDeleteEvent(selectedEvent.id)
              setSelectedEvent(null)
            }}
            quizzes={quizzes}
          />
        )}
        
        {selectedQuiz && (
          <QuizModal
            quiz={selectedQuiz}
            onClose={() => setSelectedQuiz(null)}
            onComplete={handleQuizComplete}
          />
        )}
        
        {showQuizFormModal && (
          <QuizFormModal
            onClose={() => setShowQuizFormModal(false)}
            onSave={handleAddQuiz}
            events={events}
            surprises={surprises}
          />
        )}
        
        {showSettingsModal && settings && (
          <SettingsModal
            settings={settings}
            onClose={() => setShowSettingsModal(false)}
            onSave={handleSaveSettings}
          />
        )}
        
        {showOurStoryModal && (
          <OurStoryModal
            onClose={() => setShowOurStoryModal(false)}
          />
        )}
        
        {showGallery && (
          <Gallery
            events={events}
            onClose={() => setShowGallery(false)}
          />
        )}
        
        {revealedSurprise && (
          <SurpriseModal
            surprise={revealedSurprise}
            onClose={() => setRevealedSurprise(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App

