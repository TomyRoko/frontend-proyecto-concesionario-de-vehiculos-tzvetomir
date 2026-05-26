import MovieCard from "./MovieCard";

function VehiculosList({ vehiculos }) {
  return (
    <div className="vehiculos-list">
      {vehiculos.map((vehiculo) => (
        <MovieCard key={vehiculo.id} movie={vehiculo} />
      ))}
    </div>
  );
}

export default VehiculosList