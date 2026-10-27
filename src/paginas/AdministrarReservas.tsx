import { useState } from "react";

import type { Reserva } from "../datos/reserva";
import { profesionales } from "../datos/profesionales";

import { obtenerServicios } from "../servicios/serviciosCRUD";

import {
  obtenerReservas,
  cancelarReserva,
} from "../servicios/reservasCRUD";

function AdministrarReservas() {

  const [reservas, setReservas] = useState<Reserva[]>(
    () => obtenerReservas()
  );

  const [busqueda, setBusqueda] = useState("");
  const [estado, setEstado] = useState("Todos");
  const [profesionalId, setProfesionalId] = useState("Todos");

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const servicios = obtenerServicios();

  const obtenerNombreServicio = (id: number): string => {
    const servicio = servicios.find((item) => item.id === id);

    return servicio?.nombre ?? "Servicio no disponible";
  };

  const obtenerNombreProfesional = (id: number): string => {
    const profesional = profesionales.find(
      (item) => item.id === id
    );

    return profesional?.nombre ?? "Profesional no disponible";
  };

  const reservasFiltradas = reservas.filter((reserva) => {

    const rutNormalizado = reserva.rut.replace(/[^0-9K]/gi, "");

    const busquedaNormalizada = busqueda
      .replace(/[^0-9K]/gi, "")
      .toUpperCase();

    const coincideRut = rutNormalizado.includes(
      busquedaNormalizada
    );

    const coincideEstado =
      estado === "Todos" ||
      reserva.estado === estado;

    const coincideProfesional =
      profesionalId === "Todos" ||
      reserva.profesionalId === Number(profesionalId);

    return (
      coincideRut &&
      coincideEstado &&
      coincideProfesional
    );
  });

  const handleCancelarReserva = (id: number) => {

    const confirmar = window.confirm(
      "¿Deseas cancelar esta reserva?"
    );

    if (!confirmar) {
      return;
    }

    try {
      cancelarReserva(id);

      setReservas(obtenerReservas());

      setMensaje("Reserva cancelada correctamente.");
      setError("");

    } catch (err) {
      setMensaje("");

      setError(
        err instanceof Error
          ? err.message
          : "No fue posible cancelar la reserva."
      );
    }
  };

  const limpiarFiltros = () => {
    setBusqueda("");
    setEstado("Todos");
    setProfesionalId("Todos");
  };

  return (
    <section className="container my-5">

      <h1 className="text-success text-center mb-4">
        Administración de Reservas
      </h1>

      <div className="card p-4 shadow-sm border-0 mb-4">

        <h2 className="fs-5 text-success mb-3">
          Buscar reservas
        </h2>

        <div className="row g-3">

          <div className="col-12 col-md-4">

            <label
              htmlFor="buscarRut"
              className="form-label"
            >
              RUT del paciente
            </label>

            <input
              type="text"
              id="buscarRut"
              className="form-control"
              placeholder="Buscar por RUT..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />

          </div>

          <div className="col-12 col-md-4">

            <label
              htmlFor="filtrarEstado"
              className="form-label"
            >
              Estado
            </label>

            <select
              id="filtrarEstado"
              className="form-select"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            >
              <option value="Todos">Todos</option>
              <option value="Confirmada">Confirmada</option>
              <option value="Cancelada">Cancelada</option>
            </select>

          </div>

          <div className="col-12 col-md-4">

            <label
              htmlFor="filtrarProfesional"
              className="form-label"
            >
              Profesional
            </label>

            <select
              id="filtrarProfesional"
              className="form-select"
              value={profesionalId}
              onChange={(e) =>
                setProfesionalId(e.target.value)
              }
            >

              <option value="Todos">
                Todos
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

        </div>

        <div className="text-end mt-3">

          <button
            type="button"
            className="btn btn-outline-success"
            onClick={limpiarFiltros}
          >
            Limpiar filtros
          </button>

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

      <h2 className="fs-4 text-success mb-3">
        Reservas encontradas: {reservasFiltradas.length}
      </h2>

      <div className="table-responsive">

        <table className="table table-striped table-hover">

          <thead className="table-success">
            <tr>
              <th>RUT</th>
              <th>Servicio</th>
              <th>Profesional</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>

            {reservasFiltradas.map((reserva) => (

              <tr key={reserva.id}>

                <td>{reserva.rut}</td>

                <td>
                  {obtenerNombreServicio(reserva.servicioId)}
                </td>

                <td>
                  {obtenerNombreProfesional(reserva.profesionalId)}
                </td>

                <td>{reserva.fecha}</td>

                <td>{reserva.hora}</td>

                <td>
                  <span
                    className={
                      reserva.estado === "Confirmada"
                        ? "badge bg-success"
                        : "badge bg-secondary"
                    }
                  >
                    {reserva.estado}
                  </span>
                </td>

                <td>

                  {reserva.estado === "Confirmada" ? (

                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        handleCancelarReserva(reserva.id)
                      }
                    >
                      Cancelar
                    </button>

                  ) : (

                    <span className="text-secondary">
                      Sin acciones
                    </span>

                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        {reservasFiltradas.length === 0 && (
          <div className="alert alert-info text-center">
            No se encontraron reservas.
          </div>
        )}

      </div>

    </section>
  );
}

export default AdministrarReservas;