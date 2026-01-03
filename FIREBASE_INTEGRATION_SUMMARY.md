# ✅ Intégration Firebase - Synchronisation en Temps Réel

## 🎉 Ce qui a été ajouté

### 1. **Firebase installé et configuré**
- Package `firebase` installé
- Authentification anonyme (pas d'email requis)
- Firestore Database pour la synchronisation
- Notifications push natives

### 2. **Nouveaux fichiers créés**

- `src/firebase/config.js` - Configuration Firebase (à remplir)
- `src/firebase/config.example.js` - Exemple de configuration
- `src/firebase/firebase.js` - Service Firebase principal
- `src/utils/storageSync.js` - Système de synchronisation hybride
- `FIREBASE_SETUP.md` - Instructions détaillées

### 3. **Interface utilisateur**

- Nouvelle section "Synchronisation en temps réel" dans Paramètres
- Bouton pour activer/désactiver la synchronisation
- Affichage de l'ID du couple à partager
- Messages d'état (actif/inactif)

### 4. **Fonctionnalités**

✅ Synchronisation en temps réel entre les deux téléphones  
✅ Notifications push quand votre partenaire ajoute/modifie quelque chose  
✅ Authentification anonyme (pas d'email)  
✅ ID du couple unique à partager  
✅ Stockage hybride (Local Storage + Firebase)

---

## 📋 Comment utiliser

### Étape 1 : Configurer Firebase

Suivez les instructions dans `FIREBASE_SETUP.md` :

1. Créez un projet Firebase
2. Activez l'authentification anonyme
3. Créez une base Firestore
4. Copiez les clés de configuration

### Étape 2 : Remplir la configuration

Dans `src/firebase/config.js`, remplacez :

```javascript
export const firebaseConfig = {
  apiKey: "VOTRE_API_KEY",
  authDomain: "votre-projet.firebaseapp.com",
  projectId: "votre-projet-id",
  // ...
}
```

### Étape 3 : Activer la synchronisation

1. Ouvrez l'app
2. Allez dans **Paramètres → Synchronisation en temps réel**
3. Cliquez sur **"Activer la synchronisation"**
4. L'app vous donnera un **ID du couple**

### Étape 4 : Partager avec votre partenaire

1. Copiez l'ID du couple (bouton "Copier")
2. Envoyez-le à votre partenaire (WhatsApp, SMS, etc.)
3. Votre partenaire doit :
   - Ouvrir l'app
   - Aller dans **Paramètres → Synchronisation**
   - Entrer le même ID du couple
   - Activer la synchronisation

### Étape 5 : Profiter ! 💕

- Vos données se synchronisent automatiquement
- Vous recevez des notifications quand votre partenaire ajoute quelque chose
- Tout est en temps réel !

---

## 🔔 Notifications

Les notifications fonctionnent automatiquement :
- Quand vous activez la synchronisation, l'app demande la permission
- Acceptez la permission
- Vous recevrez une notification à chaque modification de votre partenaire

**Types de notifications :**
- "Nouveau souvenir ajouté ! 💕" (quand un événement est ajouté)
- "[Collection] mis à jour" (pour autres modifications)

---

## 🔒 Confidentialité

- Les données sont stockées dans Firebase (cloud)
- Seules les personnes avec l'ID du couple peuvent y accéder
- L'authentification est anonyme (pas d'email)
- Vous pouvez supprimer toutes les données depuis Firebase Console

---

## ⚠️ Important

1. **Partagez l'ID du couple en privé** (ne le partagez pas publiquement)
2. **Conservez l'ID** - vous en aurez besoin si vous changez de téléphone
3. **Les deux téléphones doivent utiliser le même ID** pour synchroniser

---

## 🆘 Dépannage

**"Firebase non initialisé"** :
- Vérifiez que vous avez bien rempli toutes les clés dans `config.js`
- Vérifiez que l'authentification anonyme est activée dans Firebase

**"Permission refusée" (notifications)** :
- Les notifications nécessitent la permission du navigateur
- Allez dans les paramètres du navigateur pour autoriser les notifications

**"Erreur de connexion"** :
- Vérifiez votre connexion internet
- Vérifiez que Firestore est bien créé et activé

---

## 📱 Prochaines étapes

Une fois configuré :
1. Testez en ajoutant un événement sur un téléphone
2. Vérifiez qu'il apparaît sur l'autre téléphone
3. Vérifiez que vous recevez une notification
4. Profitez de la synchronisation en temps réel ! 💕

