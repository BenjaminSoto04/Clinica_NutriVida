interface TarjetaServicioProps {
  titulo: string;
  descripcion: string;
  imagen: string;
}

function TarjetaServicio({
  titulo,
  descripcion,
  imagen,
}: TarjetaServicioProps) {
  return (
    <div className="col">
      <div className="card carta-corta text-center h-100">
        <img
          src={imagen}
          className="card-img-top mx-auto mt-2 img-icono"
          alt={titulo}
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "20px",
          }}
        />

        <div className="card-body">
          <h5 className="card-title">{titulo}</h5>
          <p className="card-text">{descripcion}</p>
        </div>

        <div
          className="card-footer"
          style={{ backgroundColor: "rgb(75, 69, 69)" }}
        />
      </div>
    </div>
  );
}

export default TarjetaServicio;