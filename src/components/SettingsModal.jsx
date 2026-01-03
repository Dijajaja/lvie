import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Users, Palette, UtensilsCrossed, Music, Film, Globe, Sun, Heart, Smile, Frown, Download, Upload, Cloud, CloudOff, Copy } from 'lucide-react'
import { storage } from '../utils/storage'
import { initializeSync, getCoupleId, isSyncEnabled } from '../utils/storageSync'
import { firebaseConfig } from '../firebase/config'

const SettingsModal = ({ settings, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    names: { ...settings.names },
    theme: settings.theme || 'light',
  })
  const [personalInfo, setPersonalInfo] = useState({ person1: {}, person2: {} })
  const [activeTab, setActiveTab] = useState('general')

  useEffect(() => {
    const savedInfo = storage.getPersonalInfo()
    setPersonalInfo(savedInfo)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
    storage.savePersonalInfo(personalInfo)
  }

  const updatePersonalInfo = (person, field, value) => {
    setPersonalInfo({
      ...personalInfo,
      [person]: {
        ...personalInfo[person],
        [field]: value,
      },
    })
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
          <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-romantic-200 p-6 flex items-center justify-between z-10">
            <h2 className="text-2xl font-bold text-romantic-700 font-romantic">
              Paramètres ⚙️
            </h2>
            <button
              onClick={onClose}
              className="text-romantic-500 hover:text-romantic-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Onglets */}
          <div className="border-b border-romantic-200 bg-romantic-50/50">
            <div className="flex">
              <button
                type="button"
                onClick={() => setActiveTab('general')}
                className={`flex-1 px-4 py-3 font-semibold transition-colors ${
                  activeTab === 'general'
                    ? 'text-romantic-600 border-b-2 border-romantic-500 bg-white'
                    : 'text-romantic-400 hover:text-romantic-600'
                }`}
              >
                Général
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('person1')}
                className={`flex-1 px-4 py-3 font-semibold transition-colors ${
                  activeTab === 'person1'
                    ? 'text-romantic-600 border-b-2 border-romantic-500 bg-white'
                    : 'text-romantic-400 hover:text-romantic-600'
                }`}
              >
                {settings.names?.person1 || 'Personne 1'}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('person2')}
                className={`flex-1 px-4 py-3 font-semibold transition-colors ${
                  activeTab === 'person2'
                    ? 'text-romantic-600 border-b-2 border-romantic-500 bg-white'
                    : 'text-romantic-400 hover:text-romantic-600'
                }`}
              >
                {settings.names?.person2 || 'Personne 2'}
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {activeTab === 'general' && (
              <>
            <div>
              <label className="block text-romantic-700 font-semibold mb-2 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Vos prénoms
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    value={formData.names.person1 || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        names: { ...formData.names, person1: e.target.value },
                      })
                    }
                    placeholder="Lui"
                    className="w-full px-4 py-2 border border-romantic-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={formData.names.person2 || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        names: { ...formData.names, person2: e.target.value },
                      })
                    }
                    placeholder="Elle"
                    className="w-full px-4 py-2 border border-romantic-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-romantic-700 font-semibold mb-2 flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Thème
              </label>
              <select
                value={formData.theme}
                onChange={(e) => {
                  const newTheme = e.target.value
                  setFormData({ ...formData, theme: newTheme })
                  // Appliquer le thème immédiatement
                  if (newTheme === 'dark') {
                    document.documentElement.classList.add('dark')
                  } else {
                    document.documentElement.classList.remove('dark')
                  }
                }}
                className="w-full px-4 py-2 border border-romantic-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
              >
                <option value="light">Clair 💕</option>
                <option value="dark">Sombre 🌙</option>
              </select>
            </div>

            <div className="border-t border-romantic-200 dark:border-gray-700 pt-6 mt-6">
              <h3 className="text-lg font-bold text-romantic-700 dark:text-romantic-300 mb-4">
                Synchronisation en temps réel 🔄
              </h3>
              <FirebaseSyncSection />
            </div>

            <div className="border-t border-romantic-200 dark:border-gray-700 pt-6 mt-6">
              <h3 className="text-lg font-bold text-romantic-700 dark:text-romantic-300 mb-4">
                Partage des données 💕
              </h3>
              <p className="text-sm text-romantic-600 dark:text-romantic-400 mb-4">
                Exportez vos données pour les partager avec votre partenaire, ou importez les siennes pour synchroniser vos souvenirs.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <ExportDataButton />
                <ImportDataButton onImport={() => window.location.reload()} />
              </div>
            </div>
              </>
            )}

            {activeTab === 'person1' && (
              <PersonalInfoForm
                person={personalInfo.person1 || {}}
                updatePerson={(field, value) => updatePersonalInfo('person1', field, value)}
                isPerson1={true}
              />
            )}

            {activeTab === 'person2' && (
              <PersonalInfoForm
                person={personalInfo.person2 || {}}
                updatePerson={(field, value) => updatePersonalInfo('person2', field, value)}
                isPerson1={false}
              />
            )}

            <div className="flex gap-4 pt-4 border-t border-romantic-200">
              <button
                type="button"
                onClick={onClose}
                className="btn-romantic-secondary flex-1"
              >
                Annuler
              </button>
              <button type="submit" className="btn-romantic flex-1">
                Enregistrer ❤️
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

