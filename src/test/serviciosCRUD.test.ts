import {
  describe,
  it,
  expect,
  beforeEach,
} from "vitest";

import {
  obtenerServicios,
  crearServicio,
  actualizarServicio,
} from "../servicios/serviciosCRUD";

import type { Servicio } from "../datos/servicios";

const servicioPrueba: Servicio = {
  id: 100,
  codigo: "TEST100",
  tipo: "Consulta",
  nombre: "Consulta Nutricional de Prueba",
  duracion: "30 minutos",
  modalidad: "Presencial",
  profesional: "Nutricionista",
  precio: 15000,
  descripcion: "Servicio creado para pruebas unitarias.",
  imagen: "/images/primera-consulta.jpg",
};

describe("CRUD de servicios", () => {

  beforeEach(() => {
    localStorage.clear();
  });

  it("crea correctamente un nuevo servicio", () => {

    crearServicio(servicioPrueba);

    const servicios = obtenerServicios();

    expect(servicios).toHaveLength(19);

    const creado = servicios.find(
      (servicio) => servicio.id === 100
    );

    expect(creado).toBeDefined();

    expect(creado?.nombre).toBe(
      "Consulta Nutricional de Prueba"
    );

    expect(creado?.precio).toBe(15000);

  });

  it("actualiza el precio de un servicio existente", () => {

    crearServicio(servicioPrueba);

    const servicioActualizado: Servicio = {
      ...servicioPrueba,
      precio: 25000,
    };

    actualizarServicio(servicioActualizado);

    const actualizado = obtenerServicios().find(
      (servicio) => servicio.id === 100
    );

    expect(actualizado?.precio).toBe(25000);

    expect(obtenerServicios()).toHaveLength(19);

  });

});