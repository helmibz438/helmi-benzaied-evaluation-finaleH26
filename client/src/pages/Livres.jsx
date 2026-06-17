import { useEffect, useState } from "react";
import axios from "axios";

function Livres() {
  const [livres, setLivres] = useState([]);

  useEffect(() => {
   
    axios.get("http://localhost:5000/api/livres").then((res) => {
      setLivres(res.data);
    });
  }, []);

  return (
    
    <>
      
      <h1>Livres disponibles</h1>

      <table
        border="1"
        cellPadding="10"
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Titre</th>
            <th>Auteur</th>
          </tr>
        </thead>

        <tbody>
          {livres.map((livre) => (
            <tr key={livre.id_livre}>
              <td>{livre.id_livre}</td>
              <td>{livre.titre}</td>
              <td>{livre.auteur}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Livres;
