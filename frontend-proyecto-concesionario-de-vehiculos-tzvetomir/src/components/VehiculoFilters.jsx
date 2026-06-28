function VehiculoFilters({ search, setSearch, combustibleFilter, setCombustibleFilter, sortBy, setSortBy, combustible }) {
  return (
    <div className="vehiculo-filters">
      <div>
        <label htmlFor="search">Buscar por marca o modelo:</label>
        <input
          type="text"
          name="search"
          id="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

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

      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="">Ordenar por</option>
        <option value="az">Marca A-Z</option>
        <option value="za">Marca Z-A</option>
        <option value="newest">Más nuevo</option>
        <option value="oldest">Más antiguo</option>
      </select>
    </div>
  );
}

export default VehiculoFilters;
