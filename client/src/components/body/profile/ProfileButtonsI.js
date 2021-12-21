import React, { Component } from "react";
import { Link } from "react-router-dom";

class ProfileButtonsI extends Component {
  render() {
    return (
      <div>
        <Link className="button-link" to="/user/profile-information">
          <button className="button-predio">
            <strong> Mi información </strong>
          </button>
        </Link>
        <Link className="button-link" to="/user/crear-predios">
          <button className="button-predio">
            <strong>Crear predio </strong>
          </button>
        </Link>

        <Link className="button-link" to="/user/consultar-predios">
          <button className="button-predio">
            <strong>Ver predios</strong>
          </button>
        </Link>

        <Link className="button-link" to="/user/convenios">
          <button className="button-predio" type="submit">
            <strong> Convenios de pago</strong>
          </button>
        </Link>
       
      </div>
    );
  }
}

export default ProfileButtonsI;
