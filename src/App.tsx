import { Routes, Route } from "react-router-dom";

import Navbar from "./componentes/organismos/Navbar";
import Footer from "./componentes/organismos/Footer";
import Inicio from "./paginas/Inicio";
import Nosotros from "./paginas/Nosotros";
import Profesionales from "./paginas/Profesionales";
import Servicios from "./paginas/Servicios";
import DetalleServicios from "./paginas/DetalleServicios";
import AdministrarServicios from "./paginas/AdministrarServicios";
import ReservasHoras from "./paginas/Reservas-Horas";
import AdministrarReservas from "./paginas/AdministrarReservas";
import Contactanos from "./paginas/Contactanos";
import Blog from "./paginas/Blog";
import InicioSesion from "./paginas/InicioSesion";
import RegistroUsuario from "./paginas/RegistroUsuario";
import Usuario from "./paginas/Usuario";
import Nutricionista from "./paginas/Nutricionista";
import Admin from "./paginas/Admin";
import RutaProtegida from "./componentes/organismos/RutaProtegida";
import AdministrarUsuarios from "./paginas/AdministrarUsuarios";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="flex-grow-1">
        <Routes>
          <Route 
            path="/" 
            element={<Inicio />} 
          />

          <Route 
            path="/nosotros" 
            element={<Nosotros />} 
          />

          <Route
            path="/profesionales"
            element={<Profesionales />}
          />

          <Route
            path="/reservas"
            element={<ReservasHoras />}
          />

          <Route
            path="/contactanos"
            element={<Contactanos />}
          />

          <Route 
            path="/servicios" 
            element={<Servicios />} 
          />

          <Route
            path="/servicios/:id"
            element={<DetalleServicios />}
          />

          <Route
            path="/blog"
            element={<Blog />}
          />

          <Route
            path="/login"
            element={<InicioSesion />}
          />

          <Route
            path="/registro"
            element={<RegistroUsuario />}
          />

          <Route 
            path="/usuario" 
            element={<Usuario />} 
          />

          <Route
            path="/nutricionista"
            element={<Nutricionista />}
          />

          <Route
            element={<RutaProtegida rolPermitido="Administrador" />}
          >
            <Route 
              path="/admin" 
              element={<Admin />} 
            />

            <Route
              path="/admin/servicios"
              element={<AdministrarServicios />}
            />

            <Route
              path="/admin/reservas"
              element={<AdministrarReservas />}
            />

            <Route
              path="/admin/usuarios"
              element={<AdministrarUsuarios />}
            />
          </Route>

        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;