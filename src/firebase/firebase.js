// Service Firebase pour la synchronisation en temps réel (Realtime Database)
import { initializeApp } from 'firebase/app'
import { getAuth, signInAnonymously } from 'firebase/auth'
import { getDatabase, ref, set, get, onValue, off, serverTimestamp } from 'firebase/database'

// Configuration Firebase - Sera remplacée par l'utilisateur
let firebaseConfig = null
let app = null
let auth = null
let db = null

// État de connexion
let isInitialized = false
let currentCoupleId = null
let syncListeners = {}

// Initialiser Firebase
export const initFirebase = async (config, coupleId) => {
  if (isInitialized && currentCoupleId === coupleId) {
    return { success: true, message: 'Firebase déjà initialisé' }
  }

  try {
    firebaseConfig = config
    currentCoupleId = coupleId
    
    // Initialiser l'app Firebase
    app = initializeApp(firebaseConfig)
    auth = getAuth(app)
    db = getDatabase(app)

    // S'authentifier anonymement
    await signInAnonymously(auth)

    isInitialized = true
    return { success: true, message: 'Firebase initialisé avec succès' }
  } catch (error) {
    console.error('Erreur initialisation Firebase:', error)
    return { success: false, message: `Erreur: ${error.message}` }
  }
}

// Obtenir l'ID du couple depuis localStorage ou le générer
export const getOrCreateCoupleId = () => {
  const stored = localStorage.getItem('love_story_couple_id')
  if (stored) {
    return stored
  }
  // Générer un ID unique
  const newId = `couple_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  localStorage.setItem('love_story_couple_id', newId)
  return newId
}

// Écouter les changements en temps réel
export const syncData = (collectionName, callback) => {
  if (!isInitialized || !currentCoupleId) {
    console.error('Firebase non initialisé')
    return () => {}
  }

  const dataRef = ref(db, `couples/${currentCoupleId}/${collectionName}`)
  
  const handleValue = (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val()
      const value = data.value || data || (Array.isArray(data) ? data : [])
      callback(value)
      
      // Envoyer une notification si ce n'est pas notre propre modification
      if (auth.currentUser && data.lastModifiedBy && data.lastModifiedBy !== auth.currentUser.uid) {
        sendLocalNotification(`${collectionName} mis à jour`, 'Nouvelles données synchronisées ! 💕')
      }
    }
  }
  
  onValue(dataRef, handleValue)
  
  const unsubscribe = () => {
    off(dataRef, 'value', handleValue)
  }
  
  syncListeners[collectionName] = unsubscribe
  return unsubscribe
}

// Sauvegarder des données sur Firebase
export const saveToFirebase = async (collectionName, data) => {
  if (!isInitialized || !currentCoupleId) {
    console.error('Firebase non initialisé')
    return { success: false, message: 'Firebase non initialisé' }
  }

  try {
    const dataRef = ref(db, `couples/${currentCoupleId}/${collectionName}`)
    await set(dataRef, {
      value: data,
      lastModified: serverTimestamp(),
      lastModifiedBy: auth.currentUser?.uid,
    })

    return { success: true }
  } catch (error) {
    console.error(`Erreur sauvegarde ${collectionName}:`, error)
    return { success: false, message: error.message }
  }
}

// Charger des données depuis Firebase
export const loadFromFirebase = async (collectionName) => {
  if (!isInitialized || !currentCoupleId) {
    return { success: false, data: null }
  }

  try {
    const dataRef = ref(db, `couples/${currentCoupleId}/${collectionName}`)
    const snapshot = await get(dataRef)
    
    if (snapshot.exists()) {
      const data = snapshot.val()
      return { success: true, data: data.value || data || [] }
    }
    return { success: true, data: [] }
  } catch (error) {
    console.error(`Erreur chargement ${collectionName}:`, error)
    return { success: false, data: null }
  }
}

// Demander la permission pour les notifications
export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    return { granted: false, message: 'Notifications non supportées' }
  }

  if (Notification.permission === 'granted') {
    return { granted: true, message: 'Permission déjà accordée' }
  }

  if (Notification.permission === 'denied') {
    return { granted: false, message: 'Permission refusée. Veuillez l\'activer dans les paramètres du navigateur.' }
  }

  const permission = await Notification.requestPermission()
  return {
    granted: permission === 'granted',
    message: permission === 'granted' ? 'Permission accordée' : 'Permission refusée'
  }
}

// Envoyer une notification locale
export const sendLocalNotification = (title, body, icon = '/heart.svg') => {
  if (!('Notification' in window) || Notification.permission !== 'granted') {
    return
  }

  const options = {
    body,
    icon,
    badge: '/heart.svg',
    tag: 'love-story-sync',
    requireInteraction: false,
    silent: false,
  }

  new Notification(title, options)
}

// Arrêter la synchronisation
export const stopSync = () => {
  Object.values(syncListeners).forEach(unsubscribe => unsubscribe())
  syncListeners = {}
}

// Vérifier si Firebase est activé
export const isFirebaseEnabled = () => {
  return isInitialized && currentCoupleId !== null
}
