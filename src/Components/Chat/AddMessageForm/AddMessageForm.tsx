import React, { FC } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'

type AddMessageFormType = {
    message?: string
}

const AddMessageForm: FC<any> = ({webSocketChannel}) => {
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
                webSocketChannel.send(values.message)
                resetForm()
                setSubmitting(false)
            }}
        >
            {({ isSubmitting }) => (
            <Form>
                <Field type="text" name="message" />
                <ErrorMessage name="message" component="div" />
                <button type="submit" disabled={isSubmitting}>
                Отправить
                </button>
            </Form>
            )}
        </Formik>
    )
}

export default AddMessageForm
