import { useState } from "react";
import axios from "axios";

function MesEmprunts() {

    const [email, setEmail] = useState("");
    const [emprunts, setEmprunts] = useState([]);
    const [rechercheEffectuee, setRechercheEffectuee] = useState(false);
    const [loading, setLoading] = useState(false);
    const [erreur, setErreur] = useState("");

    const chercherEmprunts = () => {

        if (!email) {
            alert("Veuillez entrer un email");
            return;
        }

        setLoading(true);
        setErreur("");

        axios
        .get("http://localhost:5000/api/livres/emprunts", {
            params: { email }
        })
        .then(res => {
            setEmprunts(res.data);
            setRechercheEffectuee(true);
        })
        .catch(err => {
            console.log("Erreur API :", err);
            setErreur("Impossible de récupérer les emprunts.");
        })
        .finally(() => {
            setLoading(false);
        });
    };

    return (
        <div>
            <h1>Mes emprunts</h1>

            <input
                type="email"
                placeholder="Entrer votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <button onClick={chercherEmprunts}>
                Voir mes emprunts
            </button>

            {loading && <p>Chargement...</p>}

            {erreur && <p style={{ color: "red" }}>{erreur}</p>}

            <hr />

            {rechercheEffectuee && emprunts.length === 0 && (
                <p>Aucun emprunt trouvé</p>
            )}

            {emprunts.map((e) => (
                <div key={e.id_livre} className="emprunt-card" style={{ marginBottom: "10px" }}>
                    <h3 className="titre">{e.titre}</h3>
                    <p className="auteur">Auteur : {e.auteur}</p>
                    <p className="date-emprunt">📅 Emprunt : {e.date_emprunt}</p>
                    <p className="date-retour">📆 Retour prévu : {e.date_retour_prevue}</p>
                </div>
            ))}
        </div>
    );
}

export default MesEmprunts;