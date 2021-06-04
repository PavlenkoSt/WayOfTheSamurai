import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { chatActions } from '../../../Redux/chatReducer'
import { chatMessagesSelector } from '../../../Redux/selectors/chatSelectors'
import Message from './Message/Message'
import s from './Messages.module.scss'


const Messages: FC<any> = ({webSocketChannel}) => {
    const dispatch = useDispatch()
    const messages = useSelector(chatMessagesSelector)

    useEffect(() => {
        const messageHandler = (e: any) => {
            console.log(e);
            dispatch(chatActions.setMessages(JSON.parse(e.data)))
        }
        webSocketChannel.addEventListener('message', messageHandler)
    }, [])

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
