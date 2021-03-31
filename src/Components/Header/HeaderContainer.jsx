import React from 'react'
import { connect } from 'react-redux'
import Header from './Header'
import { logout } from '../../Redux/authReducer'

const HeaderContainer = props => {
    return (
        <Header { ...props }/>
    )
}

const MapStateToProps = state => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    id: state.auth.id
})

const MapDispatchToProps = { logout }

export default connect(MapStateToProps, MapDispatchToProps)(HeaderContainer)