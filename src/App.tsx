import './App.scss'
import store from './Redux/reduxStore'
import React, { useEffect, useState } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { initializeApp } from './Redux/appReducer'
import withSuspense from './hoc/withSuspense'
import Header from './Components/Header/Header'
import Sidebar from './Components/Sidebar/Sidebar'
import Preloader from './Components/common/Preloader/Preloader'
import Modal from './Components/common/Modal/Modal'
import { initializedSelector } from './Redux/selectors/appSelectors'


const Main = React.lazy(():any => import('./Components/Main/Main'))
const Profile = React.lazy(():any => import('./Components/Profile/Profile'))
const Dialogs = React.lazy(():any => import('./Components/Dialogs/Dialogs'))
const Users = React.lazy(() => import('./Components/Users/Users'))
const News = React.lazy(():any => import('./Components/News/News'))
const Musics = React.lazy(():any => import('./Components/Musics/Musics'))
const Settings = React.lazy(():any => import('./Components/Settings/Settings'))
const Login = React.lazy(():any => import('./Components/Login/Login'))

 
const App = () => {

  const [errorStatus, errorStatusChange] = useState(false)

  const initialized = useSelector(initializedSelector)
  const dispatch = useDispatch()

  useEffect( () => {
    dispatch(initializeApp())
  }, [initialized])

  useEffect( () => {
    window.addEventListener("unhandledrejection", () => errorStatusChange(true))
  }, [])

    if(!initialized){
      return <Preloader/>
    }
    return (
      <div className="app-wrapper">
        <Header />
        <div className="container">
          { errorStatus && <Modal errorStatusChange={errorStatusChange} errorMessage={'Неизвестная ошибка!'}/> }
          <div className="main">
            <Sidebar />
            <Route path="/" exact render={ withSuspense(Main) } />
            <Route path="/profile/:userId?" render={ withSuspense(Profile) } />
            <Route path="/dialogs" render={  withSuspense(Dialogs) } />
            <Route path="/users" render={  withSuspense(Users) } />
            <Route path="/news" render={ withSuspense(News) } />
            <Route path="/musics" render={ withSuspense(Musics) } />
            <Route path="/settings" render={  withSuspense(Settings) } />
            <Route path="/login" render={ withSuspense(Login) } />
          </div>
        </div>
      </div>
    );
}

const AppWithRouter = withRouter(App)

export default () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppWithRouter />
      </Provider>
    </BrowserRouter>
  );
}