import { Navigate, Outlet } from "react-router-dom";

import type { RolUsuario } from "../../datos/usuario";

import {
  obtenerSesionDemo,
} from "../../servicios/autenticacionDemo";

interface RutaProtegidaProps {
  rolPermitido: RolUsuario;
}

function RutaProtegida({
  rolPermitido,
}: RutaProtegidaProps) {

  const usuario = obtenerSesionDemo();

  if (!usuario || usuario.rol !== rolPermitido) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default RutaProtegida;