import type { UsuarioRegistrado } from "../datos/usuarioRegistrado";
import { validarRut } from "../utils/validarRut";

const CLAVE_USUARIOS = "nutrivida_usuarios";
const CLAVE_MIGRACION = "nutrivida_usuarios_migracion_demo_v2";

const usuariosIniciales: UsuarioRegistrado[] = [
  {
    id: 1,
    nombre: "Administrador NutriVida",
    correo: "admin@demo.cl",
    rut: "",
    rol: "Administrador",
    region: "",
    comuna: "",
    direccion: "",
    activo: true,
  },
  {
    id: 2,
    nombre: "Carolina Fuentes",
    correo: "carolina@demo.cl",
    rut: "",
    rol: "Nutricionista",
    region: "",
    comuna: "",
    direccion: "",
    profesionalId: 1,
    activo: true,
  },
  {
    id: 3,
    nombre: "Usuario Prueba",
    correo: "usuario@demo.cl",
    rut: "",
    rol: "Cliente",
    region: "",
    comuna: "",
    direccion: "",
    activo: true,
  },
];

export function obtenerUsuarios(): UsuarioRegistrado[] {
  const datos = localStorage.getItem(CLAVE_USUARIOS);

  if (!datos) {
    const iniciales = [...usuariosIniciales];

    localStorage.setItem(
      CLAVE_USUARIOS,
      JSON.stringify(iniciales)
    );

    localStorage.setItem(CLAVE_MIGRACION, "completada");

    return iniciales;
  }

  try {
    const usuarios: unknown = JSON.parse(datos);

    if (!Array.isArray(usuarios)) {
      return [];
    }

    const lista = usuarios as UsuarioRegistrado[];

    if (
      localStorage.getItem(CLAVE_MIGRACION) !== "completada"
    ) {
      const existeCuentaDemo = lista.some(
        (usuario) =>
          usuario.correo.toLowerCase() === "usuario@demo.cl"
      );

      if (!existeCuentaDemo) {
        const nuevoId =
          lista.length > 0
            ? Math.max(...lista.map((usuario) => usuario.id)) + 1
            : 1;

        lista.push({
          id: nuevoId,
          nombre: "Usuario Prueba",
          correo: "usuario@demo.cl",
          rut: "",
          rol: "Cliente",
          region: "",
          comuna: "",
          direccion: "",
          activo: true,
        });

        localStorage.setItem(
          CLAVE_USUARIOS,
          JSON.stringify(lista)
        );
      }

      localStorage.setItem(
        CLAVE_MIGRACION,
        "completada"
      );
    }

    return lista;
  } catch {
    return [];
  }
}

function guardarUsuarios(
  usuarios: UsuarioRegistrado[]
): void {
  localStorage.setItem(
    CLAVE_USUARIOS,
    JSON.stringify(usuarios)
  );
}

export function crearUsuario(
  nuevoUsuario: Omit<UsuarioRegistrado, "id">
): UsuarioRegistrado {
  const usuarios = obtenerUsuarios();

  if (
    nuevoUsuario.rut.trim() !== "" &&
    !validarRut(nuevoUsuario.rut)
  ) {
    throw new Error(
      "El RUT ingresado no es válido. Verifica el dígito verificador."
    );
  }

  const correoExiste = usuarios.some(
    (usuario) =>
      usuario.correo.toLowerCase() ===
      nuevoUsuario.correo.toLowerCase()
  );

  if (correoExiste) {
    throw new Error("El correo ya está registrado.");
  }

  const rutExiste =
    nuevoUsuario.rut.trim() !== "" &&
    usuarios.some(
      (usuario) =>
        usuario.rut.replace(/[.\-\s]/g, "").toUpperCase() ===
        nuevoUsuario.rut.replace(/[.\-\s]/g, "").toUpperCase()
    );

  if (rutExiste) {
    throw new Error("El RUT ya está registrado.");
  }

  const nuevoId =
    usuarios.length > 0
      ? Math.max(...usuarios.map((usuario) => usuario.id)) + 1
      : 1;

  const usuarioCreado: UsuarioRegistrado = {
    ...nuevoUsuario,
    id: nuevoId,
  };

  guardarUsuarios([...usuarios, usuarioCreado]);

  return usuarioCreado;
}

