import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import logo from "../../assets/images/logo.svg";

function Header() {
  const auth = useSelector((state) => state.auth);

  const { user, isLogged } = auth;

  const handleLogout = async () => {
    try {
      await axios.get("/user/logout");
      localStorage.removeItem("firstLogin");
      window.location.href = "/";
    } catch (err) {
      window.location.href = "/";
    }
  };

  const userLink = () => {
    return (
      <li className="drop-nav">
        <Link to="#" className="avatar">
          <img src={user.avatar} alt="" /> {user.name}{" "}
          <i className="fas fa-angle-down"></i>
        </Link>
        <ul className="dropdown">
          <li>
            <Link to="/profile">Perfil</Link>
          </li>
          <li>
            <Link to="/" onClick={handleLogout}>
              Cerrar sesión
            </Link>
          </li>
        </ul>
      </li>
    );
  };

  const transForm = {
    transform: isLogged ? "translateY(-5px)" : 0,
  };

  return (
    <header>
      <div className="logo">
      
        <h1>
          <Link to="/">
          <div id="logo">
            <img
              src={logo}
              className="app-logo"
              alt="Logotipo"
              name="lol"
            />
             </div>
            
             <strong>CATASTRO</strong>App
            
           
          </Link>
        </h1>
      </div>

      <ul style={transForm}>
        {isLogged ? (
          userLink()
        ) : (
          <div>
          <li>
            <Link to="/login">
              <i className="fas fa-user"></i> Iniciar sesión
            </Link>
          </li>
          <li>
          <Link to="/register">
            <i className="fas fa-user"></i> Registrate
          </Link>
        </li>
        </div>
        )}
      </ul>
    </header>
  );
}

export default Header;
