import Footer from "../components/Footer";
import Header from "../components/Header";
import { useState } from "react";
import vehiculos from "../data/vehiculos.js";
import "./App.css";
import VehiculosList from "../components/VehiculosList.jsx";

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


  const hasResults = filteredVehicles.length > 0;

  const combustible = [
    ...new Set(vehiculos.map((vehicle) => vehicle.combustible)),
  ];

  return (
    <>
      <Header />

      <h1>Catálogo de Vehículos</h1>
      <p>
        Aquí encontrarás una amplia selección de vehículos disponibles en
        nuestro concesionario. Explora nuestras opciones y encuentra el
        automóvil perfecto para ti.
      </p>
      <label htmlFor="search">Buscar por marca o modelo:</label>
      <input
        type="text"
        name="search"
        id="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select
        value={combustibleFilter}
        onChange={(e) => setCombustibleFilter(e.target.value)}
      >
        <option value="">Todos</option>
        {combustible.map((tipo) => (
          <option key={tipo} value={tipo}>
            {tipo}
          </option>
        ))}
      </select>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="">Ordenar por</option>
        <option value="marca">Marca</option>
        <option value="modelo">Modelo</option>
      </select>
      {hasResults ? (
        <VehiculosList vehiculos={filteredVehicles} />
      ) : (
        <p>No se encontraron resultados.</p>
      )}

      <Footer />
    </>
  );
}

export default Catalogo;
