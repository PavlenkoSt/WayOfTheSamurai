import React from 'react'
import AddMessageForm from './AddMessageForm/AddMessageForm'
import Messages from './Messages/Messages'

function Chat() {
    return (
        <div>
            Chat
            <Messages/>
            <AddMessageForm/>
        </div>
    )
}

export default Chat
