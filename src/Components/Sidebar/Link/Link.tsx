import s from './Link.module.scss'
import {NavLink} from 'react-router-dom'
import { FC } from 'react'

type LinkProps = {
    to: string
    text: string
}

const Link: FC<LinkProps> = ({ to, text }) => {
    return (
        <li className={s.li}>
            <NavLink className={s.a} to={to} exact activeClassName={s.active}>{text}</NavLink>
        </li>
    )
}

export default Link