import React from 'react'
import AddMessageForm from './AddMessageForm/AddMessageForm'
import Messages from './Messages/Messages'

const Chat = () => {

const webSocketChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

    return (
        <div>
            <h2>Чат</h2>
            <Messages webSocketChannel={webSocketChannel}/>
            <AddMessageForm webSocketChannel={webSocketChannel}/>
        </div>
    )
}

export default Chat
