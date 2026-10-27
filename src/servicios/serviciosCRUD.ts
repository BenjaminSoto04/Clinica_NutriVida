import {
  servicios as serviciosIniciales,
  type Servicio,
} from "../datos/servicios";

const CLAVE_STORAGE = "nutrivida_servicios";

export function obtenerServicios(): Servicio[] {
  const datosGuardados = localStorage.getItem(CLAVE_STORAGE);

  if (datosGuardados !== null) {
    try {
      const datos = JSON.parse(datosGuardados);

      if (Array.isArray(datos)) {
        return datos as Servicio[];
      }
    } catch {
      console.error("Error al leer los servicios guardados");
    }
  }

  return [...serviciosIniciales];
}

function guardarServicios(servicios: Servicio[]): void {
  localStorage.setItem(
    CLAVE_STORAGE,
    JSON.stringify(servicios)
  );
}

export function crearServicio(
  nuevoServicio: Servicio
): void {
  const servicios = obtenerServicios();

  if (servicios.some((s) => s.id === nuevoServicio.id)) {
    throw new Error("Ya existe un servicio con ese ID");
  }

  guardarServicios([...servicios, nuevoServicio]);
}

export function actualizarServicio(
  servicioActualizado: Servicio
): void {
  const servicios = obtenerServicios();

  if (!servicios.some((s) => s.id === servicioActualizado.id)) {
    throw new Error("El servicio no existe");
  }

  const actualizados = servicios.map((servicio) =>
    servicio.id === servicioActualizado.id
      ? servicioActualizado
      : servicio
  );

  guardarServicios(actualizados);
}

export function eliminarServicio(id: number): void {
  const servicios = obtenerServicios();

  const actualizados = servicios.filter(
    (servicio) => servicio.id !== id
  );

  if (actualizados.length === servicios.length) {
    throw new Error("El servicio no existe");
  }

  guardarServicios(actualizados);
}