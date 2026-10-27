import TarjetaNoticia from "../componentes/moleculas/TarjetaNoticia";
import { noticias } from "../datos/noticias";

function Blog() {
  return (
    <section className="container my-5">

      <div className="text-center mb-4">

        <h1 className="fw-bold text-success">
          Blog - Nutrición
        </h1>

        <p className="text-secondary">
          Conoce consejos e información sobre
          alimentación y bienestar.
        </p>

      </div>

      <div className="row row-cols-1 row-cols-md-3 g-4">

        {noticias.map((noticia) => (
          <div className="col" key={noticia.id}>
            <TarjetaNoticia noticia={noticia} />
          </div>
        ))}

      </div>

    </section>
  );
}

export default Blog;