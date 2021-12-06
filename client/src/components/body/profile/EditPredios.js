import React, { Component } from "react";

class EditPredios extends Component {
  render() {
    return (
      <div>
        <form className="mid-form">
          <div className="form-group">
            <label htmlFor="nombre">Código</label>
            <input type="text" name="nombre" />
          </div>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input type="text" name="nombre" />
          </div>
          <div className="form-group">
            <label htmlFor="nombre">Cédula</label>
            <input type="text" name="nombre" />
          </div>
          <div className="form-group">
            <label htmlFor="nombre">Área del predio</label>
            <input type="text" name="nombre" />
          </div>
          <div className="form-group">
            <label htmlFor="nombre">Dirección</label>
            <input type="text" name="nombre" />
          </div>
          <div className="form-group">
            <label htmlFor="nombre">Barrio</label>
            <input type="text" name="nombre" />
          </div>
        </form>
      </div>
    );
  }
}

export default EditPredios;
