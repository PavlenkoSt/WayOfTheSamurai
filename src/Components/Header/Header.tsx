import s from './Header.module.scss'
import {NavLink} from 'react-router-dom'
import logo from '../../assets/logo.jpg'
import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { idSelector, isAuthSelector, loginSelector } from '../../Redux/selectors/authSelectors'
import { logout } from '../../Redux/authReducer'

const Header: FC = () => {

  const dispatch = useDispatch()

  const logoutOnClick = () => {
    dispatch(logout())
  }

  const isAuth = useSelector(isAuthSelector)
  const id = useSelector(idSelector)
  const login = useSelector(loginSelector)

    return (
      <div className="container">
        <header className={s.header}>
          <NavLink className={s.logo} to="/">
            <img src={logo} className={s.img} alt="logo" />
          </NavLink>
          <div className={s.login}>
            {isAuth 
            ? (
             <div>
              <NavLink to={`/profile/${id}`}>{login}</NavLink> &nbsp;
                <button className={s.btn}
                onClick={logoutOnClick}
                >Выйти</button>
             </div>
            ) 
            : (
              <NavLink to="/login">Войти</NavLink>
            )}
          </div>
        </header>
      </div>
    );
}

export default Header