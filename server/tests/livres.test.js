const request = require("supertest");
const express = require("express");
const db = require("../config/db.js");
require("dotenv").config();

const app = express();
app.use(express.json());

app.get("/api/livres", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM livres");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

app.get("/api/livres/emprunts", async (req, res) => {
    try {
        const email = req.query.email;
        const [rows] = await db.query(
            "SELECT * FROM livres WHERE id_livre IN (SELECT id_livre FROM emprunts WHERE email = ?)",
            [email]
        );
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

describe("GET /api/livres", () => {
    it("should return a 200 status and a list of livres", async () => {
        const response = await request(app).get("/api/livres");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});

describe("GET /api/livres/emprunts", () => {
    it("should return a 200 status and a list of emprunts for a given email", async () => {
        const email = "test@example.com";
        const response = await request(app).get(`/api/livres/emprunts?email=${email}`);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});

afterAll(async () => {
    await db.end();
});