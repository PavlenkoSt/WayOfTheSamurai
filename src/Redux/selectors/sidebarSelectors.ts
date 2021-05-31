import { AppStateType } from '../reduxStore'

export const friendsSelector = (state: AppStateType) => state.sidebar.friends
export const linksSelector = (state: AppStateType) => state.sidebar.links