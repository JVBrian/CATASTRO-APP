import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import {
  isEmpty,
  isEmail,
  isLength,
  isMatch,
  isLengthCed,
  isCedula,
} from "../../utils/validation/Validation";

const initialState = {
  name: "",
  email: "",
  password: "",
  cf_password: "",
  err: "",
  success: "",
  cedula: "",
};

function Register() {
  const [user, setUser] = useState(initialState);

  const { name, email, password, cf_password, err, success, cedula } = user;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmpty(name) || isEmpty(password))
      return setUser({
        ...user,
        err: "Por favor, rellena todos los campos.",
        success: "",
      });

    if (!isEmail(email))
      return setUser({ ...user, err: "Correos invalidos", success: "" });

    if (!isCedula(cedula))
      return setUser({ ...user, err: "Cedula invalida", success: "" });

    if (isLength(password))
      return setUser({
        ...user,
        err: "La contraseña debe tener al menos 6 caracteres.",
        success: "",
      });

    if (isLengthCed(cedula))
      return setUser({
        ...user,
        err: "La cedula  debe tener 10 digitos.",
        success: "",
      });

    if (!isMatch(password, cf_password))
      return setUser({
        ...user,
        err: "Las contraseñas son diferentes.",
        success: "",
      });

    try {
      const res = await axios.post("/user/register", {
        name,
        email,
        password,
        cedula,
      });

      setUser({ ...user, err: "", success: res.data.msg });
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <div>
      <div id="slider" class="slider-small">
        <h1>Crea una cuenta para poder ingresar a la plataforma</h1>
      </div>
      <div className="login_page">
        <h2>Registro</h2>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}

        <form onSubmit={handleSubmit}>
          <br></br>
          <br></br>
          <div>
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              placeholder="Ingresa tu nombre"
              id="name"
              value={name}
              name="name"
              onChange={handleChangeInput}
            />
          </div>
          <div>
            <label htmlFor="name">Cedula</label>
            <input
              type="text"
              placeholder="Ingresa tu cedula"
              id="cedula"
              value={cedula}
              name="cedula"
              onChange={handleChangeInput}
            />
          </div>

          <div>
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="text"
              placeholder="Ingresa tu correo"
              id="email"
              value={email}
              name="email"
              onChange={handleChangeInput}
            />
          </div>

          <div>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              id="password"
              value={password}
              name="password"
              onChange={handleChangeInput}
            />
          </div>

          <div>
            <label htmlFor="cf_password">Confirmar contraseña</label>
            <input
              type="password"
              placeholder="Confirma tu contraseña"
              id="cf_password"
              value={cf_password}
              name="cf_password"
              onChange={handleChangeInput}
            />
          </div>

          <div className="row">
            <button type="submit">Registrar</button>
          </div>
        </form>

        <p>
          ¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
