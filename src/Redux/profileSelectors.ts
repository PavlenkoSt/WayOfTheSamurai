import { AppStateType } from './reduxStore'

export const postsSelector = (state: AppStateType) => state.profilePage.posts
export const statusSelector = (state: AppStateType) => state.profilePage.status
export const userProfileSelector = (state: AppStateType) => state.profilePage.userProfile
