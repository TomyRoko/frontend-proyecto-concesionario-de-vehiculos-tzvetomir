function VehiculoCard({ vehiculo }) {
  return (
    <article className="vehiculo-card">
      <img src={vehiculo.foto} alt={vehiculo.modelo} />
      <div>
        <h3>{vehiculo.marca} {vehiculo.modelo}</h3>
        <p>Año: {vehiculo.año}</p>
        <p>Precio: ${vehiculo.precio}</p>
        <p>Combustible: {vehiculo.combustible}</p>
      </div>
    </article>
  );
}

export default VehiculoCard;
