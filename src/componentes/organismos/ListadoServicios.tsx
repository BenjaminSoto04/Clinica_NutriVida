import TarjetaServicio from "../moleculas/TarjetaServicio";

const servicios = [
  {
    id: 1,
    titulo: "Plan Especializados",
    descripcion:
      "Para pacientes que requieren atención fuera de su control habitual.",
    imagen: "/images/icono1.jpg",
  },
  {
    id: 2,
    titulo: "Teleconsulta Nutricional",
    descripcion:
      "Consulta de seguimiento vía videollamada. Requiere contar con consulta presencial previa.",
    imagen: "/images/icono3.webp",
  },
  {
    id: 3,
    titulo: "Talleres grupales",
    descripcion:
      "Inicia con un máximo de 10 personas. Conceptos básicos de alimentación equilibrada.",
    imagen: "/images/icono2.jpg",
  },
];

function ListadoServicios() {
  return (
    <section className="container my-4">
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {servicios.map((servicio) => (
          <TarjetaServicio
            key={servicio.id}
            titulo={servicio.titulo}
            descripcion={servicio.descripcion}
            imagen={servicio.imagen}
          />
        ))}
      </div>
    </section>
  );
}

export default ListadoServicios;