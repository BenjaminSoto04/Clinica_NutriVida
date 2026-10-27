import { useState } from "react";
import { Link } from "react-router-dom";

import type { RolUsuario } from "../datos/usuario";
import type { UsuarioRegistrado } from "../datos/usuarioRegistrado";

import { obtenerUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario, 
  cambiarEstadoUsuario } from "../servicios/usuariosCRUD";
import { profesionales } from "../datos/profesionales";

type FiltroRol = RolUsuario | "Todos";

function AdministrarUsuarios() {

  const [usuarios, setUsuarios] = useState<UsuarioRegistrado[]>(
    () => obtenerUsuarios()
  );

  const [busqueda, setBusqueda] = useState("");

  const [filtroRol, setFiltroRol] = useState<FiltroRol>("Todos");

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [rut, setRut] = useState("");

  const [rol, setRol] = useState<RolUsuario>("Cliente");

  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");
  const [direccion, setDireccion] = useState("");

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const [usuarioEditandoId, setUsuarioEditandoId] = useState<number | null>(null);

  const [profesionalId, setProfesionalId] = useState<number | null>(null);

  const usuariosFiltrados = usuarios.filter((usuario) => {
    const texto = busqueda.trim().toLowerCase();

    const coincideBusqueda =
      usuario.nombre.toLowerCase().includes(texto) ||
      usuario.correo.toLowerCase().includes(texto) ||
      usuario.rut.toLowerCase().includes(texto);

    const coincideRol =
      filtroRol === "Todos" || usuario.rol === filtroRol;

    return coincideBusqueda && coincideRol;
  });

  const registrarUsuario = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMensaje("");
    setError("");

    if (!nombre.trim() || !correo.trim()) {
      setError("Debes completar el nombre y el correo.");
      return;
    }

    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formatoCorreo.test(correo.trim())) {
      setError("Ingresa un correo electrónico válido.");
      return;
    }

    if (rol === "Nutricionista") {
      if (profesionalId === null) {
        setError("Debes seleccionar un profesional.");
        return;
      }

      const profesionalExiste = profesionales.some(
        (profesional) => profesional.id === profesionalId
      );

      if (!profesionalExiste) {
        setError("El profesional seleccionado no existe.");
        return;
      }

      const profesionalAsignado = usuarios.some(
        (usuario) =>
          usuario.id !== usuarioEditandoId &&
          usuario.rol === "Nutricionista" &&
          usuario.profesionalId === profesionalId
      );

      if (profesionalAsignado) {
        setError(
          "Este profesional ya está asociado a otro usuario."
        );
        return;
      }
    }

    const datosUsuario = {
      nombre: nombre.trim(),
      correo: correo.trim().toLowerCase(),
      rut: rut.trim(),
      rol,
      region: region.trim(),
      comuna: comuna.trim(),
      direccion: direccion.trim(),

      profesionalId:
        rol === "Nutricionista" && profesionalId !== null
          ? profesionalId
          : undefined,
    };

    try {
      if (usuarioEditandoId === null) {

        crearUsuario({
          ...datosUsuario,
          activo: true,
        });

        setMensaje("Usuario registrado correctamente.");
      } else {

        actualizarUsuario(
          usuarioEditandoId,
          datosUsuario
        );

        setMensaje("Usuario actualizado correctamente.");
      }

      setUsuarios(obtenerUsuarios());

      limpiarFormulario();

      setMostrarFormulario(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("No fue posible guardar el usuario.");
      }
    }
  };

  const seleccionarUsuario = (usuario: UsuarioRegistrado) => {
    setUsuarioEditandoId(usuario.id);
    setProfesionalId(usuario.profesionalId ?? null);

    setNombre(usuario.nombre);
    setCorreo(usuario.correo);
    setRut(usuario.rut);
    setRol(usuario.rol);

    setRegion(usuario.region);
    setComuna(usuario.comuna);
    setDireccion(usuario.direccion);

    setMensaje("");
    setError("");

    setMostrarFormulario(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const limpiarFormulario = () => {
    setUsuarioEditandoId(null);
    setProfesionalId(null);

    setNombre("");
    setCorreo("");
    setRut("");

    setRol("Cliente");

    setRegion("");
    setComuna("");
    setDireccion("");

    setError("");
  };

  const handleEliminarUsuario = (id: number) => {

    const confirmar = window.confirm(
      "¿Estás seguro de que deseas eliminar este usuario?"
    );

    if (!confirmar) {
      return;
    }

    try {
      eliminarUsuario(id);

      setUsuarios(obtenerUsuarios());

      if (usuarioEditandoId === id) {
        limpiarFormulario();
        setMostrarFormulario(false);
      }

      setError("");
      setMensaje("Usuario eliminado correctamente.");

    } catch (err) {
      setMensaje("");

      setError(
        err instanceof Error
          ? err.message
          : "No fue posible eliminar el usuario."
      );
    }
  };

  const handleCambiarEstado = (
    id: number,
    estadoActual: boolean
  ) => {
    const nuevoEstado = !estadoActual;

    const accion = nuevoEstado
      ? "activar"
      : "desactivar";

    const confirmar = window.confirm(
      `¿Deseas ${accion} este usuario?`
    );

    if (!confirmar) {
      return;
    }

    try {
      cambiarEstadoUsuario(id, nuevoEstado);

      setUsuarios(obtenerUsuarios());

      setError("");

      setMensaje(
        nuevoEstado
          ? "Usuario activado correctamente."
          : "Usuario desactivado correctamente."
      );

    } catch (err) {
      setMensaje("");

      setError(
        err instanceof Error
          ? err.message
          : "No fue posible cambiar el estado."
      );
    }
  };

  return (
    <section className="container my-5">

      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h1 className="text-success fw-bold">
            Administración de Usuarios
          </h1>

          <p className="text-secondary mb-0">
            Consulta y administra los usuarios registrados
            en Clínica NutriVida.
          </p>
        </div>

        <div className="d-flex flex-wrap gap-2">
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              if (mostrarFormulario) {
                limpiarFormulario();
                setMostrarFormulario(false);
              } else {
                limpiarFormulario();
                setMensaje("");
                setMostrarFormulario(true);
              }
            }}
          >
            {mostrarFormulario
              ? "Cerrar formulario"
              : "Registrar usuario"}
          </button>

          <Link to="/admin" className="btn btn-outline-success">
            Volver al panel
          </Link>
        </div>
      </div>

      {mensaje && (
        <div className="alert alert-success" role="status">
          {mensaje}
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {mostrarFormulario && (
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body">
            <h2 className="fs-4 text-success mb-4">
              {usuarioEditandoId === null
                ? "Registrar nuevo usuario"
                : "Editar usuario"}
            </h2>

            <form onSubmit={registrarUsuario}>
              <div className="row g-3">

                <div className="col-12 col-md-6">
                  <label htmlFor="nombreNuevo" className="form-label">
                    Nombre completo
                  </label>

                  <input
                    id="nombreNuevo"
                    type="text"
                    className="form-control"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label htmlFor="correoNuevo" className="form-label">
                    Correo electrónico
                  </label>

                  <input
                    id="correoNuevo"
                    type="email"
                    className="form-control"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label htmlFor="rutNuevo" className="form-label">
                    RUT
                  </label>

                  <input
                    id="rutNuevo"
                    type="text"
                    className="form-control"
                    placeholder="12345678-5"
                    value={rut}
                    onChange={(e) => setRut(e.target.value)}
                  />
                  <small className="text-secondary">
                    Ingresa el RUT con su dígito verificador.
                    Ejemplo: 12345678-5.
                  </small>
                </div>

                <div className="col-12 col-md-6">
                  <label htmlFor="rolNuevo" className="form-label">
                    Rol
                  </label>

                  <select
                    id="rolNuevo"
                    className="form-select"
                    value={rol}
                    onChange={(e) => {
                      const nuevoRol = e.target.value as RolUsuario;

                      setRol(nuevoRol);

                      if (nuevoRol !== "Nutricionista") {
                        setProfesionalId(null);
                      }
                    }}
                  >
                    <option value="Cliente">Cliente</option>

                    <option value="Nutricionista">
                      Nutricionista
                    </option>

                    <option value="Administrador">
                      Administrador
                    </option>
                  </select>
                </div>

                {rol === "Nutricionista" && (
                  <div className="col-12 col-md-6">
                    <label
                      htmlFor="profesionalNuevo"
                      className="form-label"
                    >
                      Profesional asociado
                    </label>

                    <select
                      id="profesionalNuevo"
                      className="form-select"
                      value={profesionalId ?? ""}
                      onChange={(e) =>
                        setProfesionalId(
                          e.target.value === ""
                            ? null
                            : Number(e.target.value)
                        )
                      }
                      required
                    >
                      <option value="">
                        Selecciona un profesional
                      </option>

                      {profesionales.map((profesional) => (
                        <option
                          key={profesional.id}
                          value={profesional.id}
                        >
                          {profesional.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="col-12 col-md-6">
                  <label htmlFor="regionNueva" className="form-label">
                    Región
                  </label>

                  <input
                    id="regionNueva"
                    type="text"
                    className="form-control"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label htmlFor="comunaNueva" className="form-label">
                    Comuna
                  </label>

                  <input
                    id="comunaNueva"
                    type="text"
                    className="form-control"
                    value={comuna}
                    onChange={(e) => setComuna(e.target.value)}
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="direccionNueva" className="form-label">
                    Dirección
                  </label>

                  <input
                    id="direccionNueva"
                    type="text"
                    className="form-control"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                  />
                </div>

                <div className="col-12 d-flex gap-2">
                  <button type="submit" className="btn btn-success">
                    {usuarioEditandoId === null
                      ? "Registrar usuario"
                      : "Guardar cambios"}
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      limpiarFormulario();
                      setMostrarFormulario(false);
                    }}
                  >
                    Cancelar
                  </button>
                </div>

              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <div className="row g-3">

            <div className="col-12 col-md-8">
              <label
                htmlFor="buscarUsuario"
                className="form-label fw-semibold"
              >
                Buscar usuario
              </label>

              <input
                id="buscarUsuario"
                type="search"
                className="form-control"
                placeholder="Nombre, correo o RUT"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>

            <div className="col-12 col-md-4">
              <label
                htmlFor="filtrarRol"
                className="form-label fw-semibold"
              >
                Filtrar por rol
              </label>

              <select
                id="filtrarRol"
                className="form-select"
                value={filtroRol}
                onChange={(e) =>
                  setFiltroRol(e.target.value as FiltroRol)
                }
              >
                <option value="Todos">Todos</option>
                <option value="Administrador">
                  Administrador
                </option>
                <option value="Nutricionista">
                  Nutricionista
                </option>
                <option value="Cliente">Cliente</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <p className="text-secondary">
        Usuarios encontrados:{" "}
        <strong>{usuariosFiltrados.length}</strong>
      </p>

      <div className="card shadow-sm border-0">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-success">
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>RUT</th>
                  <th>Rol</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {usuariosFiltrados.length > 0 ? (
                  usuariosFiltrados.map((usuario) => (
                    <tr key={usuario.id}>
                      <td>{usuario.id}</td>

                      <td>{usuario.nombre}</td>

                      <td>{usuario.correo}</td>

                      <td>{usuario.rut || "No registrado"}</td>

                      <td>
                        <span className="badge bg-primary">
                          {usuario.rol}
                        </span>
                      </td>

                      <td>
                        <span
                          className={
                            usuario.activo
                              ? "badge bg-success"
                              : "badge bg-secondary"
                          }
                        >
                          {usuario.activo
                            ? "Activo"
                            : "Inactivo"}
                        </span>
                      </td>

                      <td>
                        <div className="d-flex flex-wrap gap-2">

                          <button
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => seleccionarUsuario(usuario)}
                          >
                            Editar
                          </button>

                          <button
                            type="button"
                            className={
                              usuario.activo
                                ? "btn btn-outline-warning btn-sm"
                                : "btn btn-outline-success btn-sm"
                            }
                            onClick={() =>
                              handleCambiarEstado(
                                usuario.id,
                                usuario.activo
                              )
                            }
                          >
                            {usuario.activo ? "Desactivar" : "Activar"}
                          </button>

                          <button
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={() =>
                              handleEliminarUsuario(usuario.id)
                            }
                          >
                            Eliminar
                          </button>

                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center text-secondary py-4"
                    >
                      No se encontraron usuarios.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdministrarUsuarios;