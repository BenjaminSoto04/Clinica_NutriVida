import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { validarRut } from "../utils/validarRut";
import { regiones } from "../datos/regiones";

import type { UsuarioSesion } from "../datos/usuario";

import { crearUsuario } from "../servicios/usuariosCRUD";

function RegistroUsuario() {

  const navigate = useNavigate();

  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [rut, setRut] = useState("");
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [confirmarClave, setConfirmarClave] = useState("");

  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");
  const [direccion, setDireccion] = useState("");

  const [error, setError] = useState("");

  const regionSeleccionada = regiones.find(
    (item) => item.nombre === region
  );

  const comunasDisponibles =
    regionSeleccionada?.comunas ?? [];

  const registrar = (
    e: FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();
    setError("");

    if (
      !nombres.trim() ||
      !apellidos.trim() ||
      !rut.trim() ||
      !correo.trim() ||
      !clave ||
      !confirmarClave ||
      !region ||
      !comuna ||
      !direccion.trim()
    ) {
      setError("Debes completar todos los campos.");
      return;
    }

    if (!validarRut(rut)) {
      setError("El RUN ingresado no es válido.");
      return;
    }

    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formatoCorreo.test(correo.trim())) {
      setError("Debes ingresar un correo electrónico válido.");
      return;
    }

    if (clave.length < 8) {
      setError(
        "La contraseña debe tener al menos 8 caracteres."
      );
      return;
    }

    if (clave !== confirmarClave) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (!comunasDisponibles.includes(comuna)) {
      setError("Debes seleccionar una comuna válida.");
      return;
    }

    const rutNormalizado = rut
    .replace(/[.\-\s]/g, "")
    .toUpperCase();

    try {
    const usuarioCreado = crearUsuario({
        nombre: `${nombres.trim()} ${apellidos.trim()}`,
        correo: correo.trim().toLowerCase(),
        rut: rutNormalizado,
        rol: "Cliente",
        region,
        comuna,
        direccion: direccion.trim(),
        activo: true,
    });

    const nuevoUsuario: UsuarioSesion = {
        nombre: usuarioCreado.nombre,
        correo: usuarioCreado.correo,
        rol: usuarioCreado.rol,
        rut: usuarioCreado.rut,
        region: usuarioCreado.region,
        comuna: usuarioCreado.comuna,
        direccion: usuarioCreado.direccion,
    };

    sessionStorage.setItem(
        "nutrivida_sesion_demo",
        JSON.stringify(nuevoUsuario)
    );

    navigate("/usuario", { replace: true });
    } catch (error) {
    if (error instanceof Error) {
        setError(error.message);
    } else {
        setError("No fue posible registrar al usuario.");
    }
    }

    navigate("/usuario", { replace: true });
  };

  return (
    <section className="container my-5">

      <div
        className="card shadow-sm border-0 mx-auto p-4"
        style={{ maxWidth: "650px" }}
      >

        <h1 className="fs-3 text-success text-center mb-4">
          Registro de Usuario
        </h1>

        <form onSubmit={registrar} noValidate>

          <div className="row g-3">

            <div className="col-md-6">
              <label htmlFor="nombres" className="form-label">
                Nombres
              </label>

              <input
                id="nombres"
                className="form-control"
                value={nombres}
                onChange={(e) => setNombres(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="apellidos" className="form-label">
                Apellidos
              </label>

              <input
                id="apellidos"
                className="form-control"
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="rut" className="form-label">
                RUN
              </label>

              <input
                id="rut"
                className="form-control"
                placeholder="12345678-5"
                value={rut}
                onChange={(e) => setRut(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="correo" className="form-label">
                Correo electrónico
              </label>

              <input
                id="correo"
                type="email"
                className="form-control"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="clave" className="form-label">
                Contraseña
              </label>

              <input
                id="clave"
                type="password"
                className="form-control"
                value={clave}
                onChange={(e) => setClave(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label
                htmlFor="confirmarClave"
                className="form-label"
              >
                Confirmar contraseña
              </label>

              <input
                id="confirmarClave"
                type="password"
                className="form-control"
                value={confirmarClave}
                onChange={(e) =>
                  setConfirmarClave(e.target.value)
                }
              />
            </div>

            <div className="col-md-6">

              <label htmlFor="region" className="form-label">
                Región
              </label>

              <select
                id="region"
                className="form-select"
                value={region}
                onChange={(e) => {
                  setRegion(e.target.value);
                  setComuna("");
                }}
              >

                <option value="">
                  Selecciona una región...
                </option>

                {regiones.map((item) => (
                  <option
                    key={item.nombre}
                    value={item.nombre}
                  >
                    {item.nombre}
                  </option>
                ))}

              </select>

            </div>

            <div className="col-md-6">

              <label htmlFor="comuna" className="form-label">
                Comuna
              </label>

              <select
                id="comuna"
                className="form-select"
                value={comuna}
                disabled={!region}
                onChange={(e) => setComuna(e.target.value)}
              >

                <option value="">
                  Selecciona una comuna...
                </option>

                {comunasDisponibles.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}

              </select>

            </div>

            <div className="col-12">

              <label
                htmlFor="direccion"
                className="form-label"
              >
                Dirección
              </label>

              <input
                id="direccion"
                className="form-control"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
              />
            </div>

          </div>

          {error && (
            <div
              className="alert alert-danger mt-3"
              role="alert"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-success w-100 mt-4"
          >
            Registrarse
          </button>

        </form>

      </div>
    </section>
  );
}

export default RegistroUsuario;