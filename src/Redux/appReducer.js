import { authUser } from './authReducer'

const SET_INITIALIZE = 'SET_INITIALIZE'

const initialValue = {
    initialized: false
}

const appReducer = (state = initialValue, action) => {
    switch(action.type){
        case SET_INITIALIZE: 
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

const setInitialize = () => ({ type: SET_INITIALIZE })

export const initializeApp = () => dispatch => {
    dispatch(authUser()).then( () => { 
        dispatch(setInitialize())
     } )
}

export default appReducer