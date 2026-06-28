import { Link } from "react-router-dom";
import { useState } from "react";

function SearchBox({ vehiculos }) {
  const [search, setSearch] = useState("");

  const normalizeSearch = search.toLowerCase().trim();

  const results = vehiculos
    .filter((vehiculo) => {
      const marca = vehiculo.marca.toLowerCase();
      const modelo = vehiculo.modelo.toLowerCase();
      return (
        marca.includes(normalizeSearch) || modelo.includes(normalizeSearch)
      );
    })
    .slice(0, 5);

  return (
    <div>
      <input
        type="search"
        placeholder="Buscar por marca o modelo"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      {search.trim() !== "" && (
        <div className="search-box">
          {results.length > 0 ? (results.map((vehiculo) => (
            <Link
              onclick={() => setSearch("")}
              className="search-button"
              to={`/catalogo/${vehiculo._id}`}
            >
              <strong>
                {vehiculo.marca} {vehiculo.modelo}
              </strong>
              <span>
                {vehiculo.año} {vehiculo.precio}{" "}
              </span>
            </Link>
          ))) : (
            <p className="no-results">No se encontraron resultados.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBox;
