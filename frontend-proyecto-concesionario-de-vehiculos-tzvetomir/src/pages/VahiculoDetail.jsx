import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getVehiculoById } from "../services/vehiculoService.js";
import { useState, useEffect } from "react";

function VehiculoDetail() {
  const { id } = useParams();
  const [vehiculo , setVehiculo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadVehiculo = async () => {
      try {
        const data = await getVehiculoById(id);
        setVehiculo(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadVehiculo();
  }, [id]);

  if (loading) {
    return <p className="loading">Cargando vehículo...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!vehiculo) {
    return (
      <main className="vehiculo-detail">
        <h2>{error || "Vehículo no encontrado"}</h2>
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
