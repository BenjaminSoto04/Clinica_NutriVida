import TarjetaInformativa from "../componentes/moleculas/TarjetaInformativa";

interface Integrante {
  id: number;
  nombre: string;
  rol: string;
}

const integrantes: Integrante[] = [
  {
    id: 1,
    nombre: "Benjamín Soto",
    rol: "Desarrollador Fullstack y Frontend",
  },
];

function Nosotros() {
  return (
    <div className="container my-5">

      <section className="text-center mb-5">
        <h1 className="fw-bold text-success">
          Sobre NutriVida
        </h1>

        <p className="lead text-secondary">
          Acompañándote hacia un estilo de vida
          más saludable y equilibrado.
        </p>
      </section>

      <section className="row g-4 mb-5">

        <TarjetaInformativa
          titulo="Quiénes Somos"
          descripcion="Somos una clínica de nutrición y dietética
          que opera desde 2016 en la comuna de Temuco,
          en la Región de la Araucanía.
          Atendemos a pacientes con distintos objetivos
          como la pérdida de peso, control de enfermedades
          metabólicas, nutrición deportiva y alimentación
          vegetariana o vegana."
        />

        <TarjetaInformativa
          titulo="Nuestra Visión"
          descripcion="Ser la clínica nutricional líder en
          atención digital y presencial, destacando
          por la calidad profesional y el compromiso
          con la salud comunitaria."
        />

      </section>
      
      <section className="mt-5">

        <div className="text-center mb-4">
          <h2 className="fw-bold text-success">
            Equipo Desarrollador
          </h2>

          <p className="text-secondary">
            Proyecto desarrollado para la asignatura
            Fullstack II.
          </p>
        </div>

        <div className="row justify-content-center g-4">

          {integrantes.map((integrante) => (
            <div className="col-md-4" key={integrante.id}>

              <div className="card p-3 shadow-sm border-0 text-center h-100">

                <h5 className="fw-bold text-dark">
                  {integrante.nombre}
                </h5>

                <small className="text-secondary">
                  {integrante.rol}
                </small>

              </div>
            </div>
          ))}

        </div>
      </section>

    </div>
  );
}

export default Nosotros;