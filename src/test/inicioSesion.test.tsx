
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

import InicioSesion from "../paginas/InicioSesion";

function renderizarLogin() {
  return render(
    <MemoryRouter>
      <InicioSesion />
    </MemoryRouter>
  );
}

describe("InicioSesion", () => {

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it("muestra el formulario de inicio de sesión", () => {

    renderizarLogin();

    expect(
      screen.getByRole("heading", {
        name: /iniciar sesión/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /ingresar/i,
      })
    ).toBeInTheDocument();

  });

  it("solicita el correo cuando está vacío", () => {

    renderizarLogin();

    fireEvent.click(
      screen.getByRole("button", {
        name: /ingresar/i,
      })
    );

    expect(
      screen.getByText(
        "Debes ingresar tu correo electrónico."
      )
    ).toBeInTheDocument();

  });

});