import { stopSubmit } from 'redux-form'
import DAL from '../api/api'

const SET_USER_DATA = 'SET_USER_DATA'
const REMOVE_USER_DATA = 'REMOVE_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS'

const initialValue = {
    id: '',
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
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
        case GET_CAPTCHA_URL_SUCCESS: 
            return {
                ...state,
                captchaUrl: action.captchaUrl
            }
        default:
            return state
    }
}

const setAuthUserData = (id, email, login) => ({ type: SET_USER_DATA, data: {id, email, login}})
const removeAuthUserData = () => ({ type: REMOVE_USER_DATA })
const getCaptchaUrlSuccess = captchaUrl => ({ type: GET_CAPTCHA_URL_SUCCESS, captchaUrl })

export const authUser = () => dispatch => {
    return DAL.auth.authMy().then(data => {
        if(data.resultCode === 0){
            const {id, email, login} = data.data
            dispatch(setAuthUserData(id, email, login))
            return 1
        }
    })
}

export const login = (email, password, isRemember, captcha) => dispatch => {
    return DAL.auth.login(email, password, isRemember, captcha).then( data => {
        if(data.resultCode === 0){
            dispatch(authUser())
        }else{
            if(data.resultCode === 10){
                dispatch(getCaptchaUrl())
            }
            dispatch(stopSubmit('login', { _error: data.messages[0]}))
        }
    })
}

export const getCaptchaUrl = () => async dispatch => {
    const responce = await DAL.security.getCaptchaUrl()
    const captchaUrl = responce.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export const logout = () => dispatch => {
    return DAL.auth.logout().then( data => {
        if(data.resultCode === 0){
            dispatch(removeAuthUserData())
        }
    })
}
export default authReducer