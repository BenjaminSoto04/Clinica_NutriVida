import {
  describe,
  it,
  expect,
  beforeEach,
} from "vitest";

import {
  obtenerUsuarios,
  crearUsuario,
} from "../servicios/usuariosCRUD";

describe("CRUD de usuarios", () => {

  beforeEach(() => {
    localStorage.clear();
  });

  it("registra un usuario nuevo", () => {

    const usuario = crearUsuario({
      nombre: "Benjamín Prueba",
      correo: "benjamin@test.cl",
      rut: "",
      rol: "Cliente",
      region: "Metropolitana",
      comuna: "Santiago",
      direccion: "Dirección de prueba",
      activo: true,
    });

    expect(usuario.id).toBeGreaterThan(0);

    const usuarios = obtenerUsuarios();

    expect(
      usuarios.some(
        (item) => item.correo === "benjamin@test.cl"
      )
    ).toBe(true);

  });

  it("rechaza correos electrónicos duplicados", () => {

    crearUsuario({
      nombre: "Primer Usuario",
      correo: "duplicado@test.cl",
      rut: "",
      rol: "Cliente",
      region: "",
      comuna: "",
      direccion: "",
      activo: true,
    });

    expect(() => {
      crearUsuario({
        nombre: "Segundo Usuario",
        correo: "duplicado@test.cl",
        rut: "",
        rol: "Cliente",
        region: "",
        comuna: "",
        direccion: "",
        activo: true,
      });
    }).toThrow("El correo ya está registrado.");

  });

});