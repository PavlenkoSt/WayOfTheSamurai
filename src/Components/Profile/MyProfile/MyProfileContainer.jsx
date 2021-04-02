import React, { useEffect, useState } from 'react'
import MyProfile from './MyProfile'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import { getProfile, getUserStatus, updateStatus, setPhoto, editProfileInfo } from '../../../Redux/profileReducer'
import { compose } from 'redux'
import { authUser } from '../../../Redux/authReducer'

const MyProfileContainer = React.memo( props => {
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
            setPhoto={props.setPhoto} 
            isOwner={!props.match.params.userId} 
            {...props} 
            profile={props.profile} 
            updateStatus={props.updateStatus}
            editProfileInfo={props.editProfileInfo}
        />
    )
})

const MapStateToProps = state => {
    return {
        profile: state.profilePage.userProfile,
        myId: state.auth.id,
        status: state.profilePage.status,
    }
}

const MapDispatchToProps = { authUser, getProfile, getUserStatus, updateStatus, setPhoto, editProfileInfo }

export default compose(
    connect(MapStateToProps, MapDispatchToProps),
    withRouter,
)(MyProfileContainer)