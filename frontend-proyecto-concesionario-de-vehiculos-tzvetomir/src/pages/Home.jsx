import vehiculos from "../data/vehiculos.js";
import VehiculoCard from "../components/VehiculoCard.jsx";

function Home() {
  const vehiculosExclusivos = [...vehiculos]
  .sort((a, b) => b.precio - a.precio)
  .slice(0, 3);

  return (
    <main>
      <section className="hero-section">
        <div className="container">
          <span className="hero-label">
            ¡Descubre tu próximo vehículo con nosotros!
            <div className="vehiculos-exclusivos">
              {vehiculosExclusivos.map((vehiculo) => (
                <VehiculoCard key={vehiculo.id} vehiculo={vehiculo} />
              ))}
            </div>
            <a className="button" href="#">
              Ver catálogo
            </a>
          </span>
          <h1>Bienvenido a nuestro concesionario de vehículos</h1>
          <p>
            En nuestro concesionario, encontrarás una amplia selección de
            vehículos nuevos y usados de las mejores marcas. Nuestro equipo de
            expertos está aquí para ayudarte a encontrar el automóvil perfecto
            que se adapte a tus necesidades y presupuesto. ¡Visítanos hoy mismo
            y comienza tu viaje hacia tu próximo vehículo!
          </p>
        </div>
      </section>

      <div style={{ width: "200px", margin: "20px auto" }}>
        <img src="https://picsum.photos/600/600" />
      </div>
    </main>
  );
}

export default Home;
