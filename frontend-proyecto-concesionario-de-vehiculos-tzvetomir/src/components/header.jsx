import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import logo from "../assets/logo.png";
import SearchBox from "./SearchBox";
import vehiculos from "../data/vehiculos.js";

function Header() {
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
