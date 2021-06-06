import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { startMessageListening, stopMessageListening } from '../../Redux/chatReducer'
import AddMessageForm from './AddMessageForm/AddMessageForm'
import Messages from './Messages/Messages'

const Chat = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessageListening())
        return () => {
            dispatch(stopMessageListening())
        }
    }, [])

    return (
        <div>
            <h2>Чат</h2>
            <Messages/>
            <AddMessageForm/>
        </div>
    )
}

export default Chat
