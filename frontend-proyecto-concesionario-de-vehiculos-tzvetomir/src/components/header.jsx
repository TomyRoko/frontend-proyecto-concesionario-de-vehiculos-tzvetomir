import Navbar from "./Navbar";

function Header() {
  return (
    <header className="site-header">
      <div className="header-content container">
        <div>Logo de la marca</div>
        <Navbar />
      </div>
    </header>
  );
}

export default Header;