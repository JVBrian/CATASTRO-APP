import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import { dispatchLogin } from "../../../redux/actions/authAction";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";

const initialState = {
  email: "",
  password: "",
  err: "",
  success: "",
};

function Login() {
  const [user, setUser] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();

  const { email, password, err, success } = user;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/user/login", { email, password });
      setUser({ ...user, err: "", success: res.data.msg });

      localStorage.setItem("firstLogin", true);

      dispatch(dispatchLogin());
      history.push("/");
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };

  const responseGoogle = async (response) => {
    try {
      const res = await axios.post("/user/google_login", {
        tokenId: response.tokenId,
      });

      setUser({ ...user, error: "", success: res.data.msg });
      localStorage.setItem("firstLogin", true);

      dispatch(dispatchLogin());
      history.push("/");
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };

  const responseFacebook = async (response) => {
    try {
      const { accessToken, userID } = response;
      const res = await axios.post("/user/facebook_login", {
        accessToken,
        userID,
      });

      setUser({ ...user, error: "", success: res.data.msg });
      localStorage.setItem("firstLogin", true);

      dispatch(dispatchLogin());
      history.push("/");
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <div>
      <div id="slider" class="slider-small">
        <h1>Puedes iniciar sesión para consultar tus productos</h1>
      </div>
      <div className="login_page">
        <h2>Iniciar sesión</h2>

        <br></br>
        <br></br>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="text"
              placeholder="ingresa tu correo"
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
              placeholder="ingresa tu contraseña"
              id="password"
              value={password}
              name="password"
              onChange={handleChangeInput}
            />
          </div>

          <div className="row">
            <button type="submit">Iniciar sesión</button>
          </div>
          <br></br>
          <Link to="/forgot_password">¿Olvidaste tu contraseña?</Link>
        </form>

        <div className="hr">O inicia sesión con: </div>

        <div className="social">
          <GoogleLogin
            clientId="1091627771354-k9435rbvsb252ec9tau0b5lo7pvt3ptg.apps.googleusercontent.com"
            buttonText="Inicia sesión con google"
            onSuccess={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
          {/*
                <FacebookLogin
                appId="403764421449300"
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook} 
                />
                */}
        </div>

        <p>
          ¿No tienes un cuenta? <Link to="/register">Crear cuenta</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
