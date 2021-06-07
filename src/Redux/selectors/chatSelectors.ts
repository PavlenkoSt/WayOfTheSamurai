import { AppStateType } from '../reduxStore'

export const chatMessagesSelector = (state: AppStateType) => state.chat.messages
export const chatStatusSelector = (state: AppStateType) => state.chat.status