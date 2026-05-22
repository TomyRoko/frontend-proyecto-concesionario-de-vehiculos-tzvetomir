function Navbar() {
  return (
    <nav className="header-position" style={{ display: "flex", gap: "20px" }}>
      <a href="/">Inicio</a>
      <a href="/Berlina">Berlina</a>
      <a href="/Coupe">Coupe</a>
      <a href="/Suv">Suv</a>
      <a href="/Deportivo">Deportivo</a>
      <a href="/Electrico">Eléctrico</a>
    </nav>
  );
}

export default Navbar;
