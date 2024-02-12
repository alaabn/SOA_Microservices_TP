# TP4 : Reverse Proxy (gRPC JSON transcoding in ASP.NET Core) avec service gRPC

## OBJECTIFS

* La mise en place d'un service gRPC qui peut recevoir des requêtes et renvoyer des réponses structurées à travers un protocole de communication performant.
* La création d'un reverse proxy qui agit comme une interface pour les clients et redirige les requêtes vers le service gRPC.

## OUTILS UTILISÉS

.NET, C#, SqlServer

Protocol Buffers est un format de données multiplateforme gratuit et open
source utilisé pour sérialiser des données structurées. Il est utile dans le
développement de programmes pour communiquer entre eux sur un réseau
ou pour stocker des données.

gRPC est un framework d'appel de procédure à distance open source
hautes performances multiplateforme. gRPC a été initialement créé par
Google, qui a utilisé une seule infrastructure RPC à usage général
appelée Stubby pour connecter le grand nombre de microservices
exécutés dans et entre ses centres de données pendant plus d'une
décennie.

---

### Étape 1: Initialisation du Projet

1. Créez un nouveau dossier pour votre projet.
2. Ouvrez un terminal et naviguez vers ce dossier.
3. Initialiser un nouveau projet .NET grpc avec :

```sh
dotnet new grpc -o <NameYourProject>
```

4. Installez les dépendances :

```sh
#dépendances pour SqlServer
dotnet add package Microsoft.EntityFrameworkCore.SqlServer

#dépendances de EntityFramework
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.EntityFrameworkCore.Tools

#dépendances de Grpc JsonTranscoding
dotnet add package Microsoft.AspNetCore.Grpc.JsonTranscoding
```

### Étape 2: Mise en Place de l'API

1. Créez un fichier [recordStore.proto](RecordStore/Protos/recordStore.proto) dans le dossier [Protos](RecordStore/Protos/)
2. Ajouter la référence dans le fichier du projet   *.csproj:

```xml
<ItemGroup>
    <Protobuf Include="Protos\recordStore.proto" GrpcServices="Server" />
</ItemGroup>
```

3. Générer les stubs avec cet command:

```sh
dotnet build
```

4. Créé le fichier [RecordStoreService](RecordStore/Services/RecordStoreService.cs) pour l'implémentation des fonction rpc définie dans [recordStore.proto](RecordStore/Protos/recordStore.proto)
5. Tester le service grpc avec postman

### Étape 3: Ajouter Base de donnees

1. Créé le fichier de l'entité [RecordStoreEntity](RecordStore/data/RecordStoreEntity.cs)
2. Créé le fichier de la connection du base de données  [AppDBContext](RecordStore/data/AppDBContext.cs)
3. Ajouter les informations d'identification pour la base de données dans [appsettings.json](RecordStore/appsettings.json)
4. Configurer la base de données dans le fichier [Program.cs](RecordStore/Program.cs)

```c#
builder.Services.AddDbContext<AppDbContext>(
    options => options.UseSqlServer(builder.Configuration.GetConnectionString("RecordDB")));
```

5. Modifier les méthodes dans [RecordStoreService](RecordStore/Services/RecordStoreService.cs) pour le communication avec la base de données

### Étape 4: Ajouter l'extension Grpc.JsonTranscoding

Le transcodage permet aux applications de navigateur d'appeler les services gRPC comme s'il s'agissait d'API RESTful avec JSON. L'application de navigateur n'a pas besoin de générer un client gRPC ni de connaître quoi que ce soit sur gRPC.

1. Enregistrez le transcodage dans le code de démarrage du serveur dans le fichier [Program.cs](RecordStore/Program.cs)

```c#
builder.Services.AddGrpc().AddJsonTranscoding();
```

2. Annotez les méthodes gRPC dans le fichier [recordStore.proto](RecordStore/Protos/recordStore.proto) avec des liaisons et des routes HTTP  [**(se référer à la documentation)**](https://learn.microsoft.com/en-us/aspnet/core/grpc/json-transcoding-binding?view=aspnetcore-8.0)

3. Démarrer l'application avec:

```sh
dotnet run
```
4. Tester le service grpc avec postman en communiquant avec http