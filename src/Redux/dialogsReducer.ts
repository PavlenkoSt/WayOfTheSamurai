import { ActionTypes } from './reduxStore';
const SEND_MESSAGE = 'SEND-MESSAGE'

type UsersType = {
    name: string
    id: number
}

type MessagesType = {
    id: number
    name: string
    message: string
}

const initialValue = {
    users: [
        {name: "Виталий", id: 1},
        {name: "Маша", id: 2},
        {name: "Дед Мороз", id: 3},
    ] as Array<UsersType> ,
    messages: [
        {id:1, name:"Я", message: "Привет, как дела?"},
        {id:2, name:"Я", message: "Привет, хорошо, а у тебя?"},
        {id:3, name:"Я", message: "Эх, биполярка моя..."}, 
        {id:4, name:"Я", message: "Кто-нибудь здесь есть?"},
    ] as Array<MessagesType> ,
    newMessageText: ''
}

type InitialValueType = typeof initialValue
type ActionType = ActionTypes<typeof dialogsActions>

const dialogsReducer = (state = initialValue, action: ActionType): InitialValueType => {
    switch(action.type){
        case SEND_MESSAGE: {
            const mess = { id: 5, name: 'Я', message: action.message }
            return {
                ...state,
                messages: [...state.messages, mess]
            }
        }
        default:
            return state
    }
}

export const dialogsActions = {
    sendMessage: (message: string) => ({ type: SEND_MESSAGE, message } as const)
}

export default dialogsReducer 