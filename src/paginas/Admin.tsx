import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import {
  obtenerSesionDemo,
  cerrarSesionDemo,
} from "../servicios/autenticacionDemo";

import { obtenerServicios } from "../servicios/serviciosCRUD";
import { obtenerReservas } from "../servicios/reservasCRUD";

function Admin() {

  const navigate = useNavigate();

  const [usuario] = useState(() => obtenerSesionDemo());

  const servicios = obtenerServicios();
  const reservas = obtenerReservas();

  const totalServicios = servicios.length;

  const totalReservas = reservas.length;

  const reservasConfirmadas = reservas.filter(
    (reserva) => reserva.estado === "Confirmada"
  ).length;

  const reservasCanceladas = reservas.filter(
    (reserva) => reserva.estado === "Cancelada"
  ).length;

  const reservasAtendidas = reservas.filter(
    (reserva) => reserva.estado === "Atendido"
  ).length;

  const cerrarSesion = () => {
    cerrarSesionDemo();
    navigate("/login", { replace: true });
  };

  if (!usuario || usuario.rol !== "Administrador") {
    return <Navigate to="/login" replace />;
  }

  return (
    <section className="container my-5">

      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">

        <div>
          <h1 className="text-success fw-bold">
            Panel Administrativo
          </h1>

          <p className="text-secondary mb-0">
            Bienvenido(a), {usuario.nombre}
          </p>
        </div>

        <button
          type="button"
          className="btn btn-danger"
          onClick={cerrarSesion}
        >
          Cerrar sesión
        </button>

      </div>

      <h2 className="fs-4 text-success mb-3">
        Resumen General
      </h2>

      <div className="row g-3 mb-5">

        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body text-center">

              <h3 className="fs-5 text-secondary">
                Servicios registrados
              </h3>

              <p className="display-5 fw-bold text-success mb-0">
                {totalServicios}
              </p>

            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body text-center">

              <h3 className="fs-5 text-secondary">
                Total de reservas
              </h3>

              <p className="display-5 fw-bold text-primary mb-0">
                {totalReservas}
              </p>

            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body text-center">

              <h3 className="fs-5 text-secondary">
                Reservas confirmadas
              </h3>

              <p className="display-5 fw-bold text-success mb-0">
                {reservasConfirmadas}
              </p>

            </div>
          </div>
        </div>

      </div>

      <h2 className="fs-4 text-success mb-3">
        Estado de las Reservas
      </h2>

      <div className="card shadow-sm border-0 p-4 mb-5">

        <div className="row text-center g-3">

          <div className="col-md-4">
            <h3 className="fs-6">Confirmadas</h3>
            <span className="badge bg-success fs-6">
              {reservasConfirmadas}
            </span>
          </div>

          <div className="col-md-4">
            <h3 className="fs-6">Atendidas</h3>
            <span className="badge bg-primary fs-6">
              {reservasAtendidas}
            </span>
          </div>

          <div className="col-md-4">
            <h3 className="fs-6">Canceladas</h3>
            <span className="badge bg-secondary fs-6">
              {reservasCanceladas}
            </span>
          </div>

        </div>

      </div>

      <h2 className="fs-4 text-success mb-3">
        Módulos de Administración
      </h2>

      <div className="row g-4">

        <div className="col-12 col-md-6 col-lg-4">

          <article className="card h-100 shadow-sm border-0">

            <div className="card-body d-flex flex-column">

              <h3 className="fs-5 text-success">
                Gestión de Servicios
              </h3>

              <p className="text-secondary">
                Registra, consulta, modifica y elimina
                servicios nutricionales.
              </p>

              <Link
                to="/admin/servicios"
                className="btn btn-success mt-auto"
              >
                Administrar Servicios
              </Link>

            </div>
          </article>

        </div>

        <div className="col-12 col-md-6 col-lg-4">

          <article className="card h-100 shadow-sm border-0">

            <div className="card-body d-flex flex-column">

              <h3 className="fs-5 text-success">
                Gestión de Reservas
              </h3>

              <p className="text-secondary">
                Consulta las reservas registradas,
                revisa sus estados y gestiona cancelaciones.
              </p>

              <Link
                to="/admin/reservas"
                className="btn btn-success mt-auto"
              >
                Administrar Reservas
              </Link>

            </div>
          </article>

        </div>

        <div className="col-12 col-md-6 col-lg-4">

          <article className="card h-100 shadow-sm border-0">

            <div className="card-body d-flex flex-column">

              <h3 className="fs-5 text-success">
                Gestión de Usuarios
              </h3>

              <p className="text-secondary">
                Administración de perfiles y roles
                de usuarios registrados.
              </p>

              <Link
                to="/admin/usuarios"
                className="btn btn-success mt-auto"
              >
                Administrar Usuarios
              </Link>

            </div>
          </article>

        </div>

      </div>

    </section>
  );
}

export default Admin;