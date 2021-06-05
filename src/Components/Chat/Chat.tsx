import React, { useEffect, useState } from 'react'
import AddMessageForm from './AddMessageForm/AddMessageForm'
import Messages from './Messages/Messages'

const Chat = () => {

    const [webSocketChannel, setWebSocketChannel] = useState<WebSocket | null>(null)

    useEffect(() => {
        let ws: WebSocket

        const closeHandler = () => {
            console.log('WS CHANNEL CLOSED')
        }

        const createChannel = () => {
            ws?.removeEventListener('close', closeHandler)
            ws?.close()

            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            ws.addEventListener('close', closeHandler)
            setWebSocketChannel(ws)
        }

        createChannel()

        return () => {
            ws?.removeEventListener('close', closeHandler)
            ws?.close()
        }
    }, [])

    return (
        <div>
            <h2>Чат</h2>
            <Messages webSocketChannel={webSocketChannel}/>
            <AddMessageForm webSocketChannel={webSocketChannel}/>
        </div>
    )
}

export default Chat
