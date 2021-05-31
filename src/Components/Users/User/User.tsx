import { FC } from 'react'
import LeftSide from './LeftSide/LeftSide'
import RightSide from './RightSide/RightSide'
import s from './User.module.css'

type UserPropsType = {
    id: number
    photo: string
    followed: boolean
    name: string
    status: string | null
}
 
const User: FC<UserPropsType> = ({ id, photo, followed, name, status }) => {
    return (
        <div className={s.item}>
            <LeftSide
                propId={id} 
                photo={photo} 
                followed={followed} 
            />
            <RightSide 
                id={id}
                name={name} 
                status={status}
            />
        </div>
    )
}

export default User