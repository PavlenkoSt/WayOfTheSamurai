import React from 'react'
import AddMessageForm from './AddMessageForm/AddMessageForm'
import Messages from './Messages/Messages'

function Chat() {
    return (
        <div>
            <h2>Чат</h2>
            <Messages/>
            <AddMessageForm/>
        </div>
    )
}

export default Chat
