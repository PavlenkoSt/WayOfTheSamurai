let subscribers = [] as Array<subscribersType>

let ws: WebSocket | null = null

const createChannel = () => {
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('close', closeHandler)
    ws?.close()

    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    ws?.addEventListener('close', closeHandler)
    ws?.addEventListener('message', messageHandler)
}

const closeHandler = () => {
    console.log('WS CHANNEL CLOSED')

    setTimeout(() => {
        createChannel()
    }, 3000)
}

const messageHandler = (e: any) => {
    const messages = JSON.parse(e.data)
    subscribers.forEach(cb => cb(messages))
}

const chatApi = {   
    start(){
        createChannel()
    },
    stop(){
        subscribers = []
        ws?.removeEventListener('message', messageHandler)
        ws?.removeEventListener('close', closeHandler)
        ws?.close()
    },
    subscribe(callback: subscribersType){
        subscribers.push(callback)
    },
    unsubcribe(callback: subscribersType){
        subscribers = subscribers.filter(cb => cb !== callback)
    },
    sendMessage(message: string){
        ws?.send(message)
    }
}

export default chatApi

type subscribersType = (messages: Array<ChatMessageType>) => void

export type ChatMessageType = {
    message: string
    userName: string
    userId: number
    photo: string
}