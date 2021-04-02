import { stopSubmit } from 'redux-form'
import DAL from '../api/api'


const ADD_POST = 'ADD-POST'
const REMOVE_POST = 'REMOVE_POST'
const GET_USER_PROFILE = 'GET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const SET_PHOTO = 'SET_PHOTO'

export const addNewPost = text => ({ type: ADD_POST, text })
export const removePost = id => ({ type: REMOVE_POST, id})
export const getUserProfile = userProfile => ({ type: GET_USER_PROFILE, userProfile})
export const setStatus = status => ({ type: SET_STATUS, status })
export const setPhotoSuccess = photos => ({ type: SET_PHOTO, photos })


const initialValue = {
    posts: [
        {id: 1, message: "Привет, это новая социальная сеть! Ура!"},
        {id: 2, message: "Почему меня никто не любит?"},
    ],
    userProfile: null,
    status: ''
}

const profileReducer = (state = initialValue, action) => {
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

export const getProfile = (usersId, myId) => dispatch => {
    usersId 
        ? DAL.profile.getProfile(usersId).then(data => dispatch(getUserProfile(data))) 
        : DAL.profile.getProfile(myId).then(data => dispatch(getUserProfile(data)))
}

export const getUserStatus = (userId, myId) => dispatch => {
    userId 
        ? DAL.profile.getStatus(userId).then(status => dispatch(setStatus(status)))
        : DAL.profile.getStatus(myId).then(status => dispatch(setStatus(status)))
}   

export const updateStatus = (status, myId) => async (dispatch, getState) => {
    try{
        const response = await DAL.profile.updateStatus(status)
        if(response.data.resultCode === 0){
            dispatch(setStatus(status))
        }
    }catch(err){
        if(myId){
            DAL.profile.getStatus(myId).then(oldStatus => dispatch(setStatus(oldStatus)))
        }
    }
}

export const setPhoto = photo => async dispatch => {
    const response = await DAL.profile.setPhoto(photo)
    if(response.data.resultCode === 0){
        dispatch(setPhotoSuccess(response.data.data.photos))
    }
}

export const editProfileInfo = (profileInfo, myId) => async dispatch => {
    const response = await DAL.profile.editProfileInfo(profileInfo)
    const id = myId
    if(response.data.resultCode === 0){
        DAL.profile.getProfile(id).then(data => dispatch(getUserProfile(data)))
    }else{
        const errPlace = response.data.messages[0].match(/\-\>(.+)\)/)
        dispatch(stopSubmit('profile-info', { contacts: { [errPlace[1].toLowerCase()]: response.data.messages[0]}}))
        return Promise.reject()
    }
}

export default profileReducer