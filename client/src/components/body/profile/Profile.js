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
import ProfileButtonsI from "./ProfileButtonsI";
import ProfileButtonsE from "./ProfileButtonsE";
import ProfileButtonsA from "./ProfileButtonsA";

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
        <div className="col-form">
          <h2>{isAdmin ? "Perfil Administrador " : type}</h2>

          <div className="avatar">
            <img src={avatar ? avatar : user.avatar} alt="" />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="cedula">Cédula</label>
            <input
              type="text"
              name="cedula"
              id="cedula"
              defaultValue={user.cedula}
              onChange={handleChange}
              disabled
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={user.name}
              onChange={handleChange}
              disabled
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastname">Apellidos</label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              defaultValue={user.lastname}
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              name="email"
              id="email"
              defaultValue={user.email}
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="telefono">Telefono</label>
            <input
              type="text"
              name="telefono"
              id="telefono"
              defaultValue={user.telefono}
              onChange={handleChange}
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="genero">Sexo</label>
            <input
              type="text"
              name="genero"
              id="genero"
              defaultValue={user.genero}
              onChange={handleChange}
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="barrio">Barrio</label>
            <input
              type="text"
              name="barrio"
              id="barrio"
              defaultValue={user.barrio}
              onChange={handleChange}
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="direccion">Dirección</label>
            <input
              type="text"
              name="direccion"
              id="direccion"
              defaultValue={user.direccion}
              onChange={handleChange}
              disabled
            />
          </div>
        </div>

        <div className="col-right">
          <div className="profile-role">
            {/*<h2>{isAdmin ? " Gestión de usuarios" : "Gestión de predios"}</h2>*/}
            {user.role === 2 && <ProfileButtonsI />}
            {user.role === 0 && <ProfileButtonsE />}
            {user.role === 1 && <ProfileButtonsA />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
