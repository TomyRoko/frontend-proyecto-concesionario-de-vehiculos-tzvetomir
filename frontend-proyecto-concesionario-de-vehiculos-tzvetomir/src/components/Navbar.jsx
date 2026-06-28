import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="header-nav">
      <Link to="/">Inicio</Link>
      <Link to="/catalogo?categoria=Berlina">Berlina</Link>
      <Link to="/catalogo?categoria=Coupe">Coupe</Link>
      <Link to="/catalogo?categoria=Suv">SUV</Link>
      <Link to="/catalogo?categoria=Deportivo">Deportivo</Link>
      <Link to="/catalogo?categoria=Electrico">Electrico</Link>
    </nav>
  );
}

export default Navbar;
