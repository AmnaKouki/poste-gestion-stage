# Gestion des stages

### Requirements

- Nodejs
- Java
- MongoDB

### Installation (Frontend)

```
cd front
npm install
```

Pour lancer le projet:

```
npm start
```

### Configuration MongoDB


1. Créer une nouvelle base de données mongodb appelée "Poste"
2. Créer 5 collections :

```
LieuxDeStage
Stages
Stagiaires
Users
roles
```

3. dans la collection "roles", nous devons ajouter 2 rôles :

```
db.roles.insertMany([
   { name: "ROLE_USER" },
   { name: "ROLE_ADMIN" },
])
```

