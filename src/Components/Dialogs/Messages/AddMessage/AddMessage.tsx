import React, { FC, FormEventHandler } from 'react'
import s from './AddMessage.module.css'
import { Field, InjectedFormProps, reduxForm } from "redux-form"
import { Textarea } from '../../../common/FormsControls/FormsControls'
import { required, maxLengthCreator } from '../../../../utilts/validators/validators'

const maxLength30 = maxLengthCreator(30)

type AddMessageType = {
    handleSubmit: FormEventHandler<HTMLFormElement>
}

const AddMessage: FC<InjectedFormProps<AddMessageType>> = props => {
    return (
        <form className={s.add} onSubmit={props.handleSubmit}>
            <Field className={s.message} component={ Textarea } name='message' validate={ [required, maxLength30] } />
            <button type='submit' className={s.btn}>Отправить</button>
        </form>
    )
}

export default reduxForm<AddMessageType>({ form: 'addMessage' })(AddMessage)