import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";

function DashboardPage() {
  const { user } = useAuth();
  const displayName = user?.name || user?.username || user?.email || "Usuario";

  return (
    <section className="admin-dashboard-page">
      <h1 className="admin-dashboard-title">Dashboard</h1>
      <p className="admin-dashboard-subtitle">Bienvenido, {displayName}</p>

      <div className="admin-dashboard-grid">
        <article className="admin-dashboard-card">
          <h2>Gestión de vehículos</h2>
          <p>
            Accede al listado para revisar, editar o eliminar los vehículos
            asociados a tu cuenta.
          </p>
          <Link to="/admin/vehiculos">Ir a ver los vehículos</Link>
        </article>

        <article className="admin-dashboard-card">
          <h2>Vista pública</h2>
          <p>
            Comprueba cómo ven los usuarios finales el catálogo actualizado del
            concesionario.
          </p>
          <Link to="/catalogo">Ir al catálogo</Link>
        </article>
      </div>
    </section>
  );
}

export default DashboardPage;
