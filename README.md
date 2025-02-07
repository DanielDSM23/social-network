
# Documentation pour le projet React + Apollo Server GraphQL

Ce projet contient une application React en frontend et un serveur Apollo GraphQL en backend. Il s'inspire de l'application **Twitter**, offrant des fonctionnalités similaires comme la possibilité de publier des messages et d'interagir avec eux. Vous pouvez démarrer le projet de deux manières : avec Docker Compose ou manuellement.


 ## Prérequis 

### Avant de commencer, assurez-vous d'avoir les outils suivants installés sur votre machine :

- **Docker** (pour l'option Docker Compose)
- **Node.js** (pour l'option manuelle)
- **npm** (ou **yarn**, selon la préférence)

## Démarrer le projet avec Docker Compose

### 1. Clonez ce repository sur votre machine.
### 2. Assurez-vous que Docker est en cours d'exécution sur votre machine.
### 3. Dans le répertoire racine du projet, ouvrez un terminal et exécutez la commande suivante :

```bash
docker-compose up
````

- Cette commande démarre les services nécessaires, à savoir : - **Le serveur Apollo GraphQL** dans un container Docker. - **L'application React** dans un autre container Docker. 

- Une fois que tout est lancé, vous pouvez accéder à l'application frontend à l'adresse suivante : http://localhost:3000.


## Démarrer le projet sans Docker (Manuellement)

## Démarrer le projet sans Docker (Manuellement)

Si vous ne souhaitez pas utiliser Docker, vous pouvez démarrer le projet en lançant le serveur et le client séparément.

### 1. Démarrer le serveur Apollo GraphQL

- Allez dans le dossier `server` :

```bash
cd server
````
- Installez les dépendances :

```bash
npm install
````


```bash
npm run dev
````


```bash
npm install
````



- Allez dans le dossier `client` :

```bash
cd client
````
- Installez les dépendances :

```bash
npm install
````


```bash
npm run dev
````


```bash
npm install
````



Fonctionnalités principales


- L'application s'inspire de Twitter et propose des fonctionnalités comme :

- Publier des tweets : Les utilisateurs peuvent envoyer de courts messages (tweets).
- Lire des tweets : Consultez les tweets des autres utilisateurs.
- Interagir avec les tweets : Bien que cette fonctionnalité puisse être étendue, l'application permet d'ajouter des tweets similaires à ce que propose Twitter.
