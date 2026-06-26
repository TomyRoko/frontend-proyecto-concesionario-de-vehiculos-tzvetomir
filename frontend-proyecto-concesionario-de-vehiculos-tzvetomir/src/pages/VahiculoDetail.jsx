import { useParams } from "react-router-dom";
import vehiculos from "../data/vehiculos.js";
import { Link } from "react-router-dom";

function VehiculoDetail() {
  const { id } = useParams();
  const vehiculo = vehiculos.find((v) => v.id == id);

  if (!vehiculo) {
    return (
      <main className="vehiculo-detail">
        <h2>Vehículo no encontrado</h2>
        <p>Lo sentimos, el vehículo que buscas no existe.</p>
        <Link to="/catalogo" className="back-link">
          Volver al catálogo
        </Link>
      </main>
    );
  }

  return (
    <div className="vehiculo-detail">
      <img src={vehiculo.foto} alt={vehiculo.modelo} />
      <div className="vehiculo-info">
        <h1 >
          {vehiculo.marca} {vehiculo.modelo}
        </h1>
        <p>Categoría: {vehiculo.categoria}</p>
        <p>Año: {vehiculo.anio}</p>
        <p>Kilometraje: {vehiculo.kilometraje} km</p>
        <p>Precio: ${vehiculo.precio}</p>
        <p>Combustible: {vehiculo.combustible}</p>
        <p>{vehiculo?.descripcion}</p>
      </div>
    </div>
  );
}

export default VehiculoDetail;
