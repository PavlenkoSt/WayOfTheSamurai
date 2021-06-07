import { StatusType } from "../Redux/chatReducer"

let subscribers = {
    'messages-received': [] as Array<MessageSubscribersType>,
    'status-changed': [] as Array<StatusSubscribersType>
}

type EventNameType = 'messages-received' | 'status-changed'

let ws: WebSocket | null = null

const createChannel = async () => {
    clearListeners()
    ws?.close()

    ws = await new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    changeStatus('pending')
    ws?.addEventListener('close', closeHandler)
    ws?.addEventListener('message', messageHandler)
    ws?.addEventListener('open', openHandler)
    ws?.addEventListener('error', errorHandler)
}

const clearListeners = () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
}

const openHandler = () => {
    changeStatus('connect')
}

const closeHandler = () => {
    changeStatus('pending')
    setTimeout(() => {
        createChannel()
    }, 3000)
}

const errorHandler = () => {
    console.log('Some error. Please refresh page!');
    
}

const messageHandler = (e: any) => {
    const messages = JSON.parse(e.data)
    subscribers['messages-received'].forEach(cb => cb(messages))
}

const changeStatus = (status: StatusType) => {
    subscribers["status-changed"].forEach(cb => cb(status))
}

const chatApi = {   
    start(){
        createChannel()
    },
    stop(){
        subscribers['messages-received'] = []
        subscribers['status-changed'] = []
        clearListeners()
        ws?.close()
    },
    subscribe(eventName: EventNameType ,callback: StatusSubscribersType | MessageSubscribersType){
        //@ts-ignore
        subscribers[eventName].push(callback)
    },
    unsubcribe(eventName: EventNameType, callback: StatusSubscribersType | MessageSubscribersType){
        //@ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(cb => cb !== callback)
    },
    sendMessage(message: string){
        ws?.send(message)
    }
}

export default chatApi

type MessageSubscribersType = (messages: Array<ChatMessageType>) => void
type StatusSubscribersType = (status: StatusType) => void

export type ChatMessageType = {
    message: string
    userName: string
    userId: number
    photo: string
}