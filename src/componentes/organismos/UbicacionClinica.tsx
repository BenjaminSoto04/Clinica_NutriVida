
function UbicacionClinica() {
  const direccion =
    "Providencia 5431, La Florida, Región Metropolitana";

  const mapaUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3326.4842975702304!2d-70.56321642345249!3d-33.514792000811696!2m3!1f0!2f0!3f0!3m2!1i1024!1i768!4f13.1!3m3!1m2!1s0x9662d1a7b50737a3%3A0xf6b03b7d1e53c8dd!2sProvidencia%205431%2C%20La%20Florida%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses!2scl!4v1788224883382!5m2!1ses!2scl";

  return (
    <section className="container my-5">
      <h2 className="text-center mb-4">
        Clínica Nutricional - Ubicación
      </h2>

      <p className="text-center mb-4">
        {direccion}
      </p>

      <div className="ratio ratio-16x9 shadow rounded overflow-hidden">
        <iframe
          src={mapaUrl}
          title="Ubicación de Clínica NutriVida"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}

export default UbicacionClinica;