import vehiculos from "../../data/vehiculos.js";

import { Link } from "react-router-dom";

function AdminVehiculosPage() {
  return (
    <section className="admin-vehiculos-page">
      <div className="admin-vehiculos-header">
        <div className="admin-vehiculos-header-content">
          <h2>Administración de Vehículos</h2>
          <p>Listado de vehículos</p>
        </div>
      </div>

      <Link to="#">Agregar nuevo vehículo</Link>
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
