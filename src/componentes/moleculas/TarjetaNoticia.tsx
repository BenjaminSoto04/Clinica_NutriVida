import { useState } from "react";
import type { Noticia } from "../../datos/noticias";

interface TarjetaNoticiaProps {
  noticia: Noticia;
}

function TarjetaNoticia({
  noticia,
}: TarjetaNoticiaProps) {

  const [expandida, setExpandida] = useState(false);

  const cambiarEstado = () => {
    setExpandida((estadoAnterior) => !estadoAnterior);
  };

  return (
    <article className="card h-100 shadow-sm border-0">

      <img
        src={noticia.imagen}
        className="card-img-top"
        alt={noticia.titulo}
        style={{
          height: "230px",
          objectFit: "cover",
        }}
      />

      <div className="card-body d-flex flex-column">

        <h2 className="fs-5 card-title fw-bold text-success">
          {noticia.titulo}
        </h2>

        <p className="card-text">
          {noticia.descripcionCorta}
        </p>

        {expandida && (
          <div className="mt-2 text-secondary">
            <hr />
            <p>{noticia.descripcionLarga}</p>
          </div>
        )}

        <button
          type="button"
          className="btn btn-success mx-auto mt-auto"
          onClick={cambiarEstado}
          aria-expanded={expandida}
        >
          {expandida ? "Cerrar" : "Leer más"}
        </button>

      </div>
    </article>
  );
}

export default TarjetaNoticia;