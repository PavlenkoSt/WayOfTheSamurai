import { ActionTypes } from './reduxStore';
import { PhotosForProfileType } from './../types/types';
import DAL from '../api/api'
import { changeFollowedStatus } from '../utilts/helpers/helpers'
import { ThunkAction } from 'redux-thunk';
import { AnyAction, Store } from 'redux';

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const FETCHING_LOADER_TOGGLE = 'FETCHING_LOADER_TOGGLE'
const FOLLOWING_PROGRESS = 'FOLLOWING_PROGRESS'

export const usersActions = {
    follow: (id: number) => ({ type: FOLLOW, id } as const),
    unfollow: (id: number) => ({ type: UNFOLLOW, id } as const),
    setUsers:  (users: Array<any>) => ({ type: SET_USERS, users } as const),
    setTotalCount:  (totalCount: number) => ({ type: SET_TOTAL_COUNT, totalCount } as const),
    setCurrentPage: (currentPage: number) => ({ type: SET_CURRENT_PAGE, currentPage } as const),
    changeLoaderVisible: (isFetching: boolean) => ({ type: FETCHING_LOADER_TOGGLE, isFetching } as const),
    followingProgressChange: (isFetching: boolean, userId: number) => ({ type: FOLLOWING_PROGRESS, isFetching, userId } as const)
}

type UsersType = {
    id: number
    name: string
    status: string
    photos: PhotosForProfileType
    followed: boolean
}

const initialValue = {
    users: [] as Array<UsersType> ,
    usersCountOnPage: 10,
    totalCount: 0,
    currentPage: 1,
    portionsSize: 10,
    isFetching: true,
    followingProgress: [] as Array<any> // array of urers ids
}

type InitialValueType = typeof initialValue
type ActionType = ActionTypes<typeof usersActions>

const usersReducer = (state = initialValue, action: ActionType): InitialValueType => {
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
                : { ...state, followingProgress: [state.followingProgress.filter((id: number) => id !== action.userId)]}

        default:
            return state
    }
}

type ThunkType = ThunkAction<void, Store, unknown, AnyAction>

export const getUsers = (usersCountOnPage: number, currentPage: number): ThunkType => async dispatch => {
    dispatch(usersActions.changeLoaderVisible(true))
    const data = await DAL.users.getUsers(usersCountOnPage, currentPage)
    await dispatch(usersActions.setUsers(data.items))
    dispatch(usersActions.changeLoaderVisible(false))
    return data
}

type DalType = {
    resultCode: number
    messages: Array<string>
    data: Object
}

const fieldFollowUnfollow = async (dispatch: (action: ActionType) => void , DALMethod: (id:number) => Promise<DalType>, action: (id:number) => ActionType, id: number) => {
    dispatch(usersActions.followingProgressChange(true, id))
    const data = await DALMethod(id)
    if (data.resultCode === 0) {
        dispatch(action(id))
    }
    dispatch(usersActions.followingProgressChange(false, id))
}

export const unfollowUser = (id: number): ThunkType => dispatch => {
    fieldFollowUnfollow(dispatch, DAL.users.unfollow, usersActions.unfollow, id)
}

export const followUser = (id: number): ThunkType => dispatch => {
    fieldFollowUnfollow(dispatch, DAL.users.follow, usersActions.follow, id)
}

export default usersReducer