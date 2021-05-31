import s from './LeftSide.module.css'
import userPhoto from './../../../../assets/user.png'
import { NavLink } from 'react-router-dom'
import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { followingProgressSelector } from '../../../../Redux/selectors/usersSelectors'
import { followUser, unfollowUser } from '../../../../Redux/usersReducer'

type LeftSidePropsType = {
    propId: number
    photo: string
    followed: boolean
}

const LeftSide: FC<LeftSidePropsType> = ({ propId, photo, followed }) => {
    const dispatch = useDispatch()
    const followingProgress = useSelector(followingProgressSelector)

    const follow = (id: number) => {
        dispatch(unfollowUser(id))
    }

    const unfollow = (id: number) => {
    dispatch(followUser(id))
 }
    return (
        <div>
            <NavLink className={s.photo} to={`/profile/${propId}`}>
                <img src={photo ? photo : userPhoto} alt="ava"/>
            </NavLink>
            <div className={s.follow}>
                {
                    followed
                        ? <button 
                            disabled={followingProgress.some(id => +id === +propId)} 
                            onClick={() => follow(+propId) } 
                            className={s.unfollowBtn}
                            >Отписаться</button>
                        : <button 
                            disabled={followingProgress.some(id => +id === +propId)} 
                            onClick={ () => unfollow(+propId) }
                            className={s.followBtn}
                            >Подписаться</button>
                }
            </div>
        </div>
    )
}

export default LeftSide