
import { Link } from "react-router-dom";
import type { Servicio } from "../../datos/servicios";

interface TarjetaServicioCatalogoProps {
  servicio: Servicio;
}

function TarjetaServicioCatalogo({
  servicio,
}: TarjetaServicioCatalogoProps) {

  const precioFormateado = servicio.precio.toLocaleString(
    "es-CL",
    {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    }
  );

  return (
    <div className="col">
      <article className="card h-100 shadow-sm border-0">

        <img
          src={servicio.imagen}
          className="card-img-top"
          alt={servicio.nombre}
          style={{
            height: "200px",
            objectFit: "cover",
          }}
        />

        <div className="card-body d-flex flex-column">

          <span className="badge bg-success mb-2 align-self-start">
            {servicio.tipo}
          </span>

          <h5 className="card-title text-success fw-bold">
            {servicio.nombre}
          </h5>

          <p className="card-text text-secondary mb-2">
            <strong>Profesional:</strong>
            {" "}{servicio.profesional}
          </p>

          <p className="card-text text-secondary">
            <strong>Modalidad:</strong>
            {" "}{servicio.modalidad}
          </p>

          <p className="fw-bold text-dark fs-5 mt-auto">
            {precioFormateado}
          </p>

          <Link
            to={`/servicios/${servicio.id}`}
            className="btn btn-success w-100 mt-2"
          >
            Más información
          </Link>

        </div>
      </article>
    </div>
  );
}

export default TarjetaServicioCatalogo;