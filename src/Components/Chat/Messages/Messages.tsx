import React, { memo, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { chatMessagesSelector } from '../../../Redux/selectors/chatSelectors'
import Message from './Message/Message'
import s from './Messages.module.scss'

const Messages = memo(() => {
    const messageRef = useRef<HTMLDivElement>(null)
    const [autoScroll, setAutoScroll] = useState(true)
    const messages = useSelector(chatMessagesSelector)

    const messagesItems = messages.map((message, i) => <Message
        key={i}
        username={message.userName}
        photo={message.photo}
        message={message.message}
    />)

    const scrollHandler = (e:React.UIEvent) => {
        if(Math.abs((e.currentTarget.scrollHeight - e.currentTarget.scrollTop) - e.currentTarget.clientHeight) < 100){
            !autoScroll && setAutoScroll(true)
        }else{
            autoScroll && setAutoScroll(false)
        }
    }

    useEffect(() => {
        if(autoScroll){
            messageRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])

    return (
        <div className={s.messages} onScroll={scrollHandler}>
            {messagesItems}
            <div ref={messageRef}></div>
        </div>
    )
})

export default Messages