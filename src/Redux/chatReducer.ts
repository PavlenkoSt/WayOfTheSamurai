import { AnyAction, Dispatch, Store } from 'redux'
import { ThunkAction } from 'redux-thunk'
import chatApi, { ChatMessageType } from '../api/chatApi'

const SET_MESSAGES = 'SET_MESSAGES'
const CHANGE_STATUS = 'CHANGE_STATUS'

const initialValue = {
    messages: [] as Array<ChatMessageType & {id: string}>,
    status: 'pending' as StatusType
}

export type StatusType = 'pending' | 'connect' | 'error'

type InitialValueType = typeof initialValue
type ThunkType = ThunkAction<void, Store, unknown, AnyAction>

const chatReducer = (state = initialValue, action: any): InitialValueType => {
    switch(action.type){
        case SET_MESSAGES: {
            return {
                ...state,
                messages: [...state.messages, ...action.messages.map((m: any) => ({...m, id: Date.now()}))]
                    .filter((m, i, arr) => i > arr.length - 100)
            }
        }
        case CHANGE_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        default:
            return state
    }
}

export const chatActions = {
    setMessages: (messages: Array<ChatMessageType>) => ({ type: SET_MESSAGES, messages }),
    statusChanged: (status: StatusType) => ({ type: CHANGE_STATUS, status })
}

let _messageHandler: ((messages: Array<ChatMessageType>) => void) | null = null 
let _statusHandler: ((status: StatusType) => void) | null = null 

const thunkMessageHandlerCreator = (dispatch: Dispatch) => {
    if(_messageHandler === null){
        _messageHandler = (messages: Array<ChatMessageType>) => {
           dispatch(chatActions.setMessages(messages))
        }
    }
    return _messageHandler
}

const thunkStatusHandlerCreator = (dispatch: Dispatch) => {
    if(_statusHandler === null){
        _statusHandler = (status: StatusType) => {
           dispatch(chatActions.statusChanged(status))
        }
    }
    return _statusHandler
}

export const startMessageListening = (): ThunkType => dispatch => {
    chatApi.start()
    chatApi.subscribe('messages-received', thunkMessageHandlerCreator(dispatch))
    chatApi.subscribe('status-changed', thunkStatusHandlerCreator(dispatch))
}

export const stopMessageListening = (): ThunkType => dispatch => {
    chatApi.unsubcribe('messages-received', thunkMessageHandlerCreator(dispatch))
    chatApi.unsubcribe('status-changed', thunkStatusHandlerCreator(dispatch))
    chatApi.stop()
}

export const sendMessage = (message: string): ThunkType => () => {
    chatApi.sendMessage(message)
}

export default chatReducer 