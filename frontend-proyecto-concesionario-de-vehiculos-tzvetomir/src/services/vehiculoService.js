const API_URL = "http://localhost:3000/api/vehiculos";

const getVehiculos = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Error al obtener los vehículos");
  }

  const data = await response.json();
  return data;
};

const getVehiculoById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
    throw new Error("Error al obtener el vehículo");
  }
  const data = await response.json();
  return data;
}

export { getVehiculos };
export { getVehiculoById };