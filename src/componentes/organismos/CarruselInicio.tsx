
import { useState } from "react";
import { Link } from "react-router-dom";

interface ImagenCarrusel {
  id: number;
  imagen: string;
  titulo: string;
  subtitulo: string;
  descripcion: string;
}

const imagenes: ImagenCarrusel[] = [
  {
    id: 1,
    imagen:
      "/images/diet-concept-with-female-scientist-healthy-food.jpg",
    titulo: "Clínica Nutricional",
    subtitulo: "Tu bienestar comienza hoy",
    descripcion:
      "Nutrición para recuperar tu salud, mejorar tu bienestar y sentirte mejor.",
  },
  {
    id: 2,
    imagen: "/images/nutricionista.webp",
    titulo: "Clínica Nutricional",
    subtitulo: "Tu bienestar comienza hoy",
    descripcion:
      "Nutrición para recuperar tu salud, mejorar tu bienestar y sentirte mejor.",
  },
];

function CarruselInicio() {
  const [indiceActual, setIndiceActual] = useState(0);

  const siguiente = () => {
    setIndiceActual((anterior) =>
      (anterior + 1) % imagenes.length
    );
  };

  const anterior = () => {
    setIndiceActual((anterior) =>
      (anterior - 1 + imagenes.length) % imagenes.length
    );
  };

  return (
    <section
      className="position-relative overflow-hidden"
      aria-label="Carrusel de inicio"
    >
      <img
        src={imagenes[indiceActual].imagen}
        alt={imagenes[indiceActual].titulo}
        className="d-block w-100"
        style={{
          height: "450px",
          objectFit: "cover",
        }}
      />

      <div
        className="position-absolute top-50 start-50 translate-middle
                   bg-white bg-opacity-75 p-4 rounded-4 shadow
                   text-center"
        style={{
          width: "min(90%, 500px)",
        }}
      >
        <h2 className="text-success fw-bold">
          {imagenes[indiceActual].titulo}
        </h2>

        <p className="fw-bold text-uppercase text-secondary">
          {imagenes[indiceActual].subtitulo}
        </p>

        <p className="mb-3">
          {imagenes[indiceActual].descripcion}
        </p>

        <Link
          to="/reservas"
          className="btn btn-success rounded-pill px-4"
        >
          Reservar Hora
        </Link>
      </div>

      <button
        type="button"
        className="carousel-control-prev"
        onClick={anterior}
        aria-label="Imagen anterior"
      >
        <span
          className="carousel-control-prev-icon"
          aria-hidden="true"
        />
      </button>

      <button
        type="button"
        className="carousel-control-next"
        onClick={siguiente}
        aria-label="Imagen siguiente"
      >
        <span
          className="carousel-control-next-icon"
          aria-hidden="true"
        />
      </button>
    </section>
  );
}

export default CarruselInicio;