import Navbar from "./Navbar";
import logo from "../assets/logo.png";
import SearchBox from "./SearchBox";
import vehiculos from "../data/vehiculos.js";




function Header() {
  return (
    <header className="site-header">
      <div className="header-content container">
        <div className="logo header-position">
          <img src={logo} alt="Logo de la marca" />
        </div>
        <Navbar />
        <SearchBox vehiculos={vehiculos} />
      </div>
    </header>
  );
}

export default Header;