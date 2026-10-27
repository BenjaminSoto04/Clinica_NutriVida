import {
  describe,
  it,
  expect,
  beforeEach,
} from "vitest";

import {
  iniciarSesionDemo,
  obtenerSesionDemo,
} from "../servicios/autenticacionDemo";

import {
  obtenerUsuarios,
} from "../servicios/usuariosCRUD";

describe("Autenticación de usuarios", () => {

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();

    obtenerUsuarios();
  });

  it("permite iniciar sesión con credenciales correctas", () => {

    const usuario = iniciarSesionDemo(
      "admin@demo.cl",
      "1234"
    );

    expect(usuario).not.toBeNull();

    expect(usuario?.rol).toBe("Administrador");

    expect(usuario?.correo).toBe("admin@demo.cl");

  });

  it("rechaza una contraseña incorrecta", () => {

    const usuario = iniciarSesionDemo(
      "admin@demo.cl",
      "contraseña-incorrecta"
    );

    expect(usuario).toBeNull();

    expect(obtenerSesionDemo()).toBeNull();

  });

});