import { useEffect, useState } from "react";
import VehiculoForm from "../../components/VehiculoForm.jsx";
import { getVehiculos } from "../../services/vehiculoService.js";


function AdminVehiculosPage() {
  const [showForm, setShowForm] = useState(false);
  const [vehiculos, setVehiculos] = useState([]);
  const [selectedVehiculo, setSelectedVehiculo] = useState(null);
  const [message, setMessage] = useState("");
  const [vehiculoDelete, setVehiculoDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const loadVehiculos = async () => {
      try {
        const data = await getVehiculos();
        setVehiculos(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadVehiculos();
  }, []);

  if (loading) {
    return <p className="loading">Cargando vehículos...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  const handleCreateVehiculo = (vehiculoData) => {
    const newVehiculo = {
      ...vehiculoData,
      id: Date.now(),
    };
    setVehiculos([...vehiculos, newVehiculo]);
    setMessage("Vehículo agregado correctamente.");
  };

  const handleDeleteVehiculo = (id) => {
    const filteredVehiculos = vehiculos.filter((vehiculo) => vehiculo.id != id);
    setVehiculos(filteredVehiculos);
    setMessage("Vehículo eliminado correctamente.");
    setVehiculoDelete(null);
  };

  const handleUpdateVehiculo = (vehiculoID, vehiculoData) => {
    const updatedVehiculos = vehiculos.map((vehiculo) => {
      if (vehiculo.id == vehiculoID) {
        const updatedVehiculo = { ...vehiculo, ...vehiculoData };
        return updatedVehiculo;
      }
      return vehiculo;
    });
    setVehiculos(updatedVehiculos);
    setSelectedVehiculo(null);
    setShowForm(false);
    setMessage("Vehículo actualizado correctamente.");
  };

  return (
    <section className="admin-vehiculos-page">
      {message && <p className="admin-vehiculos-message">{message}</p>}
      <div className="admin-vehiculos-header">
        <div className="admin-vehiculos-header-content">
          <h2>Administración de Vehículos</h2>
          <p>Listado de vehículos</p>
        </div>

        <button
          className="admin-vehiculos-add-button"
          type="button"
          onClick={() => {
            setShowForm(!showForm);
            setSelectedVehiculo(null);
          }}
        >
          {showForm ? "Cerrar formulario" : "Agregar nuevo vehículo"}
        </button>
      </div>

      <div className="admin-vehiculos-list">
        {vehiculos.map((vehiculo) => (
          <article key={vehiculo.id}>
            <img src={vehiculo.foto} alt={vehiculo.marca} />
            <div className="admin-vehiculos-info">
              <h3>
                {vehiculo.marca} {vehiculo.modelo}
              </h3>
              <p>Categoría: {vehiculo.categoria}</p>
              <p>Año: {vehiculo.anio}</p>
              <p>Kilometraje: {vehiculo.kilometraje} km</p>
              <p>Precio: ${vehiculo.precio}</p>
              <p>Combustible: {vehiculo.combustible}</p>
              <p>Descripción: {vehiculo.descripcion}</p>
              <div className="admin-vehiculos-actions">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedVehiculo(vehiculo);
                    setShowForm(true);
                  }}
                  className="admin-vehiculos-edit-button"
                >
                  Editar
                </button>

                <button
                  type="button"
                  className="admin-vehiculos-delete-button"
                  onClick={() => setVehiculoDelete(vehiculo.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {showForm && (
        <div
          className="admin-modal-overlay"
          onClick={() => {
            setShowForm(false);
            setSelectedVehiculo(null);
          }}
        >
          <div
            className="admin-modal-content"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="admin-modal-close"
              onClick={() => {
                setShowForm(false);
                setSelectedVehiculo(null);
              }}
            >
              Cerrar
            </button>
            <VehiculoForm
              vehiculo={selectedVehiculo}
              onCreateVehiculo={handleCreateVehiculo}
              onUpdateVehiculo={handleUpdateVehiculo}
            />
          </div>
        </div>
      )}

      {vehiculoDelete && (
        <div
          className="admin-modal-overlay"
          onClick={() => setVehiculoDelete(null)}
        >
          <div
            className="admin-vehiculos-delete-confirmation"
            onClick={(event) => event.stopPropagation()}
          >
            <p>¿Está seguro de que desea eliminar este vehículo?</p>
            <div className="admin-vehiculos-confirmation-actions">
              <button
                type="button"
                onClick={() => {
                  handleDeleteVehiculo(vehiculoDelete);
                  setVehiculoDelete(null);
                }}
              >
                Sí, eliminar
              </button>
              <button type="button" onClick={() => setVehiculoDelete(null)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default AdminVehiculosPage;
