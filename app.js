const express = require("express");
const db = require("./db");

const app = express();
app.use(express.json());

// Requête GET pour récuperer tous les utilisateurs (users)
app.get("/users", async (req, res) => {
  const { rows } = await db.query("SELECT * FROM users");
  res.status(200).json(rows);
});

// Requête POST pour crée un nouvel utilisateur
app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  const { rows } = await db.query(
    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
    [name, email]
  );
  res.status(201).json(rows[0]);
});

module.exports = app;
