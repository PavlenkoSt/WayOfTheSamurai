import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { sendMessage } from '../../../Redux/chatReducer'

type AddMessageFormType = {
    message?: string
}

const AddMessageForm: FC = () => {

    const dispatch = useDispatch()

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
                <Field type="text" name="message" />
                <ErrorMessage name="message" component="div" />
                <button 
                    type="submit" 
                    disabled={isSubmitting}
                >Отправить</button>
            </Form>
            )}
        </Formik>
    )
}

export default AddMessageForm
