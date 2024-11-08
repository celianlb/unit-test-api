Les test unitaires :

- Vérifie la logique métier de manière isolée et stricte
- Vérifier les types des données
- Permet de détecter et de gérer efficacement les bug
- Assure la fiabilité des services
- Documentez plus simplement vos le comportement attendu de votre API

# 1 Installez NodeJS

npm init -y

# 2 Installez les dépendances nécessaires

## Express PostgreSQL & Dotenv (pour développez l'API et la DB)

npm install express pg dotenv

## Jest & Supertest (pour les test unitaires)

npm install --save-dev jest supertest

# 3 Configurer l’environnement

Crée un fichier .env afin d'y stocker les informations de connexion à la BDD

DATABASE_URL="urldeladatabase"

# 4 Crée le fichier db.js afin de gérer la connexion à PG

# 5 Crée le fichier app.js avec des endpoints pour les users

# 6 Crée le fichier server.js pour lancer le serveur

# 7 Ecrire les tests unitaires

# 8 Executer les tests unitaires

Dans package.json :

{
"scripts": {
"test": "jest"
}
}

Puis executer la commande suivante :

npm test

# Script SQL afin de crée la table user

CREATE TABLE "users" (
id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL
);

# Test unitaires API

const request = require("supertest");
const app = require("./app");
const db = require("./db");

beforeAll(async () => {
await db.query(
"CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name VARCHAR(100), email VARCHAR(100));"
);
});

afterAll(async () => {
await db.query("DROP TABLE users;");
db.query("END");
});

describe("User API Endpoints", () => {
test("POST /users - create a new user", async () => {
const response = await request(app)
.post("/users")
.send({ name: "Célian", email: "célian@gmail.com" });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Célian");
    expect(response.body.email).toBe("célian@gmail.com");

});

test("GET /users - retrieve all users", async () => {
const response = await request(app).get("/users");
expect(response.statusCode).toBe(200);
expect(response.body.length).toBeGreaterThan(0);
});
});
