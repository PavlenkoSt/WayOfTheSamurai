import { ActionTypes } from './reduxStore'

const SET_MESSAGES = 'SET_MESSAGES'

type ChatMessagesType = any

const initialValue = {
    messages: [] as ChatMessagesType
}

type InitialValueType = typeof initialValue
type ActionType = ActionTypes<typeof chatActions>

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
    setMessages: (messages: ChatMessagesType) => ({ type: SET_MESSAGES, messages})
}

export default chatReducer 