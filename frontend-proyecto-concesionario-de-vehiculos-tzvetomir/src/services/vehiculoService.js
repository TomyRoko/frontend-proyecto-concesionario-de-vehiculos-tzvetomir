const API_URL = "http://localhost:3000/api/vehiculos";

const getVehiculos = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al obtener los vehículos");
  }

  const data = await response.json();
  return data;
};

const getVehiculoById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al obtener el vehículo");
  }
  const data = await response.json();
  return data;
}

const createVehiculo = async (vehiculoData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vehiculoData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al crear el vehículo");
  }

  return response.json();
};

const updateVehiculo = async (vehiculoID, vehiculoData) => {
  const response = await fetch(`${API_URL}/${vehiculoID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vehiculoData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al actualizar el vehículo");
  }

  return response.json();
};

export { getVehiculos };
export { getVehiculoById };
export { createVehiculo };
export { updateVehiculo };