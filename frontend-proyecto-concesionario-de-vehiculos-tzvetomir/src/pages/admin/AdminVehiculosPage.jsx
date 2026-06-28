import { useEffect, useState } from "react";
import VehiculoForm from "../../components/VehiculoForm.jsx";
import { getVehiculos } from "../../services/vehiculoService.js";
import { createVehiculo } from "../../services/vehiculoService.js";
import { updateVehiculo } from "../../services/vehiculoService.js";
import { deleteVehiculo } from "../../services/vehiculoService.js";

function AdminVehiculosPage() {
  const [showForm, setShowForm] = useState(false);
  const [vehiculos, setVehiculos] = useState([]);
  const [selectedVehiculo, setSelectedVehiculo] = useState(null);
  const [message, setMessage] = useState("");
  const [vehiculoDelete, setVehiculoDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const getVehiculoId = (vehiculo) => vehiculo._id || vehiculo.id;

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

  useEffect(() => {
    if (!message) {
      return undefined;
    }

    const timeoutId = setTimeout(() => {
      setMessage("");
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [message]);

  if (loading) {
    return <p className="loading">Cargando vehículos...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  const handleCreateVehiculo = async (vehiculoData) => {
    try {
      setIsSaving(true);
      const newVehiculo = await createVehiculo(vehiculoData);

      setVehiculos([...vehiculos, newVehiculo]);
      setShowForm(false);
      setSelectedVehiculo(null);
      setMessage("Vehículo agregado correctamente.");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteVehiculo = async (vehiculoID) => {
    try {
      setIsSaving(true);
      await deleteVehiculo(vehiculoID);
      const filteredVehiculos = vehiculos.filter(
        (vehiculo) => getVehiculoId(vehiculo) !== vehiculoID,
      );
      setVehiculos(filteredVehiculos);
      setVehiculoDelete(null);
      setMessage("Vehículo eliminado correctamente.");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateVehiculo = async (vehiculoID, vehiculoData) => {
    try {
      setIsSaving(true);
      const updatedVehiculo = await updateVehiculo(vehiculoID, vehiculoData);
      const updatedVehiculos = vehiculos.map((vehiculo) => {
        if (getVehiculoId(vehiculo) === vehiculoID) {
          return updatedVehiculo;
        }
        return vehiculo;
      });
      setVehiculos(updatedVehiculos);
      setSelectedVehiculo(null);
      setShowForm(false);
      setMessage("Vehículo actualizado correctamente.");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSaving(false);
    }
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
          <article key={getVehiculoId(vehiculo)}>
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
                  onClick={() => setVehiculoDelete(getVehiculoId(vehiculo))}
                >
                  {isSaving && vehiculoDelete === getVehiculoId(vehiculo)
                    ? "Eliminando..."
                    : "Eliminar"}
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
            <div className="admin-vehiculos-form-container">
              <VehiculoForm
                key={selectedVehiculo?._id || selectedVehiculo?.id || "new"}
                vehiculo={selectedVehiculo}
                onCreateVehiculo={handleCreateVehiculo}
                onUpdateVehiculo={handleUpdateVehiculo}
                isSaving={isSaving}
              />
            </div>
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
                {isSaving ? "Eliminando..." : "Cancelar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default AdminVehiculosPage;
