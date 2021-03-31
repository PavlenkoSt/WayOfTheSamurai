import profileReducer from './profileReducer'
import dialogsReducer from './dialogsReducer'

const store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: "Привет, это новая социальная сеть! Ура!"},
                {id: 2, message: "Почему меня никто не любит?"},
            ],
            newPostText: '',
        },
        dialogsPage: {
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
            newMessageText: '',
        },
        sidebar: {
            links: [
                {id:1 , url: '/profile', text: 'Профиль'},
                {id:2 , url: '/dialogs', text: 'Диалоги'},
                {id:3 , url: '/news', text: 'Новости'},
                {id:4 , url: '/musics', text: 'Музыка'},
                {id:5 , url: '/settings', text: 'Настройки'},
            ],
            friends: [
                {id:1, name: 'Дмитрий'},
                {id:2, name: 'Маша'},
                {id:3, name: 'Дед Мороз'},
                {id:4, name: 'Валюха'},
            ]
        }
    },
    _rerenderEntireTree() {
        return 
    },
    getState(){
        return this._state
    },
    subscribe(observer) {
        this._rerenderEntireTree = observer
    },
    dispatch(action){
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        
        this._rerenderEntireTree(this._state)
    },
}


export default store