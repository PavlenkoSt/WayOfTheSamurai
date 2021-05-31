import LoginForm from "./LoginForm/LoginForm"
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../Redux/authReducer'
import { Redirect } from 'react-router-dom'
import { FC } from "react"
import { isAuthSelector } from "../../Redux/selectors/authSelectors"

type LoginFormDataType = {
    login?: string
    password?: string
    save?: boolean
    captcha?: string 
}

const Login: FC = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector(isAuthSelector)

    const onSubmit = (formData: LoginFormDataType) => {
        dispatch(login(formData.login, formData.password, formData.save, formData.captcha))
    }
    
    if(isAuth){
        return <Redirect to='/profile'/>
    }
    
    return (
        <div>
            <h2>Вход</h2>
            <LoginForm onSubmit={onSubmit} />
        </div>
    )
}

export default Login