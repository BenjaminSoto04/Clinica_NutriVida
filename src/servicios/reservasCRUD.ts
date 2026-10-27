
import type { Reserva } from "../datos/reserva";

const CLAVE_RESERVAS = "nutrivida_reservas";

export function obtenerReservas(): Reserva[] {
  const datos = localStorage.getItem(CLAVE_RESERVAS);

  if (!datos) {
    return [];
  }

  try {
    const reservas = JSON.parse(datos);
    return Array.isArray(reservas) ? reservas as Reserva[] : [];
  } catch {
    return [];
  }
}

export function crearReserva(
  nuevaReserva: Reserva
): void {
  const reservas = obtenerReservas();

  const horarioOcupado = reservas.some(
    (reserva) =>
      reserva.profesionalId === nuevaReserva.profesionalId &&
      reserva.fecha === nuevaReserva.fecha &&
      reserva.hora === nuevaReserva.hora &&
      reserva.estado === "Confirmada"
  );

  if (horarioOcupado) {
    throw new Error(
      "El profesional ya tiene una reserva en ese horario."
    );
  }

  reservas.push(nuevaReserva);

  localStorage.setItem(
    CLAVE_RESERVAS,
    JSON.stringify(reservas)
  );
}

export function cancelarReserva(id: number): void {
  const reservas = obtenerReservas();

  const reservaExiste = reservas.some(
    (reserva) => reserva.id === id
  );

  if (!reservaExiste) {
    throw new Error("La reserva no existe.");
  }

  const reservasActualizadas = reservas.map((reserva) =>
    reserva.id === id
      ? { ...reserva, estado: "Cancelada" as const }
      : reserva
  );

  localStorage.setItem(
    CLAVE_RESERVAS,
    JSON.stringify(reservasActualizadas)
  );
}

export function completarAtencion(id: number): void {
  const reservas = obtenerReservas();

  const reserva = reservas.find(
    (item) => item.id === id
  );

  if (!reserva) {
    throw new Error("La reserva no existe.");
  }

  if (reserva.estado !== "Confirmada") {
    throw new Error(
      "Solo se pueden completar reservas confirmadas."
    );
  }

  const reservasActualizadas = reservas.map((item) =>
    item.id === id
      ? { ...item, estado: "Atendido" as const }
      : item
  );

  localStorage.setItem(
    CLAVE_RESERVAS,
    JSON.stringify(reservasActualizadas)
  );
}