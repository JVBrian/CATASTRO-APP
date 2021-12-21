import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import ActivationEmail from './auth/ActivationEmail'
import NotFound from '../utils/NotFound/NotFound'

import ForgotPass from '../body/auth/ForgotPassword'
import ResetPass from '../body/auth/ResetPassword'

import Profile from '../body/profile/Profile'
import EditUser from '../body/profile/EditUser'
import Convenios from '../body/predios/Convenios'
import CrearPredios from './predios/CrearPredios'
import ConsultarPredio from './predios/ConsultarPredio'
import ProfileUser from './profile/ProfileUser'
import AdminUser from './profile/AdminUser'

import Home from '../body/home/Home'

import {useSelector} from 'react-redux'
import PagoPredios from './predios/PagoPredios'
import NewUserI from './profile/NewUserI'
import AsignarPredio from './profile/AsignarPredio'




function Body() {
    const auth = useSelector(state => state.auth)
    const {isLogged, isAdmin} = auth
    return (
        <section>
            <Switch>
                <Route path="/" component={Home} exact />

                <Route path="/login" component={isLogged ? NotFound : Login} exact />
                <Route path="/register" component={isLogged ? NotFound : Register} exact />

                <Route path="/forgot_password" component={isLogged ? NotFound : ForgotPass} exact />
                <Route path="/user/reset/:token" component={isLogged ? NotFound : ResetPass} exact />

                <Route path="/user/activate/:activation_token" component={ActivationEmail} exact />
                <Route path="/asignar_predio/:id" component={isLogged ? AsignarPredio : NotFound} exact />
                <Route path="/profile" component={isLogged ? Profile : NotFound} exact />
                <Route path="/edit_user/:id" component={isAdmin ? EditUser : NotFound} exact />
                <Route path="/user/convenios" component={isLogged ? Convenios : NotFound} exact />
                <Route path="/user/crear-predios" component={isLogged ? CrearPredios : NotFound} exact />
                <Route path="/user/predio-user" component={isLogged ? CrearPredios : NotFound} exact />
                <Route path="/user/consultar-predios" component={isLogged ? ConsultarPredio : NotFound} exact />
                <Route path="/user/profile-information" component={isLogged ? ProfileUser : NotFound} exact />
                <Route path="/user/gestion" component={isAdmin ? AdminUser : NotFound} exact />
                <Route path="/user/pago-predios" component={isLogged ? PagoPredios : NotFound} exact />
                <Route path="/new-user" component={isAdmin ? NewUserI : NotFound} exact />
            </Switch>
        </section>
    )
}

export default Body
