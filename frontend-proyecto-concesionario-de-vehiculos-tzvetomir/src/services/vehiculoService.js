const API_URL = `${import.meta.env.VITE_API_URL}/vehiculos`;


const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Error en la solicitud");
  }
  return data;
};

const getVehiculos = async () => {
  const response = await fetch(API_URL);
  return await handleResponse(response);
};

const getVehiculoById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  return await handleResponse(response);
}

const createVehiculo = async (vehiculoData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vehiculoData),
  });

  return await handleResponse(response);
};

const updateVehiculo = async (vehiculoID, vehiculoData) => {
  const response = await fetch(`${API_URL}/${vehiculoID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vehiculoData),
  });

  return await handleResponse(response);
};

const deleteVehiculo = async (vehiculoID) => {
  const response = await fetch(`${API_URL}/${vehiculoID}`, {
    method: "DELETE",
  });

  return await handleResponse(response);
};

export { getVehiculos, getVehiculoById, createVehiculo, updateVehiculo, deleteVehiculo };
