import CarruselInicio from "../componentes/organismos/CarruselInicio";
import ListadoServicios from "../componentes/organismos/ListadoServicios";
import UbicacionClinica from "../componentes/organismos/UbicacionClinica";

function Inicio() {
  return (
    <>
      <CarruselInicio />

      <ListadoServicios />

      <UbicacionClinica />
    </>
  );
}

export default Inicio;