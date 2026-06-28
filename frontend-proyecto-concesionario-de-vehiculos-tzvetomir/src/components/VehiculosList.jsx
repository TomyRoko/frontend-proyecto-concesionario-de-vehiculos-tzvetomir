import VehiculoCard from "./VehiculoCard.jsx";

function VehiculosList({ vehiculos }) {
  return (
    <div className="vehiculos-list">
      {vehiculos.map((vehiculo) => {
        const vehiculoId = vehiculo._id || vehiculo.id;
        return <VehiculoCard key={vehiculoId} vehiculo={vehiculo} />;
      })}
    </div>
  );
}

export default VehiculosList;
