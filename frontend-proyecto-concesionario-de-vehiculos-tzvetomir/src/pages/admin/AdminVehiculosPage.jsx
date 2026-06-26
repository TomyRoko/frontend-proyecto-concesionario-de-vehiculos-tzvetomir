import initialProducts from "../../data/vehiculos.js";
import { useState } from "react";
import VehiculoForm from "../../components/VehiculoForm.jsx";

function AdminVehiculosPage() {
  const [showForm, setShowForm] = useState(false);
  const [vehiculos, setVehiculos] = useState(initialProducts);

  const handleCreateVehiculo = (vehiculoData) => {
    const newVehiculo = {
      ...vehiculoData,
      id: Date.now(), 
    };
    setVehiculos([...vehiculos, newVehiculo]);
  }

  return (
    <section className="admin-vehiculos-page">
      <div className="admin-vehiculos-header">
        <div className="admin-vehiculos-header-content">
          <h2>Administración de Vehículos</h2>
          <p>Listado de vehículos</p>
        </div>

        <button
          className="admin-vehiculos-add-button"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cerrar formulario" : "Agregar nuevo vehículo"}
        </button>
      </div>
      {showForm && <VehiculoForm onCreateVehiculo={handleCreateVehiculo} />}
      <div className="admin-vehiculos-list">
        {vehiculos.map((vehiculo) => (
          <article key={vehiculo.id}>
            <img src={vehiculo.foto} alt={vehiculo.marca} />
            <div className="admin-vehiculos-info">
              <h3>
                {vehiculo.marca} {vehiculo.modelo}
              </h3>
              <p>Año: {vehiculo.anio}</p>
              <p>Precio: ${vehiculo.precio}</p>
              <p>Combustible: {vehiculo.combustible}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default AdminVehiculosPage;
