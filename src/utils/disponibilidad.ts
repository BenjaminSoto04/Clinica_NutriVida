import { obtenerReservas } from "../servicios/reservasCRUD";

interface HorarioProfesional {
  profesionalId: number;
  dias: number[];
  horaInicio: string;
  horaFin: string;
}

const horarios: HorarioProfesional[] = [
  {
    profesionalId: 1,
    dias: [1, 2, 3, 4],
    horaInicio: "09:00",
    horaFin: "14:00",
  },
  {
    profesionalId: 2,
    dias: [2, 3, 4, 5],
    horaInicio: "14:00",
    horaFin: "19:30",
  },
  {
    profesionalId: 3,
    dias: [1, 3, 5],
    horaInicio: "10:00",
    horaFin: "16:00",
  },
  {
    profesionalId: 4,
    dias: [1, 2, 3, 4, 5],
    horaInicio: "09:00",
    horaFin: "13:00",
  },
];

const horasBase = [
  "09:00",
  "10:00",
  "11:00",
  "15:00",
  "16:00",
];

export function obtenerHorasDisponibles(
  profesionalId: number,
  fecha: string
): string[] {

  if (!profesionalId || !fecha) {
    return [];
  }

  const horario = horarios.find(
    (item) => item.profesionalId === profesionalId
  );

  if (!horario) {
    return [];
  }

  const fechaSeleccionada = new Date(`${fecha}T12:00:00`);

  if (Number.isNaN(fechaSeleccionada.getTime())) {
    return [];
  }

  const diaSemana = fechaSeleccionada.getDay();

  if (!horario.dias.includes(diaSemana)) {
    return [];
  }

  const reservas = obtenerReservas();

  return horasBase.filter((hora) => {

    const dentroDelHorario =
      hora >= horario.horaInicio &&
      hora < horario.horaFin;

    const ocupada = reservas.some(
      (reserva) =>
        reserva.profesionalId === profesionalId &&
        reserva.fecha === fecha &&
        reserva.hora === hora &&
        reserva.estado === "Confirmada"
    );

    return dentroDelHorario && !ocupada;
  });
}