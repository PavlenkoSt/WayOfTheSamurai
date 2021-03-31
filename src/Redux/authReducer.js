import { stopSubmit } from 'redux-form'
import DAL from '../api/api'

const SET_USER_DATA = 'SET_USER_DATA'
const REMOVE_USER_DATA = 'REMOVE_USER_DATA'

const initialValue = {
    id: '',
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state = initialValue, action) => {
    switch(action.type){
        case SET_USER_DATA: 
            return {
                ...state,
                ...action.data,
                isAuth: true,
            }
        case REMOVE_USER_DATA: 
            return {
                ...state,
                id: '',
                email: null,
                login: null,
                isAuth: false
            }
        default:
            return state
    }
}

const setAuthUserData = (id, email, login) => ({ type: SET_USER_DATA, data: {id, email, login}})
const removeAuthUserData = () => ({ type: REMOVE_USER_DATA })

export const authUser = () => dispatch => {
    return DAL.auth.authMy().then(data => {
        if(data.resultCode === 0){
            const {id, email, login} = data.data
            dispatch(setAuthUserData(id, email, login))
            return 1
        }
    })
}

export const login = (email, password, isRemember) => dispatch => {
    return DAL.auth.login(email, password, isRemember).then( data => {
        if(data.resultCode === 0){
            dispatch(authUser())
        }else{
            dispatch(stopSubmit('login', { _error: data.messages[0]}))
        }
    })
}

export const logout = () => dispatch => {
    return DAL.auth.logout().then( data => {
        if(data.resultCode === 0){
            dispatch(removeAuthUserData())
        }
    })
}
export default authReducer