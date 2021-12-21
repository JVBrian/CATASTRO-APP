import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  showSuccessMsg,
  showErrMsg,
} from "../../utils/notification/Notification";
import {
    isEmpty,
    
  } from "../../utils/validation/Validation";
import editUser from "./EditUser";

const initialState = {
    codigo:"",
    nombre:"",
    area:"",
    barrio:"",
    direccion:"",
    cedula:"",
    err: "",
  success: "",
  };

function AsignarPredio() {

const [predio, setPredio] = useState(initialState);
const {
    codigo,
    area,
    err,
    success,
    cedula,
    direccion,
    barrio,
    nombre
  } = predio;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setPredio({ ...predio, [name]: value, err: "", success: "" });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await axios.post('/user/asignar_predio/:id', {
       nombre:editUser.name,
        area,
        cedula:editUser.cedula,
        barrio:editUser.barrio,
        direccion:editUser.direccion,
        codigo
        
       
      });

      setPredio({ ...predio, err: "", success: res.data.msg });
    } catch (err) {
      err.response.data.msg &&
        setPredio({ ...predio, err: err.response.data.msg, success: "" });
    }
  };
  const { id } = useParams();
  const history = useHistory();
  const [editUser, setEditUser] = useState([]);

  const users = useSelector((state) => state.users);
  const token = useSelector((state) => state.token);

  const [checkAdmin, setCheckAdmin] = useState(false);
  
  
  const [num, setNum] = useState(0);

  useEffect(() => {
    if (users.length !== 0) {
      users.forEach((user) => {
        if (user._id === id) {
          setEditUser(user);
          setCheckAdmin(user.role === 1 ? true : false);
        }
      });
    } else {
      history.push("/profile");
    }
  }, [users, id, history]);



  return (
    
    <div className="profile_page edit_user">
        
      <div className="row">
        <button onClick={() => history.goBack()} className="go_back">
          <i className="fas fa-long-arrow-alt-left"></i> Volver
        </button>
      </div>
      <form className="form-Predio" onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "center", margin:"40px" }} >Asignar Predio</h2>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        <label htmlFor="nombre">Nombre: </label>
        <input
          type="text"
          name="nombre"
          label="Nombre"
          id="nombre"
          style={{ width: "15%" }}
          placeholder={editUser.name}
          onChange={handleChangeInput}
          disable
          
          
        />
        
        <label htmlFor="cedula">Cédula: </label>
        <input
          type="text"
          name="cedula"
          label="Cédula"
          id="cedula"
          style={{ width: "20%" }}
          placeholder={editUser.cedula}
          onChange={handleChangeInput}
          disable
          
        />
        <br/>
        
        
        <br />
        <label htmlFor="barrio">Barrio: </label>
        <input
          type="text"
          name="barrio"
          
          id="barrio"
          style={{ width: "30%" }}
          placeholder={editUser.barrio}
          onChange={handleChangeInput}
          disable
          
        />
        <label htmlFor="direccion">Dirección: </label>
        <input
          type="text"
          name="direccion"
          
          id="direccion"
          style={{ width: "40%" }}
          placeholder={editUser.direccion}
          onChange={handleChangeInput}
          disable
          
        />
        <label htmlFor="codigo">Código: </label>
        <input
          type="text"
          name="codigo"
          
          id="codigo"
          style={{ width: "10%" }}
          onChange={handleChangeInput}
          value={codigo}
          
        />
         <label htmlFor="area">Area: </label>
        <input
          type="text"
          name="area"
          id="area"
          style={{ width: "10%" }}
          onChange={handleChangeInput}
          value={area}
          
        />
        <div className="row">
            <button type="submit">Registrar</button>
          </div>
      </form>



      
            
        

    </div>
  );
}

export default AsignarPredio;
