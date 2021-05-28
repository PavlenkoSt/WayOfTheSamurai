import LoginForm from "./LoginForm/LoginForm"
import { connect } from 'react-redux'
import { login } from '../../Redux/authReducer'
import { Redirect } from 'react-router-dom'
import { AppStateType } from '../../Redux/reduxStore'
import { FC } from "react"

type MapStatePropsType = {
    isAuth: boolean
    captchaUrl: string | null
}

type MapDispatchPropsType = {
    login: (email?: string, password?: string, isRemember?: boolean, captcha?: string) => void
}

export type LoginPropsType = {
    isAuth: boolean
    captchaUrl: string | null
    login: (email?: string, password?: string, isRemember?: boolean, captcha?: string) => void
}

type LoginFormDataType = {
    login?: string
    password?: string
    save?: boolean
    captcha?: string 
}

const Login: FC<LoginPropsType> = props => {
    const onSubmit = (formData: LoginFormDataType) => {
        props.login(formData.login, formData.password, formData.save, formData.captcha)
    }
    if(props.isAuth){
        return <Redirect to='/profile'/>
    }
    return (
        <div>
            <h2>Вход</h2>
            <LoginForm {...props.captchaUrl} onSubmit={onSubmit} />
        </div>
    )
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect<MapStatePropsType, MapDispatchPropsType, LoginPropsType, AppStateType>(mapStateToProps, { login } )(Login)