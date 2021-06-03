import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import s from './User.module.scss'

type UserPropsType = {
    url: number
    name: string
}

const User: FC<UserPropsType> = ({ url, name }) => {
    return (
        <NavLink className={s.a} to={"/dialogs/" + url} activeClassName={s.active}>{name}</NavLink>
    )
}

export default User