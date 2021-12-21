import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { isEmpty } from "../../utils/validation/Validation";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import {
  fetchAllUsers,
  dispatchGetAllUsers,
} from "../../../redux/actions/usersAction";
const initialState = {
  codigo: "",
  nombre: "",
  cedula: "",
  area: "",
  direccion: "",
  barrio: "",
  err: "",
  success: ""
};

function EditPredios() {
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const users = useSelector((state) => state.users);
  const [callback, setCallback] = useState(false);
  const dispatch = useDispatch();
  const { user, isAdmin, useri } = auth;
  const [predio, setPredio] = useState(initialState);
  const { codigo, nombre, cedula, area, direccion, barrio, err, success} = predio;

  useEffect(() => {
    if (useri) {
      fetchAllUsers(token).then((res) => {
        dispatch(dispatchGetAllUsers(res));
      });
    }
  }, [token, useri, dispatch, callback]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setPredio({ ...predio, [name]: value, err: "", success: "" });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
   
   
  
    try {
      const res = await axios.post("/user/register-predio", {
        codigo,
        nombre,
        area,
        cedula,
        barrio,
        direccion,
        err,
        success
      });

      setPredio({ ...predio, err: "", success: res.data.msg });
    } catch (err) {

      err.response.data.msg &&
        setPredio({ ...predio, err: err.response.data.msg, success: "" });
    }
  };
  return (
    <div>
     <table className="customers">
        <thead>
          
            <tr>
              
              <th>Nombre</th>
              
              <th>Administrar</th>
            </tr>
          
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              
              <td>{user.name}</td>
              
              
              <td>
                <Link to={`/asignar_predio/${user._id}`}>
                  <button  title="Añadir predio">Añadir predio</button>
                </Link>
               
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EditPredios;
