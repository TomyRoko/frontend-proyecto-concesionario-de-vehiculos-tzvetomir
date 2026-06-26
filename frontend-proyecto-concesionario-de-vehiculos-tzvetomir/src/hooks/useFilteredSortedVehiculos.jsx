function useFilteredSortedVehiculos(
  vehiculos,
  search,
  combustibleFilter,
  sortBy,
  categoriaFilter = ""
) {
  const filteredVehicles = vehiculos.filter((vehicle) => {
    const matchSearch =
      vehicle.marca.toLowerCase().includes(search.toLowerCase()) ||
      vehicle?.modelo?.toLowerCase().includes(search.toLowerCase());
    const matchCombustible = combustibleFilter
      ? vehicle.combustible === combustibleFilter
      : true;
    const matchCategoria = categoriaFilter
      ? vehicle.categoria === categoriaFilter
      : true;
    return matchSearch && matchCombustible && matchCategoria;
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
  return { filteredVehicles, sortedVehicles };
}

export default useFilteredSortedVehiculos;
