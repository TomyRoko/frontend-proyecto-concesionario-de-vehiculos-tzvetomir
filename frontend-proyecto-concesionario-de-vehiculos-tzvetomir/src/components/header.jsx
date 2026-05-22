import Navbar from "./Navbar";

function Header() {
  return (
    <header className="site-header">
      <div className="header-content container">
        <div className="logo header-position">
          <img src="./img/logo.png" alt="Logo de la marca" />
        </div>
        <Navbar />
        <span className="header-position"></span>
      </div>
    </header>
  );
}

export default Header;
