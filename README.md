
# Bookmark Manager

> Bookmark manager est un outil de gestion des liens. Il offre la possibilité de stocker et catégoriser des liens Flickr et Viméo. 

Bookmark manager est basé sur les technologies suivantes: 
- Api graphql (./graphql_api) : Graphql + TypeORM + Typescript. Initialisé via [Vesper](https://github.com/vesper-framework/vesper)
- FO (./fo) : ReactJs + Apollo Boost + Material UI + Typescript. Initialisé via [Create React App](https://github.com/facebook/create-react-app) 

### Prérequis
- Git
- Nodejs
- Un serveur MySQL
- Github app and credential [GITHUB_CLIENT_ID,GITHUB_CLIENT_SECRET](https://developer.github.com/v3/guides/basics-of-authentication/#accepting-user-authorization)
- Yarn: npm i -g yarn
- TypeORM: npm i -g typeorm

### Installation
Utiliser les commandes suivants afin d'installer votre projet sur votre poste local :
```
git clone https://github.com/sducly/bookmark-manager.git
cd bookmark-manager
yarn run install
vim ./graphql_api/ormconfig.json [Renseigner vos identifiants MySQL dans le fichier orm config file]
```
### Démarrer le projet
La commande suivante permet de démarrer le projet en mode dev. Cette commande va mettre en service l'api graphql et lancer l'interface utilisateur dans votre navigateur web.
```
yarn start
```

### 1ère utilisation
A la première connexion, un formulaire de connexion s'affiche. Vous ne disposez pas encore de profil. 
Pour créer un compte, cliquez sur le bouton "Create an account". Renseigner les éléments demandés dans le formulaire et cliquer sur suivant. Votre compte est automatiquement activé et vous pouvez vous connecter instantanément.

### API Vimeo / Flickr
L'application utilise les API Viméo et Flickr afin de récupérer les informations courantes du bookmark (titre, auteur, larguer / hauteur, tags,...).
Vous pouvez modifier les informations de connexion en éditant le fichier .env situé dans le dossier ./fo
```
vim ./fo/.env
```

### Fonctionnalités
- Créer / Modifier un compte utilisateur
- Se connecter via un compte préalablement crée
- Consulter la liste des bookmarks
- Filtrer les bookmarks par type ou titre 
- Ajouter / Modifier / Supprimer un bookmark