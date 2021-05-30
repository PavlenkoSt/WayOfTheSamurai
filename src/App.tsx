import './App.css'
import store, { AppStateType } from './Redux/reduxStore'
import React, { ComponentType, useEffect, useState } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider, useSelector } from 'react-redux'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { initializeApp } from './Redux/appReducer'
import withSuspense from './hoc/withSuspense'

import HeaderContainer from './Components/Header/HeaderContainer'
import SidebarContainer from './Components/Sidebar/SidebarContainer'
import Preloader from './Components/common/Preloader/Preloader'
import Modal from './Components/common/Modal/Modal'
import { initializedSelector } from './Redux/appSelectors'


const Main = React.lazy(():any => import('./Components/Main/Main'))
const Profile = React.lazy(():any => import('./Components/Profile/Profile'))
const Dialogs = React.lazy(():any => import('./Components/Dialogs/Dialogs'))
const UsersContainer = React.lazy(() => import('./Components/Users/UsersContainer'))
const News = React.lazy(():any => import('./Components/News/News'))
const Musics = React.lazy(():any => import('./Components/Musics/Musics'))
const Settings = React.lazy(():any => import('./Components/Settings/Settings'))
const Login = React.lazy(():any => import('./Components/Login/Login'))

type MapDispatchProps = {
  initializeApp: () => void
}
 
const App = (props: any) => {

  const [errorStatus, errorStatusChange] = useState(false)
  
  const initialized = useSelector(initializedSelector)

  useEffect( () => {
    props.initializeApp()
  }, [initialized])

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
            <Route path="/dialogs" render={  withSuspense(Dialogs) } />
            <Route path="/users" render={  withSuspense(UsersContainer) } />
            <Route path="/news" render={ withSuspense(News) } />
            <Route path="/musics" render={ withSuspense(Musics) } />
            <Route path="/settings" render={  withSuspense(Settings) } />
            <Route path="/login" render={ withSuspense(Login) } />
          </div>
        </div>
      </div>
    );
}

const AppWithRouter: any = compose<ComponentType>(
  withRouter,
  connect<null, MapDispatchProps, {}, AppStateType>(null, { initializeApp })
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