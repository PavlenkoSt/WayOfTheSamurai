import DAL from '../api/api'
import { changeFollowedStatus } from '../utilts/helpers/helpers'

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const FETCHING_LOADER_TOGGLE = 'FETCHING_LOADER_TOGGLE'
const FOLLOWING_PROGRESS = 'FOLLOWING_PROGRESS'

export const follow = id => ({ type: FOLLOW, id})
export const unfollow = id => ({ type: UNFOLLOW, id })
export const setUsers = users => ({ type: SET_USERS, users })
export const setTotalCount = totalCount => ({ type: SET_TOTAL_COUNT, totalCount })
export const setCurrentPage = currentPage => ({ type: SET_CURRENT_PAGE, currentPage })
export const changeLoaderVisible = isFetching => ({ type: FETCHING_LOADER_TOGGLE, isFetching })
export const followingProgressChange = (isFetching, userId) => ({ type: FOLLOWING_PROGRESS, isFetching, userId })

const initialValue = {
    users: [],
    usersCountOnPage: 10,
    totalCount: 0,
    currentPage: 1,
    portionsSize: 10,
    isFetching: true,
    followingProgress: []
}
const usersReducer = (state = initialValue, action) => {
    switch(action.type){
        case FOLLOW: 
            return {
                ...state,
                users: changeFollowedStatus(state.users, action.id, true)
            }

        case UNFOLLOW: 
            return {
                ...state,
                users: changeFollowedStatus(state.users, action.id, false)
            }

        case SET_USERS: 
            return {
                ...state,
                users: action.users
            }

        case SET_TOTAL_COUNT:
            return {
                ...state,
                totalCount: action.totalCount
            }

        case SET_CURRENT_PAGE: 
            return {
                ...state,
                currentPage: action.currentPage
            }

        case FETCHING_LOADER_TOGGLE: 
            return {
                ...state,
                isFetching: action.isFetching
            }

        case FOLLOWING_PROGRESS: 
            return action.isFetching 
                ? { ...state, followingProgress: [...state.followingProgress, action.userId]} 
                : { ...state, followingProgress: [state.followingProgress.filter(id => id !== action.userId)]}

        default:
            return state
    }
}

export const getUsers = (usersCountOnPage, currentPage) => async dispatch => {
    dispatch(changeLoaderVisible(true))
    const data = await DAL.users.getUsers(usersCountOnPage, currentPage)
    await dispatch(setUsers(data.items))
    dispatch(changeLoaderVisible(false))
    return data
}

const fieldFollowUnfollow = async (dispatch, DALMethod, action, id) => {
    dispatch(followingProgressChange(true, id))
    const data = await DALMethod(id)
    if (data.resultCode === 0) {
        dispatch(action(id))
    }
    dispatch(followingProgressChange(false, id))
}

export const unfollowUser = id => dispatch => {
    fieldFollowUnfollow(dispatch, DAL.users.unfollow, unfollow, id)
}

export const followUser = id => dispatch => {
    fieldFollowUnfollow(dispatch, DAL.users.follow, follow, id)
}

export default usersReducer