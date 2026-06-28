import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import logo from "../assets/logo.png";
import SearchBox from "./SearchBox";
import { useState, useEffect } from "react";
import { getVehiculos } from "../services/vehiculoService.js";
import { useAuth } from "../hooks/useAuth.js";

function Header() {
  const navigate = useNavigate();
  const [vehiculos, setVehiculos] = useState([]);
  const { isAuthenticated, logout } = useAuth();
  const cuentaPath = isAuthenticated ? "/admin" : "/auth/register";
  const cuentaLabel = isAuthenticated ? "Admin" : "Cuenta";

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  useEffect(() => {
    const loadVehiculos = async () => {
      try {
        const data = await getVehiculos();
        setVehiculos(data);
      } catch (error) {
        console.error("Error al cargar los vehículos:", error);
      }
    };
    loadVehiculos();
  }, []);

  return (
    <header className="site-header">
      <div className="header-content container">
        <div className="header-brand">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="Logo de la marca" />
            </Link>
          </div>
          <div className="header-account-actions">
            <Link to={cuentaPath} className="header-account-link">
              {cuentaLabel}
            </Link>
            {isAuthenticated && (
              <button
                type="button"
                className="header-account-link header-logout-button"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>
        </div>
        <Navbar />
        <div className="header-search">
          <SearchBox vehiculos={vehiculos} />
        </div>
      </div>
    </header>
  );
}

export default Header;
