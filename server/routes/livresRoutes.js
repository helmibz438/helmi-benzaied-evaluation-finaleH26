const express = require("express");
const router = express.Router();

const {
    getLivres,
    getLivresEmpruntesByEmail
} = require("../controllers/livresController");

// 📚 livres disponibles
router.get("/", getLivres);

// 👤 emprunts par email
router.get("/emprunts", getLivresEmpruntesByEmail);

module.exports = router;