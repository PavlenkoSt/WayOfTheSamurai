import { AppStateType } from '../reduxStore'

export const usersSelector = (state: AppStateType) => state.usersPage.users
export const usersCountOnPageSelector = (state: AppStateType) => state.usersPage.usersCountOnPage
export const totalCountSelector = (state: AppStateType) => state.usersPage.totalCount
export const currentPageSelector = (state: AppStateType) => state.usersPage.currentPage
export const portionsSizeSelector = (state: AppStateType) => state.usersPage.portionsSize
export const isFetchingSelector = (state: AppStateType) => state.usersPage.isFetching
export const followingProgressSelector = (state: AppStateType) => state.usersPage.followingProgress
export const filteredOptionsSelector = (state: AppStateType) => state.usersPage.filteredOptions