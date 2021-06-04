import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { chatActions } from '../../../Redux/chatReducer'
import { chatMessagesSelector } from '../../../Redux/selectors/chatSelectors'
import Message from './Message/Message'
import s from './Messages.module.scss'

const webSocketChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

const Messages = () => {
    const dispatch = useDispatch()
    const messages = useSelector(chatMessagesSelector)

    useEffect(() => {
        webSocketChannel.addEventListener('message', e => {
            console.log(e);
            dispatch(chatActions.setMessages(JSON.parse(e.data)))
        })
    }, [])

    const messagesItems = messages.map(message => <Message
        username={message.userName}
        photo={message.photo}
        message={message.message}
    />)

    return (
        <div className={s.messages}>
            {messagesItems}
        </div>
    )
}

export default Messages
