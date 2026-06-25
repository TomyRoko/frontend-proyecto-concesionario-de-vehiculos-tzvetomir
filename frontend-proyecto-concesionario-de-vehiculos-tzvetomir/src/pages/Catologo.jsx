import { useState } from "react";
import vehiculos from "../data/vehiculos.js";
import "../index.css";
import VehiculosList from "../components/VehiculosList.jsx";
import VehiculoFilters from "../components/VehiculoFilters.jsx";
import useFilteredSortedVehiculos from "../hooks/useFilteredSortedVehiculos.jsx";


function Catalogo() {
  const [search, setSearch] = useState("");
  const [combustibleFilter, setCombustibleFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  const { filteredVehicles, sortedVehicles } = useFilteredSortedVehiculos(
    vehiculos,
    search,
    combustibleFilter,
    sortBy
  );

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
