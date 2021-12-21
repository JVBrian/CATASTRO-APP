import {combineReducers} from 'redux'
import auth from './authReducer'
import token from './tokenReducer'
import users from './usersReducer'
import predios from './prediosReducer'

export default combineReducers({
    auth,
    token,
    users,
    predios
})