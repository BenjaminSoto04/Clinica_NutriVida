import type { UsuarioSesion } from "../datos/usuario";
import type { UsuarioRegistrado } from "../datos/usuarioRegistrado";

import { obtenerUsuarios } from "./usuariosCRUD";

interface CuentaDemo {
  correo: string;
  clave: string;
}

const cuentasDemo: CuentaDemo[] = [
  {
    correo: "admin@demo.cl",
    clave: "1234",
  },
  {
    correo: "usuario@demo.cl",
    clave: "5678",
  },
  {
    correo: "carolina@demo.cl",
    clave: "2468",
  },
];

const CLAVE_SESION = "nutrivida_sesion_demo";

function convertirASesion(
  usuario: UsuarioRegistrado
): UsuarioSesion {
  return {
    nombre: usuario.nombre,
    correo: usuario.correo,
    rol: usuario.rol,
    rut: usuario.rut,
    region: usuario.region,
    comuna: usuario.comuna,
    direccion: usuario.direccion,
    profesionalId: usuario.profesionalId,
  };
}

export function iniciarSesionDemo(
  correo: string,
  clave: string
): UsuarioSesion | null {
  const correoNormalizado = correo.trim().toLowerCase();

  const cuenta = cuentasDemo.find(
    (item) =>
      item.correo === correoNormalizado &&
      item.clave === clave
  );

  if (!cuenta) {
    return null;
  }

  const usuarioRegistrado = obtenerUsuarios().find(
    (usuario) =>
      usuario.correo.toLowerCase() === correoNormalizado
  );

  if (!usuarioRegistrado || !usuarioRegistrado.activo) {
    return null;
  }

  const sesion = convertirASesion(usuarioRegistrado);

  sessionStorage.setItem(
    CLAVE_SESION,
    JSON.stringify(sesion)
  );

  return sesion;
}

export function obtenerSesionDemo(): UsuarioSesion | null {
  const datos = sessionStorage.getItem(CLAVE_SESION);

  if (!datos) {
    return null;
  }

  try {
    const sesionGuardada: unknown = JSON.parse(datos);

    if (
      typeof sesionGuardada !== "object" ||
      sesionGuardada === null ||
      !("correo" in sesionGuardada) ||
      typeof sesionGuardada.correo !== "string"
    ) {
      cerrarSesionDemo();
      return null;
    }

    const correoSesion = sesionGuardada.correo
      .trim()
      .toLowerCase();

    const usuarioRegistrado = obtenerUsuarios().find(
      (usuario) =>
        usuario.correo.toLowerCase() === correoSesion
    );

    if (!usuarioRegistrado || !usuarioRegistrado.activo) {
      cerrarSesionDemo();
      return null;
    }

    const sesionActualizada = convertirASesion(
      usuarioRegistrado
    );

    sessionStorage.setItem(
      CLAVE_SESION,
      JSON.stringify(sesionActualizada)
    );

    return sesionActualizada;
  } catch {
    cerrarSesionDemo();
    return null;
  }
}

export function cerrarSesionDemo(): void {
  sessionStorage.removeItem(CLAVE_SESION);
}