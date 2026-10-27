
import { useState } from "react";

import TarjetaServicioCatalogo from "../componentes/moleculas/TarjetaServicioCatalogo";
import { obtenerServicios } from "../servicios/serviciosCRUD";
import type { Servicio } from "../datos/servicios";

function normalizarTexto(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function Servicios() {
  const [servicios] = useState<Servicio[]>(
    () => obtenerServicios()
  );

  const [busqueda, setBusqueda] = useState("");
  const [tipo, setTipo] = useState("Todos");
  const [modalidad, setModalidad] = useState("Todas");

  const serviciosFiltrados = servicios.filter((servicio) => {

    const coincideBusqueda =
      normalizarTexto(servicio.nombre).includes(
        normalizarTexto(busqueda)
      ) ||
      normalizarTexto(servicio.codigo).includes(
        normalizarTexto(busqueda)
      );

    const coincideTipo =
      tipo === "Todos" || servicio.tipo === tipo;

    const coincideModalidad =
      modalidad === "Todas" ||
      servicio.modalidad === modalidad;

    return (
      coincideBusqueda &&
      coincideTipo &&
      coincideModalidad
    );
  });

  const limpiarFiltros = () => {
    setBusqueda("");
    setTipo("Todos");
    setModalidad("Todas");
  };

  return (
    <section className="container my-5">

      <div className="text-center mb-4">
        <h1 className="fw-bold text-success">
          Nuestros Servicios
        </h1>

        <p className="text-secondary">
          Conoce los planes y consultas que tenemos para ti.
        </p>
      </div>

      <div className="card shadow-sm border-0 p-4 mb-4">

        <div className="row g-3">

          <div className="col-12 col-md-4">
            <label
              htmlFor="buscarServicio"
              className="form-label fw-bold"
            >
              Buscar servicio
            </label>

            <input
              type="text"
              id="buscarServicio"
              className="form-control"
              placeholder="Nombre o código..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          <div className="col-12 col-md-4">
            <label
              htmlFor="tipoServicio"
              className="form-label fw-bold"
            >
              Tipo de servicio
            </label>

            <select
              id="tipoServicio"
              className="form-select"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            >
              <option value="Todos">Todos</option>
              <option value="Consulta">Consulta</option>
              <option value="Plan especializado">
                Plan especializado
              </option>
              <option value="Evaluación">Evaluación</option>
              <option value="Taller grupal">Taller grupal</option>
            </select>
          </div>

          <div className="col-12 col-md-4">
            <label
              htmlFor="modalidadServicio"
              className="form-label fw-bold"
            >
              Modalidad
            </label>

            <select
              id="modalidadServicio"
              className="form-select"
              value={modalidad}
              onChange={(e) => setModalidad(e.target.value)}
            >
              <option value="Todas">Todas</option>
              <option value="Presencial">Presencial</option>
              <option value="Online">Online</option>
              <option value="Presencial (grupo)">
                Presencial (grupo)
              </option>
            </select>
          </div>

        </div>

        <div className="d-flex justify-content-end mt-3">
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={limpiarFiltros}
          >
            Limpiar filtros
          </button>
        </div>

      </div>

      <p className="text-secondary mb-3">
        Servicios encontrados:
        <strong> {serviciosFiltrados.length}</strong>
      </p>

      {serviciosFiltrados.length > 0 ? (

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">

          {serviciosFiltrados.map((servicio) => (
            <TarjetaServicioCatalogo
              key={servicio.id}
              servicio={servicio}
            />
          ))}

        </div>

      ) : (

        <div className="alert alert-warning text-center">
          No se encontraron servicios con los filtros seleccionados.
        </div>

      )}

    </section>
  );
}

export default Servicios;