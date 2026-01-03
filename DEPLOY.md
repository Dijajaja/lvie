# Guide de déploiement sur Vercel

## Méthode 1 : Via l'interface web Vercel (Recommandé pour débuter)

### Étape 1 : Préparer le projet
1. Assurez-vous que le build fonctionne :
   ```bash
   npm run build
   ```
2. Vérifiez que le dossier `dist/` a été créé

### Étape 2 : Créer un compte Vercel
1. Allez sur [vercel.com](https://vercel.com)
2. Créez un compte (gratuit) avec GitHub, GitLab, ou email

### Étape 3 : Déployer via GitHub (Recommandé)
1. Créez un repository GitHub pour votre projet
2. Poussez votre code sur GitHub
3. Sur Vercel, cliquez sur "Add New Project"
4. Importez votre repository GitHub
5. Vercel détectera automatiquement Vite
6. Cliquez sur "Deploy"
7. Votre app sera déployée en quelques secondes !

### Étape 4 : Déployer sans Git (Glisser-déposer)
1. Sur Vercel, créez un nouveau projet
2. Choisissez "Deploy without Git"
3. Glissez-déposez le dossier `dist/` après avoir fait `npm run build`
4. Cliquez sur "Deploy"

## Méthode 2 : Via Vercel CLI (Pour les développeurs)

### Étape 1 : Installer Vercel CLI
```bash
npm install -g vercel
```

### Étape 2 : Se connecter
```bash
vercel login
```

### Étape 3 : Déployer
```bash
vercel
```

Suivez les instructions. Pour la première fois, Vercel vous demandera :
- Set up and deploy? → **Y**
- Which scope? → Choisissez votre compte
- Link to existing project? → **N** (pour créer un nouveau projet)
- Project name? → `love-story-interactive` (ou le nom que vous voulez)
- Directory? → **.** (point)
- Override settings? → **N**

### Étape 4 : Déployer en production
```bash
vercel --prod
```

## Configuration automatique

Le fichier `vercel.json` est déjà configuré pour :
- ✅ Build automatique avec Vite
- ✅ Redirection des routes vers index.html (pour React Router si besoin)
- ✅ Framework Vite détecté automatiquement

## Après le déploiement

1. **Votre app sera disponible sur** : `votre-projet.vercel.app`
2. **Domaine personnalisé** : Vous pouvez ajouter un domaine personnalisé dans les paramètres Vercel
3. **HTTPS automatique** : Vercel fournit HTTPS automatiquement (requis pour PWA)
4. **Mises à jour** : À chaque push sur GitHub (si lié), Vercel redéploie automatiquement

## Important : Données et localStorage

⚠️ **Les données dans localStorage sont liées au domaine** :
- Si vous déployez sur `votre-app.vercel.app`, les données seront stockées sur ce domaine
- Si vous changez de domaine plus tard, vous devrez réimporter les données
- **Solution** : Exportez vos données avant le premier déploiement (Paramètres → Export)

## Vérification PWA

Après déploiement, vérifiez :
1. Ouvrez l'app sur mobile
2. Le navigateur devrait proposer "Ajouter à l'écran d'accueil"
3. L'app devrait fonctionner hors ligne après le premier chargement

## Support

- Documentation Vercel : https://vercel.com/docs
- Support Vercel : https://vercel.com/support

