
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";

import AdministrarUsuarios from "../paginas/AdministrarUsuarios";

function renderizarPagina() {
  return render(
    <MemoryRouter>
      <AdministrarUsuarios />
    </MemoryRouter>
  );
}

describe("Administración de usuarios", () => {

  beforeEach(() => {
    localStorage.clear();
  });

  it("permite editar el nombre de un usuario", () => {

    const scrollToMock = vi
      .spyOn(window, "scrollTo")
      .mockImplementation(() => {});

    try {
      renderizarPagina();

      const filaUsuario = screen
        .getByText("Usuario Prueba")
        .closest("tr");

      expect(filaUsuario).not.toBeNull();

      fireEvent.click(
        within(filaUsuario as HTMLElement).getByRole(
          "button",
          { name: "Editar" }
        )
      );

      fireEvent.change(
        screen.getByLabelText("Nombre completo"),
        {
          target: {
            value: "Usuario Actualizado",
          },
        }
      );

      fireEvent.click(
        screen.getByRole("button", {
          name: "Guardar cambios",
        })
      );

      expect(
        screen.getByText(
          "Usuario actualizado correctamente."
        )
      ).toBeInTheDocument();

      expect(
        screen.getByText("Usuario Actualizado")
      ).toBeInTheDocument();

      expect(
        screen.queryByText("Usuario Prueba")
      ).not.toBeInTheDocument();

    } finally {
      scrollToMock.mockRestore();
    }

  });

  it("permite eliminar un usuario desde la tabla", () => {

    const confirmarMock = vi
      .spyOn(window, "confirm")
      .mockReturnValue(true);

    try {
      renderizarPagina();

      const filaUsuario = screen
        .getByText("Usuario Prueba")
        .closest("tr");

      expect(filaUsuario).not.toBeNull();

      fireEvent.click(
        within(filaUsuario as HTMLElement).getByRole(
          "button",
          { name: "Eliminar" }
        )
      );

      expect(confirmarMock).toHaveBeenCalledOnce();

      expect(
        screen.getByText(
          "Usuario eliminado correctamente."
        )
      ).toBeInTheDocument();

      expect(
        screen.queryByText("Usuario Prueba")
      ).not.toBeInTheDocument();

    } finally {
      confirmarMock.mockRestore();
    }

  });

});