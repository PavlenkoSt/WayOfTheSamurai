type LinksType = {
    id: number
    url: string
    text: string
}

export type FriendsType = {
    id: number
    name: string
}

const initialValue = {
    links: [
        {id:1 , url: '/profile', text: 'Профиль'},
        {id:2 , url: '/dialogs', text: 'Диалоги'},
        {id:3 , url: '/users', text: 'Люди'},
        {id:4 , url: '/news', text: 'Новости'},
        {id:5 , url: '/musics', text: 'Музыка'},
        {id:6 , url: '/settings', text: 'Настройки'},
    ] as Array<LinksType> ,
    friends: [
        {id:1, name: 'Дмитрий'},
        {id:2, name: 'Маша'},
        {id:3, name: 'Дед Мороз'},
        {id:4, name: 'Валюха'},
    ] as Array<FriendsType>
}

type InitialValueType = typeof initialValue

const sidebarReducer = (state = initialValue, action: any): InitialValueType => {
    switch(action.type){
        default: return state
    }
}

export default sidebarReducer