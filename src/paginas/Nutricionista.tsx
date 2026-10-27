import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import type { Reserva } from "../datos/reserva";

import {
  obtenerSesionDemo,
  cerrarSesionDemo,
} from "../servicios/autenticacionDemo";

import {
  obtenerReservas,
  completarAtencion,
  cancelarReserva,
} from "../servicios/reservasCRUD";

import { obtenerServicios } from "../servicios/serviciosCRUD";

function Nutricionista() {

  const navigate = useNavigate();

  const [usuario] = useState(() => obtenerSesionDemo());

  const [reservas, setReservas] = useState<Reserva[]>(
    () => obtenerReservas()
  );

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  if (
    !usuario ||
    usuario.rol !== "Nutricionista" ||
    !usuario.profesionalId
  ) {
    return <Navigate to="/login" replace />;
  }

  const misReservas = reservas
    .filter(
      (reserva) =>
        reserva.profesionalId === usuario.profesionalId
    )
    .sort(
      (a, b) =>
        `${a.fecha}T${a.hora}`.localeCompare(
          `${b.fecha}T${b.hora}`
        )
    );

  const servicios = obtenerServicios();

  const nombreServicio = (id: number): string => {
    const servicio = servicios.find((s) => s.id === id);
    return servicio?.nombre ?? "Servicio no disponible";
  };

  const handleCompletar = (id: number) => {

    try {
      completarAtencion(id);

      setReservas(obtenerReservas());
      setMensaje("Atención registrada como realizada.");
      setError("");

    } catch (err) {
      setMensaje("");
      setError(
        err instanceof Error
          ? err.message
          : "No fue posible completar la atención."
      );
    }
  };

  const handleCancelar = (id: number) => {

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

    } catch {
      setMensaje("");
      setError("No fue posible cancelar la reserva.");
    }
  };

  const handleCerrarSesion = () => {
    cerrarSesionDemo();
    navigate("/login", { replace: true });
  };

  return (
    <section className="container my-5">

      <div className="card p-4 shadow-sm border-0">

        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">

          <h1 className="fs-3 text-success mb-0">
            Panel del Nutricionista
          </h1>

          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={handleCerrarSesion}
          >
            Cerrar sesión
          </button>

        </div>

        <div className="bg-light rounded p-4 mb-4">

          <h2 className="fs-4 text-success mb-3">
            Mis Datos Profesionales
          </h2>

          <div className="row g-3">

            <div className="col-md-6">

              <label className="form-label fw-bold">
                Nombre profesional
              </label>

              <input
                className="form-control"
                value={usuario.nombre}
                readOnly
              />

            </div>

            <div className="col-md-6">

              <label className="form-label fw-bold">
                Correo electrónico
              </label>

              <input
                className="form-control"
                value={usuario.correo}
                readOnly
              />

            </div>

            <div className="col-md-6">

              <label className="form-label fw-bold">
                Rol
              </label>

              <input
                className="form-control"
                value={usuario.rol}
                readOnly
              />

            </div>

            <div className="col-md-6">

              <label className="form-label fw-bold">
                RUN
              </label>

              <input
                className="form-control"
                value={usuario.rut ?? "No informado"}
                readOnly
              />

            </div>

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
          Agenda de Pacientes ({misReservas.length})
        </h2>

        <div className="table-responsive">

          <table className="table table-hover align-middle">

            <thead className="table-success">
              <tr>
                <th>RUT Paciente</th>
                <th>Servicio</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>

              {misReservas.map((reserva) => (

                <tr key={reserva.id}>

                  <td>{reserva.rut}</td>

                  <td>
                    {nombreServicio(reserva.servicioId)}
                  </td>

                  <td>{reserva.fecha}</td>

                  <td>{reserva.hora}</td>

                  <td>

                    <span
                      className={
                        reserva.estado === "Confirmada"
                          ? "badge bg-success"
                          : reserva.estado === "Atendido"
                            ? "badge bg-primary"
                            : "badge bg-secondary"
                      }
                    >
                      {reserva.estado}
                    </span>

                  </td>

                  <td>

                    {reserva.estado === "Confirmada" ? (

                      <div className="d-flex gap-2">

                        <button
                          type="button"
                          className="btn btn-outline-success btn-sm"
                          onClick={() =>
                            handleCompletar(reserva.id)
                          }
                        >
                          Atendido
                        </button>

                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          onClick={() =>
                            handleCancelar(reserva.id)
                          }
                        >
                          Cancelar
                        </button>

                      </div>

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

          {misReservas.length === 0 && (
            <p className="text-center text-secondary py-3">
              No hay pacientes agendados actualmente.
            </p>
          )}

        </div>

      </div>
    </section>
  );
}

export default Nutricionista;