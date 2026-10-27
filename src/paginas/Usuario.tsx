import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import type { Reserva } from "../datos/reserva";

import {
  obtenerSesionDemo,
  cerrarSesionDemo,
} from "../servicios/autenticacionDemo";

import {
  obtenerReservas,
  cancelarReserva,
} from "../servicios/reservasCRUD";

import { obtenerServicios } from "../servicios/serviciosCRUD";

function Usuario() {

  const navigate = useNavigate();

  const [usuario] = useState(() => obtenerSesionDemo());

  const [reservas, setReservas] = useState<Reserva[]>(
    () => obtenerReservas()
  );

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  if (!usuario || usuario.rol !== "Cliente") {
    return <Navigate to="/login" replace />;
  }

  const normalizarRut = (valor: string) =>
    valor.replace(/[^0-9K]/gi, "").toUpperCase();

  const misReservas = usuario.rut
    ? reservas.filter(
        (reserva) =>
          normalizarRut(reserva.rut) ===
          normalizarRut(usuario.rut ?? "")
      )
    : [];

  const servicios = obtenerServicios();

  const nombreServicio = (id: number) => {
    const servicio = servicios.find((s) => s.id === id);

    return servicio?.nombre ?? "Servicio no disponible";
  };

  const handleCancelar = (id: number) => {

    const confirmar = window.confirm(
      "¿Estás seguro de que deseas cancelar esta cita?"
    );

    if (!confirmar) {
      return;
    }

    try {
      cancelarReserva(id);

      setReservas(obtenerReservas());

      setMensaje("La cita fue cancelada correctamente.");
      setError("");

    } catch {
      setError("No fue posible cancelar la cita.");
      setMensaje("");
    }
  };

  const handleCerrarSesion = () => {
    cerrarSesionDemo();
    navigate("/login", { replace: true });
  };

  return (
    <section className="container my-5">

      <div className="card shadow-sm border-0 p-4">

        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">

          <h1 className="fs-3 text-success mb-0">
            Bienvenido(a), {usuario.nombre}
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
            Mis Datos Personales
          </h2>

          <div className="row g-3">

            <div className="col-md-6">
              <label className="form-label fw-bold">
                Nombre completo
              </label>

              <input
                className="form-control"
                value={usuario.nombre}
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
                Comuna / Región
              </label>

              <input
                className="form-control"
                value={
                  usuario.comuna && usuario.region
                    ? `${usuario.comuna}, ${usuario.region}`
                    : "No informado"
                }
                readOnly
              />
            </div>

          </div>
        </div>

        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">

          <h2 className="fs-4 text-success mb-0">
            Mis Citas Médicas
          </h2>

          <Link
            to="/reservas"
            className="btn btn-success btn-sm"
          >
            + Reservar Cita
          </Link>

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

        {!usuario.rut && (
          <div className="alert alert-warning">
            Tu sesión de demostración no tiene RUN asociado.
            No es posible relacionar reservas con este perfil.
          </div>
        )}

        <div className="table-responsive">

          <table className="table table-hover align-middle">

            <thead className="table-success">
              <tr>
                <th>Servicio</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>

              {misReservas.map((reserva) => (

                <tr key={reserva.id}>

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
                        className="btn btn-outline-danger btn-sm"
                        onClick={() =>
                          handleCancelar(reserva.id)
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

          {misReservas.length === 0 && (
            <p className="text-center text-secondary py-3">
              No tienes citas registradas actualmente.
            </p>
          )}

        </div>

      </div>
    </section>
  );
}

export default Usuario;