import React, { Component } from "react";
import {Link} from "react-router-dom";
class EditPredios extends Component {
  render() {
    return (
      <div>
        <form className="mid-form">
          <div>
            <label htmlFor="nombre">Código</label>
            <input className="form-input" type="text" name="nombre" />
          </div>
          <div>
            <label htmlFor="nombre">Nombre</label>
            <input className="form-input" type="text" name="nombre" />
          </div>
          <div>
            <label htmlFor="nombre">Cédula</label>
            <input className="form-input" type="text" name="nombre" />
          </div>
          <div>
            <label htmlFor="nombre">Área del predio</label>
            <input className="form-input" type="text" name="nombre" />
          </div>
          <div>
            <label htmlFor="nombre">Dirección</label>
            <input className="form-input" type="text" name="nombre" />
          </div>
          <div>
            <label htmlFor="nombre">Barrio</label>
            <input className="form-input" type="text" name="nombre" />
          </div>
          <div >
              <button className="crear-predio">
                <strong>Crear predio</strong>
              </button>
              <Link className="button-link" to="/profile">
              <button className="crear-predio">
                <strong>Volver</strong>
              </button>
              </Link>
              </div>
           
        </form>
      </div>
    );
  }
}

export default EditPredios;
