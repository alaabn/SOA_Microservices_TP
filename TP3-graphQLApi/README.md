# TP3 : Création d’une API de gestion de tâches avec GraphQL

## OBJECTIFS:
  * Comprendre comment configurer et utiliser GraphQL avec Node.js et Express.
  * Apprendre à créer un schéma GraphQL et des résolveurs pour gérer les requêtes et les
mutations pour une API simple de gestion de tâches.

## OUTILS UTILISÉS:
Nodejs, typescript, Express js, MongoDB, ApolloServer, GraphQl

GraphQL est un langage de requête pour les API et un runtime pour
répondre à ces requêtes avec vos données existantes. GraphQL
fournit une description complète et compréhensible des données de
votre API, donne aux clients le pouvoir de demander exactement ce
dont ils ont besoin et rien de plus, facilite l'évolution des API au fil
du temps et active de puissants outils de développement.

---

### Étape 1: Initialisation du Projet
1. Créez un nouveau dossier pour votre projet.
2. Ouvrez un terminal et naviguez vers ce dossier.
3. Initialisez un nouveau projet Node.js avec :
```sh
npm init -y
```
4. Installez les dépendances :
```sh
#dépendances de Production
npm install @apollo/server graphql express cors mongodb

#dépendances de développement
npm i -D @types/cors @types/express @types/node nodemon ts-node typescript
```

### Étape 2: Configuration du MongoDB
1. Créez un nouveau fichier `db.ts` dans le dossier `src/data`.
2. Dans database.js, configurez MongoDB driver pour se connecter à une base de données (.env)

### Étape 3: Configuration du typescript
1. Créez un nouveau fichier `tsconfig.json`.
2. Paramétrez le compilateur convenablement pour le projet.

### Étape 4: Mise en Place de l'API
1. Créez un fichier `index.ts`.
2. Dans index.ts, importez dépendances naicessaire et configurez l'application avec ApolloServer et expressMiddleware.
3. Créez un fichier `taskSchema.js` contenant le schéma de données pour GraphQL. (dans [schemas](src/schemas))
4. Créez un fichier `taskResolver.js` contenant le résolveur de données pour GraphQL. (dans [resolvers](src/resolvers/))
5. Dans `index.ts` importer les schemas (typeDefs) et resolvers dans l'instance du ApolloServer.

### Étape 5 de Test avec ApolloSandbox
1. Naviguer vers `localhost:4000/graphql` pour ouvrir l'interface graphique ApolloSandbox
2. Créer des requêtes GraphQL pour:
    * Récupérer toutes les tâches
    * Ajouter une nouvelle tâche
    * Marquer une tâche comme terminée
