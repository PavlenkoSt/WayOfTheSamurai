import { FormEventHandler } from "react"
import { useSelector } from "react-redux"
import { reduxForm } from "redux-form"
import { captchaUrlSelector } from "../../../Redux/selectors/authSelectors"
import { required } from '../../../utilts/validators/validators'
import { FieldCreator, Input } from "../../common/FormsControls/FormsControls"
import formControl from '../../common/FormsControls/FormsControls.module.scss'
import s from './LoginForm.module.scss'

type LoginProps = {
    handleSubmit: FormEventHandler<HTMLFormElement>,
    error: string
}

type NameFieldsType = {
    login: string,
    password: string
    save: boolean
    captcha: string | undefined
  }
  
type NameTypesKeys = Extract<keyof NameFieldsType, string>

const LoginForm: any = (props: LoginProps) => {
    const captchaUrl = useSelector(captchaUrlSelector)

    return (
        <form className={s.form} onSubmit={props.handleSubmit}>
            { FieldCreator<NameTypesKeys>(s.input, Input, required, 'Логин', 'login') }
            { FieldCreator<NameTypesKeys>(s.input, Input, required, 'Пароль', 'password', 'password') }
            { FieldCreator<NameTypesKeys>(s.checkbox, 'input', [], undefined, 'save', 'checkbox', 'запомнить меня') }
            { captchaUrl && <img className={s.captcha} src={captchaUrl}/>}
            { captchaUrl && FieldCreator<NameTypesKeys>(s.input, Input, required, 'Введите символы с картинки', 'captcha' ) }
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

export default reduxForm<any>({ form: 'login' })(LoginForm)