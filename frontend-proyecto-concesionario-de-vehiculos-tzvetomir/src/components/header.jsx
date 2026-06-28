import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import logo from "../assets/logo.png";
import SearchBox from "./SearchBox";
import { useState, useEffect } from "react";
import { getVehiculos } from "../services/vehiculoService.js";

function Header() {
  const [ vehiculos, setVehiculos] = useState([]);

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
        <div className="logo">
          <Link to="/" >
            <img src={logo} alt="Logo de la marca" />
          </Link>
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
