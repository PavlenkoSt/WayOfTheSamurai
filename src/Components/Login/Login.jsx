import LoginForm from "./LoginForm/LoginForm"
import { connect } from 'react-redux'
import { login } from '../../Redux/authReducer'
import { Redirect } from 'react-router-dom'


const Login = props => {
    const onSubmit = formData => {
        props.login(formData.login, formData.password, formData.save, formData.captcha)
    }
    if(props.isAuth){
        return <Redirect to='/profile'/>
    }
    return (
        <div>
            <h2>Вход</h2>
            <LoginForm captchaUrl={props.captchaUrl} onSubmit={onSubmit} />
        </div>
    )
}

const mapStateToProps = state => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, { login } )(Login)