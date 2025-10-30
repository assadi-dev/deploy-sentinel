# Deploy Sentinel - Un bot Discord en TypeScript avec discord.js

Un bot Discord moderne développé avec TypeScript et la bibliothèque officielle `discord.js`. Ce guide explique comment installer, configurer et exécuter le bot.

---

## Table des matières
1. [Description](#description)
2. [Prérequis](#prérequis)
3. [Installation du projet](#installation-du-projet)
4. [Configuration](#configuration)
5. [Lancement du bot](#lancement-du-bot)
6. [Arrêt du bot](#arrêt-du-bot)
7. [Commandes disponibles](#commandes-disponibles)
8. [Développement et améliorations](#développement-et-améliorations)

---

## 📖 Description

Deploy Sentinel est un bot Discord conçu en TypeScript avec discord.js. Il offre des fonctionnalités interactives, un système de commandes bien structuré et une architecture modulaire pour faciliter le développement.

---

## ⚙ Prérequis

Avant l'installation, assurez-vous d'avoir :

1. Compte [Discord](https://discord.gg/)  
2. Node.js (version 16 ou supérieure)
3. Git
4. Accès à une console terminal

---

## 📦 Installation du projet

### 1. Cloner le dépôt

```bash
git clone https://github.com/assadi-dev/deploy-sentinel
```

### 2. Entrer dans le répertoire du projet

```bash
cd deploy-sentinel
```

### 3. Installer les dépendances TypeScript

```bash
npm install -g typescript tsc
tsc --init # optionnel                       
```

### 4. Installer les packages Node.js

```bash
npm install 
```

---

## 🔧 Configuration

1. Créez un fichier `.env` dans le répertoire racine :

```env
APPLICATION_ID=id_de_votre_application_géneré_par_dockploy
DISCORD_BOT_TOKEN= le_token_de_votre_bot_ici
SERVER_ID= id_de_votre_serveur_discord
```

2. Ajoutez les variables d'environnement nécessaires :

- `PREFIX`: Préfixe des commandes du bot (ex: `-`)
- `DATABASE_URL` (optionnel): URL de la base de données

---

## 🚀 Lancement du bot

### Pour un environnement local :

```bash
# Compiler le projet avec TypeScript
tsc

# Exécuter le fichier compilé
node dist/main.js
```

Vous pouvez aussi utiliser `npm` pour simplifier :

1. Installez les dépendances :
   ```bash
   npm install
   ```

2. Lancez directement :
    ```bash
    npm start
    ```
3. Lancer en mode dev:
    ```bash
    npm run dev
    ```
  





## 📝 Commandes disponibles

Exemple de commande pour l'aide:

```bash
- help : Affiche les commandes disponibles
- ping : Vérifie la réactivité du bot
- say <texte> : Répète le texte saisi par l'utilisateur
```

---

## ✨ Développement et améliorations

Pour contribuer :

1. Cloner le dépôt  
2. Créer une branche `feature/nom`  
3. Implémentez les fonctionnalités nécessaires  
4. Soumettre des Pull Requests  

---

Merci d'avoir testé Deploy Sentinel ! 🧙‍♂️