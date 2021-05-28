import { FC } from 'react'
import LeftSide from './LeftSide/LeftSide'
import RightSide from './RightSide/RightSide'
import s from './User.module.css'

type UserPropsType = {
    id: number
    photo: string
    followed: boolean
    followingProgress: Array<number>
    name: string
    status: string | null
    unfollowUser: (id: number) => void
    followUser: (id: number) => void
}
 
const User: FC<UserPropsType> = props => {
    return (
        <div className={s.item}>
            <LeftSide
                id={props.id} 
                photo={props.photo} 
                followed={props.followed} 
                followingProgress={props.followingProgress}
                unfollowUser={props.unfollowUser}
                followUser={props.followUser}
            />
            <RightSide 
                id={props.id}
                name={props.name} 
                status={props.status}
            />
        </div>
    )
}

export default User