const PersonalInfoForm = ({ person, updatePerson, isPerson1 }) => {
  // Déterminer le genre selon si c'est person1 (Lui = masculin) ou person2 (Elle = féminin)
  const isMasculin = isPerson1
  
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-romantic-700 font-semibold mb-2 flex items-center gap-2">
          <UtensilsCrossed className="w-4 h-4" />
          Plat préféré
        </label>
        <input
          type="text"
          value={person.favoriteFood || ''}
          onChange={(e) => updatePerson('favoriteFood', e.target.value)}
          placeholder="Pizza, Sushi, Pâtes..."
          className="w-full px-4 py-2 border border-romantic-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-romantic-700 font-semibold mb-2 flex items-center gap-2">
          <Music className="w-4 h-4" />
          Musique préférée
        </label>
        <input
          type="text"
          value={person.favoriteMusic || ''}
          onChange={(e) => updatePerson('favoriteMusic', e.target.value)}
          placeholder="Genre, artiste ou chanson..."
          className="w-full px-4 py-2 border border-romantic-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-romantic-700 font-semibold mb-2 flex items-center gap-2">
          <Film className="w-4 h-4" />
          Film/série préférée
        </label>
        <input
          type="text"
          value={person.favoriteMovie || ''}
          onChange={(e) => updatePerson('favoriteMovie', e.target.value)}
          placeholder="Titre du film ou série..."
          className="w-full px-4 py-2 border border-romantic-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-romantic-700 font-semibold mb-2 flex items-center gap-2">
          <Globe className="w-4 h-4" />
          Destination de rêve
        </label>
        <input
          type="text"
          value={person.dreamDestination || ''}
          onChange={(e) => updatePerson('dreamDestination', e.target.value)}
          placeholder="Pays, ville..."
          className="w-full px-4 py-2 border border-romantic-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-romantic-700 font-semibold mb-2 flex items-center gap-2">
          <Sun className="w-4 h-4" />
          Habitudes (matin/nuit)
        </label>
        <textarea
          value={person.habits || ''}
          onChange={(e) => updatePerson('habits', e.target.value)}
          placeholder="Lève-tôt, couche-tard, café le matin..."
          rows="2"
          className="w-full px-4 py-2 border border-romantic-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-romantic-700 font-semibold mb-2 flex items-center gap-2">
          <Smile className="w-4 h-4" />
          {isMasculin ? 'Ce qui le rend heureux' : 'Ce qui la rend heureuse'}
        </label>
        <textarea
          value={person.whatMakesHappy || ''}
          onChange={(e) => updatePerson('whatMakesHappy', e.target.value)}
          placeholder={isMasculin ? 'Les petites choses qui le rendent heureux...' : 'Les petites choses qui la rendent heureuse...'}
          rows="2"
          className="w-full px-4 py-2 border border-romantic-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-romantic-700 dark:text-romantic-300 font-semibold mb-2 flex items-center gap-2">
          <Frown className="w-4 h-4" />
          Ce qui l&apos;énerve
        </label>
        <textarea
          value={person.whatAnnoys || ''}
          onChange={(e) => updatePerson('whatAnnoys', e.target.value)}
          placeholder="Les petites choses qui l'énervent..."
          rows="2"
          className="w-full px-4 py-2 border border-romantic-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-romantic-700 dark:text-romantic-300 font-semibold mb-2 flex items-center gap-2">
          <Heart className="w-4 h-4" />
          {isMasculin ? 'Ce qu\'il aime le plus chez elle' : 'Ce qu\'elle aime le plus chez lui'}
        </label>
        <textarea
          value={person.whatLovesMost || ''}
          onChange={(e) => updatePerson('whatLovesMost', e.target.value)}
          placeholder="Les qualités, les traits de caractère..."
          rows="3"
          className="w-full px-4 py-2 border border-romantic-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
        />
      </div>
    </div>
  )
}

