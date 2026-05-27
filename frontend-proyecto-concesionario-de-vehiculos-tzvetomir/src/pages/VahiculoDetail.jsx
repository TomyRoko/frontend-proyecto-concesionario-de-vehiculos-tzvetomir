import { useParams } from "react-router-dom";
import vehiculos from "../data/vehiculos.js";

function VehiculoDetail() {
  const { id } = useParams();
  const vehiculo = vehiculos.find((v) => v.id == id);
  return (
    <div className="vehiculo-detail">
      <img src={vehiculo.foto} alt={vehiculo.modelo} />
      <div className="vehiculo-info">
        <h2>{vehiculo.marca} {vehiculo.modelo}</h2>
        <p>Año: {vehiculo.anio}</p>
        <p>Precio: ${vehiculo.precio}</p>
        <p>Combustible: {vehiculo.combustible}</p>
        <p>{vehiculo.descripcion}</p>
      </div>
    </div>
  );
}

export default VehiculoDetail;
