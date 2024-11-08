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
