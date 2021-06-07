import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sendMessage } from '../../../Redux/chatReducer'
import { chatStatusSelector } from '../../../Redux/selectors/chatSelectors'

type AddMessageFormType = {
    message?: string
}

const AddMessageForm: FC = () => {
    const dispatch = useDispatch()

    const status = useSelector(chatStatusSelector)

    return (
        <Formik
            initialValues={{ message: '' }}
            validate={values => {
                const errors: AddMessageFormType = {}
                if (!values.message || values.message === '') {
                    errors.message = 'Required'
                }
                return errors
            }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                dispatch(sendMessage(values.message))
                resetForm()
                setSubmitting(false)
            }}
        >
            {({ isSubmitting }) => (
            <Form>
                <Field type="text" name="message" as='textarea'/>
                <ErrorMessage name="message" component="div" />
                <button 
                    type="submit" 
                    disabled={isSubmitting || status !== 'connect'}
                >Отправить</button>
            </Form>
            )}
        </Formik>
    )
}

export default AddMessageForm
