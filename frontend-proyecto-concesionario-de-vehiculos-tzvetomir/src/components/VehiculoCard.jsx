import { useNavigate } from "react-router-dom";

function VehiculoCard({ vehiculo }) {
  const navigate = useNavigate();
  return (
    <article className="vehiculo-card" onClick={() => navigate(`/catalogo/${vehiculo._id}`)}>
      <img src={vehiculo.foto} alt={vehiculo.modelo} />
      <div className="vehiculo-info">
        <h3>{vehiculo.marca} {vehiculo.modelo}</h3>
        <p>Año: {vehiculo.anio}</p>
        <p>Precio: ${vehiculo.precio}</p>
        <p>Combustible: {vehiculo.combustible}</p>
      </div>
    </article>
  );
}

export default VehiculoCard;
