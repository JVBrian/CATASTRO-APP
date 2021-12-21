import React, { Component } from "react";
import { Link } from "react-router-dom";

class ProfileButtonsA extends Component {
  render() {
    return (
      <div>
        <Link className="button-link" to="/user/profile-information">
          <button className="button-predio">
            <strong>Mi información </strong>
          </button>
        </Link >
        <Link className="button-link" to="/new-user">
        <button className="button-predio">
            <strong>Crear usuarios internos</strong>
          </button>
          </Link>

        <Link className="button-link" to="/user/gestion">
          <button className="button-predio">
            <strong>Gestionar usuarios</strong>
          </button>
        </Link>
        

        
      </div>
    );
  }
}

export default ProfileButtonsA;