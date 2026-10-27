import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark navCustom">
        <div className="container-fluid">

          <Link className="navbar-brand" to="/">
            NutriVida
          </Link>

          <div className="navbar-nav mx-auto">
            <Link className="nav-link" to="/nosotros">
              Nosotros
            </Link>

            <Link className="nav-link" to="/profesionales">
              Profesionales
            </Link>

            <Link className="nav-link" to="/reservas">
              Reserva hora
            </Link>

            <Link className="nav-link" to="/contactanos">
              Contáctanos
            </Link>

            <Link className="nav-link" to="/servicios">
              Servicios
            </Link>

            <Link className="nav-link" to="/blog">
              Blog
            </Link>
          </div>

          <Link className="btn btn-light" to="/login">
            Mi portal
          </Link>

        </div>
      </nav>
    </header>
  );
}

export default Navbar;