import React, { ComponentType, FC } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router"
import { AppStateType } from "../Redux/reduxStore"

type MapPropsType = {
    isAuth: boolean
}

export function withAuthRedirect<WCP>(Component: ComponentType ) {
    
    const MapStateToProps = (state: AppStateType) => {
        return {
            isAuth: state.auth.isAuth
        }
    }

    const ContainerComponent: FC<MapPropsType> = (props) => {
        const {isAuth} = props
        if(!isAuth) return <Redirect to='/login' />
        return <Component {...props} />
    }
    
    return connect<MapPropsType, {}, WCP, AppStateType>(MapStateToProps)(ContainerComponent)
}
