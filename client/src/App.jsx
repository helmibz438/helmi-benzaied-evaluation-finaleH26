import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Livres from "./pages/Livres";
import MesEmprunts from "./pages/MesEmprunts";

function App() {

  return (


    <BrowserRouter>
      <>
        <h1>Bibliothèque numérique : Ben Zaied Helmi</h1>
      </>
      <nav>

        <Link to="/">
          Livres
        </Link>

        {" | "}

        <Link to="/emprunts">
          Mes emprunts
        </Link>

      </nav>

      <Routes>

        <Route
          path="/"
          element={<Livres />}
        />

        <Route
          path="/emprunts"
          element={<MesEmprunts />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;