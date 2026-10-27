import { useState } from "react";

import TarjetaProfesional from "../componentes/moleculas/TarjetaProfesional";
import { profesionales } from "../datos/profesionales";

function Profesionales() {
  const [busqueda, setBusqueda] = useState("");

  const profesionalesFiltrados = profesionales.filter(
    (profesional) => {
      const texto = busqueda.toLocaleLowerCase("es");

      return (
        profesional.nombre
          .toLocaleLowerCase("es")
          .includes(texto) ||
        profesional.especialidad
          .toLocaleLowerCase("es")
          .includes(texto)
      );
    }
  );

  return (
    <section className="container my-5">

      <h1 className="text-center text-success mb-4">
        Nuestros Profesionales
      </h1>

      <p className="text-center text-secondary mb-4">
        Conoce a nuestro equipo de especialistas
        en nutrición.
      </p>

      <div className="row justify-content-center mb-4">
        <div className="col-12 col-md-8 col-lg-6">

          <label
            htmlFor="buscarProfesional"
            className="form-label"
          >
            Buscar profesional
          </label>

          <input
            type="text"
            id="buscarProfesional"
            className="form-control"
            placeholder="Buscar por nombre o especialidad..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

        </div>
      </div>

      {profesionalesFiltrados.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-2 g-4">

          {profesionalesFiltrados.map((profesional) => (
            <TarjetaProfesional
              key={profesional.id}
              profesional={profesional}
            />
          ))}

        </div>
      ) : (
        <div className="alert alert-warning text-center">
          No se encontraron profesionales
          con ese criterio de búsqueda.
        </div>
      )}

    </section>
  );
}

export default Profesionales;