import { useState } from "react";
import vehiculos from "../data/vehiculos.js";
import "../index.css";
import VehiculosList from "../components/VehiculosList.jsx";
import VehiculoFilters from "../components/VehiculoFilters.jsx";


function Catalogo() {
  const [search, setSearch] = useState("");
  const [combustibleFilter, setCombustibleFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  const filteredVehicles = vehiculos.filter((vehicle) => {
    const matchSearch =
      vehicle.marca.toLowerCase().includes(search.toLowerCase()) ||
      vehicle?.modelo?.toLowerCase().includes(search.toLowerCase());
    const matchCombustible = combustibleFilter
      ? vehicle.combustible === combustibleFilter
      : true;
    return matchSearch && matchCombustible;
  });

  const sortedVehicles = [...filteredVehicles].sort((a, b) => {
    if (sortBy === "az") {
      if (a.marca < b.marca) return -1;
      if (a.marca > b.marca) return 1;
      return 0;
    }
    if (sortBy === "za") {
      if (a.marca > b.marca) return -1;
      if (a.marca < b.marca) return 1;
      return 0;
    }
    if (sortBy === "newest") {
      return b.anio - a.anio;
    }

    if (sortBy === "oldest") {
      return a.anio - b.anio;
    }
  });

  const hasResults = filteredVehicles.length > 0;

  const combustible = [
    ...new Set(vehiculos.map((vehicle) => vehicle.combustible)),
  ];

  return (
    <>
      <main>
        <h1>Catálogo de Vehículos</h1>
        <p>
          Aquí encontrarás una amplia selección de vehículos disponibles en
          nuestro concesionario. Explora nuestras opciones y encuentra el
          automóvil perfecto para ti.
        </p>

      <VehiculoFilters
        search={search}
        setSearch={setSearch}
        combustibleFilter={combustibleFilter}
        setCombustibleFilter={setCombustibleFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        combustible={combustible}
      />
        <div className="vehiculos-catalogo">
          {hasResults ? (
            <VehiculosList vehiculos={sortedVehicles} />
          ) : (
            <p>No se encontraron resultados.</p>
          )}
        </div>
      </main>
    </>
  );
}

export default Catalogo;
