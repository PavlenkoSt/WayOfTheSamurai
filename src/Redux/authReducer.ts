import { ActionTypes } from './reduxStore';
import { ResultCodeEnum, CaptchaEnum } from './../api/api';
import { AnyAction, Store } from 'redux'
import { stopSubmit } from 'redux-form'
import { ThunkAction } from 'redux-thunk'
import DAL from '../api/api'

const SET_USER_DATA = 'SET_USER_DATA'
const REMOVE_USER_DATA = 'REMOVE_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS'

const initialValue = {
    id: '',
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null,
}

type InitialValueType = typeof initialValue
type ActionType = ActionTypes<typeof authActions>

const authReducer = (state = initialValue, action: ActionType):InitialValueType => {
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
                isAuth: false,
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

const authActions = {
    setAuthUserData: (id: string, email: string, login: string) => ({ type: SET_USER_DATA, data: {id, email, login}} as const),
    removeAuthUserData: () => ({ type: REMOVE_USER_DATA } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({ type: GET_CAPTCHA_URL_SUCCESS, captchaUrl } as const)
}
type thunkType = ThunkAction<void, Store, unknown, AnyAction>

export const authUser = (): thunkType => dispatch => {
    return DAL.auth.authMy().then((data:any) => {
        if(data.resultCode === ResultCodeEnum.success){
            const {id, email, login} = data.data
            dispatch(authActions.setAuthUserData(id, email, login))
            return 1
        }
    })
}

export const login = (email?: string, password?: string, isRemember?: boolean, captcha?: string): thunkType => dispatch => {
    return DAL.auth.login(email, password, isRemember, captcha).then( (data:any) => {
        if(data.resultCode === 0){
            dispatch(authUser())
        }else{
            if(data.resultCode === CaptchaEnum.captcha){
                dispatch(getCaptchaUrl())
            }
            dispatch(stopSubmit('login', { _error: data.messages[0]}))
        }
    })
}

export const getCaptchaUrl = (): thunkType => async (dispatch: any) => {
    const responce = await DAL.security.getCaptchaUrl()
    const captchaUrl = responce.data.url
    dispatch(authActions.getCaptchaUrlSuccess(captchaUrl))
}

export const logout = (): thunkType => (dispatch: any) => {
    return DAL.auth.logout().then( (data: any) => {
        if(data.resultCode === ResultCodeEnum.success){
            dispatch(authActions.removeAuthUserData())
        }
    })
}
export default authReducer