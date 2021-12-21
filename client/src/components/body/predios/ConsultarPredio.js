import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { isLength, isMatch } from "../../utils/validation/Validation";
import {
  showSuccessMsg,
  showErrMsg,
} from "../../utils/notification/Notification";
import {
  fetchAllUsers,
  dispatchGetAllUsers,
} from "../../../redux/actions/predioAction";

const initialState = {
  name: "",
  password: "",
  cf_password: "",
  err: "",
  success: "",
};

function ConsultarPredio() {
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);

  const predios = useSelector((state) => state.predios);

  const { user, isAdmin, useri, predio } = auth;
  const [data, setData] = useState(initialState);
  const { name, password, cf_password, err, success } = data;

  const [avatar, setAvatar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (useri) {
      fetchAllUsers(token).then((res) => {
        dispatch(dispatchGetAllUsers(res));
      });
    }
  }, [token, useri, dispatch, callback]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const updateInfor = () => {
    try {
      axios.patch(
        "/user/update",
        {
          name: name ? name : user.name,
          avatar: avatar ? avatar : user.avatar,
        },
        {
          headers: { Authorization: token },
        }
      );

      setData({ ...data, err: "", success: "Actualización realizada" });
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  const handleDelete = async (id) => {
    try {
      if (user._id !== id) {
        if (
          window.confirm("¿Estás seguro de que quieres eliminar esta cuenta? ")
        ) {
          setLoading(true);
          await axios.delete(`/user/delete/${id}`, {
            headers: { Authorization: token },
          });
          setLoading(false);
          setCallback(!callback);
        }
      }
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <div>
      <div id="slider" class="slider-small">
        <h1>Gestione sus predios registrados</h1>
      </div>
      <div style={{ overflowX: "auto" }}>
       
        <table className="customers">
          <thead>
            {user.role === 2 && (
              <tr>
                <th>ID</th>
                <th>Código</th>
                <th>Nombre</th>
                <th>cédula</th>
                <th>Área</th>
                <th>Dirección</th>
                <th>Barrio</th>

                <th>Gestionar</th>
              </tr>
            )}
          </thead>
          <tbody>
            {predios.map((predio) => (
              <tr key={predio._id}>
                <td>{predio._id}</td>
                <td>{predio.codigo}</td>
                <td>{predio.nombre}</td>
                <td>{predio.cedula}</td>
                <td>{predio.area}</td>
                <td>{predio.direccion}</td>
                <td>{predio.barrio}</td>

                <td>
                  <Link to={`/edit_user/${predio._id}`}>
                    <i className="fas fa-edit" title="Edit"></i>
                  </Link>
                  <i
                    className="fas fa-trash-alt"
                    title="Remove"
                    onClick={() => handleDelete(predio._id)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ConsultarPredio;
