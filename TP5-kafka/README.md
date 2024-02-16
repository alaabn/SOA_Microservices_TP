# TP5 : Intégration et Manipulation de Données avec Kafka (spring application)

## OBJECTIFS

Acquérir des compétences pratiques dans la gestion des flux de données avec Apache Kafka et
apprendre à intégrer Kafka avec des applications Node.js pour la production et la consommation
de messages.

## OUTILS UTILISÉS

Spring Boot, Java, Kafka, MongoDB

ZooKeeper est un service centralisé permettant de conserver
les informations de configuration, de nommer, de fournir une
synchronisation distribuée et de fournir des services de
groupe.

Apache Kafka est une plateforme de streaming d'événements
distribués open source utilisée par des milliers d'entreprises pour les
pipelines de données hautes performances, l'analyse de streaming,
l'intégration de données et les applications critiques.

---

### Étape 1: Initialisation du Projet

1. Créez un nouveau dossier pour votre projet.
2. Ouvrez un terminal et naviguez vers ce dossier.
3. Initialiser 3 projets Spring avec Spring Boot Starter:
    * [consumer](consumer)
    * [producer](producer)
    * [rest-api](rest-api)

### Étape 2: Mise en Place du serveur Kafka, Zookeeper et InfluxDB

1. Créez un nouveau fichier [docker-compose](docker-compose.yaml).
2. Configurez un service pour Kafka et zookeeper
3. Configurez un service pour InfluxDB
4. Exécuter la commande:

    ```sh
    docker compose up -d
    ```

5. Assurer que les services sont opérationnel

    ```sh
    docker ps
    ```

### Étape 3: Mise en place du DataFlow

1. Modifiez le projet [producer](producer) pour qu'il accepte POST request comme emulation du donné capteur et publiez au serveur Kafka
2. Modifiez le consommateur [consumer](consumer) Kafka pour enregistrer les messages qu'il consomme dans influxDB.
3. Modifier le projet [rest-api](rest-api) pour permettre la récupération de ces
données depuis influxDB.
4. Testez le flux complet:
    1. produisant des messages depuis [producer](producer)

        ```sh
        curl -d '{"sensor":"Temperature", "data":28.2}' -H "Content-Type: application/json" -X POST http://localhost:8081/api/v1/sensordata
        ```

    2. vérifiant en récupérant les données via l'API REST [rest-api](rest-api)

        ```sh
        curl https://localhost:8080/api/v1/sensordata -H "Accept: application/json"
        ```
