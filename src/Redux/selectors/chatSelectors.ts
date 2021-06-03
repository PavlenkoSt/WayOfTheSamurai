import { AppStateType } from '../reduxStore'

export const chatMessagesSelector = (state: AppStateType) => state.chat.messages