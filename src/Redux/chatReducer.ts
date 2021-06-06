import { AnyAction, Dispatch, Store } from 'redux';
import { ThunkAction } from 'redux-thunk';
import chatApi, { ChatMessageType } from '../api/chatApi';
import { ActionTypes } from './reduxStore'

const SET_MESSAGES = 'SET_MESSAGES'

const initialValue = {
    messages: [] as Array<ChatMessageType>
}

type InitialValueType = typeof initialValue
type ActionType = ActionTypes<typeof chatActions>
type ThunkType = ThunkAction<void, Store, unknown, AnyAction>

const chatReducer = (state = initialValue, action: ActionType): InitialValueType => {
    switch(action.type){
        case SET_MESSAGES: {
            return {
                ...state,
                messages: [...state.messages, ...action.messages]
            }
        }
        default:
            return state
    }
}

export const chatActions = {
    setMessages: (messages: Array<ChatMessageType>) => ({ type: SET_MESSAGES, messages})
}

let _messageHandler: ((messages: Array<ChatMessageType>) => void) | null = null 

const thunkMessageHandlerCreator = (dispatch: Dispatch) => {
    if(_messageHandler === null){
        _messageHandler = (messages: Array<ChatMessageType>) => {
           dispatch(chatActions.setMessages(messages))
        }
    }
    return _messageHandler
}

export const startMessageListening = (): ThunkType => dispatch => {
    chatApi.start()
    chatApi.subscribe(thunkMessageHandlerCreator(dispatch))
}

export const stopMessageListening = (): ThunkType => dispatch => {
    chatApi.unsubcribe(thunkMessageHandlerCreator(dispatch))
    chatApi.stop()
}

export const sendMessage = (message: string): ThunkType => () => {
    chatApi.sendMessage(message)
}

export default chatReducer 