import React, {Component} from 'react';
import EditPredios from '../profile/EditPredios';

class CrearPredios extends Component{
    render(){
        return(
            <div>
        <div id="slider" class="slider-small">
          <h1>Seleccionar propietario</h1>
        </div>
        <EditPredios />
      </div>
      
        )
    }
}

export default CrearPredios;