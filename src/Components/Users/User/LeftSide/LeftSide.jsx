import s from './LeftSide.module.css'
import userPhoto from './../../../../assets/user.png'
import { NavLink } from 'react-router-dom'

const LeftSide = props => {
    return (
        <div>
            <NavLink className={s.photo} to={`/profile/${props.id}`}>
                <img src={props.photo ? props.photo : userPhoto} alt="ava"/>
            </NavLink>
            <div className={s.follow}>
                {
                    props.followed
                        ? <button 
                            disabled={props.followingProgress.some(id => id === props.id)} 
                            onClick={() => props.unfollowUser(props.id) } 
                            className={s.unfollowBtn}
                            >Отписаться</button>
                        : <button 
                            disabled={props.followingProgress.some(id => id === props.id)} 
                            onClick={ () => props.followUser(props.id) }
                            className={s.followBtn}
                            >Подписаться</button>
                }
            </div>
        </div>
    )
}

export default LeftSide