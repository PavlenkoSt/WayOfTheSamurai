import React from 'react'
import s from './AddPost.module.css'
import { Field, reduxForm } from "redux-form"
import { required, maxLengthCreator } from '../../../../utilts/validators/validators'
import { Textarea } from '../../../common/FormsControls/FormsControls'

const maxLength10 = maxLengthCreator(10)

const AddPost = props => {
    return (
        <form className={s.addPost} onSubmit={props.handleSubmit}>
            <Field placeholder="Что у вас нового?" component={ Textarea } name='postText' validate={ [required, maxLength10] } />
            <button className={s.button} type='submit'>Отправить</button>
        </form>
    )
}

export default reduxForm({ form: 'addPost' })(AddPost)