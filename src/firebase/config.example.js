// Configuration Firebase - EXEMPLE
// Copiez ce fichier en config.js et remplissez avec vos clés Firebase

// ⚠️ INSTRUCTIONS :
// 1. Allez sur https://console.firebase.google.com/
// 2. Créez un nouveau projet (ou utilisez un existant)
// 3. Activez "Authentication" → Méthode "Anonyme"
// 4. Activez "Firestore Database" → Créez en mode test
// 5. Dans Paramètres du projet → Vos applications → Ajoutez une application Web
// 6. Copiez les clés de configuration ici

export const firebaseConfig = {
  apiKey: "VOTRE_API_KEY",
  authDomain: "VOTRE_PROJECT_ID.firebaseapp.com",
  projectId: "VOTRE_PROJECT_ID",
  storageBucket: "VOTRE_PROJECT_ID.appspot.com",
  messagingSenderId: "VOTRE_SENDER_ID",
  appId: "VOTRE_APP_ID",
  measurementId: "VOTRE_MEASUREMENT_ID" // Optionnel
}

// ID unique pour votre couple (à partager entre les deux téléphones)
// Généré automatiquement ou à définir manuellement
export const COUPLE_ID = "GENERER_UN_ID_UNIQUE_ICI"

