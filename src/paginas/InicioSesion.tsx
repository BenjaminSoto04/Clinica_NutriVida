import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import { iniciarSesionDemo } from "../servicios/autenticacionDemo";

function InicioSesion() {

  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");

  const ingresar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (!correo.trim()) {
      setError("Debes ingresar tu correo electrónico.");
      return;
    }

    if (!clave) {
      setError("Debes ingresar tu contraseña.");
      return;
    }

    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formatoCorreo.test(correo.trim())) {
      setError("Debes ingresar un correo válido.");
      return;
    }

    const usuario = iniciarSesionDemo(correo, clave);

    if (!usuario) {
      setError("Correo o contraseña incorrectos.");
      return;
    }

    if (usuario.rol === "Administrador") {
      navigate("/admin");
    } else if (usuario.rol === "Nutricionista") {
      navigate("/nutricionista");
    } else {
      navigate("/usuario");
    }
  };

  return (
    <section className="container my-5">

      <div
        className="card shadow-sm border-0 mx-auto p-4"
        style={{ maxWidth: "450px" }}
      >

        <h1 className="fs-3 text-success text-center mb-4">
          Iniciar sesión
        </h1>

        <form onSubmit={ingresar} noValidate>

          <div className="mb-3">

            <label
              htmlFor="login-correo"
              className="form-label"
            >
              Correo electrónico
            </label>

            <input
              id="login-correo"
              type="email"
              className="form-control"
              placeholder="correo@ejemplo.cl"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />

          </div>

          <div className="mb-3">

            <label
              htmlFor="login-clave"
              className="form-label"
            >
              Contraseña
            </label>

            <input
              id="login-clave"
              type="password"
              className="form-control"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
            />

          </div>

          {error && (
            <div
              className="alert alert-danger"
              role="alert"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-success w-100"
          >
            Ingresar
          </button>

          <p className="text-center mt-3 mb-0">
            ¿No tienes una cuenta?{" "}
            <Link to="/registro" className="text-success">
              Regístrate aquí
            </Link>
          </p>

        </form>

      </div>
    </section>
  );
}

export default InicioSesion;