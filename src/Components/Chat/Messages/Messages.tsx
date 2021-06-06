import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { chatMessagesSelector } from '../../../Redux/selectors/chatSelectors'
import Message from './Message/Message'
import s from './Messages.module.scss'

const Messages: FC = () => {
    const messages = useSelector(chatMessagesSelector)

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
