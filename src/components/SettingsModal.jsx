import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Users, Palette, UtensilsCrossed, Music, Film, Globe, Moon, Sun, Heart, Smile, Frown, Download, Upload } from 'lucide-react'
import { storage } from '../utils/storage'

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
                personName={settings.names?.person1 || 'Lui'}
                isPerson1={true}
              />
            )}

            {activeTab === 'person2' && (
              <PersonalInfoForm
                person={personalInfo.person2 || {}}
                updatePerson={(field, value) => updatePersonalInfo('person2', field, value)}
                personName={settings.names?.person2 || 'Elle'}
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

const PersonalInfoForm = ({ person, updatePerson, personName, isPerson1 }) => {
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
          Ce qui l'énerve
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

const ExportDataButton = () => {
  const handleExport = () => {
    const data = storage.exportAllData()
    const dataStr = JSON.stringify(data, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `love-story-backup-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
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

