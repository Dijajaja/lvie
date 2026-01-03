# Love Story Interactive ❤️

Une application web interactive pour retracer votre histoire d'amour avec des quiz amoureux et des surprises.

## Fonctionnalités

- 📅 Timeline interactive des souvenirs (photos, messages, dates importantes)
- ❤️ Quiz amoureux personnalisés avec récompenses
- 🎁 Messages et surprises programmés
- 💾 Stockage local (Local Storage) - Données privées
- 📱 Application Progressive Web App (PWA) - Installable sur mobile
- 🎨 Thème romantique avec animations douces
- 🔔 Mode "jour spécial" avec notifications automatiques

## Installation

```bash
npm install
```

## Icônes PWA

Les icônes sont fournies au format SVG dans le dossier `public/`. Si vous souhaitez générer des versions PNG (optionnel), vous pouvez utiliser :

```bash
npm run generate-icons
```

## Développement

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## Build pour production

```bash
npm run build
```

Les fichiers optimisés seront dans le dossier `dist/`

## Installation sur Mobile (PWA)

### Android (Chrome/Samsung Internet)

1. Ouvrez l'application dans votre navigateur mobile (Chrome, Samsung Internet, etc.)
2. Appuyez sur le menu (trois points) en haut à droite
3. Sélectionnez "Ajouter à l'écran d'accueil" ou "Installer l'application"
4. Confirmez l'installation
5. L'application apparaîtra comme une application native sur votre écran d'accueil

### iOS (Safari)

1. Ouvrez l'application dans Safari
2. Appuyez sur le bouton "Partager" (carré avec flèche vers le haut)
3. Faites défiler et sélectionnez "Sur l'écran d'accueil"
4. Personnalisez le nom si vous le souhaitez
5. Appuyez sur "Ajouter"
6. L'application apparaîtra sur votre écran d'accueil

### Après l'installation

- L'application fonctionne hors ligne (une fois chargée)
- Toutes vos données sont stockées localement sur votre appareil (privées)
- L'application se met à jour automatiquement quand vous êtes en ligne
- Vous pouvez l'utiliser comme une application native

## Utilisation

### Ajouter un souvenir

1. Cliquez sur le bouton "+" en bas à droite
2. Remplissez les informations (titre, date, lieu, description, photo)
3. Optionnel : Associez un quiz à cet événement
4. Enregistrez

### Créer un quiz

1. Cliquez sur le bouton "✨" en bas à droite
2. Ajoutez des questions personnalisées avec 4 options
3. Cochez la bonne réponse pour chaque question
4. Optionnel : Ajoutez un message de récompense ou une surprise
5. Créez le quiz

### Paramètres

1. Cliquez sur l'icône ⚙️ en haut à droite
2. Personnalisez vos prénoms
3. Choisissez votre thème (clair/sombre)

## Technologies

- React 18
- Vite
- Tailwind CSS
- Framer Motion
- PWA Support (Service Worker)
- Local Storage

## Note importante

⚠️ **Données privées** : Toutes les données sont stockées localement sur votre appareil. Si vous supprimez les données du navigateur ou changez d'appareil, vous perdrez vos souvenirs. Pour une sauvegarde automatique multi-appareils, considérez d'ajouter Firebase ou un autre backend dans le futur.

## Déploiement

Pour héberger l'application :

1. Construisez l'application : `npm run build`
2. Déployez le dossier `dist/` sur un service d'hébergement :
   - Netlify
   - Vercel
   - Firebase Hosting
   - GitHub Pages
   - Ou tout autre serveur web statique

⚠️ **HTTPS requis** : Pour que la PWA fonctionne, l'application doit être servie en HTTPS (sauf en localhost).

