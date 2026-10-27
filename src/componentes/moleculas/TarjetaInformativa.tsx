interface TarjetaInformativaProps {
  titulo: string;
  descripcion: string;
}

function TarjetaInformativa({
  titulo,
  descripcion,
}: TarjetaInformativaProps) {
  return (
    <div className="col-md-6">
      <div className="card p-4 h-100 shadow-sm border-0">
        <h3 className="text-success fw-bold text-center">
          {titulo}
        </h3>

        <p className="text-secondary">
          {descripcion}
        </p>
      </div>
    </div>
  );
}

export default TarjetaInformativa;