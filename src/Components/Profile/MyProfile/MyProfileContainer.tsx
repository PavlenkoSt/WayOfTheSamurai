import React, { ComponentType, FC, useEffect, useState } from 'react'
import MyProfile from './MyProfile'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import { getProfile, getUserStatus, updateStatus, setPhoto, editProfileInfo } from '../../../Redux/profileReducer'
import { compose } from 'redux'
import { authUser } from '../../../Redux/authReducer'
import { AppStateType } from '../../../Redux/reduxStore'
import { ProfileType } from '../../../types/types'

type MapStatePropsType = {
    profile: ProfileType | null
    myId: string
    status: string 
}

type MapDispatchPropsType = {
    authUser: () => any
    getProfile: (usersId: number, myId: string) => void
    getUserStatus: (userId: number, myId: string) => any
    updateStatus: (status: string, myId: string) => any
    setPhoto: (photo: any) => any
    editProfileInfo: (profileInfo: ProfileType, myId: string) => any
}

type OwnPropsType = {
    match: any
}

const MyProfileContainer: FC<OwnPropsType & MapStatePropsType & MapDispatchPropsType> = React.memo( props => {
    useEffect( () => {
        if(props.match.params.userId || props.myId){
            props.getProfile(props.match.params.userId, props.myId)
            props.getUserStatus(props.match.params.userId, props.myId)
        }
    }, [props.match.params.userId, props.myId])

    if(!props.match.params.userId && !props.myId ){
        return <Redirect to='/login'/>
    }
    return (
        <MyProfile 
            {...props} 
            {...props.setPhoto} 
            isOwner={!props.match.params.userId} 
            profile={props.profile} 
            updateStatus={props.updateStatus}
            editProfileInfo={props.editProfileInfo}
        />
    )
})

const MapStateToProps = (state: AppStateType) => {
    return {
        profile: state.profilePage.userProfile,
        myId: state.auth.id,
        status: state.profilePage.status,
    }
}

const MapDispatchToProps = { authUser, getProfile, getUserStatus, updateStatus, setPhoto, editProfileInfo }

export default compose<ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(MapStateToProps, MapDispatchToProps),
    withRouter,
)(MyProfileContainer)