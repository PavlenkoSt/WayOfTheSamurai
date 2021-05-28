import { ActionTypes } from './reduxStore';
import { PhotosForProfileType, PostsType, ProfileType } from './../types/types';
import { stopSubmit } from 'redux-form'
import DAL from '../api/api'
import { ThunkAction } from 'redux-thunk';
import { AnyAction, Store } from 'redux';

const ADD_POST = 'ADD-POST'
const REMOVE_POST = 'REMOVE_POST'
const GET_USER_PROFILE = 'GET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const SET_PHOTO = 'SET_PHOTO'

export const profileActions = {
    addNewPost: (text: string) => ({ type: ADD_POST, text } as const),
    removePost: (id: number) => ({ type: REMOVE_POST, id} as const),
    getUserProfile: (userProfile: Object) => ({ type: GET_USER_PROFILE, userProfile} as const),
    setStatus: (status: string) => ({ type: SET_STATUS, status } as const),
    setPhotoSuccess: (photos: PhotosForProfileType) => ({ type: SET_PHOTO, photos } as const)
}

const initialValue = {
    posts: [
        {id: 1, message: "Привет, это новая социальная сеть! Ура!"},
        {id: 2, message: "Почему меня никто не любит?"},
    ] as Array<PostsType> ,
    userProfile: null as ProfileType | null,
    status: ''
}

type InitialValueType = typeof initialValue
type ActionType = ActionTypes<typeof profileActions>

const profileReducer = (state = initialValue, action: ActionType): InitialValueType => {
    switch(action.type){
        case ADD_POST: {
            const post = {
                id: 3, message: action.text,
            }
            return {
                ...state,
                posts: [...state.posts, post],
            }
        }
        case REMOVE_POST: {
            return {
                ...state,
                posts: state.posts.filter( post => post.id !== action.id)
            }
        }
        case GET_USER_PROFILE: {
            return {
                ...state,
                userProfile: action.userProfile
            }
        }
        case SET_STATUS: {
            return {
                ...state, 
                status: action.status
            }
        }
        case SET_PHOTO: {
            return {
                ...state,
                userProfile: { ...state.userProfile , photos: action.photos} 
            }
        }
        default:
            return state
    }
}

type ThunkType = ThunkAction<void, Store, unknown, AnyAction>

export const getProfile = (usersId: number, myId: string): ThunkType => dispatch => {
    usersId 
        ? DAL.profile.getProfile(usersId).then((data: any) => dispatch(profileActions.getUserProfile(data))) 
        : DAL.profile.getProfile(myId).then((data: any) => dispatch(profileActions.getUserProfile(data)))
}

export const getUserStatus = (userId: number, myId: string): ThunkType => dispatch => {
    userId 
        ? DAL.profile.getStatus(userId).then((status: string) => dispatch(profileActions.setStatus(status)))
        : DAL.profile.getStatus(myId).then((status: string) => dispatch(profileActions.setStatus(status)))
}   

export const updateStatus = (status: string, myId: string): ThunkType => async dispatch => {
    try{
        const response = await DAL.profile.updateStatus(status)
        if(response.data.resultCode === 0){
            dispatch(profileActions.setStatus(status))
        }
    }catch(err){
        if(myId){
            DAL.profile.getStatus(myId).then((oldStatus: string) => dispatch(profileActions.setStatus(oldStatus)))
        }
    }
}

export const setPhoto = (photo: any): ThunkType => async dispatch => {
    const response = await DAL.profile.setPhoto(photo)
    if(response.data.resultCode === 0){
        dispatch(profileActions.setPhotoSuccess(response.data.data.photos))
    }
}

export const editProfileInfo = (profileInfo: ProfileType, myId: string): ThunkType => async dispatch => {
    const response = await DAL.profile.editProfileInfo(profileInfo)
    const id = myId
    if(response.data.resultCode === 0){
        DAL.profile.getProfile(id).then((data: any) => dispatch(profileActions.getUserProfile(data)))
    }else{
        const errPlace = response.data.messages[0].match(/\-\>(.+)\)/)
        dispatch(stopSubmit('profile-info', { contacts: { [errPlace[1].toLowerCase()]: response.data.messages[0]}}))
        return Promise.reject()
    }
}

export default profileReducer