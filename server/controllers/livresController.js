const db = require("../config/db");

exports.getLivres = (req, res) => {

    const sql = `
        SELECT *
        FROM livres
        WHERE disponible = 1
    `;

    db.query(sql, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
};


// 📌 Emprunts par email utilisateur
exports.getLivresEmpruntesByEmail = (req, res) => {

    const email = req.query.email;

    if (!email) {
        return res.status(400).json({ message: "Email requis" });
    }

    const sql = `
        SELECT
            l.id_livre,
            l.titre,
            l.auteur,
            e.date_emprunt,
            e.date_retour_prevue
        FROM emprunts e
        INNER JOIN livres l ON e.id_livre = l.id_livre
        INNER JOIN utilisateurs u ON e.id_utilisateur = u.id_utilisateur
        WHERE u.email = ?
        AND e.date_retour_reelle IS NULL
    `;

    db.query(sql, [email], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
};