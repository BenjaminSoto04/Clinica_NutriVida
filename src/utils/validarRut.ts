export function validarRut(rut: string): boolean {
  const rutLimpio = rut
    .replace(/\./g, "")
    .replace(/-/g, "")
    .trim()
    .toUpperCase();

  if (!/^[0-9]{7,8}[0-9K]$/.test(rutLimpio)) {
    return false;
  }

  const cuerpo = rutLimpio.slice(0, -1);
  const dv = rutLimpio.slice(-1);

  let suma = 0;
  let multiplicador = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const resultado = 11 - (suma % 11);

  const dvEsperado =
    resultado === 11 ? "0" :
    resultado === 10 ? "K" :
    String(resultado);

  return dv === dvEsperado;
}