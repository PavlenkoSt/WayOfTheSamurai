import React, { FC, useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'

type AddMessageFormType = {
    message?: string
}

type AddMessageFormPropsType = {
    webSocketChannel: WebSocket | null
}

const AddMessageForm: FC<AddMessageFormPropsType> = ({webSocketChannel}) => {

    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

    useEffect(() => {
        const openHandler = () => {
            setReadyStatus('ready')
        }

        webSocketChannel?.addEventListener('open', openHandler)

        return () => webSocketChannel?.removeEventListener('open', openHandler)
    }, [webSocketChannel])

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
                webSocketChannel?.send(values.message)
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
                    disabled={isSubmitting || webSocketChannel === null || readyStatus !== 'ready'}
                >Отправить</button>
            </Form>
            )}
        </Formik>
    )
}

export default AddMessageForm
