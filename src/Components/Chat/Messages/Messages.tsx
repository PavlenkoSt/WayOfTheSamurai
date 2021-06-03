import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { chatActions } from '../../../Redux/chatReducer'

const webSocketChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

const Messages = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        webSocketChannel.addEventListener('message', e => {
            console.log(e);
            dispatch(chatActions.setMessages(JSON.parse(e.data)))
        })
    }, [])

    return (
        <div>
            Messages
        </div>
    )
}

export default Messages
