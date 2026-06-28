import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import VehiculoForm from "../../components/VehiculoForm.jsx";
import { useAuth } from "../../hooks/useAuth.js";
import {
  createVehiculo,
  deleteVehiculo,
  getVehiculos,
  updateVehiculo,
} from "../../services/vehiculoService.js";

const normalizeCandidate = (value) => String(value).trim().toLowerCase();

const getComparableValues = (candidate) => {
  if (candidate == null) {
    return [];
  }

  if (typeof candidate === "object") {
    return [
      candidate._id,
      candidate.id,
      candidate.email,
      candidate.username,
      candidate.name,
    ]
      .filter(Boolean)
      .map(normalizeCandidate);
  }

  return [normalizeCandidate(candidate)];
};

const getVehiculoOwnerValues = (vehiculo) => {
  const ownerCandidates = [
    vehiculo.userId,
    vehiculo.usuarioId,
    vehiculo.ownerId,
    vehiculo.createdBy,
    vehiculo.createdById,
    vehiculo.user,
    vehiculo.usuario,
    vehiculo.owner,
  ];

  return ownerCandidates.flatMap(getComparableValues);
};

function UserVehiculosPage() {
  const { isAuthenticated, user } = useAuth();
  const [vehiculos, setVehiculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedVehiculo, setSelectedVehiculo] = useState(null);
  const [vehiculoDelete, setVehiculoDelete] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const isAdmin = Boolean(user?.admin);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    const loadVehiculos = async () => {
      try {
        const data = await getVehiculos();
        setVehiculos(data);
      } catch (caughtError) {
        setError(caughtError.message);
      } finally {
        setLoading(false);
      }
    };

    loadVehiculos();
  }, [isAuthenticated]);

  useEffect(() => {
    if (!message) {
      return undefined;
    }

    const timeoutId = setTimeout(() => {
      setMessage("");
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [message]);

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (loading) {
    return <p className="loading">Cargando tus vehículos...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  const userIdentifiers = [
    user?._id,
    user?.id,
    user?.email,
    user?.username,
    user?.name,
  ]
    .filter(Boolean)
    .map(normalizeCandidate);

  const misVehiculos = vehiculos.filter((vehiculo) => {
    const ownerValues = getVehiculoOwnerValues(vehiculo);
    return userIdentifiers.some((identifier) =>
      ownerValues.includes(identifier),
    );
  });

  const handleCreateVehiculo = async (vehiculoData) => {
    if (!isAdmin) {
      throw new Error(
        "Tu cuenta no tiene permisos de administrador para publicar vehículos.",
      );
    }

    try {
      setIsSaving(true);
      const newVehiculo = await createVehiculo(vehiculoData);
      const normalizedNewVehiculo = {
        ...newVehiculo,
        createdBy: newVehiculo.createdBy || user,
        user: newVehiculo.user || user,
        userId: newVehiculo.userId || user?._id || user?.id,
      };

      setVehiculos((currentVehiculos) => [
        ...currentVehiculos,
        normalizedNewVehiculo,
      ]);
      setShowForm(false);
      setSelectedVehiculo(null);
      setMessage("Vehículo añadido correctamente a tu garaje.");
      setError(null);
    } catch (caughtError) {
      setError(caughtError.message);
      throw caughtError;
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateVehiculo = async (vehiculoID, vehiculoData) => {
    try {
      setIsSaving(true);
      const updatedVehiculo = await updateVehiculo(vehiculoID, vehiculoData);
      setVehiculos((currentVehiculos) =>
        currentVehiculos.map((vehiculo) => {
          if ((vehiculo._id || vehiculo.id) === vehiculoID) {
            return updatedVehiculo;
          }
          return vehiculo;
        }),
      );
      setSelectedVehiculo(null);
      setShowForm(false);
      setMessage("Vehículo actualizado correctamente.");
      setError(null);
    } catch (caughtError) {
      setError(caughtError.message);
      throw caughtError;
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteVehiculo = async (vehiculoID) => {
    try {
      setIsSaving(true);
      await deleteVehiculo(vehiculoID);
      setVehiculos((currentVehiculos) =>
        currentVehiculos.filter(
          (vehiculo) => (vehiculo._id || vehiculo.id) !== vehiculoID,
        ),
      );
      setVehiculoDelete(null);
      setMessage("Vehículo eliminado correctamente.");
      setError(null);
    } catch (caughtError) {
      setError(caughtError.message);
      throw caughtError;
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="admin-user-vehiculos-page">
      {message && <p className="admin-vehiculos-message">{message}</p>}
      <div className="admin-user-vehiculos-header">
        <div className="admin-user-vehiculos-header-copy">
          <span className="admin-user-vehiculos-kicker">Tu garaje</span>
          <h2>Vehículos subidos con tu cuenta</h2>
          <p>
            Aquí se muestran únicamente los coches vinculados a tu usuario para
            que los revises desde el panel.
          </p>
        </div>
        {isAdmin && (
          <button
            type="button"
            className="admin-vehiculos-add-button"
            onClick={() => {
              setSelectedVehiculo(null);
              setShowForm(true);
            }}
          >
            Añadir vehículo
          </button>
        )}
      </div>

      <div
        className={`admin-user-vehiculos-notice ${
          isAdmin
            ? "admin-user-vehiculos-notice--active"
            : "admin-user-vehiculos-notice--inactive"
        }`}
      >
        <div className="admin-user-vehiculos-notice-badge">
          Estado admin: {isAdmin ? "activo" : "no activo"}
        </div>
        <div className="admin-user-vehiculos-notice-copy">
          {isAdmin && (
            <div className="admin-user-vehiculos-verified-pill">
              <span className="admin-user-vehiculos-verified-dot" />
              Acceso verificado
            </div>
          )}
          <h3>
            {isAdmin
              ? "Tu cuenta puede publicar vehículos desde este panel"
              : "Tu cuenta no tiene permisos para publicar vehículos"}
          </h3>
          <p>
            {isAdmin
              ? "Puedes añadir nuevos vehículos al garaje y gestionarlos desde esta sección."
              : "Ahora mismo tu usuario tiene admin en false, así que solo puedes consultar los vehículos asociados a tu cuenta. Cuando el estado admin pase a true, verás de nuevo la opción para añadir vehículos."}
          </p>
        </div>
        <div className="admin-user-vehiculos-notice-meta">
          <span>
            {isAdmin ? "Permiso de publicación habilitado" : "Modo consulta"}
          </span>
          <span>
            {isAdmin
              ? "Panel listo para altas de vehículos"
              : "La API bloqueará cualquier intento de creación"}
          </span>
        </div>
      </div>

      {misVehiculos.length > 0 ? (
        <>
          <p className="admin-user-vehiculos-summary">
            Tienes {misVehiculos.length} vehículo
            {misVehiculos.length === 1 ? "" : "s"} asociado
            {misVehiculos.length === 1 ? "" : "s"} a tu cuenta.
          </p>
          <div className="admin-user-vehiculos-list-wrap">
            <div className="admin-vehiculos-list">
              {misVehiculos.map((vehiculo) => {
                const vehiculoID = vehiculo._id || vehiculo.id;
                return (
                  <article key={vehiculoID}>
                    <img
                      src={vehiculo.foto}
                      alt={vehiculo.marca || "Vehículo"}
                    />
                    <div className="admin-vehiculos-info">
                      <h3>
                        {vehiculo.marca} {vehiculo.modelo}
                      </h3>
                      <p>Categoría: {vehiculo.categoria}</p>
                      <p>Año: {vehiculo.anio}</p>
                      <p>Kilometraje: {vehiculo.kilometraje} km</p>
                      <p>Precio: ${vehiculo.precio}</p>
                      <p>Combustible: {vehiculo.combustible}</p>
                      <div className="admin-vehiculos-actions">
                        <button
                          type="button"
                          className="admin-vehiculos-edit-button"
                          onClick={() => {
                            setSelectedVehiculo(vehiculo);
                            setShowForm(true);
                          }}
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          className="admin-vehiculos-delete-button"
                          onClick={() => setVehiculoDelete(vehiculoID)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <div className="admin-user-vehiculos-empty">
          <h3>Aún no tienes vehículos publicados</h3>
          <p>
            Cuando un coche quede asociado a tu cuenta, aparecerá aquí dentro
            del panel.
          </p>
          <Link to="/catalogo">Ir al catálogo</Link>
        </div>
      )}

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

export default UserVehiculosPage;
