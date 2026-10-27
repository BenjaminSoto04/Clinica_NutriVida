import { useState } from "react";
import type { FormEvent } from "react";

import { profesionales } from "../datos/profesionales";
import { obtenerServicios } from "../servicios/serviciosCRUD";
import { crearReserva } from "../servicios/reservasCRUD";
import { validarRut } from "../utils/validarRut";
import { obtenerHorasDisponibles } from "../utils/disponibilidad";

import type { Servicio } from "../datos/servicios";
import type { Reserva } from "../datos/reserva";

function ReservasHoras() {

  const [servicios] = useState<Servicio[]>(
    () => obtenerServicios()
  );

  const [rut, setRut] = useState("");
  const [servicioId, setServicioId] = useState("");
  const [profesionalId, setProfesionalId] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const horasDisponibles = obtenerHorasDisponibles(
    Number(profesionalId),
    fecha
  );

  const hoy = new Date();

  const fechaMinima = [
    hoy.getFullYear(),
    String(hoy.getMonth() + 1).padStart(2, "0"),
    String(hoy.getDate()).padStart(2, "0"),
  ].join("-");

  const limpiarFormulario = () => {
    setRut("");
    setServicioId("");
    setProfesionalId("");
    setFecha("");
    setHora("");
  };

  const guardarReserva = (
    e: FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    setError("");
    setMensaje("");

    if (!validarRut(rut)) {
      setError("El RUT ingresado no es válido.");
      return;
    }

    if (!servicioId) {
      setError("Debes seleccionar un servicio.");
      return;
    }

    if (!profesionalId) {
      setError("Debes seleccionar un profesional.");
      return;
    }

    if (!fecha) {
      setError("Debes seleccionar una fecha.");
      return;
    }

    if (fecha < fechaMinima) {
      setError("No puedes reservar una fecha anterior a hoy.");
      return;
    }

    if (!hora) {
      setError("Debes seleccionar una hora.");
      return;
    }

    const servicioSeleccionado = servicios.find(
      (servicio) => servicio.id === Number(servicioId)
    );

    const profesionalSeleccionado = profesionales.find(
      (profesional) => profesional.id === Number(profesionalId)
    );

    if (!servicioSeleccionado || !profesionalSeleccionado) {
      setError("Debes seleccionar un servicio y profesional válidos.");
      return;
    }

    const fechaHoraReserva = new Date(`${fecha}T${hora}:00`);

    if (
      Number.isNaN(fechaHoraReserva.getTime()) ||
      fechaHoraReserva <= new Date()
    ) {
      setError("Debes seleccionar una fecha y hora futuras.");
      return;
    }

    const horasValidas = obtenerHorasDisponibles(
      Number(profesionalId),
      fecha
    );

    if (!horasValidas.includes(hora)) {
      setError(
        "La hora seleccionada no está disponible para este profesional."
      );
      return;
    }

    const nuevaReserva: Reserva = {
      id: Date.now(),
      rut: rut
        .replace(/\./g, "")
        .replace(/-/g, "")
        .trim()
        .toUpperCase(),
      servicioId: Number(servicioId),
      profesionalId: Number(profesionalId),
      fecha,
      hora,
      estado: "Confirmada",
    };

    try {

      crearReserva(nuevaReserva);

      setMensaje("¡Tu reserva fue registrada correctamente!");

      limpiarFormulario();

    } catch (err) {

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("No fue posible registrar la reserva.");
      }
    }
  };

  return (
    <section className="container my-5">

      <div
        className="card p-4 shadow-sm mx-auto"
        style={{ maxWidth: "600px" }}
      >

        <h1 className="fs-3 text-center text-success mb-4">
          Agendar Hora
        </h1>

        <form onSubmit={guardarReserva} noValidate>

          <div className="mb-3">

            <label
              htmlFor="reserva-rut"
              className="form-label fw-bold"
            >
              RUT del Paciente
            </label>

            <input
              type="text"
              id="reserva-rut"
              className="form-control"
              placeholder="12345678K"
              value={rut}
              onChange={(e) => setRut(e.target.value)}
            />

          </div>

          <div className="mb-3">

            <label
              htmlFor="reserva-servicio"
              className="form-label fw-bold"
            >
              Servicio
            </label>

            <select
              id="reserva-servicio"
              className="form-select"
              value={servicioId}
              onChange={(e) => setServicioId(e.target.value)}
            >

              <option value="">
                Seleccione un servicio...
              </option>

              {servicios.map((servicio) => (

                <option
                  key={servicio.id}
                  value={servicio.id}
                >
                  {servicio.nombre} -
                  {" "}
                  {servicio.precio.toLocaleString("es-CL", {
                    style: "currency",
                    currency: "CLP",
                    maximumFractionDigits: 0,
                  })}
                </option>

              ))}

            </select>

          </div>

          <div className="mb-3">

            <label
              htmlFor="reserva-profesional"
              className="form-label fw-bold"
            >
              Profesional
            </label>

            <select
              id="reserva-profesional"
              className="form-select"
              value={profesionalId}
              onChange={(e) => {
                setProfesionalId(e.target.value);
                setHora("");
              }}
            >

              <option value="">
                Seleccione un profesional...
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

          <div className="row">

            <div className="col-md-6 mb-3">

              <label
                htmlFor="reserva-fecha"
                className="form-label fw-bold"
              >
                Fecha
              </label>

              <input
                type="date"
                id="reserva-fecha"
                className="form-control"
                min={fechaMinima}
                value={fecha}
                onChange={(e) => {
                    setFecha(e.target.value);
                    setHora("");
                }}
              />

            </div>

            <div className="col-md-6 mb-3">

              <label
                htmlFor="reserva-hora"
                className="form-label fw-bold"
              >
                Hora
              </label>

              <select
                id="reserva-hora"
                className="form-select"
                value={hora}
                onChange={(e) => setHora(e.target.value)}
              >

                <option value="">
                  Seleccione una hora...
                </option>

                {horasDisponibles.map((horario) => (

                  <option
                    key={horario}
                    value={horario}
                  >
                    {horario} hrs
                  </option>

                ))}

              </select>

            </div>

          </div>

          {profesionalId && fecha && horasDisponibles.length === 0 && (
            <div className="alert alert-warning">
                No hay horas disponibles para este profesional
                en la fecha seleccionada.
            </div>
        )}

          {error && (
            <div
              className="alert alert-danger"
              role="alert"
            >
              {error}
            </div>
          )}

          {mensaje && (
            <div
              className="alert alert-success"
              role="status"
            >
              {mensaje}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-success w-100 fw-bold mt-2"
          >
            Confirmar Reserva
          </button>

        </form>

      </div>

    </section>
  );
}

export default ReservasHoras;