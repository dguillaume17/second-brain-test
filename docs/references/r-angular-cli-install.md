# Installation de l'Angular CLI

L'**Angular CLI** (Command Line Interface) est l'outil indispensable pour initialiser, développer, échafauder et maintenir des applications Angular directement depuis un terminal.

---

## 🛠️ Prérequis

Avant d'installer la CLI, assurez-vous que **Node.js** et **npm** sont présents sur votre système.

* **Vérification :**
```bash
node -v
npm -v

```


* **Compatibilité :** Référez-vous toujours à la [matrice de compatibilité Angular/Node.js](https://www.google.com/search?q=https://angular.io/guide/releases%23node-js-version-compatibility) pour éviter les erreurs de build.

---

## 🚀 Installation Globale

Pour pouvoir utiliser la commande `ng` partout sur votre machine, utilisez le flag `-g` (global) :

```bash
npm install -g @angular/cli

```

### Cas spécifiques aux systèmes (Permissions)

* **macOS / Linux :** Si vous rencontrez une erreur `EACCES`, vous devrez peut-être utiliser `sudo` :
```bash
sudo npm install -g @angular/cli

```


* **Windows :** Exécutez votre terminal (PowerShell ou CMD) en mode **Administrateur**.

---

## ✅ Vérification de l'installation

Une fois l'installation terminée, vérifiez que la CLI est opérationnelle :

```bash
ng version

```

Cette commande affiche les versions de l'Angular CLI, de Node.js, du gestionnaire de paquets et du système d'exploitation.

---

## 📂 Commandes de base (Quickstart)

| Commande | Description |
| --- | --- |
| `ng new <name>` | Crée un nouveau projet Angular dans un dossier dédié. |
| `ng serve` | Lance un serveur de développement (par défaut sur `http://localhost:4200`). |
| `ng generate <type> <name>` | Génère des composants, services, modules (alias: `ng g`). |
| `ng build` | Compile l'application dans le dossier `dist/` pour la production. |

---

## 🔄 Mise à jour et Désinstallation

### Mettre à jour la CLI

Pour mettre à jour la version globale vers la dernière version stable :

```bash
npm uninstall -g @angular/cli
npm cache clean --force
npm install -g @angular/cli@latest

```

### Désinstaller la CLI

```bash
npm uninstall -g @angular/cli

```

---

> [!TIP]
> **Conseil DevOps :** Pour les environnements de CI/CD ou les projets d'équipe, évitez de dépendre uniquement de la version globale. Utilisez toujours `npx ng <commande>` ou les scripts `npm run` définis dans le `package.json` pour garantir que tout le monde utilise la version locale exacte du projet.

Souhaitez-vous que je génère également une fiche mémo sur l'utilisation de `npx` pour gérer plusieurs versions d'Angular en parallèle ?