# 🔥 Configuration Firebase - Synchronisation en Temps Réel

## 📋 Étapes de Configuration

### 1. Créer un projet Firebase

1. Allez sur https://console.firebase.google.com/
2. Cliquez sur "Ajouter un projet" (ou "Add project")
3. Donnez un nom à votre projet (ex: "love-story-app")
4. Désactivez Google Analytics (optionnel, pas nécessaire)
5. Cliquez sur "Créer le projet"

### 2. Activer l'Authentification Anonyme

1. Dans le menu de gauche, cliquez sur "Authentication" (Authentification)
2. Cliquez sur "Commencer" (Get started)
3. Allez dans l'onglet "Méthodes de connexion" (Sign-in method)
4. Cliquez sur "Anonyme" (Anonymous)
5. Activez-la et cliquez sur "Enregistrer"

### 3. Créer une base de données Realtime Database

1. Dans le menu de gauche, cliquez sur "Realtime Database" (ou "Realtime Database" dans l'ancienne console)
2. Cliquez sur "Créer une base de données" (Create Database)
3. Choisissez un emplacement (ex: europe-west1 pour l'Europe ou us-central1)
4. Choisissez "Commencer en mode test" (Start in test mode)
   - ⚠️ **Important** : Pour la production, vous devrez configurer les règles de sécurité plus tard
5. Cliquez sur "Activer" (Enable)
6. **✅ Avantage** : Realtime Database est gratuit sans facturation requise !

### 4. Obtenir les clés de configuration

1. Dans le menu de gauche, cliquez sur l'icône ⚙️ (Paramètres du projet)
2. Faites défiler jusqu'à "Vos applications"
3. Cliquez sur l'icône `</>` (Web)
4. Donnez un nom à votre app (ex: "Love Story Web")
5. Cliquez sur "Enregistrer l'application"
6. **Copiez les clés de configuration** qui s'affichent

### 5. Configurer dans l'application

1. Dans votre projet, créez le fichier `src/firebase/config.js` (copiez depuis `config.example.js`)
2. Collez vos clés Firebase dans `src/firebase/config.js`:

```javascript
export const firebaseConfig = {
  apiKey: "VOTRE_API_KEY_ICI",
  authDomain: "votre-projet.firebaseapp.com",
  projectId: "votre-projet-id",
  storageBucket: "votre-projet.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
}
```

3. Dans l'app, allez dans **Paramètres → Synchronisation**
4. Cliquez sur "Activer la synchronisation"
5. Entrez les clés Firebase (ou importez le fichier config)
6. **Important** : Partagez l'ID du couple avec votre partenaire !

### 6. Partager l'ID du couple

Une fois la synchronisation activée, vous obtiendrez un **ID du couple** unique.

**Partagez cet ID avec votre partenaire** :
- Par WhatsApp, SMS, email, etc.
- Votre partenaire devra entrer le même ID dans son app
- Une fois fait, vos données seront synchronisées en temps réel ! 💕

---

## 🔔 Notifications Push

Les notifications fonctionnent automatiquement une fois Firebase configuré :

1. L'app demandera la permission pour les notifications
2. Acceptez la permission
3. Vous recevrez une notification à chaque fois que votre partenaire ajoute/modifie quelque chose

---

## ⚠️ Règles de Sécurité Realtime Database (Important pour la Production)

Par défaut, Realtime Database est en "mode test" et permet l'accès à tous pendant 30 jours.

Pour la production, configurez les règles de sécurité dans Realtime Database → Règles :

```json
{
  "rules": {
    "couples": {
      "$coupleId": {
        ".read": "auth != null",
        ".write": "auth != null"
      }
    }
  }
}
```

Ces règles permettent uniquement aux utilisateurs authentifiés d'accéder aux données.

---

## 📱 Comment ça fonctionne ?

1. **Vous ajoutez un événement** → Sauvegardé localement + Realtime Database
2. **Realtime Database détecte le changement** → Synchronisation instantanée avec votre partenaire
3. **Votre partenaire reçoit une notification** → "Nouveau souvenir ajouté ! 💕"
4. **Les données se synchronisent automatiquement** → Temps réel ! ✨

---

## 💡 Avantages

✅ Synchronisation en temps réel  
✅ Notifications push automatiques  
✅ Pas besoin d'export/import manuel  
✅ Les deux téléphones voient les mêmes données  
✅ Données sauvegardées dans le cloud (backup automatique)

---

## 🔒 Confidentialité

- Les données sont stockées dans Firebase (cloud)
- Seules les personnes avec l'ID du couple peuvent y accéder
- L'authentification est anonyme (pas d'email requis)
- Vous pouvez supprimer toutes les données depuis Firebase Console

---

## 🆘 Dépannage

**"Firebase non initialisé"** :
- Vérifiez que vous avez bien rempli toutes les clés dans `config.js`
- Vérifiez que l'authentification anonyme est activée

**"Permission refusée"** :
- Les notifications nécessitent la permission du navigateur
- Allez dans les paramètres du navigateur pour autoriser les notifications

**"Erreur de connexion"** :
- Vérifiez votre connexion internet
- Vérifiez que Firestore est bien créé et activé

