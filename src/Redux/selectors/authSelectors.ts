import { AppStateType } from '../reduxStore'

export const idSelector = (state: AppStateType) => state.auth.id
export const emailSelector = (state: AppStateType) => state.auth.email
export const loginSelector = (state: AppStateType) => state.auth.login
export const isAuthSelector = (state: AppStateType) => state.auth.isAuth
export const captchaUrlSelector = (state: AppStateType) => state.auth.captchaUrl