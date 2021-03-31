import React from 'react'
import s from './AddMessage.module.css'
import { Field, reduxForm } from "redux-form"
import { Textarea } from '../../../common/FormsControls/FormsControls'
import { required, maxLengthCreator } from '../../../../utilts/validators/validators'

const maxLength30 = maxLengthCreator(30)

const AddMessage = props => {
    return (
        <form className={s.add} onSubmit={props.handleSubmit}>
            <Field className={s.message} component={ Textarea } name='message' validate={ [required, maxLength30] } />
            <button type='submit' className={s.btn}>Отправить</button>
        </form>
    )
}

export default reduxForm({ form: 'addMessage' })(AddMessage)