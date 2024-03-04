import { Link } from "react-router-dom";

import "../styles/NotFound.css";

export const PageNotFound = () => {
  return (
    <main className="not-found-main">
      <div className="not-found-container">
        <h1>Página Não Encontrada</h1>{" "}
        <Link className="button" to="/">
          Retornar
        </Link>
      </div>
    </main>
  );
};
