import { Link, Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function AdminLayout() {
  return (
    <>
      <Header />
      <main className="admin-main">
        <div className="admin-layout">
          <div className="admin-sidebar">
            <h1>Panel de Administración</h1>
            <p>
              Bienvenido al panel de administración. Aquí puedes gestionar los
              vehículos y otras configuraciones del concesionario.
            </p>
          </div>
          <nav className="admin-nav">
            <ul>
              <Link to="/admin/vehiculos">Ver los vehículos</Link>
            </ul>
          </nav>
          <div className="admin-content-wrap">
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default AdminLayout;
