import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, MapPin, Users, Heart, MessageSquare, Smile, Phone, Mail, Sparkles, Plane, Gift, Trophy } from 'lucide-react'
import { storage } from '../utils/storage'

const OurStoryModal = ({ onClose }) => {
  const [origin, setOrigin] = useState(null)
  const [settings, setSettings] = useState(null)
  const [activeTab, setActiveTab] = useState('origin')

  useEffect(() => {
    const savedOrigin = storage.getOrigin()
    const savedSettings = storage.getSettings()
    setOrigin(savedOrigin || {
      // Origine
      firstMeetingDate: '',
      firstMeetingPlace: '',
      howWeMet: '',
      howWeMetType: '',
      whoMadeFirstMove: '',
      firstImpressionPerson1: '',
      firstImpressionPerson2: '',
      whatMadeUsLaugh: '',
      firstEmotionalConnection: '',
      // Communication
      firstDiscussion: '',
      firstDiscussionType: '',
      whoWroteMost: '',
      firstNickname: '',
      firstMarkingMessage: '',
      whenFeltDifferent: '',
      // Moments clés
      officialDate: '',
      firstDate: '',
      firstTravel: '',
      firstAnniversary: '',
      firstArgument: '',
      firstArgumentResolution: '',
      mostRomanticMoment: '',
      mostDifficultMoment: '',
      mostDifficultResolution: '',
    })
    setSettings(savedSettings)
  }, [])

  const handleSave = () => {
    storage.saveOrigin(origin)
    onClose()
  }

  if (!origin || !settings) return null

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
          <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-romantic-200 p-6 z-10">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold text-romantic-700 font-romantic flex items-center gap-2">
                <Heart className="w-6 h-6 text-romantic-500" />
                OurStory
              </h2>
              <button
                onClick={onClose}
                className="text-romantic-500 hover:text-romantic-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-romantic-500 italic text-sm">
              Là où notre histoire commence
            </p>
          </div>

          {/* Onglets */}
          <div className="border-b border-romantic-200 bg-romantic-50/50">
            <div className="flex">
              <button
                onClick={() => setActiveTab('origin')}
                className={`flex-1 px-4 py-3 font-semibold transition-colors ${
                  activeTab === 'origin'
                    ? 'text-romantic-600 border-b-2 border-romantic-500 bg-white'
                    : 'text-romantic-400 hover:text-romantic-600'
                }`}
              >
                Origine
              </button>
              <button
                onClick={() => setActiveTab('communication')}
                className={`flex-1 px-4 py-3 font-semibold transition-colors ${
                  activeTab === 'communication'
                    ? 'text-romantic-600 border-b-2 border-romantic-500 bg-white'
                    : 'text-romantic-400 hover:text-romantic-600'
                }`}
              >
                Communication
              </button>
              <button
                onClick={() => setActiveTab('milestones')}
                className={`flex-1 px-4 py-3 font-semibold transition-colors ${
                  activeTab === 'milestones'
                    ? 'text-romantic-600 border-b-2 border-romantic-500 bg-white'
                    : 'text-romantic-400 hover:text-romantic-600'
                }`}
              >
                Moments clés
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {activeTab === 'origin' && (
              <>
                <div className="bg-romantic-50 rounded-lg p-4 border border-romantic-200">
                  <h3 className="text-xl font-bold text-romantic-700 mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Première Rencontre
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-romantic-700 font-semibold mb-2">
                        Date de la première rencontre *
                      </label>
                      <input
                        type="date"
                        value={origin.firstMeetingDate || ''}
                        onChange={(e) => setOrigin({ ...origin, firstMeetingDate: e.target.value })}
                        className="w-full px-4 py-2 border border-romantic-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-romantic-700 font-semibold mb-2 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Lieu de la rencontre *
                      </label>
                      <input
                        type="text"
                        value={origin.firstMeetingPlace || ''}
                        onChange={(e) => setOrigin({ ...origin, firstMeetingPlace: e.target.value })}
                        placeholder="Ville, endroit précis..."
                        className="w-full px-4 py-2 border border-romantic-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-romantic-700 font-semibold mb-2">
                        Comment vous vous êtes rencontrés *
                      </label>
                      <select
                        value={origin.howWeMetType || ''}
                        onChange={(e) => setOrigin({ ...origin, howWeMetType: e.target.value })}
                        className="w-full px-4 py-2 border border-romantic-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent mb-2"
                      >
                        <option value="">Sélectionner...</option>
                        <option value="online">En ligne</option>
                        <option value="friends">Amis</option>
                        <option value="family">Famille</option>
                        <option value="chance">Hasard</option>
                        <option value="work">Travail</option>
                        <option value="studies">Études</option>
                        <option value="other">Autre</option>
                      </select>
                      <textarea
                        value={origin.howWeMet || ''}
                        onChange={(e) => setOrigin({ ...origin, howWeMet: e.target.value })}
                        placeholder="Racontez comment vous vous êtes rencontrés..."
                        rows="3"
                        className="w-full px-4 py-2 border border-romantic-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-romantic-700 font-semibold mb-2 flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Qui a fait le premier pas ?
                      </label>
                      <select
                        value={origin.whoMadeFirstMove || ''}
                        onChange={(e) => setOrigin({ ...origin, whoMadeFirstMove: e.target.value })}
                        className="w-full px-4 py-2 border border-romantic-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
                      >
                        <option value="">Sélectionner...</option>
                        <option value="person1">{settings.names?.person1 || 'Personne 1'}</option>
                        <option value="person2">{settings.names?.person2 || 'Personne 2'}</option>
                        <option value="both">Les deux en même temps</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-romantic-50 rounded-lg p-4 border border-romantic-200">
                  <h3 className="text-xl font-bold text-romantic-700 mb-4 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Premières Impressions
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-romantic-700 font-semibold mb-2">
                        Première impression de {settings.names?.person1 || 'Personne 1'}
                      </label>
                      <textarea
                        value={origin.firstImpressionPerson1 || ''}
                        onChange={(e) => setOrigin({ ...origin, firstImpressionPerson1: e.target.value })}
                        placeholder="Qu'avez-vous pensé lors de la première rencontre ?"
                        rows="3"
                        className="w-full px-4 py-2 border border-romantic-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-romantic-700 font-semibold mb-2">
                        Première impression de {settings.names?.person2 || 'Personne 2'}
                      </label>
                      <textarea
                        value={origin.firstImpressionPerson2 || ''}
                        onChange={(e) => setOrigin({ ...origin, firstImpressionPerson2: e.target.value })}
                        placeholder="Qu'avez-vous pensé lors de la première rencontre ?"
                        rows="3"
                        className="w-full px-4 py-2 border border-romantic-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-romantic-700 font-semibold mb-2 flex items-center gap-2">
                        <Smile className="w-4 h-4" />
                        Ce qui vous a fait rire ou marqué ce jour-là
                      </label>
                      <textarea
                        value={origin.whatMadeUsLaugh || ''}
                        onChange={(e) => setOrigin({ ...origin, whatMadeUsLaugh: e.target.value })}
                        placeholder="Un moment drôle, un détail mémorable..."
                        rows="3"
                        className="w-full px-4 py-2 border border-romantic-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-romantic-700 font-semibold mb-2 flex items-center gap-2">
                        <Heart className="w-4 h-4" />
                        Ce qui a créé le premier lien émotionnel
                      </label>
                      <textarea
                        value={origin.firstEmotionalConnection || ''}
                        onChange={(e) => setOrigin({ ...origin, firstEmotionalConnection: e.target.value })}
                        placeholder="Le moment où vous avez senti que c'était spécial..."
                        rows="3"
                        className="w-full px-4 py-2 border border-romantic-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'communication' && (
              <div className="bg-romantic-50 rounded-lg p-4 border border-romantic-200">
                <h3 className="text-xl font-bold text-romantic-700 mb-4 flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Communication & Rapprochement
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-romantic-700 font-semibold mb-2">
                      Type de première discussion
                    </label>
                    <select
                      value={origin.firstDiscussionType || ''}
                      onChange={(e) => setOrigin({ ...origin, firstDiscussionType: e.target.value })}
                      className="w-full px-4 py-2 border border-romantic-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
                    >
                      <option value="">Sélectionner...</option>
                      <option value="call">Appel téléphonique</option>
                      <option value="message">Message</option>
                      <option value="meeting">Rencontre en personne</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-romantic-700 font-semibold mb-2">
                      Détails de la première discussion
                    </label>
                    <textarea
                      value={origin.firstDiscussion || ''}
                      onChange={(e) => setOrigin({ ...origin, firstDiscussion: e.target.value })}
                      placeholder="Comment s'est passée votre première vraie discussion ?"
                      rows="3"
                      className="w-full px-4 py-2 border border-romantic-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-romantic-700 font-semibold mb-2 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Qui écrivait le plus au début ?
                    </label>
                    <select
                      value={origin.whoWroteMost || ''}
                      onChange={(e) => setOrigin({ ...origin, whoWroteMost: e.target.value })}
                      className="w-full px-4 py-2 border border-romantic-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
                    >
                      <option value="">Sélectionner...</option>
                      <option value="person1">{settings.names?.person1 || 'Personne 1'}</option>
                      <option value="person2">{settings.names?.person2 || 'Personne 2'}</option>
                      <option value="both">Les deux équitablement</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-romantic-700 font-semibold mb-2">
                      Premier surnom donné
                    </label>
                    <input
                      type="text"
                      value={origin.firstNickname || ''}
                      onChange={(e) => setOrigin({ ...origin, firstNickname: e.target.value })}
                      placeholder="Le premier surnom affectueux..."
                      className="w-full px-4 py-2 border border-romantic-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-romantic-700 font-semibold mb-2 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Premier message marquant
                    </label>
                    <textarea
                      value={origin.firstMarkingMessage || ''}
                      onChange={(e) => setOrigin({ ...origin, firstMarkingMessage: e.target.value })}
                      placeholder="Un message qui vous a particulièrement touché..."
                      rows="3"
                      className="w-full px-4 py-2 border border-romantic-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-romantic-700 font-semibold mb-2 flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      Moment où vous avez senti que &quot;c&apos;était différent&quot;
                    </label>
                    <textarea
                      value={origin.whenFeltDifferent || ''}
                      onChange={(e) => setOrigin({ ...origin, whenFeltDifferent: e.target.value })}
                      placeholder="Le moment précis où vous avez su que c'était spécial..."
                      rows="3"
                      className="w-full px-4 py-2 border border-romantic-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'milestones' && (
              <>
                <div className="bg-romantic-50 rounded-lg p-4 border border-romantic-200">
                  <h3 className="text-xl font-bold text-romantic-700 mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Dates Importantes
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-romantic-700 font-semibold mb-2 flex items-center gap-2">
                        <Heart className="w-4 h-4" />
                        Date officielle de la relation
                      </label>
                      <input
                        type="date"
                        value={origin.officialDate || ''}
                        onChange={(e) => setOrigin({ ...origin, officialDate: e.target.value })}
                        className="w-full px-4 py-2 border border-romantic-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-romantic-700 font-semibold mb-2 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Premier rendez-vous
                      </label>
                      <input
                        type="date"
                        value={origin.firstDate || ''}
                        onChange={(e) => setOrigin({ ...origin, firstDate: e.target.value })}
                        className="w-full px-4 py-2 border border-romantic-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-romantic-700 font-semibold mb-2 flex items-center gap-2">
                        <Plane className="w-4 h-4" />
                        Premier voyage ensemble
                      </label>
                      <input
                        type="date"
                        value={origin.firstTravel || ''}
                        onChange={(e) => setOrigin({ ...origin, firstTravel: e.target.value })}
                        className="w-full px-4 py-2 border border-romantic-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-romantic-700 font-semibold mb-2 flex items-center gap-2">
                        <Gift className="w-4 h-4" />
                        Premier anniversaire fêté ensemble
                      </label>
                      <input
                        type="date"
                        value={origin.firstAnniversary || ''}
                        onChange={(e) => setOrigin({ ...origin, firstAnniversary: e.target.value })}
                        className="w-full px-4 py-2 border border-romantic-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-romantic-50 rounded-lg p-4 border border-romantic-200">
                  <h3 className="text-xl font-bold text-romantic-700 mb-4 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Moments Mémorables
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-romantic-700 font-semibold mb-2">
                        Première dispute + comment elle a été réglée
                      </label>
                      <textarea
                        value={origin.firstArgument || ''}
                        onChange={(e) => setOrigin({ ...origin, firstArgument: e.target.value })}
                        placeholder="Décrivez votre première dispute..."
                        rows="3"
                        className="w-full px-4 py-2 border border-romantic-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent mb-2"
                      />
                      <textarea
                        value={origin.firstArgumentResolution || ''}
                        onChange={(e) => setOrigin({ ...origin, firstArgumentResolution: e.target.value })}
                        placeholder="Comment avez-vous résolu la situation ?"
                        rows="2"
                        className="w-full px-4 py-2 border border-romantic-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-romantic-700 font-semibold mb-2 flex items-center gap-2">
                        <Heart className="w-4 h-4" />
                        Moment le plus romantique
                      </label>
                      <textarea
                        value={origin.mostRomanticMoment || ''}
                        onChange={(e) => setOrigin({ ...origin, mostRomanticMoment: e.target.value })}
                        placeholder="Décrivez le moment le plus romantique que vous avez partagé..."
                        rows="3"
                        className="w-full px-4 py-2 border border-romantic-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-romantic-700 font-semibold mb-2 flex items-center gap-2">
                        <Trophy className="w-4 h-4" />
                        Moment le plus difficile surmonté ensemble
                      </label>
                      <textarea
                        value={origin.mostDifficultMoment || ''}
                        onChange={(e) => setOrigin({ ...origin, mostDifficultMoment: e.target.value })}
                        placeholder="Décrivez l'épreuve la plus difficile que vous avez surmontée..."
                        rows="3"
                        className="w-full px-4 py-2 border border-romantic-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent mb-2"
                      />
                      <textarea
                        value={origin.mostDifficultResolution || ''}
                        onChange={(e) => setOrigin({ ...origin, mostDifficultResolution: e.target.value })}
                        placeholder="Comment avez-vous surmonté cette épreuve ensemble ?"
                        rows="2"
                        className="w-full px-4 py-2 border border-romantic-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="flex gap-4 pt-4 border-t border-romantic-200">
              <button
                type="button"
                onClick={onClose}
                className="btn-romantic-secondary flex-1"
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                className="btn-romantic flex-1"
              >
                Enregistrer ❤️
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default OurStoryModal