const FirebaseSyncSection = () => {
  const [isEnabled, setIsEnabled] = useState(false)
  const [coupleId, setCoupleId] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    setIsEnabled(isSyncEnabled())
    setCoupleId(getCoupleId())
  }, [])

  const handleEnableSync = async () => {
    setLoading(true)
    setMessage('')

    // Vérifier si Firebase est configuré
    if (!firebaseConfig.apiKey || firebaseConfig.apiKey === 'VOTRE_API_KEY') {
      setMessage('⚠️ Veuillez d\'abord configurer Firebase dans src/firebase/config.js (voir FIREBASE_SETUP.md)')
      setLoading(false)
      return
    }

    try {
      const result = await initializeSync(firebaseConfig)
      if (result.success) {
        setIsEnabled(true)
        setCoupleId(result.coupleId || getCoupleId())
        setMessage('✅ Synchronisation activée ! Partagez l\'ID du couple avec votre partenaire.')
        // Recharger la page pour appliquer les changements
        setTimeout(() => window.location.reload(), 2000)
      } else {
        setMessage(`❌ Erreur : ${result.message}`)
      }
    } catch (error) {
      setMessage(`❌ Erreur : ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const copyCoupleId = () => {
    navigator.clipboard.writeText(coupleId)
    setMessage('✅ ID copié ! Partagez-le avec votre partenaire.')
    setTimeout(() => setMessage(''), 3000)
  }

  if (isEnabled) {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="flex items-center gap-2 text-green-700 dark:text-green-400 mb-2">
            <Cloud className="w-5 h-5" />
            <span className="font-semibold">Synchronisation active ✅</span>
          </div>
          <p className="text-sm text-green-600 dark:text-green-300 mb-3">
            Vos données se synchronisent en temps réel avec votre partenaire !
          </p>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-green-700 dark:text-green-400">
              ID du couple (à partager) :
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={coupleId}
                readOnly
                className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 border border-green-300 dark:border-green-700 rounded text-sm font-mono"
              />
              <button
                type="button"
                onClick={copyCoupleId}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded transition-colors flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                Copier
              </button>
            </div>
          </div>
        </div>
        {message && (
          <p className={`text-sm ${message.includes('✅') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {message}
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 mb-2">
          <CloudOff className="w-5 h-5" />
          <span className="font-semibold">Synchronisation désactivée</span>
        </div>
        <p className="text-sm text-blue-600 dark:text-blue-300 mb-4">
          Activez la synchronisation en temps réel pour voir les modifications de votre partenaire instantanément avec des notifications ! 🔔
        </p>
        <button
          type="button"
          onClick={handleEnableSync}
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Activation...
            </>
          ) : (
            <>
              <Cloud className="w-4 h-4" />
              Activer la synchronisation
            </>
          )}
        </button>
      </div>
      {message && (
        <p className={`text-sm ${message.includes('✅') ? 'text-green-600 dark:text-green-400' : message.includes('⚠️') ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}`}>
          {message}
        </p>
      )}
      <p className="text-xs text-romantic-500 dark:text-romantic-400">
        📖 Consultez FIREBASE_SETUP.md pour les instructions de configuration
      </p>
    </div>
  )
}

const ExportDataButton = () => {
  const handleExport = () => {
    const data = storage.exportAllData()
    const dataStr = JSON.stringify(data, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
        
    // Créer un nom de fichier avec date lisible
    const date = new Date()
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    const fileName = `notre-histoire-${dateStr}.json`
    
    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    link.setAttribute('download', fileName) // Force le nom du fichier
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
    // Afficher un message de confirmation
    setTimeout(() => {
      alert(`Fichier exporté : ${fileName}\n\nVous pouvez maintenant le partager avec votre partenaire ! 💕`)
    }, 100)
  }

  return (
    <button
      type="button"
      onClick={handleExport}
      className="btn-romantic-secondary flex items-center justify-center gap-2 flex-1"
    >
      <Download className="w-4 h-4" />
      Exporter les données
    </button>
  )
}

const ImportDataButton = ({ onImport }) => {
  const fileInputRef = useRef(null)
  const [showMergeOption, setShowMergeOption] = useState(false)
  const [pendingData, setPendingData] = useState(null)

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result)
        setPendingData(data)
        setShowMergeOption(true)
      } catch (error) {
        alert('Erreur : Le fichier n\'est pas valide')
      }
    }
    reader.readAsText(file)
  }

  const handleImport = (merge) => {
    if (!pendingData) return

    const success = storage.importAllData(pendingData, merge)
    if (success) {
      alert(merge ? 'Données fusionnées avec succès !' : 'Données importées avec succès !')
      setShowMergeOption(false)
      setPendingData(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
      if (onImport) onImport()
    } else {
      alert('Erreur lors de l\'import des données')
    }
  }

  if (showMergeOption) {
    return (
      <div className="flex flex-col gap-2 flex-1">
        <p className="text-xs text-romantic-600 dark:text-romantic-400 text-center mb-2">
          Comment voulez-vous importer ?
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => handleImport(false)}
            className="btn-romantic-secondary text-xs flex-1"
          >
            Remplacer
          </button>
          <button
            type="button"
            onClick={() => handleImport(true)}
            className="btn-romantic text-xs flex-1"
          >
            Fusionner
          </button>
          <button
            type="button"
            onClick={() => {
              setShowMergeOption(false)
              setPendingData(null)
            }}
            className="btn-romantic-secondary text-xs px-3"
          >
            Annuler
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept=".json"
        className="hidden"
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="btn-romantic-secondary flex items-center justify-center gap-2 flex-1"
      >
        <Upload className="w-4 h-4" />
        Importer des données
      </button>
    </>
  )
}

export default SettingsModal

