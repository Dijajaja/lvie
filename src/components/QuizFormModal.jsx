import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Trash2, Sparkles } from 'lucide-react'

const QuizFormModal = ({ onClose, onSave, events, surprises }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    questions: [
      { question: '', options: ['', '', '', ''], correctAnswer: 0 },
    ],
    reward: '',
    surpriseId: '',
  })

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        { question: '', options: ['', '', '', ''], correctAnswer: 0 },
      ],
    })
  }

  const removeQuestion = (index) => {
    if (formData.questions.length > 1) {
      setFormData({
        ...formData,
        questions: formData.questions.filter((_, i) => i !== index),
      })
    }
  }

  const updateQuestion = (index, field, value) => {
    const updatedQuestions = [...formData.questions]
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value }
    setFormData({ ...formData, questions: updatedQuestions })
  }

  const updateOption = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...formData.questions]
    updatedQuestions[questionIndex].options[optionIndex] = value
    setFormData({ ...formData, questions: updatedQuestions })
  }

  const validateForm = () => {
    if (!formData.title.trim()) {
      return 'Veuillez ajouter un titre au quiz'
    }
    
    const emptyQuestion = formData.questions.find(q => !q.question.trim())
    if (emptyQuestion) {
      return 'Toutes les questions doivent avoir un texte'
    }
    
    const emptyOption = formData.questions.find(q => 
      q.options.some(opt => !opt.trim())
    )
    if (emptyOption) {
      return 'Toutes les options doivent être remplies'
    }

    return null
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const error = validateForm()
    if (error) {
      alert(error)
      return
    }

    onSave(formData)
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
          className="card-romantic w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        >
          <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-romantic-200 p-6 flex items-center justify-between z-10">
            <h2 className="text-2xl font-bold text-romantic-700 font-romantic flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-romantic-500" />
              Nouveau Quiz Amoureux ❤️
            </h2>
            <button
              onClick={onClose}
              className="text-romantic-500 hover:text-romantic-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label className="block text-romantic-700 font-semibold mb-2">
                Titre du quiz *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full px-4 py-2 border border-romantic-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
                placeholder="Connais-tu bien ta moitié ?"
              />
            </div>

            <div>
              <label className="block text-romantic-700 font-semibold mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="2"
                className="w-full px-4 py-2 border border-romantic-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
                placeholder="Un quiz pour tester vos connaissances..."
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-romantic-700 font-semibold">
                  Questions *
                </label>
                <button
                  type="button"
                  onClick={addQuestion}
                  className="btn-romantic-secondary text-sm flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Ajouter une question
                </button>
              </div>

              <div className="space-y-6">
                {formData.questions.map((question, questionIndex) => (
                  <div
                    key={questionIndex}
                    className="p-4 border border-romantic-200 rounded-lg bg-romantic-50/50"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-romantic-700">
                        Question {questionIndex + 1}
                      </h4>
                      {formData.questions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeQuestion(questionIndex)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>

                    <div className="mb-4">
                      <label className="block text-romantic-600 text-sm mb-2">
                        Question *
                      </label>
                      <input
                        type="text"
                        value={question.question}
                        onChange={(e) =>
                          updateQuestion(questionIndex, 'question', e.target.value)
                        }
                        required
                        className="w-full px-4 py-2 border border-romantic-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
                        placeholder="Quel est mon plat préféré ?"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-romantic-600 text-sm mb-2">
                        Réponses (optionnel : cochez la bonne réponse pour un quiz avec score)
                      </label>
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center gap-3">
                          <input
                            type="radio"
                            name={`correct-${questionIndex}`}
                            checked={question.correctAnswer === optionIndex}
                            onChange={() =>
                              updateQuestion(questionIndex, 'correctAnswer', optionIndex)
                            }
                            className="w-4 h-4 text-romantic-500"
                          />
                          <input
                            type="text"
                            value={option}
                            onChange={(e) =>
                              updateOption(questionIndex, optionIndex, e.target.value)
                            }
                            required
                            className="flex-1 px-4 py-2 border border-romantic-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
                            placeholder={`Option ${optionIndex + 1}`}
                          />
                        </div>
                      ))}
                      <p className="text-xs text-romantic-500 mt-1">
                        💡 Astuce : Si aucune bonne réponse n'est cochée, le quiz sera un quiz de participation (score = 100%)
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-romantic-700 font-semibold mb-2">
                Message de récompense (optionnel)
              </label>
              <textarea
                value={formData.reward}
                onChange={(e) => setFormData({ ...formData, reward: e.target.value })}
                rows="2"
                className="w-full px-4 py-2 border border-romantic-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
                placeholder="Bravo ! Tu es incroyable ❤️"
              />
            </div>

            {surprises && surprises.length > 0 && (
              <div>
                <label className="block text-romantic-700 font-semibold mb-2">
                  Surprise à révéler (si quiz réussi à 100%)
                </label>
                <select
                  value={formData.surpriseId}
                  onChange={(e) => setFormData({ ...formData, surpriseId: e.target.value })}
                  className="w-full px-4 py-2 border border-romantic-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
                >
                  <option value="">Aucune surprise</option>
                  {surprises
                    .filter(s => !s.revealed)
                    .map((surprise) => (
                      <option key={surprise.id} value={surprise.id}>
                        {surprise.title}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="btn-romantic-secondary flex-1"
              >
                Annuler
              </button>
              <button type="submit" className="btn-romantic flex-1">
                Créer le quiz ❤️
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default QuizFormModal

