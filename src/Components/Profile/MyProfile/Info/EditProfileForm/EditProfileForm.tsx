import { FieldCreator, Input, Textarea } from "../../../../common/FormsControls/FormsControls"
import { InjectedFormProps, reduxForm } from "redux-form"
import s from './EditProfileForm.module.css'
import formControl from '../../../../common/FormsControls/FormsControls.module.css'
import { FC, FormEventHandler, MouseEventHandler } from "react"

type ProfileFormValuesType = {
    editModeChange: (status: boolean) => void
    contacts: Object
}

const EdtiProfileForm: FC<InjectedFormProps<{}, ProfileFormValuesType> & ProfileFormValuesType> = props => {

    const cancelEditMode: MouseEventHandler<HTMLButtonElement> = e => {
        props.editModeChange(false)
        e.preventDefault()
    }

     const getLinks = () => {
        return Object.keys(props.contacts)
            .map( link => <div key={link} className={s.item}><label > <span> {link} </span> { FieldCreator(s.input, Input, [], '', 'contacts.' + link) } </label></div> )
     }

    return (
        <form className={s.form} onSubmit={ props.handleSubmit }>
            <div className={s.item}>
                <label>
                    <span>Полное имя: </span> { FieldCreator(s.input, Input, [], '', 'fullName') }
                </label>
            </div>
            <div className={s.item}>
                <label>
                    <span>Обо мне: </span> { FieldCreator(s.textarea, Textarea, [], '', 'aboutMe') }
                </label>
            </div>
            <div className={s.item}>
                <label className={s.checkbox}>
                    <span>Ищу работу: </span>{ FieldCreator(undefined, Input, [], '', 'lookingForAJob', 'checkbox') }
                </label>
            </div>
            <div className={s.item}>
                <label>
                    <span>Профессиональные навыки: </span> { FieldCreator(s.textarea, Textarea, [], '', 'lookingForAJobDescription') }
                </label>
            </div>
            { getLinks() }
            <div className={s.btnsArea}>
                <button className={s.btn} onClick={cancelEditMode}>Отмена</button>
                <button className={s.btn} type='submit'>Сохранить</button>
            </div>
            {props.error && (
                <div className={ formControl.errorForm }>
                    {props.error}
                </div>
            )}
        </form>
           
    )
}

export default reduxForm<{}, ProfileFormValuesType>({ form: 'profile-info' })(EdtiProfileForm)