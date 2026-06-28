import VehiculoCard from "./VehiculoCard.jsx";

function VehiculosList({ vehiculos }) {
  return (
    <div className="vehiculos-list">
      {vehiculos.map((vehiculo) => (
        <VehiculoCard key={vehiculo._id} vehiculo={vehiculo} />
      ))}
    </div>
  );
}

export default VehiculosList;