import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import s from './RightSide.module.css'

type RightSidePropsType = {
    id: number
    name: string
    status: string | null
}

const RightSide: FC<RightSidePropsType> = ({ status, id, name}) => {
    return (
        <div className={s.item}>
            <div className={s.info}>
            <NavLink className={s.name} to={`/profile/${id}`}>
                {name}
            </NavLink>
                <div className={s.status}>
                    {status}
                </div>
            </div>
            <div className={s.location}>
            </div>
        </div>
    )
}

export default RightSide