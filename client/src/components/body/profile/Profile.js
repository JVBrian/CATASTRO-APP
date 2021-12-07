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
} from "../../../redux/actions/usersAction";
import CrearPredio from './CrearPredio';


const initialState = {
  name: "",
  password: "",
  cf_password: "",
  err: "",
  success: "",
};

function Profile() {
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);

  const users = useSelector((state) => state.users);

  const { user, isAdmin, useri } = auth;
  const [data, setData] = useState(initialState);
  const { name, password, cf_password, err, success } = data;

  const [avatar, setAvatar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = useState(false);

  const dispatch = useDispatch();

  let type = useri ? "Perfil usuario interno" : "Perfil usuario externo";

  useEffect(() => {
    if (isAdmin) {
      fetchAllUsers(token).then((res) => {
        dispatch(dispatchGetAllUsers(res));
      });
    }
  }, [token, isAdmin, dispatch, callback]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const changeAvatar = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];

      if (!file)
        return setData({
          ...data,
          err: "Ningun archivo fue cargado.",
          success: "",
        });

      if (file.size > 1024 * 1024)
        return setData({ ...data, err: "Tamaño muy largo", success: "" });

      if (
        file.type !== "image/jpeg" &&
        file.type !== "image/png" &&
        file.type !== "image/jpg"
      )
        return setData({
          ...data,
          err: "El formato del archivo es incorrecto",
          success: "",
        });

      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      const res = await axios.post("/api/upload_avatar", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });

      setLoading(false);
      setAvatar(res.data.url);
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
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

  const updatePassword = () => {
    if (isLength(password))
      return setData({
        ...data,
        err: "La contraseña debe tener al menos 6 caracteres.",
        success: "",
      });

    if (!isMatch(password, cf_password))
      return setData({
        ...data,
        err: "La contraseña es distinta",
        success: "",
      });

    try {
      axios.post(
        "/user/reset",
        { password },
        {
          headers: { Authorization: token },
        }
      );

      setData({ ...data, err: "", success: "Actualización realizada" });
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  const handleUpdate = () => {
    if (name || avatar) updateInfor();
    if (password) updatePassword();
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
    <>
      <div>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        {loading && <h3>Cargando...</h3>}
      </div>
      <div className="profile_page">
        <div className="col-left">
          <h2>{isAdmin ? "Perfil Administrador " : type}</h2>

          <div className="avatar">
            <img src={avatar ? avatar : user.avatar} alt="" />
            <span>
              <i className="fas fa-camera"></i>
              <p>Cambiar</p>
              <input
                type="file"
                name="file"
                id="file_up"
                onChange={changeAvatar}
              />
            </span>
          </div>
          <br />

          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={user.name}
              placeholder="Escribe tu nombre"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              name="email"
              id="email"
              defaultValue={user.email}
              placeholder="Escribe tu correo"
              disabled
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Nueva contraseña</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Escribe tu contraseña"
              value={password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="cf_password">Confirmar tu nueva contraseña</label>
            <input
              type="password"
              name="cf_password"
              id="cf_password"
              placeholder="Confirma tu contraseña"
              value={cf_password}
              onChange={handleChange}
            />
          </div>

          <button className="button-update" disabled={loading} onClick={handleUpdate}>
            Actualizar
          </button>
        </div>

        <div className="col-right">
          <div className="profile-role">
            {/*<h2>{isAdmin ? " Gestión de usuarios" : "Gestión de predios"}</h2>*/}
            {user.role === 2 && (
              <CrearPredio />
            )}
          </div>
          <div style={{ overflowX: "auto" }}>
            <table className="customers">
              <thead>
                {users.map((user) => (
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Admin</th>
                    <th>Gestión</th>
                  </tr>
                ))}
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.role === 1 ? (
                        <i className="fas fa-check" title="Admin"></i>
                      ) : (
                        <i className="fas fa-times" title="User"></i>
                      )}
                    </td>
                    <td>
                      <Link to={`/edit_user/${user._id}`}>
                        <i className="fas fa-edit" title="Edit"></i>
                      </Link>
                      <i
                        className="fas fa-trash-alt"
                        title="Remove"
                        onClick={() => handleDelete(user._id)}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
