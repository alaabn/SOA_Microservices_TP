# TP1 : Introduction aux APIs Restful

## OBJECTIFS:
* Compréhension des principes de l'API RESTful
* Utilisation du format de données JSON

## OUTILS UTILISÉS :
NodeJS, API openweathermap

## Intégration de l'API OpenWeatherMap
OpenWeatherMap est un service en ligne, détenu par
OpenWeather Ltd, qui fournit des données
météorologiques mondiales via une API, y compris des
données météorologiques actuelles, des prévisions, des
prévisions immédiates et des données météorologiques
historiques pour n'importe quel emplacement
géographique.

1) S’inscrire sur l’API openweathermap via le site https://openweathermap.org/api
2) Comprendre et noter les points de terminaison et les paramètres de l'API
3) Ecrire un code en javascript qui permet de:
    * Faire des requêtes API à l'aide de la bibliothèque "request"
        * Il faut installer la bibliothèque request avec : npm install request
    * Analyse et gestion des données de réponse de l'API en JavaScript
4) Modifier le code en programmant la fonction à insérer dans « callback » pour afficher les
paramètres suivants dans la ville de « Sousse » sur la console
    * description
    * température
    * humidité
5) Modifier la requête pour obtenir des données métriques et en français
6) Refaire le TP en remplaçant la bibliothèque "request" d’abord par "fetch" et puis par "axios"