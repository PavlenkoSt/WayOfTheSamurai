import { InjectedFormProps, reduxForm } from "redux-form"
import { Input } from "../../common/FormsControls/FormsControls"
import s from './LoginForm.module.css'
import { required } from '../../../utilts/validators/validators'
import formControl from '../../common/FormsControls/FormsControls.module.css'
import { FieldCreator } from '../../common/FormsControls/FormsControls'
import { FormEventHandler } from "react"

type LoginProps = {
    handleSubmit: FormEventHandler<HTMLFormElement>,
    captchaUrl: string | undefined
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
    return (
        <form className={s.form} onSubmit={props.handleSubmit}>
            { FieldCreator<NameTypesKeys>(s.input, Input, required, 'Логин', 'login') }
            { FieldCreator<NameTypesKeys>(s.input, Input, required, 'Пароль', 'password', 'password') }
            { FieldCreator<NameTypesKeys>(s.checkbox, 'input', [], undefined, 'save', 'checkbox', 'запомнить меня') }
            { props.captchaUrl && <img className={s.captcha} src={props.captchaUrl}/>}
            { props.captchaUrl && FieldCreator<NameTypesKeys>(s.input, Input, required, 'Введите символы с картинки', 'captcha' ) }
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