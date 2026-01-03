# 🔧 Dépannage : Ne pas voir "Synchronisation" dans les Paramètres

## Problème
Vous ne voyez pas la section "Synchronisation en temps réel 🔄" dans les Paramètres.

## Solutions

### Si vous utilisez l'app en local (npm run dev)

1. **Arrêtez le serveur** (Ctrl+C dans le terminal)
2. **Redémarrez le serveur** :
   ```bash
   npm run dev
   ```
3. **Rechargez la page** dans votre navigateur (F5 ou Ctrl+R)
4. Allez dans **Paramètres** → Onglet "Général"
5. Faites défiler vers le bas - la section devrait apparaître

### Si vous utilisez l'app déployée (Vercel)

L'app déployée n'a pas encore les dernières modifications. Vous devez redéployer :

1. **Poussez les changements sur GitHub** :
   ```bash
   git add .
   git commit -m "Ajout synchronisation Firebase"
   git push
   ```

2. **Vercel redéploiera automatiquement** (si GitHub est connecté)

3. **OU redéployez manuellement** :
   - Allez sur https://vercel.com
   - Ouvrez votre projet
   - Cliquez sur "Redeploy"

4. **Attendez 2-3 minutes** que le déploiement soit terminé

5. **Rechargez l'app** dans votre navigateur

6. Allez dans **Paramètres** → Onglet "Général"

### Vérification rapide

La section "Synchronisation en temps réel 🔄" devrait apparaître :
- Dans l'onglet **"Général"** (pas dans "Lui" ou "Elle")
- **Après** le sélecteur de thème
- **Avant** "Partage des données 💕"

### Si ça ne fonctionne toujours pas

1. **Videz le cache du navigateur** :
   - Chrome/Edge : Ctrl+Shift+Delete → Cochez "Images et fichiers en cache" → Effacer
   - Ou essayez en navigation privée (Ctrl+Shift+N)

2. **Vérifiez la console du navigateur** (F12) pour voir s'il y a des erreurs

3. **Assurez-vous que vous êtes sur la bonne version** :
   - En local : Vérifiez que `npm run dev` est en cours
   - En production : Vérifiez que le déploiement est terminé

---

## 📍 Où trouver la section

```
Paramètres ⚙️
  └─ Onglet "Général"
      ├─ Vos prénoms
      ├─ Thème
      ├─ Synchronisation en temps réel 🔄  ← ICI
      └─ Partage des données 💕
```

