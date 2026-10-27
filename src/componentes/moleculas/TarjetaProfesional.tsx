import { Link } from "react-router-dom";
import type { Profesional } from "../../datos/profesionales";

interface TarjetaProfesionalProps {
  profesional: Profesional;
}

function TarjetaProfesional({
  profesional,
}: TarjetaProfesionalProps) {
  return (
    <div className="col">
      <article className="card h-100 text-center shadow-sm">

        <img
          src={profesional.imagen}
          className="card-img-top mx-auto mt-3"
          alt={`Fotografía de ${profesional.nombre}`}
          style={{
            width: "200px",
            height: "200px",
            objectFit: "cover",
            borderRadius: "20px",
          }}
        />

        <div className="card-body d-flex flex-column">

          <h5 className="card-title">
            {profesional.nombre}
          </h5>

          <p className="card-text">
            <strong>Especialidad:</strong>
            <br />
            {profesional.especialidad}
          </p>

          <p className="card-text">
            <strong>Perfil:</strong>
            <br />
            {profesional.perfil}
          </p>

          <p className="card-text">
            <strong>Modalidad:</strong>
            <br />
            {profesional.modalidad}
          </p>

          <p className="card-text">
            <strong>Horario de atención:</strong>
            <br />
            {profesional.horario}
          </p>

          <Link
            to="/reservas"
            className="btn btn-success mt-auto"
          >
            Reservar Hora
          </Link>

        </div>
      </article>
    </div>
  );
}

export default TarjetaProfesional;