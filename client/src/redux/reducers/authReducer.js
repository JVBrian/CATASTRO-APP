import ACTIONS from '../actions/'

const initialState = {
    user: [],
    isLogged: false,
    isAdmin: false,
    useri: false
}

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTIONS.LOGIN:
            return {
                ...state,
                isLogged: true
            }
        case ACTIONS.GET_USER:
            return {
                ...state,
                user: action.payload.user,
                isAdmin: action.payload.isAdmin,
                useri: action.payload.useri
            }
        default:
            return state
    }
}

export default authReducer