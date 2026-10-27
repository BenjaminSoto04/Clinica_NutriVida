
import { Link, useParams } from "react-router-dom";
import { obtenerServicios } from "../servicios/serviciosCRUD";

function DetalleServicios() {
  const { id } = useParams<{ id: string }>();

  const servicio = obtenerServicios().find(
    (item) => item.id === Number(id)
  );

  if (!servicio) {
    return (
      <section className="container text-center my-5">
        <h1 className="text-danger">
          Servicio no encontrado
        </h1>

        <p>
          El servicio solicitado no existe.
        </p>

        <Link to="/servicios" className="btn btn-success">
          Volver a Servicios
        </Link>
      </section>
    );
  }

  const precioFormateado = servicio.precio.toLocaleString(
    "es-CL",
    {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    }
  );

  return (
    <section className="container py-5 d-flex justify-content-center">

      <article
        className="card shadow-lg border-0 overflow-hidden w-100"
        style={{
          maxWidth: "650px",
          borderRadius: "16px",
          backgroundColor: "rgba(255,255,255,0.95)",
        }}
      >

        <div
          className="text-center text-white py-3"
          style={{
            backgroundColor: "rgb(53, 90, 49)",
          }}
        >
          <h1 className="m-0 fs-4 fw-bold">
            Vista Detallada del Servicio
          </h1>
        </div>

        <div className="text-center p-3 bg-light">
          <img
            src={servicio.imagen}
            alt={servicio.nombre}
            className="img-fluid rounded shadow-sm"
            style={{
              maxHeight: "250px",
              objectFit: "cover",
            }}
          />
        </div>

        <div className="card-body p-4">

          <h2 className="card-title text-success fw-bold text-center mb-3 fs-3">
            {servicio.nombre}
          </h2>

          <p className="text-secondary text-center mb-4">
            {servicio.descripcion}
          </p>

          <hr className="my-4" />

          <div className="row g-3 text-secondary text-center">

            <div className="col-6 col-md-4">
              <strong className="d-block text-dark">
                Código:
              </strong>
              <span>{servicio.codigo}</span>
            </div>

            <div className="col-6 col-md-4">
              <strong className="d-block text-dark">
                Tipo:
              </strong>
              <span>{servicio.tipo}</span>
            </div>

            <div className="col-6 col-md-4">
              <strong className="d-block text-dark">
                Duración:
              </strong>
              <span>{servicio.duracion}</span>
            </div>

            <div className="col-6 col-md-4">
              <strong className="d-block text-dark">
                Modalidad:
              </strong>
              <span>{servicio.modalidad}</span>
            </div>

            <div className="col-6 col-md-8">
              <strong className="d-block text-dark">
                Profesional:
              </strong>
              <span>{servicio.profesional}</span>
            </div>

          </div>

          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mt-4 pt-3 border-top">

            <span className="fs-4 fw-bold text-success">
              {precioFormateado}
            </span>

            <Link
              to="/servicios"
              className="btn btn-outline-success fw-bold"
            >
              Volver a Servicios
            </Link>

          </div>

        </div>
      </article>
    </section>
  );
}

export default DetalleServicios;