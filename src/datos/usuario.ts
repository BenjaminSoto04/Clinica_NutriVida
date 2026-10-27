export type RolUsuario =
  | "Administrador"
  | "Nutricionista"
  | "Cliente";

export interface UsuarioSesion {
  nombre: string;
  correo: string;
  rol: RolUsuario;
  rut?: string;
  region?: string;
  comuna?: string;
  direccion?: string;
  profesionalId?: number;
}