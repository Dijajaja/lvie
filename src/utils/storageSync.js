// Storage hybride : Local Storage + Firebase (si configuré)
import { storage } from './storage'
import { 
  initFirebase, 
  syncData, 
  saveToFirebase, 
  loadFromFirebase, 
  getOrCreateCoupleId,
  isFirebaseEnabled,
  requestNotificationPermission,
  sendLocalNotification
} from '../firebase/firebase'

// Collections Firebase
const COLLECTIONS = {
  EVENTS: 'events',
  QUIZZES: 'quizzes',
  SURPRISES: 'surprises',
  SETTINGS: 'settings',
  ORIGIN: 'origin',
  PERSONAL_INFO: 'personalInfo',
}

let syncCallbacks = {}
let isSyncing = false

// Initialiser Firebase et démarrer la synchronisation
export const initializeSync = async (firebaseConfig) => {
  if (!firebaseConfig || !firebaseConfig.apiKey || firebaseConfig.apiKey === 'VOTRE_API_KEY') {
    console.log('Firebase non configuré, utilisation du stockage local uniquement')
    return { success: false, message: 'Firebase non configuré' }
  }

  try {
    const coupleId = getOrCreateCoupleId()
    const result = await initFirebase(firebaseConfig, coupleId)
    
    if (!result.success) {
      return result
    }

    // Demander la permission pour les notifications
    await requestNotificationPermission()

    // Démarrer la synchronisation pour chaque collection
    await startSync()

    return { success: true, coupleId, message: 'Synchronisation activée !' }
  } catch (error) {
    console.error('Erreur initialisation sync:', error)
    return { success: false, message: error.message }
  }
}

// Démarrer la synchronisation bidirectionnelle
const startSync = async () => {
  if (isSyncing) return
  isSyncing = true

  // Pour chaque collection, écouter les changements Firebase
  Object.values(COLLECTIONS).forEach(collection => {
    const unsubscribe = syncData(collection, (firebaseData) => {
      if (!firebaseData) return

      // Mettre à jour le Local Storage avec les données Firebase
      const storageKey = getStorageKey(collection)
      const isArray = Array.isArray(firebaseData)
      const currentData = JSON.parse(localStorage.getItem(storageKey) || (isArray ? '[]' : '{}'))
      
      // Fusionner intelligemment les données
      const merged = mergeData(currentData, firebaseData)
      localStorage.setItem(storageKey, JSON.stringify(merged))

      // Notifier les callbacks
      if (syncCallbacks[collection] && syncCallbacks[collection].onChange) {
        syncCallbacks[collection].onChange(merged)
      }
    })

    if (!syncCallbacks[collection]) {
      syncCallbacks[collection] = {}
    }
    syncCallbacks[collection].unsubscribe = unsubscribe
  })
}

// Obtenir la clé de storage locale correspondante
const getStorageKey = (collection) => {
  const keys = {
    [COLLECTIONS.EVENTS]: 'love_story_events',
    [COLLECTIONS.QUIZZES]: 'love_story_quizzes',
    [COLLECTIONS.SURPRISES]: 'love_story_surprises',
    [COLLECTIONS.SETTINGS]: 'love_story_settings',
    [COLLECTIONS.ORIGIN]: 'love_story_origin',
    [COLLECTIONS.PERSONAL_INFO]: 'love_story_personal_info',
  }
  return keys[collection] || collection
}

// Fusionner les données locales et Firebase
const mergeData = (local, remote) => {
  // Si remote est un objet (settings, origin, personalInfo), le remplacer
  if (!Array.isArray(remote) && typeof remote === 'object') {
    return { ...local, ...remote }
  }

  // Si ce sont des tableaux, fusionner par ID
  const merged = [...local]
  remote.forEach(remoteItem => {
    const index = merged.findIndex(item => item.id === remoteItem.id)
    if (index >= 0) {
      // Mettre à jour si plus récent
      const localTime = new Date(merged[index].updatedAt || merged[index].createdAt || 0)
      const remoteTime = new Date(remoteItem.updatedAt || remoteItem.createdAt || 0)
      if (remoteTime > localTime) {
        merged[index] = remoteItem
      }
    } else {
      // Ajouter les nouveaux éléments
      merged.push(remoteItem)
    }
  })

  return merged
}

// Sauvegarder localement ET sur Firebase
export const syncSave = async (collection, data) => {
  // Toujours sauvegarder localement
  const storageKey = getStorageKey(collection)
  localStorage.setItem(storageKey, JSON.stringify(data))

  // Sauvegarder sur Firebase si activé
  if (isFirebaseEnabled()) {
    try {
      await saveToFirebase(collection, data)
      
      // Notification seulement si c'est un événement ou quiz (pas pour settings)
      if (collection === COLLECTIONS.EVENTS && Array.isArray(data)) {
        const lastEvent = data[data.length - 1]
        if (lastEvent) {
          sendLocalNotification(
            'Nouveau souvenir ajouté ! 💕',
            lastEvent.title || 'Un nouveau moment partagé'
          )
        }
      }
    } catch (error) {
      console.error(`Erreur sync save ${collection}:`, error)
    }
  }
}

// Enregistrer un callback pour être notifié des changements
export const onSync = (collection, callback) => {
  if (!syncCallbacks[collection]) {
    syncCallbacks[collection] = {}
  }
  syncCallbacks[collection].onChange = callback
}

// Obtenir l'ID du couple
export const getCoupleId = () => {
  return getOrCreateCoupleId()
}

// Vérifier si la synchronisation est active
export const isSyncEnabled = () => {
  return isFirebaseEnabled()
}

