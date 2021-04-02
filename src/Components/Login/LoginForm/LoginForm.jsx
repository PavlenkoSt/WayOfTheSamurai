import { reduxForm } from "redux-form"
import { Input } from "../../common/FormsControls/FormsControls"
import s from './LoginForm.module.css'
import { required } from '../../../utilts/validators/validators'
import formControl from '../../common/FormsControls/FormsControls.module.css'
import { FieldCreator } from '../../common/FormsControls/FormsControls'
const LoginForm = props => {
    return (
        <form className={s.form} onSubmit={props.handleSubmit}>
            { FieldCreator(s.input, Input, required, 'Логин', 'login') }
            { FieldCreator(s.input, Input, required, 'Пароль', 'password', 'password') }
            { FieldCreator(s.checkbox, 'input', null, null, 'save', 'checkbox', 'запомнить меня') }
            { props.captchaUrl && <img className={s.captcha} src={props.captchaUrl}/>}
            { props.captchaUrl && FieldCreator(s.input, Input, required, 'Введите символы с картинки', 'captcha' ) }
            {props.error && (
                <div className={ formControl.errorForm }>
                    {props.error}
                </div>
            )}
            <div>
                <button className={s.btn} type='submit'>Войти</button>
            </div>
        </form>
    )
}

export default reduxForm({ form: 'login' })(LoginForm)