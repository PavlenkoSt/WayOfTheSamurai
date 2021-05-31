import { AppStateType } from '../reduxStore'

export const usersSelector = (state: AppStateType) => state.dialogsPage.users
export const messagesSelector = (state: AppStateType) => state.dialogsPage.messages
export const newMessageTextSelector = (state: AppStateType) => state.dialogsPage.newMessageText