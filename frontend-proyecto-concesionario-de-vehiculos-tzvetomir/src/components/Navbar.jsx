import { Link } from "react-router-dom";


function Navbar() {
  return (
    <nav className="header-position" style={{ display: "flex", gap: "20px" }}>
      <Link to="/">Inicio</Link>
      <Link to="/Berlina">Berlina</Link>
      <Link to="/Coupe">Coupe</Link>
      <Link to="/Suv">Suv</Link>
      <Link to="/Deportivo">Deportivo</Link>
      <Link to="/Electrico">Eléctrico</Link>
      <Link to="/admin">Admin</Link>
    </nav>
  );
}

export default Navbar;
