import { NavLink } from 'react-router-dom'
import s from './RightSide.module.css'

const RightSide = props => {
    return (
        <div className={s.item}>
            <div className={s.info}>
            <NavLink className={s.name} to={`/profile/${props.id}`}>
                {props.name}
            </NavLink>
                <div className={s.status}>
                    {props.status}
                </div>
            </div>
            <div className={s.location}>
            </div>
        </div>
    )
}

export default RightSide