export function actualizarUsuario(
  id: number,
  datosActualizados: Partial<
    Omit<UsuarioRegistrado, "id">
  >
): void {
  const usuarios = obtenerUsuarios();

  const usuarioActual = usuarios.find(
    (usuario) => usuario.id === id
  );

  if (!usuarioActual) {
    throw new Error("El usuario no existe.");
  }

  const usuarioModificado: UsuarioRegistrado = {
    ...usuarioActual,
    ...datosActualizados,
  };

  const correosDemo = [
    "admin@demo.cl",
    "usuario@demo.cl",
    "carolina@demo.cl",
    ];

    const correoOriginal = usuarioActual.correo.toLowerCase();

    const correoNuevo = (
    datosActualizados.correo ?? usuarioActual.correo
    ).trim().toLowerCase();

    if (
    correosDemo.includes(correoOriginal) &&
    correoNuevo !== correoOriginal
    ) {
    throw new Error(
        "No puedes modificar el correo de una cuenta de demostración."
    );
  }

  if (
    usuarioModificado.rut.trim() !== "" &&
    !validarRut(usuarioModificado.rut)
  ) {
    throw new Error(
      "El RUT ingresado no es válido. Verifica el dígito verificador."
    );
  }

  const correoDuplicado = usuarios.some(
    (usuario) =>
      usuario.id !== id &&
      usuario.correo.toLowerCase() ===
        usuarioModificado.correo.toLowerCase()
  );

  if (correoDuplicado) {
    throw new Error("El correo ya pertenece a otro usuario.");
  }

  const normalizarRut = (rut: string) =>
    rut.replace(/[.\-\s]/g, "").toUpperCase();

  const rutDuplicado =
    usuarioModificado.rut.trim() !== "" &&
    usuarios.some(
      (usuario) =>
        usuario.id !== id &&
        normalizarRut(usuario.rut) ===
          normalizarRut(usuarioModificado.rut)
    );

  if (rutDuplicado) {
    throw new Error("El RUT ya pertenece a otro usuario.");
  }

  const administradoresRestantes = usuarios.filter(
    (usuario) =>
      (usuario.id === id ? usuarioModificado : usuario).rol ===
        "Administrador" &&
      (usuario.id === id ? usuarioModificado : usuario).activo
  );

  if (administradoresRestantes.length === 0) {
    throw new Error(
      "Debe existir al menos un administrador activo."
    );
  }

  const usuariosActualizados = usuarios.map((usuario) =>
    usuario.id === id ? usuarioModificado : usuario
  );

  localStorage.setItem(
    CLAVE_USUARIOS,
    JSON.stringify(usuariosActualizados)
  );
}

export function eliminarUsuario(id: number): void {
  const usuarios = obtenerUsuarios();

  const usuarioEliminar = usuarios.find(
    (usuario) => usuario.id === id
  );

  if (!usuarioEliminar) {
    throw new Error("El usuario no existe.");
  }

  const usuariosActualizados = usuarios.filter(
    (usuario) => usuario.id !== id
  );

  const administradoresActivos = usuariosActualizados.filter(
    (usuario) =>
      usuario.rol === "Administrador" && usuario.activo
  );

  if (administradoresActivos.length === 0) {
    throw new Error(
      "No puedes eliminar este usuario porque debe existir al menos un administrador activo."
    );
  }

  localStorage.setItem(
    CLAVE_USUARIOS,
    JSON.stringify(usuariosActualizados)
  );
}

export function cambiarEstadoUsuario(
  id: number,
  activo: boolean
): void {
  const usuarios = obtenerUsuarios();

  const usuario = usuarios.find(
    (item) => item.id === id
  );

  if (!usuario) {
    throw new Error("El usuario no existe.");
  }

  actualizarUsuario(id, { activo });
}