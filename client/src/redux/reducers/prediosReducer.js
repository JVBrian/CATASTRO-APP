import ACTIONS from '../actions/'

const predios =[]

const prediosReducer = (state = predios, action) => {
    switch(action.type){
        case ACTIONS.GET_ALL_USERS:
            return action.payload
        default:
            return state
    }
}

export default prediosReducer