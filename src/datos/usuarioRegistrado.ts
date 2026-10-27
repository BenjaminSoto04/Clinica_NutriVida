import type { RolUsuario } from "./usuario";

export interface UsuarioRegistrado {
  id: number;
  nombre: string;
  correo: string;
  rut: string;
  rol: RolUsuario;
  region: string;
  comuna: string;
  direccion: string;
  profesionalId?: number;
  activo: boolean;
}