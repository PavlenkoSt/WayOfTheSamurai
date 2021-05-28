import React, { FC } from 'react'
import { connect } from 'react-redux'
import Header from './Header'
import { logout } from '../../Redux/authReducer'
import { AppStateType } from '../../Redux/reduxStore'

type MapStatePropsType = {
    isAuth: boolean
    login: string | null
    id: string
}

type MapDispatchPropsType = {
    logout: () => void
}

const HeaderContainer = (props: any) => {
    return (
        <Header { ...props }/>
    )
}

const MapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    id: state.auth.id
})

const MapDispatchToProps = { logout }

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(MapStateToProps, MapDispatchToProps)(HeaderContainer)