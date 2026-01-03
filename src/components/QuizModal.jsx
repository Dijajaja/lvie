import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, Sparkles } from 'lucide-react'
import { storage } from '../utils/storage'

const QuizModal = ({ quiz, onClose, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)

  const currentQuestion = quiz.questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: answerIndex,
    })
  }

  const calculateScore = () => {
    // Vérifier si le quiz a des bonnes réponses définies
    const hasCorrectAnswers = quiz.questions.some(q => q.correctAnswer !== undefined && q.correctAnswer !== null)
    
    if (!hasCorrectAnswers) {
      // Quiz de participation : score automatique à 100%
      return 100
    }
    
    // Quiz avec bonnes réponses : calculer le score normalement
    let correctAnswers = 0
    quiz.questions.forEach((q, index) => {
      if (q.correctAnswer !== undefined && q.correctAnswer !== null) {
        if (selectedAnswers[index] === q.correctAnswer) {
          correctAnswers++
        }
      }
    })
    
    // Compter seulement les questions qui ont une bonne réponse
    const questionsWithAnswers = quiz.questions.filter(q => q.correctAnswer !== undefined && q.correctAnswer !== null).length
    
    if (questionsWithAnswers === 0) return 100
    
    return Math.round((correctAnswers / questionsWithAnswers) * 100)
  }

  const handleNext = () => {
    if (isLastQuestion) {
      // Calculer et afficher le score
      const finalScore = calculateScore()
      setScore(finalScore)
      setShowResult(true)
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handleComplete = () => {
    // Sauvegarder et notifier le parent
    const finalScore = calculateScore()
    storage.saveQuizAttempt(quiz.id, finalScore, selectedAnswers)
    onComplete(quiz.id, finalScore, selectedAnswers)
  }

  const getScoreMessage = () => {
    // Messages émotionnels et doux, pas scolaires
    if (score === 100) return { 
      emoji: '💕', 
      message: 'Tu me connais si bien... Mon cœur est tout doux ✨', 
      color: 'text-romantic-500',
      subMessage: 'Ce moment nous appartient 💕'
    }
    if (score >= 80) return { 
      emoji: '🤍', 
      message: 'Tu me connais mieux chaque jour ✨', 
      color: 'text-romantic-500',
      subMessage: 'Peu importe la réponse, je t\'aime 🤍'
    }
    if (score >= 60) return { 
      emoji: '💖', 
      message: 'Chaque réponse nous rapproche un peu plus 💕', 
      color: 'text-romantic-400',
      subMessage: 'Ce moment nous appartient ✨'
    }
    return { 
      emoji: '💝', 
      message: 'Peu importe la réponse, je t\'aime 🤍', 
      color: 'text-romantic-300',
      subMessage: 'On apprend à se connaître, jour après jour 💕'
    }
  }

  if (showResult) {
    const scoreInfo = getScoreMessage()
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
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="card-romantic w-full max-w-md p-8 text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
              className="text-6xl mb-4"
            >
              {scoreInfo.emoji}
            </motion.div>
            <p className={`text-2xl font-semibold mb-3 ${scoreInfo.color}`}>
              {scoreInfo.message}
            </p>
            {scoreInfo.subMessage && (
              <p className="text-lg text-romantic-500 dark:text-romantic-400 mb-6 italic">
                {scoreInfo.subMessage}
              </p>
            )}
            {quiz.reward && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-romantic-50 dark:bg-gray-700 rounded-lg"
              >
                <p className="text-romantic-600 dark:text-romantic-300 font-medium">{quiz.reward}</p>
              </motion.div>
            )}
            <button
              onClick={handleComplete}
              className="btn-romantic w-full"
            >
              Merci pour ce moment partagé 💕
            </button>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    )
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
          className="card-romantic w-full max-w-2xl"
        >
          <div className="sticky top-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-b border-romantic-200 dark:border-gray-700 p-6 flex items-center justify-between z-10">
            <div>
              <h2 className="text-2xl font-bold text-romantic-700 dark:text-romantic-300 font-romantic flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-romantic-500" />
                {quiz.title}
              </h2>
              <p className="text-sm text-romantic-500 dark:text-romantic-400 mt-1">
                Moment {currentQuestionIndex + 1} sur {quiz.questions.length} 💕
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-romantic-500 dark:text-romantic-400 hover:text-romantic-700 dark:hover:text-romantic-300 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6"
            >
              <h3 className="text-xl font-bold text-romantic-700 dark:text-romantic-300 mb-6">
                {currentQuestion.question}
              </h3>
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswers[currentQuestionIndex] === index
                  return (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                        isSelected
                          ? 'border-romantic-500 bg-romantic-50 dark:bg-gray-700 dark:border-romantic-400'
                          : 'border-romantic-200 dark:border-gray-600 hover:border-romantic-300 dark:hover:border-gray-500 bg-white dark:bg-gray-800'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-romantic-700 dark:text-romantic-300">{option}</span>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            <Heart className="w-5 h-5 text-romantic-500 fill-current" />
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>

            <div className="flex justify-between items-center pt-4 border-t border-romantic-200">
              <div className="flex gap-2">
                {quiz.questions.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index <= currentQuestionIndex
                        ? 'bg-romantic-500'
                        : 'bg-romantic-200'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={handleNext}
                disabled={selectedAnswers[currentQuestionIndex] === undefined}
                className={`btn-romantic ${
                  selectedAnswers[currentQuestionIndex] === undefined
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
              >
                {isLastQuestion ? 'Partager ce moment avec toi 💕' : 'Continuer →'}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default QuizModal

