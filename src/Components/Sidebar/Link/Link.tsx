import s from './Link.module.css'
import {NavLink} from 'react-router-dom'
import { FC } from 'react'

type LinkProps = {
    to: string
    text: string
}

const Link: FC<LinkProps> = props => {
    return (
        <li className={s.li}>
            <NavLink className={s.a} to={props.to} exact activeClassName={s.active}>{props.text}</NavLink>
        </li>
    )
}

export default Link