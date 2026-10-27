
import { useState } from "react";
import type { FormEvent } from "react";

import CampoTexto from "../componentes/atomos/CampoTexto";

function Contactanos() {

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [comentarios, setComentarios] = useState("");

  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  const enviarFormulario = (
    e: FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    setError("");
    setMensaje("");

    const nombreLimpio = nombre.trim();
    const correoLimpio = correo.trim();
    const comentariosLimpios = comentarios.trim();

    if (!nombreLimpio) {
      setError("Debes ingresar tu nombre completo.");
      return;
    }

    if (!correoLimpio) {
      setError("Debes ingresar tu correo electrónico.");
      return;
    }

    if (!comentariosLimpios) {
      setError("Debes ingresar tus comentarios.");
      return;
    }

    if (nombreLimpio.length > 100) {
      setError("El nombre no puede superar los 100 caracteres.");
      return;
    }

    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formatoCorreo.test(correoLimpio)) {
      setError("Debes ingresar un correo electrónico válido.");
      return;
    }

    if (correoLimpio.length > 100) {
      setError("El correo no puede superar los 100 caracteres.");
      return;
    }

    if (comentariosLimpios.length > 500) {
      setError("Los comentarios no pueden superar los 500 caracteres.");
      return;
    }

    setMensaje(
      "Formulario validado correctamente. Envío simulado."
    );

    setNombre("");
    setCorreo("");
    setComentarios("");
  };

  return (
    <section className="container my-5">

      <div
        className="card shadow-sm mx-auto border-0"
        style={{ maxWidth: "500px" }}
      >

        <div className="card-body p-4">

          <h1 className="fs-3 text-success text-center mb-4">
            Formulario de Contacto
          </h1>

          <form onSubmit={enviarFormulario} noValidate>

            <CampoTexto
              id="nombre"
              etiqueta="Nombre completo"
              valor={nombre}
              placeholder="Pedro Juan Pérez González"
              maxLength={100}
              onChange={setNombre}
            />

            <CampoTexto
              id="correo"
              etiqueta="Correo electrónico"
              tipo="email"
              valor={correo}
              placeholder="ejemplo@gmail.com"
              maxLength={100}
              onChange={setCorreo}
            />

            <div className="mb-3">

              <label
                htmlFor="comentarios"
                className="form-label"
              >
                Comentarios
              </label>

              <textarea
                id="comentarios"
                className="form-control"
                rows={4}
                placeholder="Máximo 500 caracteres..."
                maxLength={500}
                value={comentarios}
                onChange={(e) =>
                  setComentarios(e.target.value)
                }
              />

              <small className="text-secondary">
                {comentarios.length}/500 caracteres
              </small>

            </div>

            {error && (
              <div
                className="alert alert-danger"
                role="alert"
              >
                {error}
              </div>
            )}

            {mensaje && (
              <div
                className="alert alert-success"
                role="status"
              >
                {mensaje}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-success d-block mx-auto px-4"
            >
              Enviar
            </button>

          </form>

        </div>
      </div>

    </section>
  );
}

export default Contactanos;