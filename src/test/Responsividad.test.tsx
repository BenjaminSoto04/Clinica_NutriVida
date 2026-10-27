import {
  describe,
  it,
  expect,
  beforeEach,
} from "vitest";

import {
  render,
} from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";

import Servicios from "../paginas/Servicios";

describe("Responsividad con Bootstrap", () => {

  beforeEach(() => {
    localStorage.clear();
  });

  it("utiliza clases responsivas para mostrar las tarjetas de servicios", () => {

    const { container } = render(
      <MemoryRouter>
        <Servicios />
      </MemoryRouter>
    );

    const contenedorTarjetas = container.querySelector(
      ".row.row-cols-1"
    );

    expect(contenedorTarjetas).not.toBeNull();

    expect(contenedorTarjetas).toHaveClass(
      "row-cols-1"
    );

    expect(contenedorTarjetas).toHaveClass(
      "row-cols-md-2"
    );

    expect(contenedorTarjetas).toHaveClass(
      "row-cols-lg-3"
    );

  });

});