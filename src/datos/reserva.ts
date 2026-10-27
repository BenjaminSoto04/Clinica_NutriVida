export interface Reserva {
  id: number;
  rut: string;
  servicioId: number;
  profesionalId: number;
  fecha: string;
  hora: string;
  estado: "Confirmada" | "Cancelada" | "Atendido";
}