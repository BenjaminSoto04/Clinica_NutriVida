import {
  describe,
  it,
  expect,
} from "vitest";

import {
  render,
  screen,
} from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";

import TarjetaServicioCatalogo from
  "../componentes/moleculas/TarjetaServicioCatalogo";

import type { Servicio } from "../datos/servicios";

describe("Tarjeta de servicio", () => {

  it("muestra correctamente los datos recibidos mediante props", () => {

    const servicioPrueba: Servicio = {
      id: 100,
      codigo: "TEST100",
      tipo: "Consulta",
      nombre: "Consulta Nutricional de Prueba",
      duracion: "30 minutos",
      modalidad: "Presencial",
      profesional: "Nutricionista",
      precio: 15000,
      descripcion: "Servicio de prueba.",
      imagen: "/images/primera-consulta.jpg",
    };

    render(
      <MemoryRouter>
        <TarjetaServicioCatalogo
          servicio={servicioPrueba}
        />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", {
        name: "Consulta Nutricional de Prueba",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText("Consulta")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Presencial")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("img", {
        name: "Consulta Nutricional de Prueba",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", {
        name: "Más información",
      })
    ).toHaveAttribute("href", "/servicios/100");

  });

});