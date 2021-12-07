import React, { Component } from "react";
import { Link } from "react-router-dom";


class CrearPredios extends Component {
  render() {
    return (
      <div>
        <button className="button-predio">
          <strong><Link className="button-link" to="/user/crear-predios"> Crear predio</Link> </strong>
        </button>
        <button className="button-predio">
          <strong>Consultar predio</strong>
        </button>
        <button className="button-predio" type="submit">
          <strong>
            <Link className="button-link" to="/user/convenios">
              {" "}
              Convenios de pago
            </Link>{" "}
          </strong>
        </button>
      </div>
    );
  }
}

export default CrearPredios;
