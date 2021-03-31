import React from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router"


export const withAuthRedirect = (Component) => {

    const MapStateToProps = state => {
        return {
            isAuth: state.auth.isAuth
        }
    }

    class ContainerComponent extends React.Component {
        render(){
            if(!this.props.isAuth) return <Redirect to='/login' />
            return <Component {...this.props} />
        }
    }
    
    return connect(MapStateToProps)(ContainerComponent)
}
