
import { useState } from "react";
import type { FormEvent } from "react";

import type { Servicio } from "../datos/servicios";

import {
  obtenerServicios,
  crearServicio,
  actualizarServicio,
  eliminarServicio,
} from "../servicios/serviciosCRUD";

function AdministrarServicios() {

  const [listaServicios, setListaServicios] =
    useState<Servicio[]>(() => obtenerServicios());

  const [nombre, setNombre] = useState("");
  const [codigo, setCodigo] = useState("");
  const [tipo, setTipo] = useState("Consulta");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [idEditando, setIdEditando] =
    useState<number | null>(null);

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const limpiarFormulario = () => {
    setNombre("");
    setCodigo("");
    setTipo("Consulta");
    setPrecio("");
    setDescripcion("");
    setIdEditando(null);
  };

  const editarServicio = (servicio: Servicio) => {

    setIdEditando(servicio.id);

    setNombre(servicio.nombre);
    setCodigo(servicio.codigo);
    setTipo(servicio.tipo);
    setPrecio(String(servicio.precio));
    setDescripcion(servicio.descripcion);

    setMensaje("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const guardarServicio = (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    setMensaje("");
    setError("");

    if (!nombre.trim()) {
      setError("Debes ingresar el nombre del servicio.");
      return;
    }

    if (!codigo.trim()) {
      setError("Debes ingresar el código del servicio.");
      return;
    }

    if (
      !precio.trim() ||
      !Number.isFinite(Number(precio)) ||
      Number(precio) <= 0
    ) {
      setError("Debes ingresar un precio válido mayor que cero.");
      return;
    }

    if (!descripcion.trim()) {
      setError("Debes ingresar la descripción del servicio.");
      return;
    }

    const codigoNormalizado = codigo.trim().toUpperCase();

    const codigoExiste = listaServicios.some(
      (servicio) =>
        servicio.codigo.toUpperCase() === codigoNormalizado &&
        servicio.id !== idEditando
    );

    if (codigoExiste) {
      setError("Ya existe un servicio con ese código.");
      return;
    }

    const servicioAnterior = listaServicios.find(
      (servicio) => servicio.id === idEditando
    );

    const nuevoId =
      idEditando ??
      Math.max(0, ...listaServicios.map((s) => s.id)) + 1;

    const nuevoServicio: Servicio = {
      id: nuevoId,
      codigo: codigoNormalizado,
      nombre: nombre.trim(),
      tipo,
      precio: Number(precio),
      descripcion: descripcion.trim(),

      duracion: servicioAnterior?.duracion ?? "30 minutos",
      modalidad: servicioAnterior?.modalidad ?? "Presencial",
      profesional:
        servicioAnterior?.profesional ?? "Nutricionista",
      imagen:
        servicioAnterior?.imagen ?? "/images/primera-consulta.jpg",
    };

    try {

      if (idEditando !== null) {

        actualizarServicio(nuevoServicio);

        setMensaje("Servicio actualizado correctamente.");

      } else {

        crearServicio(nuevoServicio);

        setMensaje("Servicio creado correctamente.");
      }

      setListaServicios(obtenerServicios());

      limpiarFormulario();

    } catch {
      setError("No fue posible guardar el servicio.");
    }
  };

  const borrarServicio = (id: number) => {

    const confirmar = window.confirm(
      "¿Estás seguro de que deseas eliminar este servicio?"
    );

    if (!confirmar) {
      return;
    }

    try {

      eliminarServicio(id);

      setListaServicios(obtenerServicios());

      if (idEditando === id) {
        limpiarFormulario();
      }

      setError("");
      setMensaje("Servicio eliminado correctamente.");

    } catch {
      setMensaje("");
      setError("No fue posible eliminar el servicio.");
    }
  };

  const cancelarEdicion = () => {
    limpiarFormulario();
    setError("");
    setMensaje("");
  };

  return (
    <section className="container my-5">

      <h1 className="text-success text-center mb-4">
        Administración de Servicios
      </h1>

      <div className="card shadow-sm border-0 p-4 mb-5">

        <h2 className="fs-4 text-success mb-3">
          {idEditando !== null
            ? "Editar servicio"
            : "Registrar nuevo servicio"}
        </h2>

        <form onSubmit={guardarServicio} noValidate>

          <div className="row g-3">

            <div className="col-md-6">
              <label
                htmlFor="nombre"
                className="form-label"
              >
                Nombre del servicio
              </label>

              <input
                type="text"
                id="nombre"
                className="form-control"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label
                htmlFor="codigo"
                className="form-label"
              >
                Código
              </label>

              <input
                type="text"
                id="codigo"
                className="form-control"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label
                htmlFor="tipo"
                className="form-label"
              >
                Tipo de servicio
              </label>

              <select
                id="tipo"
                className="form-select"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
              >
                <option value="Consulta">
                  Consulta
                </option>

                <option value="Plan especializado">
                  Plan especializado
                </option>

                <option value="Evaluación">
                  Evaluación
                </option>

                <option value="Taller grupal">
                  Taller grupal
                </option>
              </select>
            </div>

            <div className="col-md-6">
              <label
                htmlFor="precio"
                className="form-label"
              >
                Precio
              </label>

              <input
                type="number"
                id="precio"
                min="1"
                className="form-control"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
              />
            </div>

            <div className="col-12">
              <label
                htmlFor="descripcion"
                className="form-label"
              >
                Descripción
              </label>

              <textarea
                id="descripcion"
                className="form-control"
                rows={3}
                value={descripcion}
                onChange={(e) =>
                  setDescripcion(e.target.value)
                }
              />
            </div>

          </div>

          {error && (
            <div
              className="alert alert-danger mt-3"
              role="alert"
            >
              {error}
            </div>
          )}

          {mensaje && (
            <div
              className="alert alert-success mt-3"
              role="status"
            >
              {mensaje}
            </div>
          )}

          <div className="d-flex gap-2 mt-3">

            <button
              type="submit"
              className="btn btn-success"
            >
              {idEditando !== null
                ? "Actualizar servicio"
                : "Guardar servicio"}
            </button>

            {idEditando !== null && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={cancelarEdicion}
              >
                Cancelar edición
              </button>
            )}

          </div>

        </form>
      </div>

      <h2 className="fs-4 text-success mb-3">
        Servicios registrados ({listaServicios.length})
      </h2>

      <div className="table-responsive">

        <table className="table table-striped table-hover">

          <thead className="table-success">
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>

            {listaServicios.map((servicio) => (

              <tr key={servicio.id}>

                <td>
                  {servicio.codigo}
                </td>

                <td>
                  {servicio.nombre}
                </td>

                <td>
                  {servicio.tipo}
                </td>

                <td>
                  {servicio.precio.toLocaleString("es-CL", {
                    style: "currency",
                    currency: "CLP",
                    maximumFractionDigits: 0,
                  })}
                </td>

                <td>
                  <div className="d-flex gap-2">

                    <button
                      type="button"
                      className="btn btn-warning btn-sm"
                      onClick={() => editarServicio(servicio)}
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => borrarServicio(servicio.id)}
                    >
                      Eliminar
                    </button>

                  </div>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </section>
  );
}

export default AdministrarServicios;