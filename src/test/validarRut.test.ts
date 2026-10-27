import { describe, expect, it } from "vitest";
import { validarRut } from "../utils/validarRut";

describe("Validación de RUT", () => {

  it("valida correctamente el dígito verificador de un RUT", () => {

    const rutValido = "31671924-4";

    const rutInvalido = "31671924-8";

    expect(validarRut(rutValido)).toBe(true);

    expect(validarRut(rutInvalido)).toBe(false);

  });

});