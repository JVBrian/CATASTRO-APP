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
  lastname: "",
  email: "",
  password: "",
  cf_password: "",
  err: "",
  success: "",
  cedula: "",
  telefono: "",
  barrio: "",
  direccion: "",
  genero: "",
  role: "",
};

function NewUserI() {
  const [user, setUser] = useState(initialState);

  const {
    name,
    lastname,
    barrio,
    direccion,
    email,
    telefono,
    password,
    cf_password,
    err,
    success,
    cedula,
    genero,
    role,
  } = user;

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
        lastname,
        email,
        password,
        cedula,
        telefono,
        barrio,
        direccion,
        genero,
        role,
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
        <h1>Cree usuarios internos</h1>
      </div>
      <div className="login_page">
        <h2>Registro</h2>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}

        <form onSubmit={handleSubmit}>
          <br />
          <br />
          <div className="newUser">
            <label htmlFor="name">Nombre </label>
            <br />
            <input
              type="text"
              placeholder="Ingresa tu nombre"
              id="name"
              value={name}
              name="name"
              onChange={handleChangeInput}
            />
          </div>
          <br />
          <div className="newUser">
            <label htmlFor="lastname">Apellidos </label>
            <br />
            <input
              type="text"
              placeholder="Ingresa tus apellidos"
              id="lastname"
              value={lastname}
              name="lastname"
              onChange={handleChangeInput}
            />
          </div>
          <br />
          <div>
            <label htmlFor="cedula">Cedula </label>
            <br />
            <input
              type="text"
              placeholder="Ingresa tu cedula"
              id="cedula"
              value={cedula}
              name="cedula"
              onChange={handleChangeInput}
            />
          </div>
          <br />
          <div>
            <label htmlFor="telefono">Telefono </label>
            <br />
            <input
              type="text"
              placeholder="Ingresa tu telefono"
              id="telefono"
              value={telefono}
              name="telefono"
              onChange={handleChangeInput}
            />
          </div>
          <br />
          <label htmlFor="sexo">Genero </label>
          <div className="radio-user">
            <br />
            <input
              id="genero"
              type="radio"
              name="genero"
              value="hombre"
              onChange={handleChangeInput}
            />
            Hombre
            <input
              id="genero"
              type="radio"
              name="genero"
              value="mujer"
              onChange={handleChangeInput}
            />{" "}
            Mujer
            <input
              id="genero"
              type="radio"
              name="genero"
              value="otro"
              onChange={handleChangeInput}
            />{" "}
            Otro
          </div>
          {/*<br />
          <div>
            <input type="date" name="date" value="" min="1997-01-01" max="2030-12-31" />
          </div>*/}
          <br />
          <div>
            <label htmlFor="direccion">Dirección </label>
            <br />
            <input
              type="text"
              placeholder="Ingresa tu dirección"
              id="direccion"
              value={direccion}
              name="direccion"
              onChange={handleChangeInput}
            />
          </div>
          <br />
          <div>
            <label htmlFor="barrio">Barrio </label>
            <br />
            <input
              type="text"
              placeholder="Ingresa tu Barrio o municipio"
              id="barrio"
              value={barrio}
              name="barrio"
              onChange={handleChangeInput}
            />
          </div>
          <br />
          <div>
            <label htmlFor="email">Correo electrónico </label>
            <br />
            <input
              type="text"
              placeholder="Ingresa tu correo"
              id="email"
              value={email}
              name="email"
              onChange={handleChangeInput}
            />
          </div>
          <br />
          <div>
            <label htmlFor="password">Contraseña </label>
            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              id="password"
              value={password}
              name="password"
              onChange={handleChangeInput}
            />
          </div>
          <br />
          <div>
            <label htmlFor="cf_password">Confirmar contraseña </label>
            <input
              type="password"
              placeholder="Confirma tu contraseña"
              id="cf_password"
              value={cf_password}
              name="cf_password"
              onChange={handleChangeInput}
            />
          </div>
          <input
            id="role"
            type="checkbox"
            name="role"
            value={2}
            onChange={handleChangeInput}
          />
          <br />
          <p>Aceptar términos y condiciones de la plataforma.</p>
          <br />

          <br />
          <div className="row">
            <button type="submit">Registrar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewUserI;
