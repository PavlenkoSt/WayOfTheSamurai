const SEND_MESSAGE = 'SEND-MESSAGE'

export const sendMessage = message => ({ type: SEND_MESSAGE, message })

const initialValue = {
    users: [
        {name: "Виталий", id: 1},
        {name: "Маша", id: 2},
        {name: "Дед Мороз", id: 3},
    ],
    messages: [
        {id:1, name:"Я", message: "Привет, как дела?"},
        {id:2, name:"Я", message: "Привет, хорошо, а у тебя?"},
        {id:3, name:"Я", message: "Эх, биполярка моя..."}, 
        {id:4, name:"Я", message: "Кто-нибудь здесь есть?"},
    ],
}

const dialogsReducer = (state = initialValue, action) => {
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

export default dialogsReducer 