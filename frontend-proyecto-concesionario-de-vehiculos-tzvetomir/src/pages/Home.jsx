import VehiculosExclusivos from "../components/VehiculosExclusivos.jsx";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getVehiculos } from "../services/vehiculoService.js";

function Home() {
  const navigate = useNavigate();
  const [vehiculos, setVehiculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadVehiculos = async () => {
      try {
        const data = await getVehiculos();
        setVehiculos(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadVehiculos();
  }, []);

  if (loading) {
    return <p className="loading">Cargando vehículos...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <main>
      <section className="hero-section">
        <div className="container">
          <span className="hero-label">
            <VehiculosExclusivos vehiculos={vehiculos} />
            <div className="hero-label-title">
              ¡Descubre tu próximo vehículo con nosotros!
            </div>
            <button
              type="button"
              className="hero-button"
              onClick={() => navigate("/catalogo")}
            >
              Explorar catálogo
            </button>
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
