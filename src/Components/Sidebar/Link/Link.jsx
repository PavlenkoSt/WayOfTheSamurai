import s from './Link.module.css'
import {NavLink} from 'react-router-dom'

const Link = props => {
    return (
        <li className={s.li} key={props.id}>
            <NavLink className={s.a} to={props.to} activeClassName={s.active}>{props.text}</NavLink>
        </li>
    )
}

export default Link