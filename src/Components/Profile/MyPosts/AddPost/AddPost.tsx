import React, { ComponentType, FormEventHandler } from 'react'
import s from './AddPost.module.css'
import { InjectedFormProps, reduxForm } from "redux-form"
import { required, maxLengthCreator } from '../../../../utilts/validators/validators'
import { FieldCreator, Textarea } from '../../../common/FormsControls/FormsControls'

const maxLength30 = maxLengthCreator(30)

type AddPostType = {
    handleSubmit : FormEventHandler<HTMLFormElement>
    postText: string
}

type FormDataType = {
    postText: string
}

type NameTypesKeys = Extract<keyof FormDataType, string>

const AddPost:ComponentType<InjectedFormProps<AddPostType>> = props => {
    return (
        <form className={s.addPost} onSubmit={props.handleSubmit}>
            { FieldCreator<NameTypesKeys>(undefined, Textarea, [required, maxLength30], '', 'postText') }
            <button className={s.button} type='submit'>Отправить</button>
        </form>
    )
}

export default reduxForm<AddPostType>({ form: 'addPost' })(AddPost)