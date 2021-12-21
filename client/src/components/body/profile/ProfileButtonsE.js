import React, { Component } from "react";
import { Link } from "react-router-dom";

class ProfileButtonsE extends Component {
  render() {
    return (
      <div>
        <Link className="button-link" to="/user/profile-information">
          <button className="button-predio">
            <strong>Mi información </strong>
          </button>
        </Link>

        <Link className="button-link" to="/user/consultar-predios">
          <button className="button-predio">
            <strong>Ver mis predios</strong>
          </button>
        </Link>

        <Link className="button-link" to="/user/pago-predios">
          <button className="button-predio">
            <strong>Pagos y convenios</strong>
          </button>
        </Link>

        
      </div>
    );
  }
}

export default ProfileButtonsE;