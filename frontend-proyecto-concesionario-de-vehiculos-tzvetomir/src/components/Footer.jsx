import { Link } from "react-router-dom";

function Footer() {
  const Fecha = new Date().getFullYear();

  return (    
    <footer className="site-footer">
      <div className="footer-grid">
        <section className="footer-block">
          <h3>Concesionario Elite Motors</h3>
          <p>
            Vehiculos premium seleccionados, asesoramiento personalizado y
            financiacion adaptada para cada cliente.
          </p>
        </section>

        <section className="footer-block">
          <h4>Navegacion</h4>
          <div className="footer-links">
            <Link to="/">Inicio</Link>
            <Link to="/catalogo">Catalogo</Link>
            <Link to="/catalogo?categoria=Electrico">Electricos</Link>
            <Link to="/admin">Panel admin</Link>
          </div>
        </section>

        <section className="footer-block">
          <h4>Contacto</h4>
          <p>Avenida del Motor 245, Madrid</p>
          <p>+34 911 234 567</p>
          <p>info@elitemotors.com</p>
        </section>

        <section className="footer-block">
          <h4>Horario</h4>
          <p>Lun - Vie: 09:00 - 20:00</p>
          <p>Sabado: 10:00 - 14:00</p>
          <p>Domingo: Cerrado</p>
        </section>
      </div>

      <div className="footer-bottom">
        <p>
          © {Fecha} Concesionario de Vehiculos. Todos los derechos
          reservados.
        </p>
        <div className="footer-legal-links">
          <a href="#">Privacidad</a>
          <a href="#">Cookies</a>
          <a href="#">Terminos</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
