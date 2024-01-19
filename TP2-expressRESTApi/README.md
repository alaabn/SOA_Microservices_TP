# TP2 : Création d’une API Restful avec Express JS

## OBJECTIFS:
  * Création d’une API Rest avec Express JS
  * Utilisation des bonnes pratiques pour les API Restful

## OUTILS UTILISÉS:
Nodejs, Express js, PostgresSQL

Utilisation du framework Express JS
Express est un framework d'application Web Node.js
minimal et flexible qui fournit un ensemble robuste de
fonctionnalités pour les applications Web et mobiles.

---

### Étape 1: Initialisation du Projet
1. Créez un nouveau dossier pour votre projet.
2. Ouvrez un terminal et naviguez vers ce dossier.
3. Initialisez un nouveau projet Node.js avec :
```sh
npm init -y
```
4. Installez Express.js et PostgresSQL driver avec :
```sh
npm install express pg
```

### Étape 2: Configuration de PostgresSQL
1. Créez un nouveau fichier database.js.
2. Dans database.js, configurez PostgresSQL pour se connecter à une base de données 

### Étape 3: Mise en Place de l'API
1. Créez un fichier index.js.
2. Dans index.js, importez Express, copiez ce code et exécutez avec node index.js 

### Étape 4: Modification de la Structure de la Base de Données
1. Ajoutez une colonne adresse à votre table personnes.
2. Mettez à jour le fichier dans [schema](schema) pour inclure cette modification.
3. executer la commande de migration pour créer la nouvelle structure de table:
```sh
 npm run migrate
```
4. Mise à jour des doutes pour gérer les adresses :
Modifiez les routes POST et PUT dans index.js pour accepter et traiter l'adresse.
Exemple pour la route POST

### Étape 5 de Test avec Postman
1. Test des Routes
    * Pour chaque route (GET, POST, PUT, DELETE), configurez une requête dans Postman.
    * Assurez-vous de définir le bon type de requête (GET, POST, etc.) et d'ajouter les données
nécessaires dans le corps de la requête pour POST et PUT.
2. Exécution et Validation des Tests
    * Exécutez chaque requête et vérifiez la réponse de l'API.
    * Pour POST et PUT, vérifiez que les données sont correctement ajoutées/mises à jour en
envoyant une requête GET après.
    * Vérifiez également le comportement de l'API en cas de données incorrectes ou
incomplètes pour tester la robustesse de votre gestion des erreurs.

## Resources
Importer le Fichier [Collection Postman](contracts/TP2-firstApi.postman_collection.json)
* Sélectionnez Fichier > Importer > Télécharger des fichiers.
* Ouvrez le fichier JSON de vérification du compte que vous avez téléchargé et extrait.
* Sélectionnez Importer.