import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import s from './User.module.css'

type UserPropsType = {
    url: number
    name: string
}

const User: FC<UserPropsType> = props => {
    return (
        <NavLink className={s.a} to={"/dialogs/" + props.url} activeClassName={s.active}>{props.name}</NavLink>
    )
}

export default User