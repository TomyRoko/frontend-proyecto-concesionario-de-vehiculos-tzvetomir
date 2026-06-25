import Navbar from "./Navbar";
import logo from "../assets/logo.png";

function Header() {
  return (
    <header className="site-header">
      <div className="header-content container">
        <div className="logo header-position">
          <img src={logo} alt="Logo de la marca" />
        </div>
        <Navbar />
        <span className="header-position"></span>
      </div>
    </header>
  );
}

export default Header;