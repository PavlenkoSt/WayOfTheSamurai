import { NavLink } from 'react-router-dom'
import s from './User.module.css'

const User = props => {
    return (
        <NavLink className={s.a} to={"/dialogs/" + props.url} activeClassName={s.active}>{props.name}</NavLink>
    )
}

export default User