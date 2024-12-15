# Projet e-commerce

Bienvenue dans le projet **e-commerce**. Ce projet a été réalisé dans le cadre de mes études.

---

## 🚀 Stack technique utilisée

Le projet repose sur les technologies suivantes :
- **Frontend** : Vue.js + TailwindCSS
- **Backend** : Express.js
- **ORM** : Sequelize
- **Base de données** : PostgreSQL
- **Conteneurisation** : Docker & Docker Compose

---

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants :
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Node.js](https://nodejs.org/) (exigé pour installer les dépendances localement avant la construction des conteneurs)

---

## 🛠️ Initialisation du projet

### Étape 1 : Cloner le projet
Clonez ce dépôt sur votre machine locale :

```bash
git clone git@github.com:teddyandria/mdg_s.git
cd mdg_s
```

---

### Étape 2 : Configuration des fichiers `.env`

Le projet demande deux fichiers `.env` pour fonctionner, comme suit :

#### **À la racine (`env`) :**

1. Rendez-vous dans le dossier `env` à la racine du projet.
2. Copiez le fichier `env/db.env.sample` comme fichier `.env`.
3. Faites de même pour le fichier `env/server.env.sample`.  -> `db.env` et `server.env`


#### **Dans le dossier `server` :**

1. Dans le sous-dossier `server`, copiez le fichier `server/env.sample` comme fichier `.env`.
2. Renseignez une clé 


🔧 **Mettez à jour ces fichiers avec les bonnes informations**, par exemple :
- Clés secrète JWT.

---

### Étape 3 : Installation des dépendances avec `npm`

Avant de construire les conteneurs Docker, installez les dépendances requises pour le frontend et le backend :

1. **Dans le dossier `client` (Frontend)** :
   ```bash
   cd client
   npm install
   cd ..
   ```

2. **Dans le dossier `server` (Backend)** :
   ```bash
   cd server
   npm install
   cd ..
   ```

---

### Étape 4 : Construire et lancer les conteneurs avec Docker

Option 1 : Construire et exécuter étape par étape.

1. **Construire les conteneurs** :
   ```bash
   docker-compose build
   ```

2. **Lancer les conteneurs** :
   ```bash
   docker-compose up
   ```

Option 2 : Construire et exécuter en une seule commande.

```bash
docker compose up --build
```

---

### Étape 5 : Accéder a l'application

Une fois que toutes les étapes ont été réalisé, vous pouvez accéder au site via l'URL suivante :

- `http://localhost:8080/`