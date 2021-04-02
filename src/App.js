import './App.css'
import store from './Redux/reduxStore'
import React, { useEffect, useState } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { initializeApp } from './Redux/appReducer'
import withSuspense from './hoc/withSuspense'

import HeaderContainer from './Components/Header/HeaderContainer'
import SidebarContainer from './Components/Sidebar/SidebarContainer'
import Preloader from './Components/common/Preloader/Preloader'
import Modal from './Components/common/Modal/Modal'

const Main = React.lazy(() => import('./Components/Main/Main'))
const Profile = React.lazy(() => import('./Components/Profile/Profile'))
const DialogsContainer = React.lazy(() => import('./Components/Dialogs/DialogsContainer'))
const UsersContainer = React.lazy(() => import('./Components/Users/UsersContainer'))
const News = React.lazy(() => import('./Components/News/News'))
const Musics = React.lazy(() => import('./Components/Musics/Musics'))
const Settings = React.lazy(() => import('./Components/Settings/Settings'))
const Login = React.lazy(() => import('./Components/Login/Login'))
 
const App = props => {

  const [errorStatus, errorStatusChange] = useState(false)

  useEffect( () => {
    props.initializeApp()
    }, [props.initialized])

  useEffect( () => {
    window.addEventListener("unhandledrejection", () => errorStatusChange(true))
  }, [])

    if(!props.initialized){
      return <Preloader/>
    }
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <div className="container">
          { errorStatus && <Modal errorStatusChange={errorStatusChange} errorMessage={'Неизвестная ошибка!'}/> }
          <div className="main">
            <SidebarContainer />
            <Route path="/" exact render={ withSuspense(Main) } />
            <Route path="/profile/:userId?" render={ withSuspense(Profile) } />
            <Route path="/dialogs" render={ withSuspense(DialogsContainer) } />
            <Route path="/users" render={ withSuspense(UsersContainer) } />
            <Route path="/news" render={ withSuspense(News) } />
            <Route path="/musics" render={ withSuspense(Musics) } />
            <Route path="/settings" render={ withSuspense(Settings) } />
            <Route path="/login" render={ withSuspense(Login) } />
          </div>
        </div>
      </div>
    );
}

const mapStateToProps = state => ({ initialized: state.app.initialized })

const AppWithRouter = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App)

export default () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppWithRouter />
      </Provider>
    </BrowserRouter>
  );
}