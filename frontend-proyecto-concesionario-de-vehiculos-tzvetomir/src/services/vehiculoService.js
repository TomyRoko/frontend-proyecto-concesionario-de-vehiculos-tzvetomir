import { getStoredToken } from "../context/authStorage.js";

const API_URL = `${import.meta.env.VITE_API_URL}/vehiculos`;

const getToken = () => {
  const token = getStoredToken();
  return token ? `Bearer ${token}` : null;
};

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Error en la solicitud");
  }
  return data;
};

const getVehiculos = async () => {
  const response = await fetch(`${API_URL}?_=${Date.now()}`, {
    cache: "no-store",
  });
  return await handleResponse(response);
};

const getVehiculoById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    cache: "no-store",
  });
  return await handleResponse(response);
};

const createVehiculo = async (vehiculoData) => {
  const token = getToken();
  if (!token) {
    throw new Error(
      "No se encontró un token de autenticación. Por favor, inicie sesión.",
    );
  }
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(vehiculoData),
  });

  return await handleResponse(response);
};

const updateVehiculo = async (vehiculoID, vehiculoData) => {
  const token = getToken();
  if (!token) {
    throw new Error(
      "No se encontró un token de autenticación. Por favor, inicie sesión.",
    );
  }
  const response = await fetch(`${API_URL}/${vehiculoID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(vehiculoData),
  });

  return await handleResponse(response);
};

const deleteVehiculo = async (vehiculoID) => {
  const token = getToken();
  if (!token) {
    throw new Error(
      "No se encontró un token de autenticación. Por favor, inicie sesión.",
    );
  }
  const response = await fetch(`${API_URL}/${vehiculoID}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  });

  return await handleResponse(response);
};

export {
  getVehiculos,
  getVehiculoById,
  createVehiculo,
  updateVehiculo,
  deleteVehiculo,
};
