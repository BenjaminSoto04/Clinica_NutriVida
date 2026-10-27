import {
  describe,
  it,
  expect,
  beforeEach,
} from "vitest";

import {
  render,
  screen,
  fireEvent,
} from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";

import Servicios from "../paginas/Servicios";

function renderizarServicios() {
  return render(
    <MemoryRouter>
      <Servicios />
    </MemoryRouter>
  );
}

describe("Catálogo de servicios", () => {

  beforeEach(() => {
    localStorage.clear();
  });

  it("muestra los 18 servicios iniciales", () => {

    renderizarServicios();

    const enlaces = screen.getAllByRole("link", {
      name: "Más información",
    });

    expect(enlaces).toHaveLength(18);

  });

  it("filtra servicios por nombre", () => {

    renderizarServicios();

    const buscador = screen.getByLabelText(
      "Buscar servicio"
    );

    fireEvent.change(buscador, {
      target: {
        value: "Teleconsulta Nutricional",
      },
    });

    expect(
      screen.getByText("Teleconsulta Nutricional")
    ).toBeInTheDocument();

    const enlaces = screen.getAllByRole("link", {
      name: "Más información",
    });

    expect(enlaces).toHaveLength(1);

  });

});