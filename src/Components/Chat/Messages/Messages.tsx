import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { chatActions } from '../../../Redux/chatReducer'
import { chatMessagesSelector } from '../../../Redux/selectors/chatSelectors'
import Message from './Message/Message'
import s from './Messages.module.scss'

type MessagesPropsType = {
    webSocketChannel: WebSocket | null
}

const Messages: FC<MessagesPropsType> = ({webSocketChannel}) => {
    const dispatch = useDispatch()
    const messages = useSelector(chatMessagesSelector)

    useEffect(() => {
        const messageHandler = (e: any) => {
            dispatch(chatActions.setMessages(JSON.parse(e.data)))
        }

        webSocketChannel?.addEventListener('message', messageHandler)

        return () => {
            webSocketChannel?.removeEventListener('message', messageHandler)
            webSocketChannel?.close()
        }
    }, [webSocketChannel])

    const messagesItems = messages.map((message, i) => <Message
        key={i}
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
