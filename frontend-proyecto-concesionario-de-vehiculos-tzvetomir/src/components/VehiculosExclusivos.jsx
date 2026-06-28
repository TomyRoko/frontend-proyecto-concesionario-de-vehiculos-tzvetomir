import VehiculoCard from "./VehiculoCard.jsx";


function VehiculosExclusivos({ vehiculos }) {
  const vehiculosExclusivos = [...vehiculos]
    .sort((a, b) => b.precio - a.precio)
    .slice(0, 3);

  return (
    <div className="vehiculos-exclusivos">
      {vehiculosExclusivos.map((vehiculo) => (
        <VehiculoCard key={vehiculo._id} vehiculo={vehiculo} />
      ))}
    </div>
  );
}

export default VehiculosExclusivos;
